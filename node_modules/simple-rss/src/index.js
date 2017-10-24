// Wraps the FeedParser example into a function call with `url` argument
// https://github.com/danmactough/node-feedparser/blob/master/examples/compressed.js

const merge = require('lodash/merge')
const FeedParser = require('feedparser')
const createRequest = require('request')
const { Iconv } = require('iconv')
const zlib = require('zlib')

module.exports = (uri, options) => {
	options = merge({
		request: {
			timeout: 20000,
			pool: false
		}
	}, options)

	return new Promise((resolve, reject) => {
		const posts = []

		const request = createRequest(uri, options.request)
		request.setHeader('user-agent', 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
		request.setHeader('accept', 'text/html,application/xhtml+xml')

		request.on('error', (error) => {
			reject(error)
		})

		request.on('response', function(response) {
			if (!/^2/.test(response.statusCode)) {
				return this.emit('error', new Error(`Invalid status code: ${response.statusCode}`))
			}

			let stream = response

			// Decompress the response if necessary
			const encoding = response.headers['content-encoding']

			if (encoding) {
				if (encoding.match(/\bdeflate\b/)) {
					stream = stream.pipe(zlib.createInflate())
				} else if (encoding.match(/\bgzip\b/)) {
					stream = stream.pipe(zlib.createGunzip())
				}
			}

			// Convert the response to utf8 if necessary
			const { charset } = parseParameters(response.headers['content-type'] || '')

			if (charset && /utf-*8/i.test(charset) === false) {
				try {
					const iconv = new Iconv(charset, 'utf-8')

					iconv.on('error', reject)

					stream = stream.pipe(iconv)
				} catch (error) {
					return reject(error)
				}
			}

			// Parse the response with FeedParser
			const feedparser = new FeedParser(options.feedparser)

			feedparser.on('error', error => {
				reject(error)
			})

			feedparser.on('readable', () => {
				let post

				while (post = feedparser.read()) {
					posts.push(post)
				}
			})

			// Resolve the Promise once all posts have been parsed
			feedparser.on('end', () => {
				resolve(posts)
			})

			stream.pipe(feedparser)
		})
	})
}

const parseParameters = (input) => {
	return input.split(';').reduce((params, param) => {
		var parts = param.split('=').map((part) => {
			return part.trim()
		})

		if (parts.length === 2) {
			params[parts[0]] = parts[1]
		}

		return params
	}, {})
}

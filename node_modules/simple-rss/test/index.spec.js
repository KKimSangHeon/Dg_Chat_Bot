const assert = require('assert')
const rss = require('../')

describe('Simple RSS', () => {
	let posts

	it('returns posts', () => {
		return rss('http://rss.cnn.com/rss/cnn_topstories.rss')
		.then((localPosts) => {
			posts = localPosts

			assert(posts, 'Expected there to be a `posts` Array returned.')
			assert(posts.length > 0, 'Expected there to be at least 1 post.')
		})
	})
})

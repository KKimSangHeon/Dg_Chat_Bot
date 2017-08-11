exports.returnOutChat = function(req, res) {

		var commonFunction= require('../common/commonFunction');

		var v_user_key = req.params.user_key;
		console.log('['+commonFunction.getTime()+' ' + v_user_key+'] : 채팅방나감')

		if(v_user_key == null) {
	    res.status(400).send("Invalid parameter")
	  } else {
	  	res.status(200).send({code: 0, message:'SUCCESS', comment:'정상응답'});
	  }

    res.end();
};

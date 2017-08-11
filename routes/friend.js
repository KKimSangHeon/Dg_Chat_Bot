exports.returnAddFriend = function(req, res) {
    //res.send([{user_key:req.params.user_key}, text:'Thank You~!']);
    //res.statusCode = 200;
    //res.status(200).send({code: 0, message:'SUCCESS', comment:'정상응답'});
    var commonFunction= require('../common/commonFunction');

    var v_user_key = req.params.user_key;
		console.log('['+commonFunction.getTime()+' '  + v_user_key+'] : 친구추가함')

    res.status(200).send({code: 0, message:'SUCCESS', comment:'정상응답'});


	  res.end();
};


exports.returnDelFriend = function(req, res) {
    //res.send([{user_key:req.params.user_key}, text:'Thank You~!']);
    //res.statusCode = 200;
    //res.status(200).send({code: 0, message:'SUCCESS', comment:'정상응답'});
    var commonFunction= require('../common/commonFunction');

    var v_user_key = req.params.user_key;
		console.log('['+commonFunction.getTime()+' '  + v_user_key+'] : 친구삭제함')

    if(v_user_key == null) {
	    res.status(400).send("Invalid parameter")
	  } else {
	  	res.status(200).send({code: 0, message:'SUCCESS', comment:'정상응답'});
	  }

	  res.end();
};

exports.returnAlive = function(req, res) {
    commonMessage=require('../common/commonMessage');

    res.send({type:'buttons', buttons:commonMessage.I_init_buttons});

};

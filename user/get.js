const Message = require('../model/Message');
const User = require('../model/User');

module.exports = {
    getUser(email, password, res) {

        var query = {};
        if (email != null && password != null) query = { email: email, password: password };
        console.log(query);
        findUsers(query, res);
    }
}
function findUsers(query, res) {

    User.find(query)
        //   .limit(parseInt(limit)).skip(((page-1)*limit))
        .then((result) => {
            //socket.emit('comeOnline', result); //here last100message is static text
            res.json(result);
            console.log(result);
            res.end();

        })
        .catch((error) => {
            console.log(error);
            res.json({ message: "User upload Failed", code: 404 })
            res.end();
        })
}
//01704123471
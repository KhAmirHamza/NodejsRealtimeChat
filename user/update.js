const User = require('../model/User')

module.exports = {
    async updateChatId(userId, chatId, res) {

        const query = { "_id": userId };
        const newUserData = await User.findOneAndUpdate(query, { 'chatId': chatId }, { new: true });
        res.json(newUserData);
        res.end()

        /* User.findOneAndUpdate(query, { $set: {'chatId': chatId} }, (err, result) => {
            if (err) {
                console.log(err);
                res.end();
            }else{
                console.log(result);
                res.json(result)
                res.end();
            }
          }); */

    }
}
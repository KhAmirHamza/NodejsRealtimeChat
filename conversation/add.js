const Conversation = require('../model/Conversation');
const User = require('../model/User');

module.exports = {

    addConverastion(users, messages, res) {

        const conversationSchema = new Conversation({
            _id: "C" + Date.now(),
            users: users,
            messages: messages
        });

        conversationSchema.save().then((result) => {
            console.log("Uploading Conversation Data to MongoDB has successful.");
            console.log(result);
            //res.json({ message: "Conversation upload Successfuly" });
            res.json(result);

            res.end();
        }).catch((error) => {
            console.log("Uploading Conversation data to MongoDB has Failed: error: " + error);
            res.json({ message: "Conversation upload Failed" });
            res.end();
        })
    }
}

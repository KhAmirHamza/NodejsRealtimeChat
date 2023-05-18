const User = require('../model/User');

module.exports = {

    addUser(chatId, name, email, password, status, res) {
        console.log("Check email: " + email);

        const userSchema = new User({
            _id: "U" + Date.now(),
            chatId: chatId,
            name: name,
            email: email,
            password: password,
            status: status,
        });

        userSchema.save().then((result) => {
            console.log("uploading User Data to MongoDB has successful.");
            console.log(result);
            res.json(result)
            res.end();
        }).catch((error) => {
            console.log("uploading User data to MongoDB has Failed: error: " + error);
            res.json({ message: "User upload Failed" })
            res.end();
        })
    }
}
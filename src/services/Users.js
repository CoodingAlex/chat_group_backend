const User = require('../models/User')

class UserService {
    createUser(user) {
        const createdUser = new User(user)
        createdUser.save((err, docs) => {
            console.log(docs, err)
        })
    }

    async findOne(name) {
        const user = await User.findOne({
            name
        })

        console.log(user)
    }
}

module.exports = UserService
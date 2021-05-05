const jsonwebtoken = require('jsonwebtoken')
const { jwt } = require('../../config')

async function encrypt(payload) {
    const token = await jsonwebtoken.sign(payload, jwt.secret)
    return token
}

async function decrypt(token) {
    const payload = await jsonwebtoken.verify(token, jwt.secret)
    return payload
}


module.exports = {
    encrypt,
    decrypt
}
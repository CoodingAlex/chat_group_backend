const  { Router } = require('express')
const 
module.exports = function chatsRouter(app) {
  const router = Router()
  app.use('/chats', router)
  router.get('/', (req, res, next) => {

  })
}
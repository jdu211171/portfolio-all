const { publicRouters } = require('../configs/server.config.js')
const checkAuth = require('./checkAuth.middleware.js')

const middleWares = [
    checkAuth(publicRouters)
]

const combineMiddleWares = (app) => {
    middleWares.forEach(mw => app.use(mw))
}

module.exports = combineMiddleWares
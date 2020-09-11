const routes = require('express').Router()
module.exports = (app) => {
    const getController = require('../controllers/get.rule')(app)
    const createController = require('../controllers/create.rule')(app)

    routes.get('/iptables/', getController.getIptable)
    routes.post('/iptables/', createController.createRule)
    routes.get('/interfaces/', getController.getInterface)

    return routes
}
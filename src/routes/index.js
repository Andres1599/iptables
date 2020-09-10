const routes = require('express').Router()
module.exports = (app) => {
    const getController = require('../controllers/get.rule')(app)

    routes.get('/iptables/', getController.getIptable)
    routes.get('/interfaces/', getController.getInterface)

    return routes
}
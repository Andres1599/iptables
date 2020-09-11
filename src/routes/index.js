const routes = require('express').Router()
module.exports = (app) => {
    const getController = require('../controllers/get.rule')(app)
    const createController = require('../controllers/create.rule')(app)
    const deleteController = require('../controllers/delete.rule')(app)

    routes.get('/iptables/', getController.getIptable)
    routes.get('/iptables/out', getController.getIptableOut)
    routes.get('/iptables/for', getController.getIptableFor)
    routes.post('/iptables/', createController.createRule)
    routes.post('/iptables/delete/', deleteController.deleteRule)
    routes.get('/interfaces/', getController.getInterface)

    return routes
}
const routes = require('express').Router();
const user = require('./user');
const expense = require('./expense');
const income = require('./income');

routes.use('/user', user);
routes.use('/expense', expense);
routes.use('/income', income)


routes.get('/test', (req, res) => {
  res.status(200).send({"value":"connected"});
});

module.exports = routes;
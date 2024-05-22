const { getAll, create, getOne, remove, update } = require('../controllers/directors.controllers');
const express = require('express');

const routerDirectors = express.Router();

routerDirectors.route('/directors')
    .get(getAll)
    .post(create);

routerDirectors.route('/directors/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerDirectors;
const { getAll, create, getOne, remove, update } = require('../controllers/genres.controllers');
const express = require('express');

const routerGenres = express.Router();

routerGenres.route('/genres')
    .get(getAll)
    .post(create);

routerGenres.route('/genres/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerGenres;
const { getAll, create, getOne, remove, update, setMoviesGenres, setMoviesActors, setMoviesDirectors } = require('../controllers/movies.controllers');
const express = require('express');

const routerMovies = express.Router();

routerMovies.route('/movies')
    .get(getAll)
    .post(create);

routerMovies.route('/movies/:id')
    .get(getOne)
    .delete(remove)
    .put(update);
routerMovies.route('/movies/:id/genres') 
    .post(setMoviesGenres)
routerMovies.route('/movies/:id/actors') 
    .post(setMoviesActors)

    routerMovies.route('/movies/:id/directors')  
    .post(setMoviesDirectors)

module.exports = routerMovies;
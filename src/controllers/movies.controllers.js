const catchError = require('../utils/catchError');
const Movies = require('../models/Movies');
const Directors = require('../models/Directors');
const Actors = require('../models/Actors');
const Genres = require('../models/Genres');

const getAll = catchError(async(req, res) => {
    const results = await Movies.findAll({include: [Directors, Actors, Genres]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movies.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movies.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movies.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movies.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setMoviesGenres = catchError(async(req, res) =>{
    const {id} = req.params;
    const results = await Movies.findByPk(id);
    if(!results) return res.status(404).json({message : "Genres not found"});
    await results.setGenres(req.body);
    const genres = await results.getGenres();
    return res.json(genres);
});
const setMoviesActors = catchError(async(req, res) =>{
    const {id} = req.params;
    const results = await Movies.findByPk(id);
    if(!results) return res.status(404).json({message : "Actors not found"});
    await results.setActors(req.body);
    const actors = await results.getActors();
    return res.json(actors);
})
const setMoviesDirectors = catchError(async(req, res) =>{
    const {id} = req.params;
    const results = await Movies.findByPk(id);
    if(!results) return res.status(404).json({message : "Directors not found"});
    await results.setDirectors(req.body);
    const directors= await results.getDirectors();
    return res.json(directors);
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setMoviesGenres,
    setMoviesActors,
    setMoviesDirectors
}
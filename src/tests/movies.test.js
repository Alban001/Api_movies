const request =require('supertest')
const app = require('../app');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');

let id;

test('GET /movies debe traer todas las peliculas', async()=>{
        const res= await request(app).get('/movies');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array)
});


test('POST /movies debe crear una pelicula', async()=>{
    const newDirectors={
        name:"director creado",
        image:"imagen creado",
        synopsis:"sinopsis creada",
        releaseYear:"año creado",
    }
    const res= await request(app).post('/movies').send(newDirectors);
    id = res.body.id;
    console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newDirectors.firstName);
});

test('PUT /movies/:id debe actualizar una pelicula', async() => {
    const updateDirectors = {
        name:"director actualizado",
        image:"imagen actualizada",
        synopsis:"sinopsis actualizado",
        releaseYear:"año actualizado",
    }
    const res= await request(app).put(`/movies/${id}`).send(updateDirectors);
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateDirectors.name);
});


test('POST /movies/:id/actors debe insertar los actores de una pelicula', async()=>{
    const actor = await Actors.create({
        firstName:"nombre creado", 
        lastName:"apellido creado",
        nationality:"nacionalidad creada",
        image:"imagen creada",
        birthday:"1964-09-09",
    })
    const res= await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});

test('POST  /movies/:id/directors debe insertar los directores de una pelicula', async()=>{
    const director = await Directors.create({
        firstName:"nombre creado",
        lastName:"apellido creado",
        nationality:"nacionalidad creada",
        image:"image creado",
        birthday:"1964-09-09",
    })
    const res= await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});

test('POST  /movies/:id/genres debe insertar los generos de una pelicula', async()=>{
    const genres = await Genres.create({
        name:"genero creado",
    })
    const res= await request(app).post(`/movies/${id}/genres`).send([genres.id]);
    await genres.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});


test('DELETE /movies/:id debe eliminar una pelicula', async()=>{
   
    const res= await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});



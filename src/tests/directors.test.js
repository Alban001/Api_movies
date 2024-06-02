const request =require('supertest')
const app = require('../app')

let id;

test('GET /directors debe traer todos los directores', async()=>{
        const res= await request(app).get('/directors');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array)
});


test('POST /directors debe crear un director', async()=>{
    const newDirectors={
        firstName:"nombre creado",
        lastName:"apellido creado",
        nationality:"nacionalidad creada",
        image:"image creado",
        birthday:"1964-09-09",
    }
    const res= await request(app).post('/directors').send(newDirectors);
    id = res.body.id;
    console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newDirectors.firstName);
});

test('PUT /directors/:id debe actualizar un director', async() => {
    const updateDirectors = {
        firstName:"nombre creado",
        lastName:"apellido creado",
        nationality:"nacionalidad creada",
        image:"image creado",
        birthday:"1964-09-09",
    }
    const res= await request(app).put(`/directors/${id}`).send(updateDirectors);
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updateDirectors.firstName);
});


test('DELETE /directors/:id debe eliminar un director', async()=>{
   
    const res= await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});

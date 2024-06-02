const request =require('supertest')
const app = require('../app')

let id;

test('GET /actors debe traer todos los actores', async()=>{
        const res= await request(app).get('/actors');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array)
});


test('POST /actors debe crear un actor', async()=>{
    const newActor={
        firstName:"nombre creado",
        lastName:"apellido creado",
        nationality:"nacionalidad creada",
        image:"image creado",
        birthday:"1964-09-09",
    }
    const res= await request(app).post('/actors').send(newActor);
    id = res.body.id;
    console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newActor.firstName);
});

test('PUT /actors/:id debe actualizar un actor', async() => {
    const updateActor = {
        firstName:"nombre actualizado", 
        lastName:"apellido actualizado",
        nationality:"nacionalidad actualizada",
        image:"image actualizada",
        birthday:"1964-09-09",
    }
    const res= await request(app).put(`/actors/${id}`).send(updateActor);
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updateActor.firstName);
});


test('DELETE /actors/:id debe eliminar un actor', async()=>{
   
    const res= await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});




import { loginUser } from "../src/controllers/user.controller.js";
import supertest  from "supertest";
import mongoose from "mongoose";
import { userModel } from "../src/models/users.model.js";
import bcrypt from "bcryptjs";
import app from "../app.js"

describe('Probar función login...', ()=>{
    // Configuración global
    const testUser = {
        fullName: 'Carlitos',
        email: 'carlitos@example.com',
        password: '123'
    }

    // Sucede antes de cada caso de prueba
    beforeEach (async ()=>{
        await userModel.deleteMany({});
    });

    // Instrucciones que se deben ejecutar al final de todos los casos de prueba → siempre hay que cerrar la conexión con la base de datos
    afterAll(async ()=>{
        await mongoose.connection.close(); //para asegurar que se cierre la conexión con la BD
    });


    // Casos de prueba
    // Caso exitoso de inicio de sesión
    it ('Aquí se inicia sesión correctamente con credenciales validas', async () => {
        const codedPassword = await bcrypt.hash(testUser.password, 10); //encriptar contraseña
        await userModel.create({...testUser, password:codedPassword}); //guardar el usuario de pruebas
        // await new userModel({...testUser, password:codedPassword}).save(); //otra forma para crearlo

        const response = await supertest(app).post('/iniciarSesion').send({
            emailLogin: 'carlitos@example.com',
            passwordLogin: '123'
        });

        // console.log("Respuesta: ", response);
        // console.log('Codigo de respuesta', response.statusCode);
        expect(response.statusCode).toBe(200);
    });

    // Caso de error por usuario no registrado
    it ('Aquí NO se inicia sesión correctamente con correo INVALIDO', async () => {
        const codedPassword = await bcrypt.hash(testUser.password, 10); //encriptar contraseña
        await userModel.create({...testUser, password:codedPassword}); //guardar el usuario de pruebas
        // await new userModel({...testUser, password:codedPassword}).save(); //otra forma para crearlo

        const response = await supertest(app).post('/iniciarSesion').send({
            emailLogin: 'pepito@example.com',
            passwordLogin: '123'
        });

        // console.log("Respuesta: ", response);
        // console.log('Codigo de respuesta', response.statusCode);
        expect(response.statusCode).toBe(404);
    });

    // Caso de error por usuario con contraseña incorrecta
    it ('Aquí NO se inicia sesión correctamente con contraseña INVALIDA', async () => {
        const codedPassword = await bcrypt.hash(testUser.password, 10); //encriptar contraseña
        await userModel.create({...testUser, password:codedPassword}); //guardar el usuario de pruebas
        // await new userModel({...testUser, password:codedPassword}).save(); //otra forma para crearlo

        const response = await supertest(app).post('/iniciarSesion').send({
            emailLogin: 'carlitos@example.com',
            passwordLogin: '456'
        });

        // console.log("Respuesta: ", response);
        // console.log('Codigo de respuesta', response.statusCode);
        expect(response.statusCode).toBe(401);
    });
    
});
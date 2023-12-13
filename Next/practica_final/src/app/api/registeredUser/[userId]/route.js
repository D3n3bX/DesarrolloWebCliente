import { NextResponse } from "next/server";
import { readFileSync } from 'fs';

/*
  FUNCION
    GET(request, { params })
    Maneja las solicitudes HTTP GET -> Devuelve el username del administrador que haya iniciado sesión
  Parámetros:
    - request: Objeto de solicitud HTTP
    - params: Parámetros de ruta
  Return:
    - Respuesta JSON indicando si el comercio fue encontrado o no
*/
export async function GET(request, { params }) {
    console.log('Estoy en GET');
  
    try {
        const users = JSON.parse(readFileSync('jsonFiles/user.json')); // Leo los datos de los administradores desde un archivo JSON
        console.log(users);
        const userId = params.userId; // Obtengo el valor de adminId desde los parámetros
        console.log("userId: " + userId);

        const foundUser = users.find((user) => user.id === parseInt(userId)); // Busco el usuario correspondiente al adminId
        console.log(foundUser);

        if (foundUser) { // El administrador fue encontrado
            console.log('Usuario encontrado:', foundUser.username); 
            return NextResponse.json({ username: foundUser.username, message: 'OK' }); // Devuelvo el username del adminid y un mensaje de OK
        } 
        else { // El usuario no fue encontrado
            console.log('Usuario no encontrado');
            return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 }); // Devuelve una respuesta JSON con código de estado 404 (No encontrado)
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 }); // Devuelvo una respuesta JSON con código de estado 500 (Error Interno del Servidor)
    }
}
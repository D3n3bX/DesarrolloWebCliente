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
        const admins = JSON.parse(readFileSync('jsonFiles/admin.json')); // Leo los datos de los administradores desde un archivo JSON
        console.log(admins);
        const adminId = params.adminId; // Obtengo el valor de adminId desde los parámetros
        console.log("adminId: " + adminId);

        const foundAdmin = admins.find((admin) => admin.id === parseInt(adminId)); // Busco el usuario correspondiente al adminId
        console.log(foundAdmin);

        if (foundAdmin) { // El administrador fue encontrado
            console.log('Usuario encontrado:', foundAdmin.username); 
            return NextResponse.json({ username: foundAdmin.username, message: 'OK' }); // Devuelvo el username del adminid y un mensaje de OK
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
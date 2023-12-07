import { NextResponse } from "next/server";
import { readFileSync } from 'fs';

export async function GET(request, { params }) {
    console.log('Estoy en GET');
  
    try {
        const admins = JSON.parse(readFileSync('jsonFiles/admin.json')); // Lee los datos de los administradores desde un archivo JSON
        console.log(admins);
        const adminId = params.adminId; // Obtén el valor de adminId desde los parámetros
        console.log("adminId: " + adminId);
        // Busca el usuario correspondiente al adminId
        const foundAdmin = admins.find((admin) => admin.id === parseInt(adminId));
        console.log(foundAdmin);
        if (foundAdmin) { // El usuario fue encontrado
            console.log('Usuario encontrado:', foundAdmin.username);
            return NextResponse.json({ username: foundAdmin.username, message: 'OK' });
        } 
        else { // El usuario no fue encontrado
            console.log('Usuario no encontrado');
            return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 }); // Devuelve una respuesta JSON con código de estado 404 (No encontrado)
        }
    } catch (error) {
        // Maneja errores durante el proceso de la solicitud
        console.error('Error en el servidor:', error);
        return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 }); // Devuelve una respuesta JSON con código de estado 500 (Error Interno del Servidor)
    }
}
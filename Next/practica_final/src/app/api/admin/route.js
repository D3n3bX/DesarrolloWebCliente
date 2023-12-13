import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';

/*
  FUNCION
    POST(request)
    Maneja las solicitudes HTTP POST -> Inicia sesión para los adminsitradores
  Parámetros:
    - request: Objeto de solicitud HTTP
  Return:
    - Respuesta JSON indicando el resultado del inicio de sesión
*/
export async function POST(request) {
  console.log('Estoy en POST');

  try {
    const admins = JSON.parse(readFileSync('jsonFiles/admin.json')); // Leo los datos de los administradores desde un archivo JSON
    const { username, password } = await request.json(); // Obtengo los credenciales (username y password) desde el cuerpo de la solicitud

    const foundAdmin = admins.find((admin) => admin.username === username && admin.password === password);

    // Compruebo si los credenciales coinciden con algún administrador
    if (foundAdmin) { // Los credenciales coinciden con algún admin
      console.log('Usuario correcto');
      const { id } = foundAdmin; // Obtengo el id del administrador que ha iniciado sesón
      return NextResponse.json({ id, message: "OK" }); // Devuelvo una respuesta JSON con el id del administrador
    }
    else { // Las credenciales no son correctas
      console.log('Usuario no correcto');
      
      return NextResponse.json({ message: 'Credenciales incorrectas' }, { status: 401 });  // Devuelvo una respuesta JSON con código de estado 401 (No Autorizado)
    }
  } catch (error) { // Manejo errores durante el proceso de la solicitud
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 }); // Devuelvo una respuesta JSON con código de estado 500 (Error Interno del Servidor)
  } 
}

/*
  FUNCION
    GET(request, { params })
    Maneja las solicitudes HTTP GET.
  Parámetros:
    - request: Objeto de solicitud HTTP
    - params: Parámetros de ruta (puede no ser necesario en este contexto)
  Return:
    - Respuesta JSON indicando un mensaje "OK"
*/
export async function GET(request, { params }) {
  console.log('Estoy en GET');

  const { searchParams } = new URL(request.url); // Obtengo los parámetros de consulta desde la URL
  const username = searchParams.get('username');
  
  return NextResponse.json({ message: 'OK' }); // Proceso la solicitud GET y retorno una respuesta JSON con un mensaje "OK"
}

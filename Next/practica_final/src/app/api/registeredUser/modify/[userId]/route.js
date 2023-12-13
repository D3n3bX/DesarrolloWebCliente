import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

/*
  FUNCION
    PUT(request, { params })
    Maneja las solicitudes HTTP PUT -> Actualiza la información de un usuario específico.
  Parámetros:
    - request: Objeto de solicitud HTTP
    - params: Parámetros de ruta (puede no ser necesario en este contexto)
  Return:
    - Respuesta JSON indicando el resultado de la actualización
*/
export async function PUT(request, { params }) {
    console.log('Estoy en PUT de modificar datos');
    console.log('params: ' + params);
    try {
        const users = JSON.parse(readFileSync('jsonFiles/user.json')); // Leo los datos de los users desde un archivo JSON
        const userId = params.userId; // Obtengo el valor de userId desde los parámetros
        console.log('userId: ' + userId);

        const { Ciudad, Intereses} = await request.json(); // Obtengo los nuevos datos desde el cuerpo de la solicitud

        // Busco el comercio con el userId proporcionado
        const userIndex = users.findIndex((user) => user.id === parseInt(userId));

        console.log('commerceIndex: ' + userIndex)

        // Compruebo si el comercio existe
        if (userIndex === -1) {
        return NextResponse.json({ message: 'El comercio no existe' }, { status: 404 }); // Si no existe, devuelvo un mensaje indicándolo
        }

        // Actualizar solo los campos que tienen valores proporcionados y no están vacíos
        if (Ciudad !== undefined && Ciudad.trim() !== '') {
        users[userIndex].Ciudad = Ciudad;
        }
        if (Intereses !== undefined && Intereses.trim() !== '') {
            users[userIndex].Intereses = Intereses;
        }
    
        await writeFileSync('jsonFiles/user.json', JSON.stringify(users, null, 2)); // Escribo los datos actualizados en el archivo JSON

        return NextResponse.json({ message: 'OK' }); // Devuelvo una respuesta JSON indicando el éxito de la actualización
    } catch (error) {
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
    - Respuesta JSON indicando un mensaje 'OK'
*/
export async function GET(request, { params }) {
  console.log('Estoy en GET');

  const { searchParams } = new URL(request.url); // Obtengo los parámetros de consulta desde la URL
  const CIF = searchParams.get('CIF');

  return NextResponse.json({ message: 'OK' }); // Proceso la solicitud GET y retorno una respuesta JSON con un mensaje 'OK'
}

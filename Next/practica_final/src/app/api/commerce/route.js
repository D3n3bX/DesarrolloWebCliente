import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

/*
  FUNCION (asíncorna)
    POST(request)
    Maneja las solicitudes HTTP POST, especialmente diseñado para el proceso de registro de un nuevo usuario
  Parámetros:
    - request: Objeto de solicitud HTTP
  Return:
    - Respuesta JSON indicando el resultado del registro
*/
export async function POST(request) {
    console.log('Estoy en POST');
  
    try {
        const commerces = JSON.parse(readFileSync('jsonFiles/commerce.json')); // Leo los datos de los commerces desde un archivo JSON

        const { NombreComercio, CIF, Direccion, Email, Telefono } = await request.json(); // Obtengo los credenciales (NombreComercio, password y email) desde el cuerpo de la solicitud

        // Compruebo si el usuario ya existe
        if (commerces.find((commerce) => commerce.NombreComercio === NombreComercio)) {
            return NextResponse.json({ message: 'El comercio ya existe' }, { status: 400 });
        }
        
        const newcommerce = {id: commerces.length + 1, NombreComercio, CIF, Direccion, Email, Telefono};        
        commerces.push(newcommerce); // Añado el nuevo usuario

        await writeFileSync('jsonFiles/commerce.json', JSON.stringify(commerces, null, 2)); // Escribo los datos actualizados en el archivo JSON

        return NextResponse.json({ message: 'OK' }); // Devuelvo una respuesta JSON
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

/*
  FUNCION
    PUT(request)
    Maneja las solicitudes HTTP PUT.
    Parámetros:
        - request: Objeto de solicitud HTTP
    Return:
        - Respuesta JSON indicando un mensaje 'Actualizando datos'
*/
export function PUT() {
    return NextResponse.json({
        message: 'Actualizando datos'
    })
}
import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

/*
  FUNCION
    PUT(request, { params })
    Maneja las solicitudes HTTP PUT -> Actualiza la información de un comercio específico.
  Parámetros:
    - request: Objeto de solicitud HTTP
    - params: Parámetros de ruta (puede no ser necesario en este contexto)
  Return:
    - Respuesta JSON indicando el resultado de la actualización
*/
export async function PUT(request, { params }) {
  console.log('Estoy en PUT de modificar datos');

  try {
    const commerces = JSON.parse(readFileSync('jsonFiles/commerce.json')); // Leo los datos de los commerces desde un archivo JSON
    const commerceId = params.commerceId; // Obtengo el valor de commerceId desde los parámetros
    console.log('commerceId: ' + commerceId);
    const { NombreComercio, Direccion, Ciudad, Email, Telefono, Actividad, Titulo, Resumen } = await request.json(); // Obtengo los nuevos datos desde el cuerpo de la solicitud

    // Busco el comercio con el commerceId proporcionado
    const commerceIndex = commerces.findIndex((commerce) => commerce.id === parseInt(commerceId));

    console.log('commerceIndex: ' + commerceIndex)

    // Compruebo si el comercio existe
    if (commerceIndex === -1) {
      return NextResponse.json({ message: 'El comercio no existe' }, { status: 404 }); // Si no existe, devuelvo un mensaje indicándolo
    }

    // Actualizar solo los campos que tienen valores proporcionados y no están vacíos
    if (NombreComercio !== undefined && NombreComercio.trim() !== '') {
      commerces[commerceIndex].NombreComercio = NombreComercio;
    }
    if (Direccion !== undefined && Direccion.trim() !== '') {
      commerces[commerceIndex].Direccion = Direccion;
    }
    if (Ciudad !== undefined && Ciudad.trim() !== '') {
      commerces[commerceIndex].Ciudad = Ciudad;
    }
    if (Email !== undefined && Email.trim() !== '') {
      commerces[commerceIndex].Email = Email;
    }
    if (Telefono !== undefined && Telefono.trim() !== '') {
      commerces[commerceIndex].Telefono = Telefono;
    }
    if (Actividad !== undefined && Actividad.trim() !== '') {
      commerces[commerceIndex].Actividad = Actividad;
    }
    if (Titulo !== undefined && Titulo.trim() !== '') {
      commerces[commerceIndex].Titulo = Titulo;
    }
    if (Resumen !== undefined && Resumen.trim() !== '') {
      commerces[commerceIndex].Resumen = Resumen;
    }

    await writeFileSync('jsonFiles/commerce.json', JSON.stringify(commerces, null, 2)); // Escribo los datos actualizados en el archivo JSON

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

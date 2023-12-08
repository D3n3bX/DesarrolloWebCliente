// Import necessary modules
import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';

/*
  FUNCION
    GET(request, { params })
    Maneja las solicitudes HTTP GET para buscar un comercio por NombreComercio.
  Parámetros:
    - request: Objeto de solicitud HTTP
    - params: Parámetros de ruta
  Return:
    - Respuesta JSON indicando si el comercio fue encontrado o no
*/
export async function GET(request, { params }) {
  console.log('Estoy en GET');

  try {
    const { NombreComercio } = params;
    
    const commerces = JSON.parse(await readFileSync('jsonFiles/commerce.json', 'utf-8'));

    const foundCommerce = commerces.find((commerce) => commerce.NombreComercio === NombreComercio);

    if (foundCommerce) {
      return NextResponse.json({ message: 'Comercio encontrado', commerce: foundCommerce });
    } else {
      return NextResponse.json({ message: 'Comercio no encontrado' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}

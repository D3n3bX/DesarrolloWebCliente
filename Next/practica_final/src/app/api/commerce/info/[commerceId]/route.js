import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';

/*
  FUNCION
    GET(request, { params })
    Maneja las solicitudes HTTP GET para buscar un comercio por ID.
  Parámetros:
    - request: Objeto de solicitud HTTP
    - params: Parámetros de ruta
  Return:
    - Respuesta JSON indicando si el comercio fue encontrado o no
*/
export async function GET(request, { params }) {
  console.log('Estoy en GET');

  try {
      const commerces = JSON.parse(readFileSync('jsonFiles/commerce.json')); // Lee los datos de los commerceistradores desde un archivo JSON
      
      const commerceId = params.commerceId; // Obtengo el valor de commerceId desde los parámetros
      console.log("commerceId: " + commerceId);
      
      const foundcommerce = commerces.find((commerce) => commerce.id === parseInt(commerceId)); // Obtengo el comercio con determinado id
      console.log(foundcommerce);
      if (foundcommerce) { // El comercio fue encontrado
          console.log('Comercio encontrado:', foundcommerce.NombreComercio);
          return NextResponse.json(foundcommerce); // Devuelvoo una respuesta JSON con el nombre del comercio y su id
      } 
      else { // El comercio no fue encontrado
          console.log('Comercio no encontrado');
          return NextResponse.json({ message: 'Comercio no encontrado' }, { status: 404 }); // Devuelvo una respuesta JSON con código de estado 404 (No encontrado)
      }
  } catch (error) {
      // Maneja errores durante el proceso de la solicitud
      console.error('Error en el servidor:', error);
      return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 }); // Devuelvo una respuesta JSON con código de estado 500 (Error Interno del Servidor)
  }
}

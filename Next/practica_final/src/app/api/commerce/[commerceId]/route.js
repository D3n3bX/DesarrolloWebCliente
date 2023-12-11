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
      const commerces = JSON.parse(readFileSync('jsonFiles/commerce.json')); // Lee los datos de los commerceistradores desde un archivo JSON
      console.log(commerces);
      const commerceId = params.commerceId; // Obtén el valor de commerceId desde los parámetros
      console.log("commerceId: " + commerceId);
      // Busca el usuario correspondiente al commerceId
      const foundcommerce = commerces.find((commerce) => commerce.id === parseInt(commerceId));
      console.log(foundcommerce);
      if (foundcommerce) { // El usuario fue encontrado
          console.log('Usuario encontrado:', foundcommerce.username);
          return NextResponse.json({ username: foundcommerce.username, message: 'OK' });
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
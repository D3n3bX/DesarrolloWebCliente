import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';

export async function POST(request, { params }) {
    console.log('Estoy en POST');
  
    try {
        const commerces = JSON.parse(readFileSync('jsonFiles/commerce.json')); // Leo los datos de los commerces desde un archivo JSON
        
        const searchParams = await request.json();
        console.log('SearchParams:', searchParams);
            
        // Buscar el comercio por CIF
        const foundCommerce = commerces.find((commerce) => {
            const searchTermLower = searchParams.searchTerm.toLowerCase();
            return (
              commerce.NombreComercio.toLowerCase().includes(searchTermLower) ||
              commerce.Ciudad.toLowerCase().includes(searchTermLower) ||
              commerce.Actividad.toLowerCase().includes(searchTermLower)
            );
          });

        console.log(foundCommerce);
        if (!foundCommerce) {
            return NextResponse.json({ error: 'Comercio no encontrado' }, { status: 404 });
        }
    
        return NextResponse.json({ foundCommerce });
        } catch (error) {
        console.error('Error en la solicitud POST:', error);
        return NextResponse.json({ error: 'Error en el servidor al procesar la solicitud' }, { status: 500 });
        }
  }
/*FUNCION
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
import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

/*
  FUNCION (asíncorna)
    POST(request)
    Maneja las solicitudes HTTP POST, especialmente diseñado para el proceso de registro de una nueva revisión de un comercio
  Parámetros:
    - request: Objeto de solicitud HTTP
  Return:
    - Respuesta JSON indicando el resultado de la operación
*/
export async function POST(request) {
    try {
        const commerces = JSON.parse(readFileSync('jsonFiles/commerce.json')); // Leo los datos de los commerces desde un archivo JSON

        const { NombreComercio, Scoring, Reseña } = await request.json(); // Obtengo los datos de la revisión desde el cuerpo de la solicitud

        // Busco el comercio por su nombre
        const commerceIndex = commerces.findIndex((commerce) => commerce.NombreComercio === NombreComercio);

        // Compruebo si el comercio no existe
        if (commerceIndex === -1) {
            return NextResponse.json({ message: 'El comercio no existe' }, { status: 400 });
        }
 
        // Añado la nueva review al comercio
        // Compruebo que tiene alguna puntuación el comercio
        if (!commerces[commerceIndex].Scoring) { // Si no tiene
          commerces[commerceIndex].Scoring = Scoring; // La puntuación es tal cual la que indican
          commerces[commerceIndex].NumeroPuntuacion = 1; // Y el número de reseñas será 1
        } 
        else { // Si existe ya una puntuación
          const existingScores = commerces[commerceIndex].Scoring; // Obtengo la puntuación que tiene
          const newScore = Scoring; // Obtengo la nueva puntuación
          const totalScores = commerces[commerceIndex].NumeroPuntuacion; // Obtengo el número de reseñas que hay
          
          // Escalo las puntuaciones al rango de 0 a 1
          const scaledExistingScores = existingScores / 5;
          const scaledNewScore = newScore / 5;
          
          // Calculo la suma ponderada escalada
          const weightedSum = scaledExistingScores * totalScores + scaledNewScore;
          
          // Calculo la media ponderada escalada y redondeo a dos decimales
          const averageScore = ((weightedSum / (totalScores + 1)) * 5).toFixed(2);

          commerces[commerceIndex].Scoring = parseFloat(averageScore); // La nueva puntuación será la media ponderada
          commerces[commerceIndex].NumeroPuntuacion += 1; // Incremento el número de reseñas
        }
        commerces[commerceIndex].Reseñas.push(Reseña);

        await writeFileSync('jsonFiles/commerce.json', JSON.stringify(commerces, null, 2)); // Escribo los datos actualizados en el archivo JSON

        return NextResponse.json({ message: 'Revisión añadida exitosamente' }); // Devuelvo una respuesta JSON
    } catch (error) {
        console.error('Error en el servidor:', error);
        return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 }); // Devuelvo una respuesta JSON con código de estado 500 (Error Interno del Servidor)
    }
}

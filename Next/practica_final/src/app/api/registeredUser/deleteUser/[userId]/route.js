import { readFileSync, writeFileSync } from 'fs';
import { NextResponse } from 'next/server';

export async function DELETE({params}) {
  console.log('Estoy en DELETE');
  console.log('params: ' + params);

    try {
        const users = JSON.parse(readFileSync('jsonFiles/user.json')); // Leo los datos de los users desde un archivo JSON
        const userId = params.userId; // Obtengo el valor de userId desde los parámetros
        console.log('userId: ' + userId);

    console.log("id: " + userId);

    const indexToDelete = users.findIndex((commerce) => commerce.id === parseInt(userId));
   
    console.log("indice: " +  indexToDelete);

    if (indexToDelete === -1) {
      console.log('El comercio no existe.');
      return NextResponse.json({ message: 'El comercio no existe' }, { status: 404 });
    }

    console.log('Deleting comercio...');
    commerces.splice(indexToDelete, 1);

    writeFileSync('jsonFiles/user.json', JSON.stringify(commerces, null, 2), 'utf-8');

    console.log('Comercio eliminado con éxito.');
    return NextResponse.json({ message: 'Se ha eliminado el comercio' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'El servidor encontró un error' }, { status: 500 });
  }
}
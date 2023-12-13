import { readFileSync, writeFileSync } from 'fs';
import { NextResponse } from 'next/server';

export async function DELETE(request, {params}) {
  try {
    const commerces = JSON.parse(readFileSync('jsonFiles/commerce.json', 'utf-8'));

    const commerceId = params.commerceId;

    console.log("id: " + commerceId);

    const indexToDelete = commerces.findIndex((commerce) => commerce.id === parseInt(commerceId));
   
    console.log("indice: " +  indexToDelete);

    if (indexToDelete === -1) {
      console.log('El comercio no existe.');
      return NextResponse.json({ message: 'El comercio no existe' }, { status: 404 });
    }

    console.log('Deleting comercio...');
    commerces.splice(indexToDelete, 1);

    writeFileSync('jsonFiles/commerce.json', JSON.stringify(commerces, null, 2), 'utf-8');

    console.log('Comercio eliminado con éxito.');
    return NextResponse.json({ message: 'Se ha eliminado el comercio' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'El servidor encontró un error' }, { status: 500 });
  }
}
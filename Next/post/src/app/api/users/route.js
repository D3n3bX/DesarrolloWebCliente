import { NextResponse } from "next/server";

export async function GET(request, {params}){
    console.log(params);
    const result = await fetch(`https:jsonplaceholder.typicode.com/users/${params.userid}`);
    const data = await result.json();

    const {searchParams} = new URL(request.url);
    console.log("searchParams");
    console.log(searchParams);
    return NextResponse.json(data);
}

// export function PUT() {
//     return NextResponse.json("Actaulizando datos...");
// }
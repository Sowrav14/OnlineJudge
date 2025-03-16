import { prisma } from "@/lib/prisma";
import { IProblem } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
    try {
        const problems : IProblem[] = await prisma.problem.findMany();
        return NextResponse.json({
            success : true,
            problems : problems
        }, { status:200 });
    } catch(error){
        console.log(error);
        return NextResponse.json({
            success:false
        }, {status : 500});
    }
}
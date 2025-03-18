import { prisma } from "@/lib/prisma";
import { IProblem } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


// Get all problems
export async function GET(req:NextRequest) {
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({error:"unauthorized"}, {status : 401})
    }
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
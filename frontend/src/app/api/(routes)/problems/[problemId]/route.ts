import { prisma } from "@/lib/prisma";
import { IProblem } from "@/lib/types";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


// Get problem with problemId
export async function GET(req:NextApiRequest, { params } : {params : {problemId : string}}) {
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({error:"unauthorized"}, {status : 401})
    }
    
    const {problemId} = await params
    if(!problemId) {
        return NextResponse.json({error:"Invalid route"}, {status : 400});
    }
    const id = problemId as string;
    try {
        const problem : IProblem | null = await prisma.problem.findUnique({
            where: {
                id : id,
            },
        });

        if(!problem){
            return NextResponse.json(
                {success : false, message : "No problem found"}, 
                { status : 404 }
            );
        }
        return NextResponse.json(
            {success : true, problem : problem },
            { status : 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {success : false, message : "Server error", error},
            { status : 500 }
        )
    }
}
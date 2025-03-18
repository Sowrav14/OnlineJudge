import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";

// Get stats on problemId
export async function GET(req:NextRequest, { params } : {params : {problemId : string}}) {
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({error:"unauthorized"}, {status : 401})
    }

    const { problemId } = await params
    if(!problemId) {
        return NextResponse.json({error:"Invalid route"}, {status : 400});
    }
    const pid = problemId as string;
    
    try {
        const total  = await prisma.submission.count({
            where : {
                problemId : pid,
            }
        })
        const accepted = await prisma.submission.count({
            where : { problemId : pid, verdict : 'AC'}
        })
        return NextResponse.json(
            {success : true, stats : {total : total, accepted : accepted} },
            { status : 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {success : false, message : "Server error", error},
            { status : 500 }
        )
    }
}
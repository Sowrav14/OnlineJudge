import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest, { params } : {params : {problemId : string}}) {
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
            where : { problemId : pid, verdict : 'Error'}
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
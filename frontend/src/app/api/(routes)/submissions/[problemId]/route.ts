import { prisma } from "@/lib/prisma";
import { ISubmission } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest, { params } : {params : {problemId : string}}) {
    const { problemId } = await params
    if(!problemId) {
        return NextResponse.json({error:"Invalid route"}, {status : 400});
    }
    const pid = problemId as string;
    // get userId from header send by middleware
    const uid = 'u3';
    
    try {
        const submissions : ISubmission[] = await prisma.submission.findMany({
            where : {
                userId : uid,
                problemId : pid,
            },
            orderBy : {
                submittedAt : 'asc'
            }
        })
        console.log(pid, uid, submissions);
        return NextResponse.json(
            {success : true, submissions : submissions },
            { status : 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {success : false, message : "Server error", error},
            { status : 500 }
        )
    }
}
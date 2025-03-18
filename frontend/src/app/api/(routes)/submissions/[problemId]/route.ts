import { prisma } from "@/lib/prisma";
import { ISubmission } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

// Get all submission of a userID on a problemID
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
    const uid = session.user.id;
    
    try {
        const submissions : ISubmission[] = await prisma.submission.findMany({
            where : {
                userId : uid,
                problemId : pid,
            },
            orderBy : {
                submittedAt : 'desc'
            }
        })
        // console.log(pid, uid, submissions);
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
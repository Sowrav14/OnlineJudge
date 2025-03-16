import { prisma } from "@/lib/prisma";
import { ISubmission } from "@/lib/types";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


export async function GET(req:NextApiRequest, { params } : {params : {submissionId : string}}) {
    const {submissionId} = await params
    if(!submissionId) {
        return NextResponse.json({error:"Invalid route"}, {status : 400});
    }
    const id = submissionId as string;

    try {
        const submission : ISubmission | null = await prisma.submission.findUnique({
            where: {
                submissionId : id,
            },
        });

        if(!submission){
            return NextResponse.json(
                {success : false, message : "No submission found"}, 
                { status : 404 }
            );
        }
        return NextResponse.json(
            {success : true, submission : submission },
            { status : 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {success : false, message : "Server error", error},
            { status : 500 }
        )
    }
}
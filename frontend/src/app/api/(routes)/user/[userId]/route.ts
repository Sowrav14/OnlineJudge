import { prisma } from "@/lib/prisma";
import { IUser } from "@/lib/types";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


export async function GET(req:NextApiRequest, { params } : {params : {userId : string}}) {
    const {userId} = await params
    if(!userId) {
        return NextResponse.json({error:"Invalid route"}, {status : 400});
    }
    const id = userId as string;

    try {
        const user : IUser | null = await prisma.user.findUnique({
            where: {
                id : id,
            },
        });

        if(!user){
            return NextResponse.json(
                {success : false, message : "No User found"}, 
                { status : 404 }
            );
        }
        return NextResponse.json(
            {success : true, user : user },
            { status : 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {success : false, message : "Server error", error},
            { status : 500 }
        )
    }
}
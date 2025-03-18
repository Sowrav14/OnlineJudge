'use server'

import { prisma } from "../prisma";
import { IProblem } from "../types";

export async function Getproblems() {
    try {
        const problems : IProblem[] = await prisma.problem.findMany();
        return {
            success : true,
            problems : problems
        };
    } catch(error){
        return {
            success:false
        };
    }
}

export async function Getthisproblem(problemId : string) {
    try {
        const problem : IProblem | null = await prisma.problem.findUnique({
            where: {
                id : problemId,
            },
        });

        if(!problem){
            return {
                success : false, 
            }
        }
        return {
            success : true, 
            problem : problem 
        }
    } catch (error) {
        return {
            success : false, 
        }
    }
}
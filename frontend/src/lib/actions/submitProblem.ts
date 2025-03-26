'use server'

import { prisma } from "../prisma";
import { IProblem } from "../types";
import fs from 'fs';
import path from 'path';

export async function submitProblem(data:Omit<IProblem, "id">) {
    try {
        const problem : IProblem = await prisma.problem.create({
            data : {
                title : data.title,
                author : data.author,
                tag : data.tag,
                statement : data.statement,
                input : data.input,
                output : data.output,
                constrains : data.constrains,
                sampleInput : data.sampleInput,
                sampleOutput: data.sampleOutput,
                time: data.time,
                memory: data.memory
            }
        })
        return {
            success : true,
            id : problem.id
        };
    } catch(error){
        return {
            success:false
        };
    }
}

export async function writeConstrains(
    id : string,
    memory : string,
    time : string
  ) {
    try {
      // Define problem directory inside /app/problems
      const problemDir = path.join('/app/problems', `problem_${id}`);
      if (!fs.existsSync(problemDir)) {
        fs.mkdirSync(problemDir, { recursive: true });
      }
      fs.writeFileSync(path.join(problemDir, 'time_limit.txt'), time);
      fs.writeFileSync(path.join(problemDir, 'memory_limit.txt'), memory);
  
      return { success: true};
    } catch (error) {
      console.error('Error writing problem files:', error);
      return { success: false };
    }
  }


export async function writeIO(
  id : string,
  input : string,
  output : string,
  cnt : number,
) {
  try {
    // Define problem directory inside /app/problems
    const problemDir = path.join('/app/problems', `problem_${id}`);
    if (!fs.existsSync(problemDir)) {
      fs.mkdirSync(problemDir, { recursive: true });
    }
    const n = cnt === 0 ? '' : cnt;
    fs.writeFileSync(path.join(problemDir, `input${n}.txt`), input);
    fs.writeFileSync(path.join(problemDir, `expected_output${n}.txt`), output);

    return { success: true};
  } catch (error) {
    console.error('Error writing problem files:', error);
    return { success: false };
  }
}

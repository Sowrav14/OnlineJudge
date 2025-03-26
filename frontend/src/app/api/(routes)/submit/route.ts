// File: /app/api/submit_solution/route.ts
import { prisma } from '@/lib/prisma';
import { connectRabbitMQ } from '@/lib/rabbitmq';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';



// API route handler for code submission in queue
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if(!session){
      return NextResponse.json({error:"unauthorized"}, {status : 401})
  }
  try {
    // Ensure RabbitMQ is connected
    const ch = await connectRabbitMQ();

    // Use Next.js API route to handle form data
    const formData = await request.formData();
    const code = formData.get('code') as string | null;
    const language = formData.get('language') as string | null;
    const submissionId = formData.get('submissionId') as string | null;
    const problemId = formData.get('problemId') as string | null;

    // Validate input
    if (!code || !language || !submissionId || !problemId) {
      const message = {
        submissionId : submissionId,
        status : 'Failed',
        isFinal : true,
        time : Date.now(),
      }
      ch.publish('submission-status', '', Buffer.from(JSON.stringify(message)));
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }
    
    // Push the code to RabbitMQ queue
    const codeData = {
      submissionId,
      problemId,
      language,
      code
    };
    const options = {
      headers: {
        retryCount: 0,
      }
    };
    const message = {
        submissionId : submissionId,
        status : 'Queued',
        isFinal : false,
        time : Date.now(),
    }
    
    ch.publish('submission-status', '', Buffer.from(JSON.stringify(message)));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    ch.sendToQueue('code_queue', Buffer.from(JSON.stringify(codeData)), options);
    return NextResponse.json({ 
      success : true,
      submissionId : submissionId  
    });
  } catch (error) {
    console.error('Error submitting solution:', error);
    return NextResponse.json({ success : false }, { status: 500 });
  }
}

// API route for code submission in database
export async function POST(request:NextRequest) {
  const session = await getServerSession(authOptions);
  if(!session){
      return NextResponse.json({error:"unauthorized"}, {status : 401})
  }
  // const userId = request.headers.get('userId') as string;
  //@ts-ignore
  const userId = session.user?.id;
  if(!userId){
    return NextResponse.json(
      {error : "Unauthorized"},
      {status : 401 }
    )
  }

  const formData = await request.formData();
  const problemId = formData.get('problemId') as string | null;
  const code = formData.get('code') as string | null;
  const language = formData.get('language') as string | null;


  // Validate input
  if (!code || !language || !problemId) {
    return NextResponse.json(
      { error: 'Not sufficient info provided' },
      { status: 400 }
    );
  }

  const submission = await prisma.submission.create({
    data : {problemId, userId, code, language}
  });
  
  const problem = await prisma.problem.findUnique({
    where : { id : problemId },
    select : { title : true },
  });

  const user = await prisma.user.findUnique({
    where : { id : userId },
    select : { name : true }
  })

  const problemName = problem?.title;
  const userName = user?.name;
  return NextResponse.json({ 
    success : true,
    submission : submission,
    problemName : problemName,
    userName : userName
  });
}
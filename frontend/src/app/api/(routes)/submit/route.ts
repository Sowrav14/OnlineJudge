// File: /app/api/submit_solution/route.ts
import { connectRabbitMQ } from '@/lib/rabbitmq';
import { generateShortUUID, getCurrentTime } from '@/lib/utility_functions';
import { NextRequest, NextResponse } from 'next/server';



// API route handler for code submission
export async function PUT(request: NextRequest) {
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
        time : getCurrentTime()
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
        time : getCurrentTime()
    }
    
    ch.publish('submission-status', '', Buffer.from(JSON.stringify(message)));
    await new Promise((resolve) => setTimeout(resolve, 5000));
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

export async function POST(request:NextRequest) {
  const formData = await request.formData();
  const code = formData.get('code') as string | null;
  const language = formData.get('language') as string | null;
  const problemId = formData.get('problemId') as string | null;

  // Validate input
  if (!code || !language || !problemId) {
    return NextResponse.json(
      { error: 'Not sufficient info provided' },
      { status: 400 }
    );
  }

  // Get it from database
  const submissionId = generateShortUUID();

  return NextResponse.json({ 
    success : true,
    submissionId : submissionId  
  });
}
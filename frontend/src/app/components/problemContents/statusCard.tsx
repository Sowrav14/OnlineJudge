import { ISubmissionDetails } from '@/lib/types';
import React from 'react';
import ParseStatus from './statusParsing';

const CodeStatus = ({sId} : {sId : string}) => {

  // fetch the status by sId
  const submissionDetails : Partial<ISubmissionDetails> = {
    submissionId: '12345',
    problemName: 'Having Been a Treasurer in the Past. I Help Goblins Deceive',
    author: 'John Doe',
    submittedAt: '2025-03-11 12:30:00',
    language: 'C++',
  }

  return (
    <div className="border rounded-lg shadow-md p-4 w-2/3 m-2">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">Submission ID:</span>
          <span> {sId} </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Author:</span>
          <span>{submissionDetails.author}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Submitted At:</span>
          <span>{submissionDetails.submittedAt}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Language:</span>
          <span>{submissionDetails.language}</span>
        </div>
        <ParseStatus sId={sId}/>
      </div>
    </div>
  );
};

export default CodeStatus;

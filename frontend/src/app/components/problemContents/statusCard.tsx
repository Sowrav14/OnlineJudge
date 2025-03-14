import { ISubmissionDetails } from '@/lib/types';
import React from 'react';
import ParseStatus from './statusParsing';
import { getCurrentTime } from '@/lib/utility_functions';

const CodeStatus = ({sId} : {sId : string}) => {

  // fetch the status by sId
  const submissionDetails : Partial<ISubmissionDetails> = {
    submissionId: sId,
    problemName: 'Having Been a Treasurer in the Past. I Help Goblins Deceive',
    author: 'Sowrav Nath',
    submittedAt: getCurrentTime(),
    language: 'C++',
  }

  return (
    <div className="border rounded-lg shadow-md p-4 w-3/4 m-2">
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

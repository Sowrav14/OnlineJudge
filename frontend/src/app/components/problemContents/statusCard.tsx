
import { ISubmission, IUser } from '@/lib/types';
import React from 'react';
import ParseStatus from './statusParsing';
import dayjs from 'dayjs';

const CodeStatus = ({submission, author} : {submission : ISubmission, author : string}) => {


  return (
    <div className="border rounded-lg shadow-md p-4 w-3/4 m-2">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">Submission ID:</span>
          <span> {submission.submissionId.substring(0, 10)} </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Author:</span>
          <span>{author}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Submitted At:</span>
          <span>{dayjs(submission.submittedAt).format('YYY MM DD HH:mm:ss')}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Language:</span>
          <span>{submission.language}</span>
        </div>
        <ParseStatus sId={submission.submissionId}/>
      </div>
    </div>
  );
};

export default CodeStatus;

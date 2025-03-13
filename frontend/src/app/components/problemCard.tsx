
import { Problems } from '@/lib/problems';
import { IProblem } from '@/lib/types';
import { Brain, BrainCircuit, Code, CodeXml, Cpu, Lightbulb, ServerCrash, Shapes, Sparkle, Target } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const icons : React.ReactElement[] = [<Lightbulb />, <Sparkle />, <ServerCrash />, <Shapes />, <CodeXml />, <BrainCircuit />, <Cpu />, <Code />, <Brain />, <Target />];

const ProblemCard = ({index}:{index:number}) => {
	const problem : IProblem = Problems[index] as IProblem;

  return (
    <div className={`w-250 h-auto flex justify-between items-center p-4 mt-4 dark:bg-gray-800 bg-[#F4F4F9] rounded-lg shadow-md`}>
			<div className={`flex justify-center items-center text-black  bg-[#BDD5EA] rounded-lg h-16 w-16`}>
				{icons[index]}
			</div>
			<div className='flex flex-col text-center gap-2 w-200 ml-8 h-16'>
        <div className='flex gap-8'>
					<h2 className=" text-lg font-semibold"> {problem.title} </h2>
        	<span className='dark:text-gray-300 text-gray-700 text-xs'> {problem.tag} </span>
				</div>
      	<div className={`flex dark:text-gray-400' : 'text-gray-800 text-sm mb-4`}> 
					<p> Author : {problem.author} </p>
				</div>
      </div>
      <Link href={`/problems/${problem.id}`}
				className={`dark:bg-blue-600 bg-blue-500 hover:bg-blue-700 px-6 py-4 font-bold rounded-lg`}>
        Continue
      </Link>
    </div>
  );
};

export default ProblemCard;
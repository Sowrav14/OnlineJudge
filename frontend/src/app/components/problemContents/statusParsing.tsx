'use client'
import { useState } from "react"

const ParseStatus = ({sId} : {sId : string}) => {
	const [verdict, setVerdict] = useState<string>("fetching...");
	const [totalTest, setTotalTest] = useState<number>(0);
	const [passedTest, setPassedTest] = useState<number>(0);
	const [time, setTime] = useState<number>(0);
	const [memory, setMemory] = useState<number>(0);

	// fetch these variables via a socket connection...

	return(
		<>
			<div className="flex justify-between">
				<span className="font-semibold">Test Passed:</span>
				<span> {totalTest} out of {passedTest} </span>
			</div>
			<div className="flex justify-between">
				<span className="font-semibold">Verdict:</span>
				<span className='text-xl text-green-800 dark:text-green-300'>{verdict}</span>
			</div>
			<div className="flex justify-between">
				<span className="font-semibold">Time:</span>
				<span>{time} Sec</span>
			</div>
			<div className="flex justify-between">
				<span className="font-semibold">Memory:</span>
				<span>{memory} MB</span>
			</div>
		</>
	)
}

export default ParseStatus
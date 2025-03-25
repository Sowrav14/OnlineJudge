'use client'
import { useEffect, useState } from "react"
import { formatDistanceToNow } from 'date-fns'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { getVerdictColor, getVerdictLabel } from "@/lib/utility_functions"

interface statusVerdict {
	verdict : string,
	time : number,
	memory : number,
	totalTest : number,
	passedTest : number
}

interface IncomingMessage {
	status : string | statusVerdict,
	isFinal : boolean,
	time : string,
}

interface Message {
	status : string
	time : string
}



const ParseStatus = ({sId} : {sId : string}) => {
	const [verdict, setVerdict] = useState<string>("Queued");
	const [totalTest, setTotalTest] = useState<number>(0);
	const [passedTest, setPassedTest] = useState<number>(0);
	const [time, setTime] = useState<number>(0);
	const [memory, setMemory] = useState<number>(0);
	const [messages, setMessages] = useState<Message[]>([]);
	const [connected, setConnected] = useState<boolean>(false);

	const sortedMessages = [...messages].sort((a, b) => 
		new Date(b.time).getTime() - new Date(a.time).getTime()
	)

	useEffect(() => {
		if(!sId) return;

		const wsUrl = `ws://localhost:8080/?id=${sId}`;
		console.log("connecting to socker ", wsUrl);
		const connectWebSocket = () => {
			try{
				const socket = new WebSocket(wsUrl);

				// connection opened
				socket.addEventListener('open', ()=> {
					setConnected(true);
				})

				// Incoming message
				socket.addEventListener('message', (event) => {
					try{
						const data : IncomingMessage = JSON.parse(event.data);
						
						if(data.isFinal){
							const finalVerdict : statusVerdict = data.status as statusVerdict;
							setVerdict(finalVerdict.verdict);
							setTime(finalVerdict.time);
							setTotalTest(finalVerdict.totalTest);
							setPassedTest(finalVerdict.passedTest);
							setMemory(finalVerdict.memory);

							const newMessage : Message = {
								status : finalVerdict.verdict,
								time : data.time
							}
							setMessages((messages)=>[...messages, newMessage]);
							// socket.close();
						} else{
							setVerdict(data.status as string);
							const newMessage : Message = {
								status : data.status as string,
								time : data.time
							}
							setMessages((messages)=>[...messages, newMessage]);
						}

					} catch (e) {
						alert('Error');
					}
				});

				socket.addEventListener('close', (event) => {
					setConnected(false);
				})

				socket.addEventListener('error', (error)=> {
					socket.close();
				})
			} catch (e) {
				alert('Error')
			}
		}
		connectWebSocket();

	}, [sId]);
	const [dots, setDots] = useState<number>(1);
	useEffect(() => {
		const dotsInterval = setInterval(() => {
			setDots((prev) => (prev === 3 ? 1 : prev + 1));
		}, 500);
		return () => clearInterval(dotsInterval);
	}, []);
	

	// fetch these variables via a socket connection...

	return(
		<>
			<div className="flex justify-between">
				<span className="font-semibold">Test Passed:</span>
				<span> {passedTest} out of {totalTest} </span>
			</div>
			<div className="flex justify-between">
				<span className="font-semibold flex"> Verdict
					{connected ? <p> {".".repeat(dots)} </p> : <p> : </p>} 
				</span>
				<HoverCard>
					<HoverCardTrigger asChild>
						<span className={`hover:underline text-xl ${getVerdictColor(verdict)}`}> {getVerdictLabel(verdict)} </span>
					</HoverCardTrigger>
					<HoverCardContent side="right" align="center" className="w-100" sideOffset={20}>
						<div className=" bg-white dark:bg-gray-900">
							<ul className="space-y-2 divide-y divide-gray-200 dark:divide-gray-700">
								{sortedMessages.map((verdict, index) => (
									<li key={index} className="flex justify-between p-2 border-b last:border-none text-gray-700 dark:text-gray-300">
										<span> {verdict.status} </span> 
										<span> {formatDistanceToNow(new Date(verdict.time), { addSuffix: true })} </span>
									</li>
								))}
							</ul>
						</div>
					</HoverCardContent>
				</HoverCard>
			</div>
			<div className="flex justify-between">
				<span className="font-semibold">Time:</span>
				<span>{time} ms</span>
			</div>
			<div className="flex justify-between">
				<span className="font-semibold">Memory:</span>
				<span>{memory} KB</span>
			</div>
		</>
	)
}

export default ParseStatus
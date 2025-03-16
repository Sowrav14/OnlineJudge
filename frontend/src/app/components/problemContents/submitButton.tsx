'use client'
import axios from 'axios'
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useCode } from "@/app/context/codeContext";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerTitle,
} from "@/components/ui/drawer"
import CodePreview from "./codePreview";
import CodeStatus from "./statusCard";
import { toast } from 'sonner'
import { ISubmission } from '@/lib/types'



export default function SubmitButton({problemId} : {problemId : string}) {
  	const [loading, setLoading] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { code, file, language } = useCode();
	const [userName, setUserName] = useState<string | null>(null);
	const [problemName, setProblemName] = useState<string | null>(null);
	const [submission, setSubmission] = useState<ISubmission | null>(null)

	const handleClick = async ()=> {
		setLoading(true);
		try{
			// Prepare the body
			const formData = new FormData();
			formData.append('code', code);
			formData.append('language', language);
			formData.append('problemId', problemId);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// send the code to database and get the submissionId
			const response = await axios.post('/api/submit', formData,{
				headers : {
					'Content-Type' : 'multipart/form-data'
				}
			})
			// get the submissionId
			if(response.data){
				const data = await response.data;
				const submission : ISubmission = data.submission;
				const username : string = data.userName;
				const problemname : string = data.problemName;
				if(data.success){
					setSubmission(submission);
					setUserName(username);
					setProblemName(problemname);
					setIsOpen(true);
					setLoading(false);
					// by this submission id put the code in queue..
					formData.append('submissionId', submission.submissionId);
					await axios.put('/api/submit', formData, {
						headers : {
							'Content-Type' : 'multipart/form-data'
						}
					}).then(()=>{
						toast.success("Submission Successful");
					}).catch(()=>{
						toast.error("Error submitting solution");
					})
				}
			}
		} catch (e) {
			toast.error("Submission Failed")
		} finally{
			setLoading(false);
		}
	}


  	return (
		<div>
			<Button
				className="dark:bg-[#2a67b1] dark:hover:bg-blue-700 bg-[#2a67b1] hover:bg-blue-700 px-6 py-2 font-bold rounded-lg" 
				onClick={handleClick}>
				{loading && <Loader2 className="animate-spin" />}
				Submit
			</Button>
			<Drawer open={isOpen && submission != null} onOpenChange={setIsOpen}>
				<DrawerContent>
					<div className="p-4 flex gap-4 w-full h-[80vh]">
						<div className=" w-1/3 h-full flex flex-col justify-center items-center">
							<DrawerTitle>
								<p className="text-2xl text-center"> {problemName} </p>
							</DrawerTitle>
							{submission != null && userName != null && <CodeStatus submission={submission} author={userName}/>}
							<DrawerClose asChild >
								<p className="text-center text-md"> Every great achievement begins with the courage to try. Keep coding, and let your solutions speak louder than words! </p>
							</DrawerClose>
						</div>
						<div className="w-2/3 h-full">
							<CodePreview code={code} language={language}/>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
  	)
}

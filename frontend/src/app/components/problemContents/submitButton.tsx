'use client'

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
import { ISubmissionDetails } from "@/lib/types";
import CodeStatus from "./statusCard";

const submissionData : Partial<ISubmissionDetails> = {
	submissionId: '12345',
	problemName: 'Having Been a Treasurer in the Past. I Help Goblins Deceive',
	author: 'John Doe',
	submittedAt: '2025-03-11 12:30:00',
	language: 'C++',
};


export default function SubmitButton() {
  	const [loading, setLoading] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { code, file, language } = useCode();

	const handleClick = ()=> {
		setLoading(true);
		// update in db
		// queue
		setTimeout(() => {
			console.log(code);
			console.log(file);
			console.log(language);
			setLoading(false);
			setIsOpen(true);
		}, 1000);
	}


  	return (
		<div>
			<Button
				className="dark:bg-[#2a67b1] dark:hover:bg-blue-700 bg-[#2a67b1] hover:bg-blue-700 px-6 py-2 font-bold rounded-lg" 
				onClick={handleClick}>
				{loading && <Loader2 className="animate-spin" />}
				Submit
			</Button>
			<Drawer open={isOpen} onOpenChange={setIsOpen}>
				<DrawerContent>
					<div className="p-4 flex gap-4 w-full h-[80vh]">
						<div className=" w-1/3 h-full flex flex-col justify-center items-center">
							<DrawerTitle>
								<p className="text-2xl text-center"> {submissionData.problemName} </p>
							</DrawerTitle>
							<CodeStatus sId={'1'}/>
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

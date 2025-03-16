
import CodeEditor from "@/app/components/problemContents/codeEditor";
import Constrains from "@/app/components/problemContents/constrains";
import SubmissionTable from "@/app/components/problemContents/historyCard";
import Input from "@/app/components/problemContents/input";
import Output from "@/app/components/problemContents/output";
import Sample from "@/app/components/problemContents/sample";
import Statement from "@/app/components/problemContents/statement";
import SubmitButton from "@/app/components/problemContents/submitButton";
import Title from "@/app/components/problemContents/title";
import Uploadcode from "@/app/components/problemContents/uploadCode";
import { Separator } from "@/components/ui/separator";
import { IProblem } from "@/lib/types";
import axios from "axios";
import { notFound } from "next/navigation";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import SubmissionStats from "@/app/components/problemContents/stats";


const Problem = async ({params} : {params : Promise<{problemId : string}>}) => {
	const { problemId } = await params;
	const id = problemId as string;
	let problem : IProblem;
	try{
		const res = await axios.get(`http://localhost:3000/api/problems/${id}`);
		problem = res.data.problem;
	} catch (error){
		console.log("error", error);
		return notFound();
	}
	
	return(
		<div className={`flex gap-2 p-2 w-full h-[87vh]`}>
			<div className={`flex-1 w-1/2 overflow-auto p-4`}>
				<Title problem={problem}/>
				<Statement problem={problem}/>
				<Input problem={problem}/>
				<Output problem={problem}/>
				<Constrains problem={problem}/>
				<Sample problem={problem}/>
				<SubmissionStats problemId={problem.id}/>
				<div className="flex justify-center items-center">
					<Sheet>
						<SheetTrigger asChild>
							<p className="hover:underline text-xl mt-8 mb-2 font-semibold"> Your Submission History </p>
						</SheetTrigger>
						<SheetContent side="left" className=" !max-w-fit bg-white dark:bg-gray-900 rounded-md shadow-md">
							<SheetHeader>
								<SheetTitle className="text-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
										Your Submission History
								</SheetTitle>
								<SheetDescription> </SheetDescription>
							</SheetHeader>
							<div className="overflow-y-auto max-h-[calc(100%-6rem)]">
								<SubmissionTable problemId={'1'}/>
							</div>
							<SheetFooter className="">
								<SheetClose asChild>
								</SheetClose>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</div>
			<Separator orientation="vertical"/>
			<div className={`flex flex-col gap-4 w-1/2 h-full  p-2`}>
				<div className={`w-full h-[68vh]`}>
					<CodeEditor/>
				</div>
				<Uploadcode/>
				<div className="flex w-full justify-center">
					<SubmitButton problemId={id}/>
				</div>
			</div>
		</div>
	)
}

export default Problem;
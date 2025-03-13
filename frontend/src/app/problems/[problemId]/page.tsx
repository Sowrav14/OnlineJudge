
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



const Problem = async ({params} : {params : Promise<{problemId : string}>}) => {
	const { problemId } = await params;
	const id = Number(problemId);
	return(
		<div className={`flex gap-2 p-2 w-full h-[87vh]`}>
			<div className={`flex-1 w-1/2 overflow-auto p-4`}>
				<Title id={id}/>
				<Statement id={id}/>
				<Input id={id}/>
				<Output id={id}/>
				<Constrains id={id}/>
				<Sample id={id}/>
				<SubmissionTable/>
			</div>
			<Separator orientation="vertical"/>
			<div className={`flex flex-col gap-4 w-1/2 h-full  p-2`}>
				<div className={`w-full h-[68vh]`}>
					<CodeEditor/>
				</div>
				<Uploadcode/>
				<div className="flex w-full justify-center">
					<SubmitButton/>
				</div>
			</div>
		</div>
	)
}

export default Problem;
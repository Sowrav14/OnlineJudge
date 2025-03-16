import { IProblem } from "@/lib/types";



const Output = ({problem}:{problem:IProblem}) => {
	
	return(
		<div>
			<p className="text-xl mt-8 mb-2 font-semibold"> Output : </p>
			<p> {problem.output} </p>
		</div>
	)
}

export default Output;
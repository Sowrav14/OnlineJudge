import { IProblem } from "@/lib/types";


const Input = ({problem}:{problem:IProblem}) => {
	
	return(
		<div>
			<p className="text-xl mt-8 mb-2 font-semibold"> Input : </p>
			<p> {problem.input} </p>
		</div>
	)
}

export default Input;
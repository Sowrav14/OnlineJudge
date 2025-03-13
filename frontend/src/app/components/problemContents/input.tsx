import { Problems } from "@/lib/problems";
import { notFound } from "next/navigation";


const Input = ({id}:{id:number}) => {
	const problem = Problems.find((p) => p.id === id);
		if(!problem) return notFound();
	
	return(
		<div>
			<p className="text-xl mt-8 mb-2 font-semibold"> Input : </p>
			<p> {problem.input} </p>
		</div>
	)
}

export default Input;
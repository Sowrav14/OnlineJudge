import { Problems } from "@/lib/problems";
import { notFound } from "next/navigation";


const Output = ({id}:{id:number}) => {
	const problem = Problems.find((p) => p.id === id);
		if(!problem) return notFound();
	
	return(
		<div>
			<p className="text-xl mt-8 mb-2 font-semibold"> Output : </p>
			<p> {problem.output} </p>
		</div>
	)
}

export default Output;
import { Problems } from "@/lib/problems";
import { notFound } from "next/navigation";



const Title = ({id}:{id:number}) => {
	const problem = Problems.find((p) => p.id === id);
	if(!problem) return notFound();

	return(
		<div className="flex flex-col text-center w-full">
			<p className="text-3xl font-bold"> {problem.title} </p>
			<p className="text-xl"> Author : {problem.author} </p>
			<p> Tag : {problem.tag} </p>
			<p> Time Limit : {problem.time}s </p>
			<p> Memory Limit : {problem.memory}MB </p>
		</div>
	)
}

export default Title;
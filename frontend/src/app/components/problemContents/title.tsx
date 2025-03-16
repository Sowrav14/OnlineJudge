import { Problems } from "@/lib/problems";
import { IProblem } from "@/lib/types";
import { notFound } from "next/navigation";



const Title = ({problem}:{problem:IProblem}) => {

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
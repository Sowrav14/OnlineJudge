
import axios from "axios";
import ProblemCard from "../components/problemCard";
import { IProblem } from "@/lib/types";
import { Getproblems } from "@/lib/actions/getproblems";

const Problems = async () => {
	const problems : IProblem[] = (await Getproblems()).problems || [];
	// console.log(problems);

	return(
		<div className="flex flex-col p-12 w-full m-auto items-center justify-center align-middle text-center">
			<p className="text-4xl font-bold"> PROBLEMS </p>
			<br/>
			{problems.map((problem, index) => (
        		<ProblemCard key={index} problem={problem} />
      		))}
		</div>
	)
}

export default Problems;
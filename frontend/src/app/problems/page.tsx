
import axios from "axios";
import ProblemCard from "../components/problemCard";
import { IProblem } from "@/lib/types";

const Problems = async () => {
	const res = await axios.get('http://localhost:3000/api/problems');
	const problems : IProblem[] = await res.data.problems;
	// console.log(data);

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
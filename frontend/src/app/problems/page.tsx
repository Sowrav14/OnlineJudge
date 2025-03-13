
import ProblemCard from "../components/problemCard";

const Problems = () => {

	// const res = await axios.get('http://localhost:3000/api/submit');
	// const data = res.data;
	return(
		<div className="flex flex-col p-12 w-full m-auto items-center justify-center align-middle text-center">
			<p className="text-4xl font-bold"> PROBLEMS </p>
			<br/>
			{Array.from({ length: 10 }).map((_, index) => (
        		<ProblemCard key={index} index={index} />
      		))}
		</div>
	)
}

export default Problems;
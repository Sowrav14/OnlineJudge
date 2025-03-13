import { Problems } from "@/lib/problems";
import { notFound } from "next/navigation";

const Parserhtml = ({ content } : {content : string}) => {
  // Replace newlines with <br />
  const formattedStatement = content.replace(/\n/g, "<br/>");
  return (
    <div
      dangerouslySetInnerHTML={{ __html: formattedStatement }}
    />
  );
};

const Constrains = ({id}:{id:number}) => {
	const problem = Problems.find((p) => p.id === id);
		if(!problem) return notFound();
	
	return(
		<div>
			<p className="text-xl mt-8 mb-2 font-semibold"> Constrains : </p>
			<Parserhtml content={problem.constrains}/>
		</div>
	)
}

export default Constrains;
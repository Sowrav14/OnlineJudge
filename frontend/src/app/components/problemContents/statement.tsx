import { Problems } from "@/lib/problems";
import { IProblem } from "@/lib/types";
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

const Statement = ({problem}:{problem:IProblem}) => {
	
	return(
		<div>
			<p className="text-xl mt-8 mb-2 font-semibold"> Statement : </p>
			<Parserhtml content={problem.statement}/>
		</div>
	)
}

export default Statement;
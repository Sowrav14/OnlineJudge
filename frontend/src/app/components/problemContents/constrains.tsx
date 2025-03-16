import { IProblem } from "@/lib/types";

const Parserhtml = ({ content } : {content : string}) => {
  // Replace newlines with <br />
  const formattedStatement = content.replace(/\n/g, "<br/>");
  return (
    <div
      dangerouslySetInnerHTML={{ __html: formattedStatement }}
    />
  );
};

const Constrains = ({problem}:{problem:IProblem}) => {
	
	return(
		<div>
			<p className="text-xl mt-8 mb-2 font-semibold"> Constrains : </p>
			<Parserhtml content={problem.constrains}/>
		</div>
	)
}

export default Constrains;
'use client'
import { Problems } from "@/lib/problems";
import React, { useState } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const Parserhtml = ({ content } : {content : string}) => {
  // Replace newlines with <br />
  const formattedStatement = content.replace(/\n/g, "<br/>");
  return (
    <div
      dangerouslySetInnerHTML={{ __html: formattedStatement }}
    />
  );
};


const Sample = ({id}:{id:number}) => {
	const problem = Problems.find((p) => p.id === id);
	if(!problem) return notFound();
	
	const input = problem.sampleInput;
  const output = problem.sampleOutput;
  const [copied, setCopied] = useState({ input: false, output: false });

  const handleCopy = (text: string, type: "input" | "output") => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 1000);
  };

  return (
		<div>
			<p className="text-xl mt-8 mb-2 font-semibold"> Sample Test Case : </p>
			<div className="flex gap-4 mb-2 max-w-2xl mx-auto">
				{/* Sample Input */}
				<div className="border w-1/2 p-4 rounded bg-gray-100 dark:bg-gray-900 relative">
					<div className="flex justify-between mb-2">
						<h3 className="font-semibold">Sample Input</h3>
						<button onClick={() => handleCopy(input, "input")}>
							{copied.input ? <ClipboardCheck size={18} /> : <Clipboard size={18} />}
						</button>
					</div>
					<Parserhtml content={input}/>
				</div>

				{/* Sample Output */}
				<div className="border w-1/2 p-4 rounded bg-gray-100 dark:bg-gray-900 relative">
					<div className="flex justify-between mb-2">
						<h3 className="font-semibold"> Sample Output </h3>
						<button onClick={() => handleCopy(output, "output")}>
							{copied.output ? <ClipboardCheck size={18} /> : <Clipboard size={18} />}
						</button>
					</div>
					<Parserhtml content={output}/>
				</div>
			</div>
		</div>
  );
}

export default Sample;
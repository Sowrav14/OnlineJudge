'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Uploadtxt from "./uploadtxt";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { writeIO } from "@/lib/actions/submitProblem";

interface IOFormProps {
  onAdd: () => void;
  onSubmit: () => void;
	cnt : number;
	id : string;
}

export interface IOPair {
  input: string;
  expectedOutput: string;
}

export function IOForm({ onAdd, onSubmit, cnt, id }: IOFormProps) {
  const [input, setInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
	const [loading, setLoading] = useState<boolean>(false);

	const handleInputChange = (inputvalue : string) => {
		setInput(inputvalue);
	}
	const handleOutputChange = (outputvalue : string) => {
		setExpectedOutput(outputvalue);
	}

  const handleAdd = async () => {
		setLoading(true);
		try{
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// write the input and output to the file
			const write = await writeIO(id, input, expectedOutput, cnt);
			if(write.success){
				setInput("");
				setExpectedOutput("");
				onAdd();
				toast.success("Added Successfully");
			} else {
				toast.error("Add Failed");
			}
		} catch (e) {
			toast.error("Add Failed");
		} finally{
			setLoading(false);
		}
		
  };

  return (
		<div>
			<div className="w-full flex gap-8 space-y-4">
				<div className="w-1/2 flex flex-col gap-4">
					<Textarea
						className="h-80"
						placeholder="Input"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<Uploadtxt handleChange={handleInputChange}/>
				</div>
				<div className="w-1/2 flex flex-col gap-4">
					<Textarea
						className="h-80"
						placeholder="Expected Output"
						value={expectedOutput}
						onChange={(e) => setExpectedOutput(e.target.value)}
					/>
					<Uploadtxt handleChange={handleOutputChange}/>
				</div>
			</div>
			<br/>
			<div className="flex justify-center gap-4 space-x-2">
				<Button onClick={handleAdd}>
					Add
					{loading && <Loader2 className="animate-spin" />}
				</Button>
				<Button onClick={() => onSubmit()}> Done </Button>
			</div>
		</div>
  );
}
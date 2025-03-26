"use client";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { IProblem } from "@/lib/types";
import { toast } from "sonner";
import { submitProblem, writeConstrains } from "@/lib/actions/submitProblem";

interface InputFormProps {
  onProceed: (id: string) => void;
	isDisable : boolean;
}


export function InputForm({ onProceed, isDisable }: InputFormProps) {
	const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<Omit<IProblem, "id">>({
    defaultValues: {
      title: "",
      author: "",
      tag: "",
      statement: "",
      input: "",
      output: "",
      constrains: "",
      sampleInput: "",
      sampleOutput: "",
      time: 1,
      memory: 128,
    },
  });

  const onSubmit: SubmitHandler<Omit<IProblem, "id">> = async (values) => {
    setLoading(true);
		try{
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// save the problem to database and get the id (problemId)
			const res = await submitProblem(values);
			if(res.success && res.id){
				const id = res.id;
				const write = await writeConstrains(id, values.memory.toString(), values.time.toString());
				if(write.success){
					onProceed(id);
					toast.success("Success");
				} else {
					toast.error("Submission Failed");
				}
			} else {
				toast.error("Submission Failed");
			}
		} catch (e) {
			toast.error("Submission Failed")
		} finally{
			setLoading(false);
		}
  };

  return (
  <div className="w-full items-center p-12 gap-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="flex flex-col text-center text-xl">
					<h1> Please fill all the fields </h1>
				</div>
					
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xl">Title</FormLabel>
							<FormControl>
								<Input disabled={isDisable} required className="h-12 w-full" placeholder="Problem title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="author"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xl"> Author </FormLabel>
							<FormControl>
								<Input required disabled={isDisable} className="h-12 w-full" placeholder="Your name here" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tag"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xl">Tag</FormLabel>
							<FormControl>
								<Input required disabled={isDisable} className="h-12 w-full" placeholder="Problem tag ex. binary search" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="time"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xl"> Time(s) </FormLabel>
							<FormControl>
								<Input required disabled={isDisable} className="h-12 w-full" type="number" placeholder="Time Limit in Seconds" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="memory"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xl">Memory(MB)</FormLabel>
							<FormControl>
								<Input required disabled={isDisable} className="h-12 w-full" type="number" placeholder="Memory Limit in Mega Byte(MB)" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="statement"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xl"> Statement </FormLabel>
							<FormControl>
								<Textarea required disabled={isDisable} className="w-full h-42" placeholder="Describe your problem here." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="input"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xl"> Input </FormLabel>
							<FormControl>
								<Textarea required disabled={isDisable} className="w-full h-28"  placeholder="explain input format." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="output"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xl"> Output </FormLabel>
							<FormControl>
								<Textarea required disabled={isDisable} className="w-full h-28"  placeholder="explain output format." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="constrains"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xl"> Constains </FormLabel>
							<FormControl>
								<Textarea required disabled={isDisable} className="w-full h-28"  placeholder="explain constrains here." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="sampleInput"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xl"> Sample Input </FormLabel>
							<FormControl>
								<Textarea required disabled={isDisable} className="w-full h-36"  placeholder="Sample Input for your problem." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="sampleOutput"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xl"> Sample Output </FormLabel>
							<FormControl>
								<Textarea required disabled={isDisable} className="w-full h-36"  placeholder="Sample output against the sample input." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<br/>
				<div className="flex flex-col items-center">
					<Button
						disabled={isDisable}
						type="submit">
						Proceed
						{loading && <Loader2 className="animate-spin" />} 
					</Button>
				</div>
      </form>
    </Form>
  </div>
  );
}


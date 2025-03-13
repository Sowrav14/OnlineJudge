export  type IProblem = {
	id : number,
	title : string,
	author : string,
	tag : string,
	statement : string,
	input : string,
	output : string,
	constrains : string,
	sampleInput : string,
	sampleOutput:string,
	time:number,
	memory:number
}

export type ISubmissionDetails = {
    submissionId: string;
	userId:string;
	problemId:string;
    author: string;
    problemName: string;
    submittedAt: string;
    language: string;
    verdict: string;
	totalTest : number;
	passedTest : number;
    time: number;
    memory: number;
}
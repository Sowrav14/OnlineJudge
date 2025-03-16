export  type IProblem = {
	id : string,
	title : string,
	author : string,
	tag : string,
	statement : string,
	input : string,
	output : string,
	constrains : string,
	sampleInput : string,
	sampleOutput: string,
	time: number,
	memory: number
}

export type ISubmission = {
    submissionId: string;
	userId:string;
	problemId:string;
    submittedAt: Date;
	code : string;
    language: string;
    verdict: string;
	totalTest : number;
	passedTest : number;
    time: number;
    memory: number;
}

export type IUser = {
	id : string,
	name : string,
	email : string,
	password : string,
}
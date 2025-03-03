export type VoicedAnswer = {    
    question:VoicedQuestion,
    content:string,
};

export type IACorrection = {
    resumeAnswer:string,
    verdict: string , 
    correction:string,
}

export type VoicedQuestion = {
    id?:string,
    content: string,
}
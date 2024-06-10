/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */

export enum QuestionType {
    TEXTBOX = 1,
    MULTIPLE_CHOICE,
    SINGLE_CHOICE
}

export interface QuestionOption{
    readonly text: string;
    readonly isSelected: boolean;
}



//these interface is probably invalid and/or unnecessary 
export interface QuestionTextbox { 
    readonly isVisible: boolean;
    readonly initialValue: string;
    readonly value: string;
}

//these interface is probably invalid and/or unnecessary
export interface Question {
    readonly type: QuestionType,
    readonly text: string;
}

//these interface is probably invalid and/or unnecessary
export interface Answer {
    readonly question_name: string;       //should I use camelCase to keep JS conventions, or snake_case for Python backend?
    // readonly value: QuestionTextbox | QuestionOption[];
    readonly answer: string | string[];
}



export interface User {
    name: string
}
export interface PollAnswer {
    readonly answers: Answer[];
    readonly user_about: User;
    readonly user_filling: User;
}

export interface QuestionMap {
    readonly [key: string]: Question;
}

export interface Poll {
    readonly title: string;
    readonly description: string;
    readonly questions: QuestionMap;
}

export interface Student {
    name: string;
}
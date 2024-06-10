export enum QuestionType {
    TEXTBOX = 1,
    MULTIPLE_CHOICE,
    SINGLE_CHOICE
}

export interface QuestionOption{
    readonly text: string;
    readonly isSelected: boolean;
}


export interface QuestionTextbox { 
    readonly isVisible: boolean;
    readonly initialValue: string;
    readonly value: string;
}

export interface Question {
    readonly type: QuestionType,
    readonly text: string;
}

export interface Answer {
    readonly questionName: string;       //should I use camelCase to keep JS conventions, or snake_case for Python backend?
    readonly value: QuestionTextbox | QuestionOption[];
}

export interface User {
    readonly name: string
}

export interface FilledPoll {
    readonly answers: Answer[];
    readonly userAbout: string;
    readonly userFilling: string;
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
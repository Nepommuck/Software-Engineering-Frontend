export type PollResults = SinglePersonPollResults[]

export interface SinglePersonPollResults {
  readonly personName: string,
  readonly questions: SingleQuestionPollResults[],
}

export interface SingleQuestionPollResults {
  readonly question: string,
  readonly answers: {
    readonly respondentName: string,
    readonly answer: string,
  }[]
}

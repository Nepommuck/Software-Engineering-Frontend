export type PollId = number
export type PollFieldId = number

export interface PollField {
  readonly id: PollFieldId
  readonly question: string
}

export interface Poll {
  readonly name: string
  readonly fields: readonly PollField[]
}

export type SavedPoll = Poll & {
  readonly id: number
}

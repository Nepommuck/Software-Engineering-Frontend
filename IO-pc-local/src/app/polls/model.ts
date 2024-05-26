export type FormId = number
export type FormFieldId = number

export interface FormField {
  readonly id: FormFieldId
  readonly question: string
}

export interface FormType {
  readonly name: string
  readonly fields: FormField[]
}

export type SavedFormType = FormType & {
  readonly id: number
}

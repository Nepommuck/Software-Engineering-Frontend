export type FormFieldId = number

export interface FormField {
  readonly id: FormFieldId
  readonly question: string
}

export type FormType = FormField[]

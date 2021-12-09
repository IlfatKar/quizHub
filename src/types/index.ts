export enum answerType {
  text = 'TEXT',
  radio = 'RADIO',
  checkbox = "CHECKBOX",
}

export interface IAnswer {
  i: number,
  value: string
}

export interface IQuestion {
  title: string,
  type: answerType,
  answers: IAnswer[],
  correct: string | number
}

export interface IQuiz {
  id?: string,
  questions: IQuestion[],
  title: string,
  description?: string,
  rating?: number
}

export enum asyncStage {
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected'
}
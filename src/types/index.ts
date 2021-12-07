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
  questions: IQuestion[],
  title: string,
  rating?: number
}
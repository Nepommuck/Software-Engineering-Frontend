import {Injectable} from '@angular/core';
import {PollResults} from "./model";

@Injectable({
  providedIn: 'root'
})
export class PollResultsService {
  get pollResults(): Promise<PollResults> {
    // TODO SCRUM-68 Replace this mock implementation with the one based on REST API call
    return Promise.resolve(mockPollResults)
  }
}

const mockPollResults: PollResults = [
  {
    personName: "Maciej",
    questions: [
      {
        question: "Czy jest okej?",
        answers: [
          {
            respondentName: "Igor",
            answer:
              "Jeszcze jak!",
          },
          {
            respondentName: "Konrad",
            answer:
              "No nie bardzo",
          },
        ],
      },
      {
        question: "Czy lubi dżem?",
        answers: [
          {
            respondentName: "Igor",
            answer:
              "Ciężko stwierdzić",
          },
          {
            respondentName: "Konrad",
            answer:
              "Na pewno tak!",
          },
        ],
      },
    ],
  },
  {
    personName: "Igor",
    questions: [
      {
        question: "Czy jest okej?",
        answers: [
          {
            respondentName: "Konrad",
            answer:
              "Konrad fajny jest",
          },
          {
            respondentName: "Maciej",
            answer:
              "Konrad dziwny jest",
          },
        ],
      },
      {
        question: "Czy lubi dżem?",
        answers: [
          {
            respondentName: "Konrad",
            answer:
              "Dżem dżem dżem",
          },
          {
            respondentName: "Maciej",
            answer:
              "Dżem",
          },
        ],
      },
    ],
  },
  {
    personName: "Konrad",
    questions: [
      {
        question: "Czy jest okej?",
        answers: [
          {
            respondentName: "Igor",
            answer:
              "Zemsta zemsta zemsta na wroga",
          },
          {
            respondentName: "Maciej",
            answer:
              "Z Bogiem lub choćby mimo Boga",
          },
        ],
      },
      {
        question: "Czy lubi dżem?",
        answers: [
          {
            respondentName: "Igor",
            answer:
              "Konrad lubi dżem.",
          },
          {
            respondentName: "Maciej",
            answer:
              "Konrad kocha dżem.",
          },
        ],
      },
    ],
  },
]

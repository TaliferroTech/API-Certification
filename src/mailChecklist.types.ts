import * as sendGrid from "@sendgrid/mail";

export type EmailData<T> = sendGrid.MailDataRequired & T;

export type AssessmentData = {
  first_name: string;
  last_name: string;
  company_name: string;
  score: number;
  email: string;
  message: string;
};

export type ChecklistItem = {
  question: string;
  points: number;
  weight: number;
  id: string;
};

export type ChecklistSubmission = {
  [K in ChecklistItem["id"]]: "on";
};

export type ChecklistResults = {
  score: number;
  points: number;
  maxPoints: number;
  message: string;
};

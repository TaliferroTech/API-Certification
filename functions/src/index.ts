import {config} from "dotenv";
config();
import {onCall, onRequest, CallableOptions} from "firebase-functions/v2/https";
import {sendAssessmentEmail} from "./email";
import {getChecklist, getSubmissionResults} from "./checklist";

const callableOptions: CallableOptions = {
  cors: [
    /(http:\/\/)?(localhost|127\.0\.0\.1):\d{4}/,
    /(http:\/\/|https:\/\/)?api-certification\.web\.app/,
    /(http:\/\/|https:\/\/)?api-certification\.firebaseapp\.com/,
    /(http:\/\/|https:\/\/)?api-certification\.taliferro\.com/,
  ],
};

export const checklist = onRequest({cors: true}, getChecklist);

export const calculateScore = onCall(callableOptions, getSubmissionResults);

export const emailResults = onCall(callableOptions, sendAssessmentEmail);

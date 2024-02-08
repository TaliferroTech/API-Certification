/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
import {logger} from "firebase-functions/v2";
import {
  CallableRequest,
  // CallableRequest,
  HttpsError,
  Request,
} from "firebase-functions/v2/https";
import * as checklistData from "./repo/checklist.json";
import {hasProperty} from "./helpers";
import {Response} from "express";
import {
  ChecklistItem,
  ChecklistResults,
  // ChecklistSubmission,
} from "./types/types";

export function getChecklist(_req: Request, res: Response<ChecklistItem[]>) {
  res.status(200).json(checklistData);
}

export function getSubmissionResults(req: CallableRequest) {
  logger.log(req.data);
  if (!hasProperty(req.data, "submission")) {
    throw new HttpsError(
      "failed-precondition",
      "A submission property must be provided " + "in the form of json",
    );
  }
  const checklist: ChecklistItem[] = checklistData;

  logger.log("evaluating results...");
  const results: ChecklistResults = {
    points: 0,
    maxPoints: 0,
    score: 0,
    message: "",
  };
  const submission = req.data.submission;
  for (const {id, points, weight} of checklist) {
    if (submission[id]) {
      results.points += points * weight;
    }
    results.maxPoints += points * weight;
  }

  results.score = Math.round((results.points / results.maxPoints) * 100);

  results.message = getScoreMessage(results.score);

  logger.log("sending results to client...");
  return results;
}

function getScoreMessage(score: number): string {
  let message = "";

  if (score <= 60) {
    message =
      '<br><br>Your API security score is in the low range, indicating potential vulnerabilities in your current setup. It\'s crucial to address these issues promptly to safeguard your API from security threats. We strongly recommend reaching out to <a href="https://taliferro.com/" style="color: blue" target="_blank">Taliferro Group</a> for professional support. Their expertise can help you identify and mitigate risks, ensuring a robust and secure API environment. Take proactive steps to improve your API security today by contacting Taliferro Group. Your data\'s safety is paramount, and expert assistance can make a significant difference.';
  } else if (score > 60 && score <= 89) {
    message =
      '<br><br>Your API security score falls within the moderate range. While you\'ve implemented some security measures, there is room for improvement. Consider reviewing the items that were left unchecked and take steps to enhance those aspects of your API security. If you need expert guidance or wish to elevate your API security to a higher level, we recommend contacting <a href="https://taliferro.com/" style="color: blue" target="_blank">Taliferro Group</a>. Their professional support can assist you in implementing best practices and fortifying your API against potential threats. Take action today to strengthen your API security protocols.';
  } else if (score > 90) {
    message =
      '<br><br>Congratulations! Your API security score falls within the high range, reflecting a robust and well-protected API infrastructure. You have demonstrated a strong commitment to security best practices. However, continuous improvement is key. Consider periodic assessments and stay updated on evolving security standards to ensure your API remains resilient. If you have any questions or need further assistance, feel free to reach out to <a href="https://taliferro.com/" style="color: blue" target="_blank">Taliferro Group</a> Keep up the excellent work!';
  }

  return message;
}

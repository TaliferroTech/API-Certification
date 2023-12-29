import { onCall, onRequest, HttpsError } from "firebase-functions/v2/https";
import { logger } from "firebase-functions/v2";
import * as checklist from "./repo/checklist.json";

export const apiChecklist = onRequest({ cors: true }, (_req, res) => {
  res.status(200).json(checklist);
});

export const calculateScore = onCall(
  {
    cors: [
      /(http:\/\/)?(localhost|127\.0\.0\.1):\d{d}/,
      /(http:\/\/|https:\/\/)?api-certification\.web\.app/,
      /(http:\/\/|https:\/\/)?api-certification\.firebaseapp\.app/,
      /(http:\/\/|https:\/\/)?api-certification\.taliferro\.app/,
    ],
  },
  (request) => {
    if (request.data.answers == null) {
      return new HttpsError(
        "failed-precondition",
        "A checklist property must be provided " + "in the form of json",
      );
    }

    const answers = request.data.answers;
    logger.log("evaluating results...");
    const results = {
      score: 0,
      points: 0,
      maxPoints: 0,
    };

    for (const [_, entry] of checklist.entries()) {
      const entryId = entry.id;
      if (answers[entryId]) {
        results.points += entry.points * entry.weight;
      }
      results.maxPoints += entry.points * entry.weight;
    }

    results.score = Math.round((results.points / results.maxPoints) * 100);
    logger.log("sending results to client...", results);
    return results;
  },
);

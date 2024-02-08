/* eslint-disable require-jsdoc */
import * as sendGrid from "@sendgrid/mail";
import {logger} from "firebase-functions/v2";
import {CallableRequest, HttpsError} from "firebase-functions/v2/https";
import {AssessmentData, EmailData} from "./types/types";

sendGrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendAssessmentEmail(
  req: CallableRequest<EmailData<AssessmentData>>,
) {
  let status = 200;
  try {
    const data = req.data;
    const message = {
      from: {
        email: process.env.SENDGRID_SENDER_EMAIL as string,
        name: "Taliferro Group",
      },
      personalizations: [
        {
          to: [
            {
              email: data.email,
              name: `${data.first_name ?? ""} ${data.last_name ?? ""}`,
            },
          ],
        },
      ],
      subject: data.subject,
      dynamicTemplateData: {
        full_name: {
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
        },
        company_name: data.company_name ?? "",
        message: [data.message ?? ""],
        score: data.score,
      },
      templateId: process.env.SENDGRID_DYNAMIC_TEMPLATE_API_CHECKLIST as string,
    };

    const [resp] = await sendGrid.send(message);
    status = resp.statusCode;
    if (resp.statusCode >= 400) {
      throw new HttpsError("internal", "Failed to send email to " + data.email);
    }
  } catch (error) {
    logger.error(error);
  }

  return {
    message: "success",
    status,
  };
}

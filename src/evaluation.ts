import {functions} from "./firebaseConfig";
import {HttpsCallableResult, httpsCallable} from "firebase/functions";
import {getCookie, getOutboundLinks, setCookie} from "./helpers";
import {AssessmentData, ChecklistSubmission} from "./mailChecklist.types";

const gtag = window.gtag;
const evaluateApiBtn = document.getElementById(
  "evaluate_api",
) as HTMLButtonElement;
const submitBtn = document.getElementById("process") as HTMLButtonElement;
const form = document.getElementById("wrapped") as HTMLFormElement;
const aside = document.getElementById("evaluate") as HTMLElement;
const forwardBtn = document.getElementById("forward") as HTMLButtonElement;
const backBtn = document.getElementById("back") as HTMLButtonElement;

document.addEventListener("DOMContentLoaded", () => {
  setCookie("questionnaire_click_progress", 0);
  const evaluate = httpsCallable(functions, "calculateScore");
  const sendEmail = httpsCallable(functions, "emailResults");

  evaluateApiBtn.addEventListener("click", (event) => {
    gtag("event", "start_questionnaire", {
      event_category: event.type,
      event_label: evaluateApiBtn.innerText,
    });
  });

  submitBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(form as HTMLFormElement);
      const submission: ChecklistSubmission = {} as ChecklistSubmission;
      for (const [key, value] of formData.entries()) {
        if (key.toLowerCase().includes("question")) {
          submission[key] = value as "on";
        }
      }
      const results = await evaluate({submission: submission});
      const data = results.data as AssessmentData;
      const resp = (await sendEmail({
        email: formData.get("email") as string,
        score: data.score,
        company_name: formData.get("company_name") as string,
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        message: data.message,
        subject: "Your API Security Results",
      })) as HttpsCallableResult<{message: string}>;
      console.log("response (email):", resp);
      if (resp.data.message == "success") {
        document
          .getElementById("main_container")!
          .classList.remove("show_container");
        document
          .getElementsByClassName("layer")[0]!
          .classList.remove("layer-is-visible");
        document.querySelectorAll(".main_nav").forEach(function (navEl) {
          // Get all <a> elements with class "active" under the current ".main_nav" element
          var activeLinks = navEl.querySelectorAll(".nav-tabs li a.active");

          // Loop through each active link and remove the "active" class
          activeLinks.forEach(function (activeLink) {
            activeLink.classList.remove("active");
          });
        });
      }
    } catch (error) {
      console.log("error:", error);
    }
  });

  // Add an event listener to the "Next" button
  forwardBtn.addEventListener("click", function (event) {
    // Increment the counter in a cookie
    let forwardClicks = parseInt(getCookie("questionnaire_click_progress"));
    forwardClicks++;
    if (forwardClicks == 1) {
      aside.style.display = "none";
    }

    // Send event to Google Analytics
    gtag("event", "questionnaire_click_progress", {
      event_category: event.type,
      event_label: "questionnaire_click_progress",
      value: forwardClicks,
    });
  });

  backBtn.addEventListener("click", (event) => {
    let forwardClicks = parseInt(getCookie("questionnaire_click_progress"));
    forwardClicks--;
    gtag("event", "questionnaire_click_progress", {
      event_category: event.type,
      event_label: "questionnaire_click_progress",
      value: forwardClicks,
    });
  });

  const links = document.getElementsByTagName("a");

  const outboundLinks = getOutboundLinks(links);
  for (const link of outboundLinks) {
    link.rel = "noopener noreferrer";
    link.addEventListener("click", (event) => {
      event.preventDefault();
      gtag("event", "anchor_click", {
        event_category: event.type,
        event_label: link.innerText,
        value: link.href,
      });
      setTimeout(() => {
        window.location.href = link.href; // Navigate to the link after a short delay
      }, 100);
    });
  }
});

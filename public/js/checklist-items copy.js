var submitButton = document.getElementById("process");

//function calculateScore(quizQuestions, numberOfPoints){

/* // gather answers from our quiz
	var answers = quizQuestions.querySelectorAll('.points');
	
	// keep track of user's answers
	var userAnswer = '';
	var totalPoints = 0;
	
	// for each question...
	for(var i=0; i<quizQuestions.length; i++){

		// find selected answer
		userAnswer = (quizQuestions[i].querySelector('input[name=question_'+i+']:checked')||{}).value;
		
		// if answer is correct
		if(document.getElementsByClassName("icheck").checked){
			// add to the total number of points
			totalPoints = 96 / 48 * quizQuestions[i].points;
			
		}
		else{
			// do nothing if unchecked
		}
	}

	// show score
	submitButton.onclick = 
	//	document.getElementById(wizard_container).innerHTML = 'Your score is:;
	console.log("It's me."); */

//}

document.getElementById("process").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  calculateScore();
});

function calculateScore() {
  // Get all checkboxes in the form
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  // Count the number of checked checkboxes and calculate the score
  const score = ((checkboxes.length * 2) / 96) * 100;

  // Display the score in the DOM

  const scoreDisplay = document.getElementById("wizard_container");
  scoreDisplay.textContent = "Your API Security Score Is: " + Math.trunc(score);

  scoreDisplay.style.padding = "20px";

  if (score <= 60) {
    var taliferroGroup =
      "<a href='https://taliferro.com/' target='_blank'>Taliferro Group</a>";
    const scoreExplanation = document.getElementById("scoreExplanation");
    scoreDisplay.innerHTML +=
      "<br><br>Your API security score is in the low range, indicating potential vulnerabilities in your current setup. It's crucial to address these issues promptly to safeguard your API from security threats. We strongly recommend reaching out to " +
      taliferroGroup +
      " for professional support. Their expertise can help you identify and mitigate risks, ensuring a robust and secure API environment. Take proactive steps to improve your API security today by contacting Taliferro Group. Your data's safety is paramount, and expert assistance can make a significant difference.";
  } else if (score > 60 && score <= 89) {
    var taliferroGroup =
      "<a href='https://taliferro.com/' target='_blank'>Taliferro Group</a>.";
    const scoreExplanation = document.getElementById("scoreExplanation");
    scoreDisplay.innerHTML +=
      "<br><br>Your API security score falls within the moderate range. While you've implemented some security measures, there is room for improvement. Consider reviewing the items that were left unchecked and take steps to enhance those aspects of your API security. If you need expert guidance or wish to elevate your API security to a higher level, we recommend contacting " +
      taliferroGroup +
      "Their professional support can assist you in implementing best practices and fortifying your API against potential threats. Take action today to strengthen your API security protocols.";
  } else if (score > 90) {
    var taliferroGroup =
      "<a href='https://taliferro.com/' target='_blank'>Taliferro Group</a>.";
    const scoreExplanation = document.getElementById("scoreExplanation");
    scoreDisplay.innerHTML +=
      "<br><br>Congratulations! Your API security score falls within the high range, reflecting a robust and well-protected API infrastructure. You have demonstrated a strong commitment to security best practices. However, continuous improvement is key. Consider periodic assessments and stay updated on evolving security standards to ensure your API remains resilient. If you have any questions or need further assistance, feel free to reach out to " +
      taliferroGroup +
      " Keep up the excellent work!";
  } else {
    //do nothing
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Get references to the form and aside elements
  const form = document.getElementById("wrapped");
  const aside = document.getElementById("evaluate");

  // Add an event listener to the "Next" button
  document.getElementById("forward").addEventListener("click", function () {
    // Hide the aside element
    aside.style.display = "none";
  });
});

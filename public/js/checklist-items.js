var submitButton = document.getElementById('process');

var checklistItems = [
	{
		question: "Check certificate revocation on every call.",
		points: 2,
		id: 1
	},
	{
		question: "A trusted PKI issues certificates.",
		points: 2,
		id: 2
	},
	{
		question: "No export-grade encryption algorithms.",
		points: 2,
		id: 3
	},
	{
		question: "All communications to the network's edge are secured using the most recent version of TLS with perfect forward secrecy and a modern cipher set.",
		points: 2,
		id: 4
	},
	{
		question: "Authentication should include a set of claims.",
		points: 2,
		id: 5
	},
	{
		question: "Use the API Gateway to validate the Bearer token",
		points: 2,
		id: 6
	},
	{
		question: "Ensure the API Gateway does not cache.",
		points: 2,
		id: 7
	},
	{
		question: "No export-grade encryption algorithms.",
		points: 2,
		id: 8
	},
	{
		question: "Authorization results are not cached.",
		points: 2,
		id: 9
	},
	{
		question: "If OAuth, users can revoke tokens without administrator assistance.",
		points: 2,
		id: 10
	},
	{
		question: "Return 403 for OAuth authorization failure.",
		points: 2,
		id: 11
	},
	{
		question: "All code paths should require authorization.",
		points: 2,
		id: 12
	},
	{
		question: "Use scope claims to constrain the activities of a caller.",
		points: 2,
		id: 13
	},
	{
		question: "Sensitive information should not be visible in paths.",
		points: 2,
		id: 14
	},
	{
		question: "Sensitive information should not be visible in headers.",
		points: 2,
		id: 15
	},
	{
		question: "The API Gateway evaluates the calling application to authorize access to an endpoint.",
		points: 2,
		id: 16
	},
	{
		question: "Use correlation keys requested from clients.",
		points: 2,
		id: 17
	},
	{
		question: "Encrypt context.",
		points: 2,
		id: 18
	},
	{
		question: "Verify content types in request bodies.",
		points: 2,
		id: 19
	},
	{
		question: "Reject requests that do not send accepted content.",
		points: 2,
		id: 20
	},
	{
		question: "Content is verified to be syntactically correct.",
		points: 2,
		id: 21
	},
	{
		question: "Verify content against a schema.",
		points: 2,
		id: 22
	},
	{
		question: "Request bodies are not directly bound to data objects.",
		points: 2,
		id: 23
	},
	{
		question: "If a client does not provide a correlation key, have the API Gateway create one.",
		points: 2,
		id: 24
	},
	{
		question: "Do not return unnecessary information about the nature of an error.",
		points: 2,
		id: 25
	},
	{
		question: "Error responses should only include sufficient information for a consumer to know how to correct their request.",
		points: 2,
		id: 26
	},
	{
		question: "Sensitive information should not be visible in response headers.",
		points: 2,
		id: 27
	},
	{
		question: "Use the no-cache directive on API endpoints.",
		points: 2,
		id: 28
	},
	{
		question: "Use Cache-Control headers to identify stale information.",
		points: 2,
		id: 29
	},
	{
		question: "Disable caching.",
		points: 2,
		id: 30
	},
	{
		question: "Redact sensitive information.",
		points: 2,
		id: 31
	},
	{
		question: "Enable CORS for APIs running in a browser.",
		points: 2,
		id: 32
	},
	{
		question: "Responses should not contain sensitive data.",
		points: 2,
		id: 33
	},
	{
		question: "Parameterize SQL queries.",
		points: 2,
		id: 34
	},
	{
		question: "Do not use dynamic SQL in stored procedures.",
		points: 2,
		id: 35
	},
	{
		question: "JSON is not evaluated directly as JavaScript.",
		points: 2,
		id: 36
	},
	{
		question: "Do not execute binary code or script code in the body.",
		points: 2,
		id: 37
	},
	{
		question: "Log security events into a centralized security event system.",
		points: 2,
		id: 38
	},
	{
		question: "Convert exceptions to standardized errors.",
		points: 2,
		id: 39
	},
	{
		question: "Patch critical vulnerabilities immediately.",
		points: 2,
		id: 40
	},
	{
		question: "Use network isolation techniques.",
		points: 2,
		id: 41
	},
	{
		question: "Check sudden changes in API usage.",
		points: 2,
		id: 42
	},
	{
		question: "Only appropriate personnel can disable an API.",
		points: 2,
		id: 43
	},
	{
		question: "Only appropriate personnel can disable access to APIs by applications.",
		points: 2,
		id: 44
	},
	{
		question: "Mark data with a security classification to identify its appropriate usage.",
		points: 2,
		id: 45
	},
	{
		question: "As a rule, developers cannot modify code in any environment without following the standard code progression path.",
		points: 2,
		id: 46
	},
	{
		question: "Use automated tests.",
		points: 2,
		id: 47
	},
	{
		question: "Record and track technical debt.",
		points: 2,
		id: 48
	},
];

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


document.getElementById('process').addEventListener('click', function(event) {
	event.preventDefault(); // Prevent the default form submission behavior
	calculateScore();
});

function calculateScore() {
	// Get all checkboxes in the form
	const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

	// Count the number of checked checkboxes and calculate the score
	const score = checkboxes.length * 2;

	// Display the score in the DOM
	
	const scoreDisplay = document.getElementById('wizard_container');
	scoreDisplay.textContent = 'Your API Security Score Is: ' + score + ' points';

	

	if(score < 21){
		var taliferroGroup = "<a href='https://taliferro.com/' target='_blank'>Taliferro Group</a>";
		const scoreExplanation = document.getElementById('scoreExplanation');
        scoreDisplay.innerHTML += '<br><br>Your API security score is in the low range, indicating potential vulnerabilities in your current setup. It\'s crucial to address these issues promptly to safeguard your API from security threats. We strongly recommend reaching out to ' + taliferroGroup + ' for professional support. Their expertise can help you identify and mitigate risks, ensuring a robust and secure API environment. Take proactive steps to improve your API security today by contacting Taliferro Group. Your data\'s safety is paramount, and expert assistance can make a significant difference.';
	}
	else if(score > 21 && score <= 39){
		var taliferroGroup = "<a href='https://taliferro.com/' target='_blank'>Taliferro Group</a>.";
		const scoreExplanation = document.getElementById('scoreExplanation');
        scoreDisplay.innerHTML += '<br><br>Your API security score falls within the moderate range. While you\'ve implemented some security measures, there is room for improvement. Consider reviewing the items that were left unchecked and take steps to enhance those aspects of your API security. If you need expert guidance or wish to elevate your API security to a higher level, we recommend contacting ' + taliferroGroup + 'Their professional support can assist you in implementing best practices and fortifying your API against potential threats. Take action today to strengthen your API security protocols.';
	}
	else if(score > 39){
		var taliferroGroup = "<a href='https://taliferro.com/' target='_blank'>Taliferro Group</a>.";
		const scoreExplanation = document.getElementById('scoreExplanation');
        scoreDisplay.innerHTML += '<br><br>Congratulations! Your API security score falls within the high range, reflecting a robust and well-protected API infrastructure. You have demonstrated a strong commitment to security best practices. However, continuous improvement is key. Consider periodic assessments and stay updated on evolving security standards to ensure your API remains resilient. If you have any questions or need further assistance, feel free to reach out to ' + taliferroGroup + ' Keep up the excellent work!';
	}
	else {
		//do nothing
	}

}

/* $(document).ready(function() {
	$("#assessment").click(function() {
	  $("tab_1").tab('show'); // This triggers the tab to be shown
	});
  }); */
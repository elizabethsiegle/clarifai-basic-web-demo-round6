(function ($, Clarifai) {
	$(document).ready(function () {
		initialize()
	})
	//Finding a bunch of elements in the DOM
	var app = $(".app")
	//ADD CODE HERE add more vars connecting to DOM here


	submitButton.on("click", function (event) {
		// getting the input from the image
		var url = imageInput.val()
		tagsContainer.hide()

		// You can ignore this part
		// Set's the url of the imae preview on click
		image.attr("src", url)
		jQuery(".imageUrl").focus(function() {
			$(this).val("");
		});


		// Requesting Clarifai to getTagsByUrl
		Clarifai.getTagsByUrl(url, function (error, response) {
			if (error) {
				displayError(error)
			}
			else if (response) {
				try {
					// ADD CODE HERE if we get response display tag func call
														
				}
				catch (error) {
					console.log(error)
				}
			}
		})

	})

	/*
	 * displayTag
	 * functionality to display the tag
	 */
	function displayTag (response) {
		console.log("Clarifai Response!")
		console.log(response)

		/* Getting the first image from the 
		 * we can give more than one image at the time of request
		 * but since we are requesting tags for only one image
		 * we only need to retrieve the first image*/
		var image 	= 	response.results[0]
		var tag 	= 	image.result.tag

		var conceptsLength = //how long is the length of the tags?

		// Looping through all the classes in the tag using map
		// to get the html for each concept
		var concepts = tag.classes.map(function (value, index, array) {
			var prob = Number.parseFloat(tag.probs[index]);
			var probPercentage = (prob * 100).toString() + "%";

			return `<div class="row">
						<div class="col-sm-12">
							//ADD CODE HERE:return jquery value
						</div>
					</div>`
		})

		//joining all the stuff generated and throwing the html into .tags
		tags.html(concepts.join(""))

		//displaying the hidden container
		tagsContainer.show()

	}
	// In case of error displays an error in the Clarifai 
	function displayError (error) {

		// Preparing the error message
		var errorMsg = "<p>" + error.status_msg + "</p>" 
		var errorHtml = "<div class='errorBox'><h1>Error ❌</h1>" + errorMsg + "</div>"

		// throwing the errorHtml in .tags
		tags.html(errorHtml)
		tagsContainer.show()
	}


	// function to initialize the keys
	function initialize() {
		var keys = getKeys() || {}

		//ADD KEY VARS HERE
		

		if (!clientId || !clientSecret) {
			app.html("Enter your Clarifai's Client ID and Client Secret in order to successfully run this demo. Go to developer.clarifai.com, sign up and create your application if you haven't already. You'll have to edit keys.js file to enter your credentials")
			return;
		}

		Clarifai.initialize({
			clientId: clientId,
			clientSecret: clientSecret
		})
	}
}(jQuery, Clarifai));
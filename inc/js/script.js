jQuery(document).ready(function($) {

	$('.error').hide();
	$("#submit_btn").click(function() {
		// validate and process form here

		$('.error').hide();

		var name = $("input#name").val();
		if (name === "") {
			$("label#name_error").show();
			$("input#name").focus();
			return false;
		}
		var contact = $("input#contact").val();
		if (contact === "") {
			$("label#contact_error").show();
			$("input#contact").focus();
			return false;
		}

		var message = $("#message").val();
		if (message === "") {
			$("label#message_error").show();
			$("#message").focus();
			return false;
		}

		var dataString = 'name='+ name + '&contact=' + contact + '&message=' + message;
		//alert (dataString);return false;
		$.ajax({
			type: "POST",
			url: "/public/bin/process.php",
			data: dataString,
			success: function() {
				$('.newskool').html("<div id='message'></div>");
				$('#message').html("<h2>Thank you for your message.</h2>")
				.append("<p>We will be in touch soon.</p>")
				.hide()
				.fadeIn(500, function() {
					$('#message');
				});
			}
		});
		return false;

	});


}); //
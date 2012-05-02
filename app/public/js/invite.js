$(function () { 
	var usersToInvite = [];
	var addUserForInvite = function (user) {
		if (usersToInvite.indexOf(user) < 0) { 
			usersToInvite.push(user);
		}
	};
	var userSuggestionModel = function (users) {
		this.items = ko.observableArray(users);
		this.selectedItems = ko.observableArray([]);
	};
	$('input#invite-user').keypress(function () {
		var query = $('input#invite-user').val();
		if (query.length >= 3) {
			var url = 'https://graph.facebook.com/search?access_token=' + everyauth.user.fb.access_token + '&q=' + query + '&type=user';
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				success: function (response) {
					ko.applyBindings(new userSuggestionModel(response.data));
				},
				statusCode: {
					404: function () {
						console.log('Facebook API is unreachable!');
					}
				}
			});
		}
	});
	$('#user-suggestion').change(function () {
		$("#user-suggestion option:selected").each(function () {
			var url = 'https://graph.facebook.com/' + $(this).val() + '?access_token=@Session["fb_access_token"]';
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				success: function (response) {
					// Update UI
					var pictureUrl = 'https://graph.facebook.com/' + response.id + '/picture?type=square';
					$('#invite-user-preview')
						.append('<li><div class="thumbnail"><a href="'+ response.link + '" target="_blank"><img src="'+ pictureUrl + '" alt="' + response.name + '"></a></div></li>');
					var user = {
						facebookId: response.id,
						fullName: response.fullname,
						email: response.email
					};
					addUserForInvite(user);
				},
				statusCode: {
					404: function () {
						console.log('Facebook API is unreachable!');
					}
				}
			});
		});
	}).change();
	$('a#user-invite-button').click(function () {
		var url = '/api/invitations/invite';
		var postData = JSON.stringify(usersToInvite);
		$.ajax({
			url: url,
			type: 'POST',
			data: postData,
			dataType: 'json',
			success: function (response) {
				alert('An invitation was send to the users.');
			},
			statusCode: {
				404: function () {
					console.log('Facebook API is unreachable!');
				}
			}
		});
	});
});

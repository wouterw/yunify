(function( kinect ) {

	// ---------------------------------------------------------
	// DOM content load
	// --------------------------------------------------------
	document.addEventListener( 'DOMContentLoaded', function() {
		// Kinect setup
		kinect.setUp({
			players: 4,										// Number of players
			relative: true,								// Tracking mode
			meters: false,								// Tracking mode continued
			sensitivity: 1.2,							// Sensitivity
			joints: ['HAND_RIGHT'],				// Tracked nodes
			gestures: ['SWIPE', 'ESCAPE']	// Tracked gestures
		})
		.sessionPersist() // Keep the session between page loads (of the same domain)
		.modal.make('/wall/css/lib/kinectjs-modal.css') // Kickstarting the modal
		.notif.make();

		// Cursor setup
		var cursor;
		cursor = kinect.cursor.make()
						.useSmoothing(4)
						.useBothHands(true)
						.activate();

		// Hold gesture, slide with tiles
		var tiles = document.getElementById('wrapper_thumbs').getElementsByTagName('a'),
		len	= tiles.length;
		while( len-- )
		{
			cursor.addRegion( tiles[len], 2 );

			tiles[ len ].addEventListener( 'kinectTouchStart', function(e) { //on kinectTouchStart add hover-class
				this.initClass = this.className;
				this.className += ' over';
			}, false );

			tiles[ len ].addEventListener( 'kinectTouchEnd', function(e) {	//on kinectTouchEnd remove the class
				this.className = this.initClass;
			}, false );
		}

		// Hold gesture for photobooth
		var push_button = document.getElementById('hover_effect').getElementsByTagName('a');
		cursor.addRegion( push_button[0], 2 );

		push_button[0].addEventListener( 'kinectTouchStart', function(e) { //on kinectTouchStart add hover-class
			this.initClass = this.className;
			this.className += ' over';
		}, false );

		push_button[0].addEventListener( 'kinectTouchEnd', function(e) {	//on kinectTouchEnd remove the class
			this.className = this.initClass;
		}, false );
	}, false);

	// ---------------------------------------------------------
	// Position kinect when new player enters
	// ---------------------------------------------------------
	kinect.addEventListener('playerfound', function (count) {
		this.scanForHead();
	});

	// ---------------------------------------------------------
	// Escape gesture, go back to homescreen
	// ---------------------------------------------------------
	
	kinect.addEventListener( 'gestureEscape', function( count ) {
		
		if( count[ 0 ] !== 0 )
			return false;
			
		if( count[ 2 ] === true )
		{
			setTimeout(function() {
				window.location="/home";
			}, 2000);
		}
		else
		{
			clearTimeout( window.escape );
			window.escape = false;
		}
		
		return false;
	});
	
	// ---------------------------------------------------------
	// Home gesture to go to home screen
	// ---------------------------------------------------------
	kinect.addEventListener( 'gestureEscape', function( count ) {
		if( count[ 0 ] !== 0 )
			return false;

		if( count[ 1 ] === true )
		{
			window.goToHomeScreen();
		} else {
			return false;
		}
		return false;
	});

	// ---------------------------------------------------------
	// Swipe gesture, slide page left or right
	// ---------------------------------------------------------
	kinect.addEventListener( 'gestureSwipe', function( args ) {
		if( args[ 0 ] === 0 ) // Target 1st player
		{
			var w = $("#section_home")[0].style.left;
			// Slide page to the left
			if( args[ 2 ] === 'left' )
			{
				if (w=="0px") {
					window.goToTaskScreen();
				}
				else if (w=="-1920px") {
					window.goToFacebookScreen();
				}
				else if (w=="-3840px") {
					window.goToTwitterScreen();
				}
				else if (w=="-5760px") {
					window.goToPhotoboothScreen();
				}
			}
			// Slide page to the right
			else if( args[ 2 ] === 'right' )
			{
				if (w=="-1920px") {
					window.goToHomeScreen();
				}
				else if (w=="-3840px") {
					window.goToTaskScreen();
				}
				else if (w=="-5760px") {
					window.goToFacebookScreen();
				}
				else if (w=="-7680px") {
					window.goToTwitterScreen();
				}
			}
		}
		return false;
	});

	// Get to the Homescreen
	window.goToHomeScreen = function() {
		$("#section_home").css("left", "0px");
		$("#section_tasks").css("left", "1920px");
		$("#section_facebook").css("left", "3840px");
		$("#section_twitter").css("left", "5760px");
		$("#section_photobooth").css("left", "7680px");
		$("#section_achieve").css("left", "9600px");

		return false;
	};

	// Get to the Taskscreen
	window.goToTaskScreen = function () {
		$("#section_home").css("left", "-1920px");
		$("#section_tasks").css("left", "0px");
		$("#section_facebook").css("left", "1920px");
		$("#section_twitter").css("left", "3840px");
		$("#section_photobooth").css("left", "5760px");
		$("#section_achieve").css("left", "7680px");

		return false;
	};

	// Get to the Twitterscreen
	window.goToFacebookScreen = function() {
		$("#section_home").css("left", "-3840px");
		$("#section_tasks").css("left", "-1920px");
		$("#section_facebook").css("left", "0px");
		$("#section_twitter").css("left", "1920px");
		$("#section_photobooth").css("left", "3840px");
		$("#section_achieve").css("left", "5760px");

		return false;
	};

	// Get to the Facebookscreen
	window.goToTwitterScreen = function() {
		$("#section_home").css("left", "-5760px");
		$("#section_tasks").css("left", "-3840px");
		$("#section_facebook").css("left", "-1920px");
		$("#section_twitter").css("left", "0px");
		$("#section_photobooth").css("left", "1920px");
		$("#section_achieve").css("left", "3840px");
		return false;
	};

	// Get to the Photoscreen
	window.goToPhotoboothScreen = function () {
		$("#section_home").css("left", "-7680px");
		$("#section_tasks").css("left", "-5760px");
		$("#section_facebook").css("left", "-3840px");
		$("#section_twitter").css("left", "-1920px");
		$("#section_photobooth").css("left", "0px");
		$("#section_achieve").css("left", "1920px");
		enableStream();

		return false;
	};

	window.takePicture = function () {
		kinect.snapshot(function (e) {
		}).saveToLocalStorage();
		showPicture();
	};

	// ---------------------------------------------------------
	// Photobooth
	// ---------------------------------------------------------
	var rgb_img = document.getElementById('RGBstream'),
			rgbSocket;

	// Enable the camera
	var enableStream = function () {
		rgbSocket = kinect.makeRGB(null, true);	//using webworker
		var e = document.getElementById('activateRGB');
		rgbSocket.onmessage = function (e) {
			if (e.data == 'OPEN') {
				return false;
			}

			rgb_img.src = null;
			rgb_img.src = e.data;
			return false;
		};
	};

	// Disable the camera
	var disableStream = function () {
		if (rgbSocket) {
			rgbSocket.postMessage("KILL");
			setTimeout(function () {
				rgbSocket = null;
			}, 1);
			return false;
		}
	};

	var showPicture = function () {
		disableStream();
		var container = document.getElementById('camera_stream'),
		picture_holder = [],
		storage_length = localStorage.length;

		for (i = 0; i < storage_length; i++) {	//grab the pictures from the localStorage
			if (localStorage.key(i).indexOf('img_') !== -1) {
				picture_holder.push(localStorage.key(i));
			}
		}
		img = document.getElementById('camera_stream').getElementsByTagName('img');
		img.src = localStorage.getItem(picture_holder[0]);
		container.getElementsByTagName(img[0]).InnerHtml = img;
		postToFacebook();
	};


	var postToFacebook = function() {

		$.ajax({
			url: '/api/me/photobooth',
			data: {
				data: document.getElementById('camera_stream').getElementsByTagName('img').src
			},
			type: 'POST',
			success: function(data){
				console.log("POST SUCCESSFUL");
			}
		});

	/*var src = document.getElementById('camera_stream').getElementsByTagName('img').src;

	var params = {};
	params['message'] = 'PicRolled';
	params['filename'] = 'filename';
	params['source'] = src;
	params['access_token'] = fb_access_token;
	params['upload_file'] = true;

	console.log(src);

	FB.api('/me/photos', 'post', params, function(response) {
		if (!response || response.error) {
			console.log(response);
		} else {
			console.log('Published to stream - you might want to delete it now!');
		}
	});*/

	};

})(kinect);

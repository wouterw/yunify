(function( kinect ) {

    // ---------------------------------------------------------
    // DOM content load
    // --------------------------------------------------------
	document.addEventListener( 'DOMContentLoaded', function() {
		// Kinect setup
	    kinect.setUp({
	        players: 4,				                // Number of players
	        relative: true,				            // Tracking mode
	        meters: false,			                // Tracking mode continued
	        sensitivity: 1.2,				        // Sensitivity
	        joints: ['HAND_RIGHT'],	                // Tracked nodes
	        gestures: ['SWIPE', 'ESCAPE']			// Tracked gestures
	    })
	        .sessionPersist() // Keep the session between page loads (of the same domain)
	        .modal.make('../css/kinectjs-modal.css') // Kickstarting the modal
	        .notif.make();

	    // Cursor setup
	    var cursor;
		cursor = kinect.cursor.make()
						.useSmoothing(4)
						.useBothHands(true)
						.activate();

		// Hold gesture, slide with tiles
	    var tiles = document.getElementById('wrapper_thumbs').getElementsByTagName('a'),
			len	  = tiles.length;

		while( len-- )
		{
			cursor.addRegion( tiles[ len ], 2 );

			tiles[ len ].addEventListener( 'kinectTouchStart', function(e) { //on kinectTouchStart add hover-class
				this.initClass = this.className;
				this.className += ' over';
			}, false );

			tiles[ len ].addEventListener( 'kinectTouchEnd', function(e) {	//on kinectTouchEnd remove the class
				this.className = this.initClass;
			}, false );
		}
    }, false);

    // ---------------------------------------------------------
    // Position kinect when new player enters
    // ---------------------------------------------------------
	kinect.addEventListener('playerfound', function (count) {
	    this.scanForHead();
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
		    var w = $("#section_home").css("left");

            // Slide page to the left
			if( args[ 2 ] === 'left' )
			{
				if (w=="0px") {
				    window.goToTaskScreen();
				}
				else if (w=="-1920px") {
					console.log(w);
					window.goToFacebookScreen();
				}
				else if (w=="-3840px") {
					window.goToTwitterScreen();
				}
				else if (w=="-5760px") {
					window.goToPhotoboothScreen();
                }
				else if (w == "-7680px") {
				    window.goToAchieveScreen();
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
				else if (w == "-9600px") {
				    window.goToPhotoboothScreen();
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

		return false;
	};

    // Get to the Achievescreen
	window.goToAchieveScreen = function () {
	    $("#section_home").css("left", "-9600px");
	    $("#section_tasks").css("left", "-7680px");
	    $("#section_facebook").css("left", "-5760px");
	    $("#section_twitter").css("left", "-3840px");
	    $("#section_photobooth").css("left", "-1920px");
	    $("#section_achieve").css("left", "0px");

	    return false;
	};

    // ---------------------------------------------------------
    // Picture gallery
    // ---------------------------------------------------------

	//var rgb_img = document.getElementById('RGBstream'),
    //    rgbSocket;

	//kinect.addEventListener('openedSocket', function () {
	//    rgbSocket = kinect.makeRGB(null, true);	// Using webworker

	//    rgbSocket.onmessage = function (e) {
	//        if (e.data === 'OPEN') {
	//            return false;
	//        }

	//        rgb_img.src = null;
	//        rgb_img.src = e.data;
	//        return false;
	//    };
	//}, false);

	//document.getElementById('activateRGB').addEventListener(function (e) {
	//    e.preventDefault();
	//    if (rgbSocket) {
	//        rgbSocket.postMessage("KILL");
	//        setTimeout(function () {
	//            rgbSocket = null;
	//        }, 1);
	//        return false;
	//    }
	//    rgbSocket = kinect.makeRGB(null, true);	//using webworker

	//    rgbSocket.onerror = function () {
	//        rgbSocket.onerror = null;
	//        return false;
	//    };

	//    rgbSocket.onmessage = function (e) {
	//        if (e.data == 'OPEN') {
	//            return false;
	//        }

	//        rgb_img.src = null;
	//        rgb_img.src = e.data;
	//        return false;
	//    };
	//}, false);

	//var takePicture = function () {
	//    kinect.snapshot(function (e) {
	//    }).saveToLocalStorage();
	//};

	//(function () {
	//    var container = document.getElementById('gallery'),
    //    picture_holder = [],
    //    storage_length = localStorage.length;

	//    for (i = 0; i < storage_length; i++) {	//grab the pictures from the localStorage
	//        if (localStorage.key(i).indexOf('img_') !== -1) {
	//            picture_holder.push(localStorage.key(i));
	//        }
	//    }

	//    for (i = 0; i < storage_length; i++) {
	//        img = document.createElement('img');
	//        img.src = localStorage.getItem(picture_holder[i]);

	//        container.appendChild(img);
    //    }
	//})();
})(kinect);


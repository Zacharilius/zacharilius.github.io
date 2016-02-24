$(function() {
	setupWeather();
})

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* setup weather buttons */
function setupWeather() {
	setupMakeItSun();
	setupMakeItRain();
	setupMakeItNight();

	$('.weather-icon').click(function() {
		$('.active-icon').removeClass('active-icon');
		$(this).addClass('active-icon');
	});

	$('#sun-icon').click(function() {
		makeItSun();
	});

	$('#rain-icon').click(function() {
		makeItRain();
	});

	$('#night-icon').click(function() {
		makeItNight();
	});
}

/* -  -  -  -  -  -  -  -  -  -  -  -  -  -   -  -  -  -  -  - */
/*  Sun */
function setupMakeItSun() {

}

function makeItSun() {
	/* Change color to dark for night */
	$('body').css({
	        transition : 'background-color 1s ease-in-out',
	        "background-color": "#ADD8E6"
	});	

	$('.weather-panel').hide();
	$('#sunny-panel').fadeIn();
}

/* -  -  -  -  -  -  -  -  -  -  -  -  -  -   -  -  -  -  -  - */
/*  Rain */
function setupMakeItRain() {
	// Note: Clouds use :before and :after. They are not part of the DOM so they are appended as CSS.
	style = $('<style></style>')
	style.append(randomizeClouds('.cloud.cloud-1'));
	style.append(randomizeClouds('.cloud.cloud-2'));
	style.append(randomizeClouds('.cloud.cloud-3'));
	style.append(randomizeClouds('.cloud.cloud-4'));

	$('head').append(style);
}

function makeItRain() {
	/* Change color to dark for night */
	$('body').css({
	        transition : 'background-color 1s ease-in-out',
	        "background-color": "#000080"
	});

	$('.weather-panel').hide();
	$('#rainy-panel').fadeIn();
}

function randomizeClouds(selector) {
	setCloudScale(selector);
	return setCloudRotate(selector);	
}

function setCloudRotate(selector) {
	var randomRotate = Math.floor(Math.random() * 55);
	if (randomRotate < 10) {
		randomRotate = randomRotate + 30;
	}

	var outputCss = '';
	outputCss += selector + ':before {transform, rotate(-' + randomRotate + 'deg)};\n';
	outputCss += selector + ':before {-ms-transform, rotate(-' + randomRotate + 'deg)};\n';
	outputCss += selector + ':before {-webkit-transform, rotate(-' + randomRotate + 'deg)};\n';

	outputCss += selector + ':after{transform, rotate(' + randomRotate + 'deg)};\n';
	outputCss += selector + ':after {-ms-transform, rotate(' + randomRotate + 'deg)};\n';
	outputCss += selector + ':after {-webkit-transform, rotate(' + randomRotate + 'deg)};\n';

	return outputCss;
}

function setCloudScale(selector) {
	var randomScale = Math.random();
	if (randomScale < .3) {
		randomScale = randomScale + .3;
	}
	$(selector).css('transform', 'scale(' + randomScale + ')');
	$(selector).css('-webkit-transform', 'scale(' + randomScale + ')');
	$(selector).css('-moz-transform', 'scale(' + randomScale + ')');
	$(selector).css('-o-transform', 'scale(' + randomScale + ')');
}

/* -  -  -  -  -  -  -  -  -  -  -  -  -  -   -  -  -  -  -  - */
/*  Night */
function setupMakeItNight() {
	for (var i = 0; i < 75; i++) {
		top_rand = Math.floor((Math.random() * 100) + 1);
		left_rand = Math.floor((Math.random() * 100) + 1);

		var span = $('<span></span');
		span.addClass('star-five');
		span.css('top', top_rand + '%');
		span.css('left', left_rand + '%');
		span.text('\u2605');

		$('#night-panel').append(span);
	}
}

function makeItNight() {
	/* Change color to dark for night */
	$('body').css({
	        transition : 'background-color 1s ease-in-out',
	        "background-color": "#343434"
	});

	$('.weather-panel').hide();
	$('#night-panel').fadeIn();
}



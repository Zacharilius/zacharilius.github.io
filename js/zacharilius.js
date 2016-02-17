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

function setupMakeItRain() {

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



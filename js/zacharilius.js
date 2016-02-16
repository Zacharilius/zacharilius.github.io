$(function() {
	setupWeather();
})

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* setup weather buttons */
function setupWeather() {
	setupMakeItSun();
	setupMakeItRain();
	setupMakeItNight();
}

function setupMakeItSun() {
	$('.weather-icon').click(function() {
		$('.active-icon').removeClass('active-icon');
		$(this).addClass('active-icon');
	})
}

function setupMakeItRain() {

}

function setupMakeItNight() {

}



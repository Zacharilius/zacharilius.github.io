$(function() {
	setupHeight();
    setupSky();
})

function setupHeight() {
	setPortfolioContainerHeight();
	$('portfolio-container').resize('resize', function() {
		setPortfolioContainerHeight();
	})
}

function setPortfolioContainerHeight() {
	$('.portfolio-container').height($(window).height() - 63) /* 64 is the height of the nav title */
}

/* Sky */

function setupSky() {
    var currentHoursInDay = getHoursOfDay();
    var dayBreakHour = 7;  // TODO: Use real data
    var nightTimeHour = 18;  // TODO: Use real data
    if (currentHoursInDay >= dayBreakHour && currentHoursInDay <= nightTimeHour) {
        setupDay();
    } else {
        setupNight();
    }
}

function getHoursOfDay() {
    var date = new Date();
    return date.getHours();
}

function setupDay() {

}

function setupNight() {
    $('body').addClass('night-sky');
    addStars();
    addTwinkleEffectToRandomStars();
}

function addStars() {
    var numberOfStars = 250;
    for (var i = 0; i < numberOfStars; i++) {
        var star = $("<div class='star-five-container'><div class='star-five'></div></div>");
        star.css('top', getRandomNumber($(window).height()));
        star.css('left', getRandomNumber($(window).width() + 200) - 200); /* 200 is the star's width */
        $('body').append(star);
    }
}

function getRandomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber)
}

function addTwinkleEffectToRandomStars() {
    var numberStarsToTwinkle = 50;
    var starContainers = $('.star-five-container');
    for (var i = 0; i < numberStarsToTwinkle; i++) {
        var randomStar = starContainers[getRandomNumber(numberStarsToTwinkle)];
        $(randomStar).addClass('star-five-twinkle');
    }
}

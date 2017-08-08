$(function() {
    setupRummyPage();
});

function setupRummyPage() {
    requestRummySheet()
}

function requestRummySheet() {
    $.ajax({
        url: 'https://sheets.googleapis.com/v4/spreadsheets/1JLgZTyHQik5-uuGCzopzoSlPZT1H4DrMQ1ffyKn6hl4/values/Sheet1!A:D?key=AIzaSyAjyEK1arxq4pI7nR1suahUDVL-4SLxYnw&majorDimension=COLUMNS',
        type: 'GET',
        dataType: 'jsonp',
    }).done(function(data) {
        window.rummyData = data;
        summarizeData(data.values)
    }).fail(function(error) {
        console.error(error);
        // TODO: Display error message when an error occurs
    });
}

function summarizeData(data) {
    // Deana is column 1 and Zach is column 2
    var deanaPoints = data[0].slice(1).map(strToNumb);
    var zachPoints = data[1].slice(1).map(strToNumb);

    addStatsToSummaryTable(deanaPoints, zachPoints)
}

function addStatsToSummaryTable(deanaPoints, zachPoints) {
    if (deanaPoints.length != zachPoints.length) {
        throw Exception('Unequal number of points between Zach and Deana')
    }

    // Total points
    var deanaTotalPoints = deanaPoints.reduce(getSum);
    var zachTotalPoints = zachPoints.reduce(getSum);
    var totalPoints = deanaTotalPoints + zachTotalPoints;
    $('#z-total-points').text(zachTotalPoints);
    $('#d-total-points').text(deanaTotalPoints);
    $('#total-points').text(totalPoints);

    // Current Winner
    var currentWinner;
    if (deanaTotalPoints > zachTotalPoints) {
        currentWinner = 'Deana';
    } else if (deanaTotalPoints < zachTotalPoints) {
        currentWinner = 'Zach';
    } else {
        currentWinner = 'It\'s a tie!';
    }
    $('#current-winner').text(currentWinner);

    // Average points per trick
    var numberTricks = deanaPoints.length;  // Zach and Deana points are equal
    var deanaAveragePointsPerTrick = deanaTotalPoints / numberTricks;
    var zachAveragePointsPerTrick = zachTotalPoints / numberTricks;
    var averagePointsPerTrick = totalPoints / numberTricks;
    $('#z-avg-points-per-trick').text(removeDecimals(zachAveragePointsPerTrick));
    $('#d-avg-points-per-trick').text(removeDecimals(deanaAveragePointsPerTrick));
    $('#avg-points-per-trick').text(removeDecimals(averagePointsPerTrick));


    // Number tricks won
    var numberOfTricksDeanaWon = 0;
    var numberOfTricksZachWon = 0;
    var numberOfTricksTied = 0;
    for (var i = 0; i < deanaPoints.length; i++) {
        if (deanaPoints[i] > zachPoints[i]) {
            numberOfTricksDeanaWon += 1;
        } else if (deanaPoints[i] < zachPoints[i]) {
            numberOfTricksZachWon += 1;
        } else {  // Equal
            numberOfTricksTied += 1;
        }
    }
    $('#z-num-tricks-won').text(numberOfTricksZachWon);
    $('#d-num-tricks-won').text(numberOfTricksDeanaWon);
    $('#num-tricks-won').text(numberOfTricksDeanaWon + numberOfTricksZachWon);

    // Longest winning streak

    // Line graph of current winner for each trick.
}

function getSum(total, num) {
    return total + num;
}

function strToNumb(strNum) {
    return Number(strNum);
}

function removeDecimals(num) {
    return num.toFixed(0);
}

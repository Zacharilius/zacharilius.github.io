$(function() {
    setupRummyPage();
});

function setupRummyPage() {

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

    // Total points
    var deanaTotalPoints = deanaPoints.reduce(getSum);
    var zachTotalPoints = zachPoints.reduce(getSum);
    var totalPoints = deanaTotalPoints + zachTotalPoints;

    // Average points per trick
    if (deanaPoints.length != zachPoints.length) {
        throw Exception('Unequal number of points between Zach and Deana')
    }
    var numberTricks = deanaPoints.length;  // Zach and Deana points are equal
    var deanaAveragePointsPerTrick = deanaTotalPoints / numberTricks;
    var zachAveragePointsPerTrick = zachTotalPoints / numberTricks;
    var averagePointsPerTrick = (deanaTotalPoints + zachTotalPoints) / numberTricks;


}

function getSum(total, num) {
    return total + num;
}

function strToNumb(strNum) {
    return Number(strNum);
}

$(function() {
    setupRummyPage();
});

function setupRummyPage() {
    if (isOnTest() && hasTestData()) {
        updateData(getTestData());
    } else {
        requestRummySheetThenUpdateData()
    }
}

function isOnTest() {
    return 'http://127.0.0.1:4000'.indexOf(window.location.origin) != -1;
}

function hasTestData() {
    return window.localStorage['testData'] !== undefined;
}

function getTestData() {
    var testData = window.localStorage['testData'].split(',');
    var deanaIndex = -1;
    var zachIndex = -1;
    for (var i = 0; i < testData.length; i++) {
        if (testData[i] == 'Deana') {
            deanaIndex = i;
        } else if (testData[i] == 'Zach') {
            zachIndex = i;
        }
    }
    var deanaData = testData.splice(deanaIndex, zachIndex);
    var zachData = testData.splice(0, zachIndex);

    return [deanaData, zachData];
}

function updateData(data) {
    // Deana is column 1 and Zach is column 2
    var deanaPoints = data[0].slice(1).map(strToNumb);
    var zachPoints = data[1].slice(1).map(strToNumb);

    addStatsToSummaryTable(deanaPoints, zachPoints);
    createTrickWinnerChart(deanaPoints, zachPoints);
    createCumulativeWinnerChart(deanaPoints, zachPoints);
}

function requestRummySheetThenUpdateData() {
    var sheetId = '1JLgZTyHQik5-uuGCzopzoSlPZT1H4DrMQ1ffyKn6hl4;';
    var key = 'AIzaSyAjyEK1arxq4pI7nR1suahUDVL-4SLxYnw';
    $.ajax({
        url: 'https://sheets.googleapis.com/v4/spreadsheets/'+sheetId+'/values/Sheet1!A:D?key='+key+'&majorDimension=COLUMNS',
        type: 'GET',
        dataType: 'jsonp',
    }).done(function(data) {
        // Save in local storage to allow testing offline;
        if (isOnTest()) {
            window.localStorage['testData'] = data.values;
        }
        updateData(data.values);
    }).fail(function(error) {
        console.error(error);
        // TODO: Display error message when an error occurs
    });
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

// Charts

function createTrickWinnerChart(deanaPoints, zachPoints) {
    var windowWidth = window.innerWidth * .90;
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = windowWidth - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var deanaLine = d3.line()
        .x(function(d) { return x(d.trickIndex); })
        .y(function(d) { return y(d.dScore); });

    var zachLine = d3.line()
        .x(function(d) { return x(d.trickIndex); })
        .y(function(d) { return y(d.zScore); });

    // Find the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select('#trick-winner-chart-container svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform',
              'translate(' + margin.left + ',' + margin.top + ')');

    // Format the data
    var data  = deanaPoints.map(function(dScore, index) {
        return {'trickIndex': index, 'dScore': dScore, 'zScore': zachPoints[index]};
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.trickIndex; }));
    y.domain(
        [d3.min(data, function(d) {return Math.min(d.dScore, d.zScore); }),
        d3.max(data, function(d) {return Math.max(d.dScore, d.zScore); })]);

    // Add the deanaLine path.
    svg.append('path')
        .data([data])
        .attr('class', 'line')
        .style('stroke', 'green')
        .attr('d', deanaLine);

    // Add the zachLine path.
    svg.append('path')
        .data([data])
        .attr('class', 'line')
        .style('stroke', 'red')
        .attr('d', zachLine);

    // Add the X Axis
    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append('g')
        .call(d3.axisLeft(y));
}

function createCumulativeWinnerChart(deanaPoints, zachPoints) {
    var windowWidth = window.innerWidth * .90;
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = windowWidth - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    console.log(window.innerWidth - 100 - margin.left - margin.right);

    // Set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var deanaLine = d3.line()
        .x(function(d) { return x(d.trickIndex); })
        .y(function(d) { return y(d.dCumulativeScore); });

    var zachLine = d3.line()
        .x(function(d) { return x(d.trickIndex); })
        .y(function(d) { return y(d.zCumulativeScore); });

    // Find the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select('#cumulative-winner-chart-container svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform',
              'translate(' + margin.left + ',' + margin.top + ')');

    // Format the data
    var dCumulativeScore = 0;
    var zCumulativeScore = 0;
    var data = deanaPoints.map(function(dScore, index) {
        dCumulativeScore += dScore;
        zCumulativeScore += zachPoints[index];
        return {'trickIndex': index, 'dCumulativeScore': dCumulativeScore, 'zCumulativeScore': zCumulativeScore};
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.trickIndex; }));
    y.domain(
        [d3.min(data, function(d) {return Math.min(d.dCumulativeScore, d.zCumulativeScore); }),
        d3.max(data, function(d) {return Math.max(d.dCumulativeScore, d.zCumulativeScore); })]);

    // Add the deanaLine path.
    svg.append('path')
        .data([data])
        .attr('class', 'line')
        .style('stroke', 'green')
        .attr('d', deanaLine);

    // Add the zachLine path.
    svg.append('path')
        .data([data])
        .attr('class', 'line')
        .style('stroke', 'red')
        .attr('d', zachLine);

    // Add the X Axis
    svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append('g')
        .call(d3.axisLeft(y));
}

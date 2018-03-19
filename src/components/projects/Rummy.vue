<template>
  <div class='page-content'>
    <div class='mdl-grid'>
      <div id='title-container' class='mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet'>
        <h3>My wife and I have been playing the same game of Rummy since January 2017.</h3>
        <h4>The current winner is:</h4>
        <h4 id='current-winner'>{{ currentWinner }}</h4>
      </div>
    </div>
    <div id='winner-stats-container'>
      <md-table md-card>
        <md-table-row>
          <md-table-head></md-table-head>
          <md-table-head md-numeric>Zach</md-table-head>
          <md-table-head md-numeric>Deana</md-table-head>
          <md-table-head md-numeric>Total</md-table-head>
        </md-table-row>
        <md-table-row>
          <md-table-cell>Total Points</md-table-cell>
          <md-table-cell md-numeric>{{ deanaTotalPointsCalc }}</md-table-cell>
          <md-table-cell md-numeric>{{ zachTotalPointsCalc }}</md-table-cell>
          <md-table-cell md-numeric>{{ deanaTotalPointsCalc + zachTotalPointsCalc }}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell>Average Points per trick</md-table-cell>
          <md-table-cell md-numeric>{{ deanaAveragePointsPerTrick }}</md-table-cell>
          <md-table-cell md-numeric>{{ zachAveragePointsPerTrick }}</md-table-cell>
          <md-table-cell md-numeric>{{ deanaAveragePointsPerTrick + zachAveragePointsPerTrick }}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-cell>Number tricks won</md-table-cell>
          <md-table-cell md-numeric>{{ numberOfTricksZachWon }}</md-table-cell>
          <md-table-cell md-numeric>{{ numberOfTricksDeanaWon }}</md-table-cell>
          <md-table-cell md-numeric>{{ numberOfTricksZachWon + numberOfTricksDeanaWon }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div id='chart-container'>
      <div id='trick-winner-chart-container' class='chart-container'>
        <h3>Winners by Trick</h3>
        <div class='chart-legend'>
          <div><div class='legend-square legend-deana'></div><span>Deana</span></div>
          <div><div class='legend-square legend-zach'></div><span>Zach</span></div>
        </div>
        <svg></svg>
      </div>
      <div id='cumulative-winner-chart-container' class='chart-container'>
        <h3>Cumulative Winner</h3>
        <div class='chart-legend'>
          <div><div class='legend-square legend-deana'></div><span>Deana</span></div>
          <div><div class='legend-square legend-zach'></div><span>Zach</span></div>
        </div>
        <svg></svg>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'About',
  data () {
    return {
      deanaPoints: [],
      zachPoints: []
    }
  },
  mounted () {
    if (this.isOnTest() && this.hasTestData()) {
      this.updateData(this.getTestData())
    } else {
      this.requestRummySheetThenUpdateData()
    }
  },
  computed: {
    currentWinner () {
      if (this.deanaTotalPoints() > this.zachTotalPoints()) {
        return 'Deana'
      } else if (this.deanaTotalPoints() < this.zachTotalPoints()) {
        return 'Zach'
      } else {
        return 'It\'s a tie!'
      }
    },
    deanaTotalPointsCalc () {
      return this.deanaTotalPoints()
    },
    zachTotalPointsCalc () {
      return this.zachTotalPoints()
    },
    deanaAveragePointsPerTrick () {
      return this.removeDecimals(this.deanaTotalPoints() / this.deanaPoints.length)
    },
    zachAveragePointsPerTrick () {
      return this.removeDecimals(this.zachTotalPoints() / this.zachPoints.length)
    },
    averagePointsPerTrick () {
      return this.removeDecimals((this.zachTotalPoints() + this.deanaTotalPoints()) / this.zachPoints.length)
    },
    numberOfTricksZachWon () {
      var numberOfTricksZachWon = 0
      for (var i = 0; i < this.deanaPoints.length; i++) {
        if (this.deanaPoints[i] < this.zachPoints[i]) {
          numberOfTricksZachWon += 1
        }
      }
      return numberOfTricksZachWon
    },
    numberOfTricksDeanaWon () {
      var numberOfTricksDeanaWon = 0
      for (var i = 0; i < this.deanaPoints.length; i++) {
        if (this.deanaPoints[i] > this.zachPoints[i]) {
          numberOfTricksDeanaWon += 1
        }
      }
      return numberOfTricksDeanaWon
    },
    numberOfTricksTied () {
      var numberOfTricksTied = 0
      for (var i = 0; i < this.deanaPoints.length; i++) {
        if (this.deanaPoints[i] === this.zachPoints[i]) {
          numberOfTricksTied += 1
        }
      }
      return numberOfTricksTied
    }
  },
  methods: {
    isOnTest () {
      return 'http://127.0.0.1:4000'.indexOf(window.location.origin) !== -1
    },
    hasTestData () {
      return window.localStorage['testData'] !== undefined
    },
    getTestData () {
      var testData = window.localStorage['testData'].split(',')
      var deanaIndex = -1
      var zachIndex = -1
      for (var i = 0; i < testData.length; i++) {
        if (testData[i] === 'Deana') {
          deanaIndex = i
        } else if (testData[i] === 'Zach') {
          zachIndex = i
        }
      }
      var deanaData = testData.splice(deanaIndex, zachIndex)
      var zachData = testData.splice(0, zachIndex)

      return [deanaData, zachData]
    },
    updateData (data) {
      // Deana is column 1 and Zach is column 2
      this.deanaPoints = data[0].slice(1).map(this.strToNumb)
      this.zachPoints = data[1].slice(1).map(this.strToNumb)

      this.createTrickWinnerChart(this.deanaPoints, this.zachPoints)
      this.createCumulativeWinnerChart(this.deanaPoints, this.zachPoints)
    },
    requestRummySheetThenUpdateData () {
      const self = this
      const sheetId = '1JLgZTyHQik5-uuGCzopzoSlPZT1H4DrMQ1ffyKn6hl4'
      const key = 'AIzaSyAjyEK1arxq4pI7nR1suahUDVL-4SLxYnw'

      fetch('https://sheets.googleapis.com/v4/spreadsheets/' + sheetId + '/values/Sheet1!A:D?key=' + key + '&majorDimension=COLUMNS')
        .then(function (response) {
          return response.json()
        })
        .then(function (response) {
          // Save in local storage to allow testing offline
          if (self.isOnTest() && response['error'] !== undefined) {
            window.localStorage['testData'] = response.values
          }

          self.updateData(response.values)
        })
        .catch(function (error) { console.error('error', error) })
    },
    getSum (total, num) {
      return total + num
    },
    strToNumb (strNum) {
      return Number(strNum)
    },
    removeDecimals (num) {
      return num.toFixed(0)
    },
    deanaTotalPoints () {
      if (this.deanaPoints.length > 0) {
        return this.deanaPoints.reduce(this.getSum)
      }
    },
    zachTotalPoints () {
      if (this.zachPoints.length > 0) {
        return this.zachPoints.reduce(this.getSum)
      }
    },
    /* ==== Charts ==== */
    createTrickWinnerChart (deanaPoints, zachPoints) {
      const margin = this.chartMargins()
      const width = this.chartWidth()
      const height = this.chartHeight()

      // Set the ranges
      var x = d3.scaleLinear().range([0, width])
      var y = d3.scaleLinear().range([height, 0])

      var deanaLine = d3.line()
        .x(function (d) {
          return x(d.trickIndex)
        })
        .y(function (d) {
          return y(d.dScore)
        })

      var zachLine = d3.line()
        .x(function (d) {
          return x(d.trickIndex)
        })
        .y(function (d) {
          return y(d.zScore)
        })

      var svg = d3.select('#trick-winner-chart-container svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      // Format the data
      var data = deanaPoints.map(function (dScore, index) {
        return {
          'trickIndex': index,
          'dScore': dScore,
          'zScore': zachPoints[index]
        }
      })

      // Scale the range of the data
      x.domain(d3.extent(data, function (d) {
        return d.trickIndex
      }))
      y.domain(
        [d3.min(data, function (d) {
          return Math.min(d.dScore, d.zScore)
        }),
        d3.max(data, function (d) {
          return Math.max(d.dScore, d.zScore)
        })])

      // Add the deanaLine path.
      svg.append('path')
        .data([data])
        .attr('class', 'line')
        .style('stroke', '#FC4A1A')
        .attr('d', deanaLine)

      // Add the zachLine path.
      svg.append('path')
        .data([data])
        .attr('class', 'line')
        .style('stroke', '#037584')
        .attr('d', zachLine)

      // Add the X Axis
      svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
      svg.append('text')
        .attr('transform',
          'translate(' + (width / 2) + ' ,' +
            (height + margin.top + 10) + ')')
        .style('text-anchor', 'middle')
        .text('Trick number')

      // Add the Y Axis
      svg.append('g')
        .call(d3.axisLeft(y))
      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left - 5)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Points')
    },
    createCumulativeWinnerChart (deanaPoints, zachPoints) {
      const margin = this.chartMargins()
      const width = this.chartWidth()
      const height = this.chartHeight()

      // Set the ranges
      var x = d3.scaleLinear().range([0, width])
      var y = d3.scaleLinear().range([height, 0])

      var deanaLine = d3.line()
        .x(function (d) {
          return x(d.trickIndex)
        })
        .y(function (d) {
          return y(d.dCumulativeScore)
        })

      var zachLine = d3.line()
        .x(function (d) {
          return x(d.trickIndex)
        })
        .y(function (d) {
          return y(d.zCumulativeScore)
        })

      var svg = d3.select('#cumulative-winner-chart-container svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      // Format the data
      var dCumulativeScore = 0
      var zCumulativeScore = 0
      var data = deanaPoints.map(function (dScore, index) {
        dCumulativeScore += dScore
        zCumulativeScore += zachPoints[index]
        return {
          'trickIndex': index,
          'dCumulativeScore': dCumulativeScore,
          'zCumulativeScore': zCumulativeScore
        }
      })

      // Scale the range of the data
      x.domain(d3.extent(data, function (d) {
        return d.trickIndex
      }))
      y.domain(
        [d3.min(data, function (d) {
          return Math.min(d.dCumulativeScore, d.zCumulativeScore)
        }),
        d3.max(data, function (d) {
          return Math.max(d.dCumulativeScore, d.zCumulativeScore)
        })])

      // Add the deanaLine path.
      svg.append('path')
        .data([data])
        .attr('class', 'line')
        .style('stroke', '#FC4A1A')
        .attr('d', deanaLine)

      // Add the zachLine path.
      svg.append('path')
        .data([data])
        .attr('class', 'line')
        .style('stroke', '#037584')
        .attr('d', zachLine)

      // Add the X Axis
      svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
      svg.append('text')
        .attr('transform',
          'translate(' + (width / 2) + ' ,' +
            (height + margin.top + 10) + ')')
        .style('text-anchor', 'middle')
        .text('Trick number')

      // Add the Y Axis
      svg.append('g')
        .call(d3.axisLeft(y))
      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left - 5)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Points')
    },
    chartMargins () {
      return {top: 20, right: 20, bottom: 30, left: 50}
    },
    chartWidth () {
      return (window.innerWidth * 0.90) - this.chartMargins().left - this.chartMargins().right
    },
    chartHeight () {
      return 500 - this.chartMargins().top - this.chartMargins().bottom
    }
  }
}
</script>

<style scoped>
#title-container {
  padding-top: 30px;
  margin: 0 auto;
  text-align: center;
}
#title-container h4 {
  display: inline-block;
}
#winner-stats-container {
    width: 550px;
    max-width: 100%;
    box-sizing: border-box;
    margin: 20px auto;
    padding: 20px;
}
#winner-stats-container table {
  width: 400px;
  margin: 0 auto;
  border: 1px solid lightgray;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
}
#current-winner {
  font-weight: 500;
  margin-left: 10px;
}
/* Charts */
#chart-container {
  border-top: 1px solid #aaaaaa;
  margin-top: 60px;
  margin-bottom: 60px;
  padding-top: 60px;
}
.chart-container {
  text-align: center;
  margin-bottom: 20px;
}
.chart-legend {
  display: table;
  margin: 0 auto;
  padding: 10px;
  text-align: left
}
.legend-square {
  display: inline-block;
  width: 50px;
  height: 25px;
  margin-right: 25px;
}
.legend-deana {
  border-bottom: 3px solid #FC4A1A;
}
.legend-zach {
  border-bottom: 3px solid #037584;
}
</style>
<style>
.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}
</style>

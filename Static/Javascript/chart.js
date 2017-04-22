   google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Hypetron', 0],//0 === starting value
        ]);

        var options = {
          width: 320, height: 320,
          greenFrom: 50, greenTo: 75,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          minorTicks: 5 //the amount of ticks between bold ticks
        };

        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

        chart.draw(data, options);

        setInterval(function() {
          data.setValue(0, 1, 0 + Math.round(emotesNum));//60 * Math.round replaced with emotesNum /2?
          chart.draw(data, options);
        }, 1000);//update interval
      }


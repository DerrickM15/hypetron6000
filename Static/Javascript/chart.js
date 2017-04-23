   google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart);


      function drawChart() {
        var hype = 0 //pull information from websocket magic
        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Hypetron', hype],//0 === starting value
        ]);

          skateboard('http://localhost:8080/skateboard?param=true', function(stream) {
          stream.pipe(stream);
          stream.on('data', function(d) {
          hype = hype + parseInt(d);
          console.log(hype);
          });
          stream.on('disconnection', function() {
              console.log('disconnected')
          });
          stream.on('reconnection', function() {
              console.log('reconnected')
          })
      }).on('connection', function() {
          console.log('connected')
      });


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
          hype = hype - 1;
          if (hype < 1) {
            hype = 0;
          }
          else if (hype > 105) {
            hype = 100;
          }      
          data.setValue(0, 1, hype);//60 * Math.round replaced with emotesNum /2?
          chart.draw(data, options);
        }, 1000);//update interval
      }


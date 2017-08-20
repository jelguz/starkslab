var nvd3Charts = function() {
	
		var myColors = ["#33414E","#8DCA35","#00BFDD","#FF702A","#DA3610",
                        "#80CDC2","#A6D969","#D9EF8B","#FFFF99","#F7EC37","#F46D43",
                        "#E08215","#D73026","#A12235","#8C510A","#14514B","#4D9220",
                        "#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6","#FDB863",                                                
                        "#C51B7D","#DE77AE","#EDD3F2"];
        d3.scale.myColors = function() {
            return d3.scale.ordinal().range(myColors);
        };
    
		var startChart2 = function() {
		function generateRange(pCount, pMin, pMax) {
			min = pMin < pMax ? pMin : pMax;
			max = pMax > pMin ? pMax : pMin;
			var resultArr = [], randNumber;
			while ( pCount > 0) {
				randNumber = Math.round(min + Math.random() * (max - min));
				if (resultArr.indexOf(randNumber) == -1) {
					resultArr.push(randNumber);
					pCount--;
				}
			}
			return resultArr;
		};
		nv.addGraph(function() {
			var chart = nv.models.scatterChart().transitionDuration(350).color(d3.scale.myColors().range());;

			//Configure how the tooltip looks.
			chart.tooltipContent(function(key) {
                            return '<h3>' + key + '</h3>';
			});

			//Axis settings
			chart.xAxis.tickFormat(d3.format(',r'));
			chart.yAxis.tickFormat(d3.format(',r'));

			//We want to show shapes other than circles.
			chart.scatter.onlyCircles(true);

			var myData = randomData(3, 10);
			d3.select('#chart-2 svg').datum(myData).call(chart);

			nv.utils.windowResize(chart.update);

			return chart;
		});

		/**************************************
		 * Simple test data generator
		 */
		function randomData(groups, points) {//# groups,# points per group
			var data = [], random = d3.random.normal(), keys = ['Concept', 'Development', 'Growth'];

			for ( var i = 0; i < groups; i++) {
				data.push({
					key : keys[i],
					values : []
				});

				for ( var j = 0; j < points; j++) {
					data[i].values.push({
						x : generateRange(1,1,100)[0],
						y : generateRange(1,1,100)[0],
						size : generateRange(1,1,100)[0]
					});
				}
			}

			return data;
		}

	};
	
	return {		
		init : function() {

			startChart2();
		}
	};
    
}();

nvd3Charts.init();

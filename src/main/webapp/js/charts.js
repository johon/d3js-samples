var charts = {};

charts.publicBalanceChart = function (raw) {
  var elementSelector = "#publicBalanceChart";
  var formatPercent = d3.format(".1%");
  var height = 600;

  d3.select(elementSelector).selectAll().remove(); // remove chart div content

  var chart = d3.select(elementSelector).append("div").attr("class", "chart");
  var xAxis = d3.select(elementSelector).append("div").attr("class", "axis");

  var dataset = raw.map(function(d) { 
    return {
	  "xLabel": d.Country, 
	  "yLabel": formatPercent((+d.y2011)/100), 
	  "value": (+d.y2011) / 100}; } 
  );
  
  // Compute y-axis scale (d3 nice scale between -y0 and y0, where y0 = max(abs(yN)))
  var yValues = dataset.map(function(d) {return d.value;});
  var y0 = Math.max(-d3.min(yValues), d3.max(yValues));
  var y = d3.scale.linear()
      .domain([-y0, y0])
	  .range([height, 0])
	  .nice();
 
  // Generate div's representing each vertical bar in the chart
  var bars = chart.selectAll("div")
		.data(dataset)
	.enter().append("div")
		.attr("class", "bar span-2")
		.style("height",     function(d) { return Math.abs(y(d.value) - y(0)) + "px"; })
		.style("margin-top", function(d) { return Math.min(y(0), y(d.value)) + "px"; })
	.append("div")
	    .attr("class","bar-y-label")
		.text(function(d) { return d.yLabel; });

  xAxis.selectAll("div")
	  .data(dataset)
  .enter().append("div")
	  .attr("class", "span-2 append-bottom")
	  .text(function(d) { return d.xLabel; });

};
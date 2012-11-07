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
	  .attr("class", "span-2 append-bottom x-label")
	  .text(function(d) { return d.xLabel; });

};

charts.grossDebtChart = function (raw) {
  var elementSelector = "#grossDebtChart";
  var grossDebtChartVisibleCountries = ["Norway", "Greece", "Finland"];
  var years = [2008,2009,2010,2011];
  
  d3.select(elementSelector).selectAll().remove(); // remove chart div content

  var width = 950, height = 700,
      axisWidth = 850, axisHeight = 600,
	  margin = 50;
  
  var dataset = raw.filter(function(d) { 
	  return grossDebtChartVisibleCountries.indexOf(d.Country) > -1 });
  
  dataset.forEach(function(d) {
	 d.y2008 = +d.y2008;
	 d.y2009 = +d.y2009;
	 d.y2010 = +d.y2010;
	 d.y2011 = +d.y2011;
	 d.yValues = [d.y2008, d.y2009, d.y2010, d.y2011]
	 d.max = d3.max(d.yValues);
  });

  // Compute y-axis scale (d3 nice scale between -y0 and y0, where y0 = max(abs(yN)))
  var yMax = d3.max(dataset.map(function(d) { return d.max; }));

  var y = d3.scale.linear().domain([0, yMax]).range([axisHeight, 0]),
	  x = d3.scale.linear().domain([2008, 2011]).range([0, axisWidth])
  
  var xAxis = d3.svg.axis().scale(x).tickValues(years).tickFormat(d3.format("d")).orient("bottom");
  var yAxis = d3.svg.axis().scale(y).orient("left");
  
  var g = d3.select(elementSelector)
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate("+margin+", "+margin+")");
  
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + axisHeight + ")")
    .call(xAxis);
  g.append("g").attr("class", "y axis").call(yAxis);
  
  var line = d3.svg.line()
    .x(function(d,i) { return x(years[i]); })
    .y(function(d,i) { 
    	return y(d); 
  });
  
  dataset.forEach(function(d) {
	g.append("path")
	  .attr("d", line(d.yValues))
	  .attr("class", "line");
	g.append("text")
	  .attr("transform", "translate("+x(years[0])+","+y(d.yValues[0])+")")
	  .attr("class", "x-label")
	  .attr("x", margin/2)
	  .attr("dy", "-1.5em")
	  .text(d.Country);
  });
  
};
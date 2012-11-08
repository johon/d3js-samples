d3.tsv("js/publicBalance.tsv", function (raw) {
  var formatPercent = d3.format(".1%");
  var dataset = raw.map(function(d) { 
	    return {
		  "xLabel": d.Country, 
		  "yLabel": formatPercent((+d.y2011)/100), 
		  "value": (+d.y2011) / 100}; });

  charts.publicBalanceChart(dataset);
});
d3.tsv("js/grossDebt.tsv", function (raw) {
  var grossDebtChartVisibleCountries = ["Norway", "Greece", "Finland"];
  var years = [2008,2009,2010,2011];
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
  
  charts.grossDebtChart(dataset, years); 
});
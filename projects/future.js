var margin = {top: 30, right: 100, bottom: 100, left: 100},
  width = 700 - margin.left - margin.right,
  height = 630 - margin.top - margin.bottom;

var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scalePow().range(["#FFD700", "#ee5396"]);

// The size of the buckets in the CSV data file.
    yStep = height/101;

var svg = d3.select("#graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(responsivefy)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/projects/future/guardian_2011-2020_urls.csv", function(error, buckets) {
  if (error) throw error;

  var parseTime = d3.timeParse("%Y-%m")
  var parseMonth = d3.timeParse("%Y-%m")
  buckets.forEach(function(d) {
    d.name = parseMonth(d.group).toLocaleString('default', { month: 'long' });
    d.group = parseTime(d.group);
    d.year = d.group.getFullYear();
    d.month = d.group.getMonth()+2;
    d.final = parseTime(JSON.stringify(d.year) + "-" + JSON.stringify(d.month))
    d.variable = +d.variable;
    d.value = +d.value;
  });

  x.domain([parseTime("2013-6"), parseTime("2021-1")])
  y.domain([1970,2071])
  z.domain([0, d3.max(buckets, function(d) { return d.value; })]);

// build tooltip
  var tooltip = d3.select("#tool")
    .append("div")
    .attr("class", "tooltip")
    .style("text-align", "left")
    .html("")

  var tool = d3.select("#tool")
    .style("display","none")


  var click = function(d, i) {
    d3.selectAll('.highlight')
      .style('fill', function(d) { return z(d.value); })
      .attr('class', "tile")

    d3.select(this)
      .style('fill', '#33b1ff')
      .attr('class', 'highlight')

    tool
      .style("display","block")

    tooltip
      .html("Articles shared in " + d.name + ", " + d.year + "<br> that mention " + d.variable + ":<br><br><br><br>" + d.articles)
      .style("left", (d3.mouse(this)[0]) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")};

  svg.selectAll(".tile")
      .data(buckets)
    .enter().append("rect")
      .attr("class", "tile")
      .attr("x", function(d) { return x(d.group); })
      .attr("y", function(d) { return y(d.variable + 1); })
      .attr("width", function(d) { return x(d.final)-x(d.group)})
      .attr("height", yStep)
      .attr("color", function(d) { return z(d.value); })
      .style("fill", function(d) { return z(d.value); })
    .on("click", click);

  svg.append("g")
      .attr("class", "x_axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(12))
    .append("text")
      .attr("x", width)
      .attr("y", 50)
      .attr("text-anchor", "end")
      .text("Reddit Share Date");

  svg.append("g")
      .attr("class", "y_axis")
      .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format("d")))
    .append("text")
      .attr("class", "label")
      .attr("y", -80)
      .attr("dy", ".71em")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .text("Year");
});

function responsivefy(svg) {
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("perserveAspectRatio", "xMinYMid")
        .call(resize);

    d3.select(window).on("resize." + container.attr("id"), resize);

    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
    }
}

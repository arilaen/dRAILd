//Width and height
				
			var container = $("#map");

			var w = container.width(),
			h = container.height(),
			active;

			//Define map projection
			var projection = d3.geo.albers()
								  .center([24.9, 42])
								   .translate([w/2, h/2])
								   .scale([30000]); //For more full view try 18000-24000

			//var color = d3.scale.category10();
			//Define path generator
			var path = d3.geo.path()
							 .projection(projection);
							// railjsondata,
							  //  railjsonobject,
							    //railjsonobjectkeys,
							    //numberOfKeys,
							    //currentMap
							    //mapNumber;

			//Create SVG element
			var svg = d3.select("#map")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

		//Define clipping path
		
		svg.append("clipPath")                  //Make a new clipPath
		    .attr("id", "chart-area")           //Assign an ID
		    .append("rect")                     //Within the clipPath, create a new rect
		    //.attr("x", padding)                 //Set rect's position and size…
		    //.attr("y", padding)
		    .attr("width", w)// - padding * 3)
		    .attr("height", h)
		    .on("click",reset);// - padding *3)
		var g = svg.append("g")

		//var tooltip = d3.select("#map").append("div");
		queue()
			    //.defer(d3.json, "static/json/states.json")
			    .defer(d3.json, "/data/masscountytopo.json")
			    .defer(d3.json, "/data/railsmbtatopo.json")
			    .defer(d3.csv, "/data/StationOrder.csv")
			    .await(ready);
	
				function ready(error, townsjson, railjson, stations) {
					if (error) return console.warn(error);
					//var mass = topojson.feature(states, states.objects.mass).features;
      				//var rhode = topojson.feature(states, states.objects.rhodeisland).features;
      				var towns = topojson.feature(townsjson, townsjson.objects.masscountyGeo).features,
      				neighbors = topojson.neighbors(townsjson.objects.masscountyGeo.geometries);
      				var rails = topojson.feature(railjson, railjson.objects.trainsGeoJSON).features;
						g.selectAll("path")
							.data(towns)
							.enter().append("path")
							.attr("class", function(d) { return "towns " + d.id;})
							.attr("clip-path", "url(#chart-area)") 
						    .attr("d", path)
						    .style("fill","#CCFF99")
						   //.style("fill", function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return towns[n].color; }) + 1 | 0); })
						    .style("opacity", 0.75)
						    .style("stroke","grey")
						    .style("stroke-width","0.5px");
						
						g.selectAll(".raillines")
							.data(rails)
							.enter().insert("path")
							.attr("class", function(d) { return "raillines " + d.id; })
							.attr("clip-path","url(#chart-area)")
				  			.attr("d",path)
				  			.style("fill","none")
				  			.style("opacity",0.5)
				  		//	.style("stroke","#660000")
				  		//	.style("stroke-width","3px")
				  			.on("click",clickroute);
				  		
						g.selectAll("circle")
						   .data(stations)
						   .enter()
						   .append("circle")
						   .attr("cx", function(d) {
							   return projection([d.stop_lon, d.stop_lat])[0];
						   })
						   .attr("cy", function(d) {
							   return projection([d.stop_lon, d.stop_lat])[1];
						   })
						   .attr("r", 2.5)
						   .style("fill", "blue")
						   .style("opacity", 0.75)
						   .on("click",clickstation)
						   .on("dblclick",unclickstation);
					

	      				/*raillines
	      				  .on("mousemove", function(d,i) {
					      	d3.select(this)
					      		.style("stroke","#6666FF").style("stroke-width","7px");
					      	raillines.on("mouseout",  function(d,i) {
	        				d3.select(this).style("stroke","#660000").style("stroke-width","3px");
	      				  });
					      });*/

				};

			d3.select(self.frameElement).style("height", h + "px");
			function clickstation() {
					      	d3.select(this).style("fill","red").attr("r", 5);

					      };
					    function unclickstation() {
	        				d3.select(this).style("fill","blue").attr("r", 2.5);
	      				  };
			function clickroute(d) {
				  if (active === d) return reset();
				  g.selectAll(".active").classed("active", false);
				  d3.select(this).classed("active", active = d);
				 // g.selectAll(".stations").classed("clickable", true);
				  var b = path.bounds(d);
				  g.transition().duration(750).attr("transform",
				      "translate(" + projection.translate() + ")"
				      + "scale(" + .95 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h) + ")"
				      + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");
				}

				function reset() {
				  g.selectAll(".active").classed("active", active = false);
				  //g.selectAll("clickable",false)
				  g.transition().duration(750).attr("transform", "");
				}

			var chart = $("#chart-area"),
			aspect = container.width() / container.height();

			$(window).on("resize", function() {
				var targetWidth = container.width();
				svg.attr("width", targetWidth);
				chart.attr("width", targetWidth);
				svg.attr("height", Math.round(targetWidth / aspect))
				chart.attr("height", Math.round(targetWidth / aspect));
			}).trigger("resize");

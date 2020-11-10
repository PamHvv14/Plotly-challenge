function buildData(id) {
    d3.json("samples.json").then(function(data){
      var metadata = data.metadata;
      var filteredData = metadata.filter(s => s.id.toString() === id)[0];
      var sample_metadata = d3.select("#sample-metadata");
      sample_metadata.html("");

      Object.entries(filteredData).forEach((key) => {
        sample_metadata.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");  

        });
    });
}

function buildCharts(){
  d3.json("samples.json").then(function(data) {

    var x_values = data.otu_ids;
    var y_values = data.sample_values;
    var m_size = data.sample_values;
    var m_colors = data.otu_ids; 
    var t_values = data.otu_labels;

    var trace1 = {
      x: x_values,
      y: y_values,
      text: t_values,
      mode: 'markers',
      marker: {
        color: m_colors,
        size: m_size
      } 
    };
  
    var data = [trace1];

    var layout = {
      xaxis: { title: "OTU ID"},
    };

    Plotly.newPlot('bubble', data, layout);
   

    // BAR CHART
    d3.json("samples.json").then(function(data) {  
      var bar_data =[
        {
          y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
          x:values.slice(0,10).reverse(),
          text:labels.slice(0,10).reverse(),
          type:"bar",
          orientation:"h"
        }
      ];
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };
      Plotly.newPlot("bar", bar_data, barLayout);

    });
  });  
}

function initFunction(){
    d3.json("samples.json").then((data) => {
        console.log(data);
        var selection = d3.select("#selDataset");
        Object.entries(data.names).forEach(([index,value]) => {
            selection.append("option").text(value);
        })
        buildCharts(data.names[0]);
        buildData(data.names[0]);
    });
}

function filterChange(sample){
    buildCharts(sample);
    buildData(sample);
}

initFunction();
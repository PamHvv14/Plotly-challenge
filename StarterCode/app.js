function buildData(id) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      console.log(metadata);
      var filteredData = metadata.filter(s => s.id.toString() === id)[0];
      var sample_metadata = d3.select("#sample-metadata");
      sample_metadata.html("");

      Object.entries(filteredData).forEach((key) => {
        sample_metadata.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");  

        });
    });
}

function buildCharts(sample){
  d3.json("samples.json").then((data) => {
    console.log("check here");
    console.log(data);
    var samples = data.samples.filter(s => s.id == sample)[0];
    var otu_ids = samples.otu_ids;
    var sample_values = samples.sample_values;
    var t_values = samples.otu_labels;

    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: t_values,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      } 
    };
  
    var bubbleData = [trace1];

    var layout = {
      xaxis: { title: "OTU ID"},
    };

    Plotly.newPlot('bubble', bubbleData, layout);
   
    var bar_data =[
      {
        y:otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        x:sample_values.slice(0,10).reverse(),
        text:t_values.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"
      }
    ]
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
      };
    Plotly.newPlot("bar", bar_data, barLayout);

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

function optionChanged(sample){
    buildCharts(sample);
    buildData(sample);
}

initFunction();
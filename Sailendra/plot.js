
var url1 =  "/exports/total/"
var url2 =  "/imports/total/"
TexportMoValue=[]
TexportPeriod=[]
TimportMoValue=[]
TimportPeriod=[]

d3.json(url1).then(function(data) {
    data.forEach(d => {
      
      TexportMoValue.push(d.MoValue),
      TexportPeriod.push(d.Period)
    })
        });

d3.json(url2).then(function(data) {
    data.forEach(d => {
    //   console.log(d.MoValue);
      TimportMoValue.push(d.MoValue),
      TimportPeriod.push(d.Period)
    }) 
});  

console.log(TimportMoValue);

var bar1 = {
  x: TexportPeriod,
  y: TexportMoValue,
  type: 'bar',
  name: '$ Export',
  marker: {
    color: 'rgb(0,0,255)',
    opacity: 0.7,
  }
};

var bar2 = {
  x: TimportPeriod,
  y: TimportMoValue,
  type: 'bar',
  name: '$ Import',
  marker: {
    color: 'rgb(255,0,0)',
    opacity: 0.5
  }
};

var data = [bar1, bar2];

var layout = {
  title: 'US Export & Import',
  "titlefont": {
    "size": 30,
  },
  xaxis: {
    tickangle: -45,
    bargap: 0.001,
  },
  
  barmode: 'stack'
};

Plotly.newPlot('plot', data, layout);
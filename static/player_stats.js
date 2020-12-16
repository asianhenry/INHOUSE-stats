console.log(player_stats)

var id = player_stats['id']
var games = player_stats['games_played']
var wins = player_stats['wins']
var loss = player_stats['losses']
var wr = player_stats['win_pct']
var kda = player_stats['kda']
var cs = player_stats['avg_cs']
var fb = player_stats['first_bloods']
var dmg_shar = player_stats['avg_dmg']

document.getElementById('player_user_id').innerHTML = `${id} player stats`;
document.getElementById('games').innerHTML = `Games Played: ${games}`;
document.getElementById('wins').innerHTML = `Wins: ${wins}`;
document.getElementById('loss').innerHTML = `Losses: ${loss}`;
document.getElementById('wr').innerHTML = `Win Rate: ${wr}%`;
document.getElementById('kda').innerHTML = `Total KDA: ${kda}`;
document.getElementById('cs').innerHTML = `Average CS / min: ${cs}`;
document.getElementById('fb').innerHTML = `First Bloods: ${fb}`;
document.getElementById('dmg').innerHTML = `Average Damage Share: ${dmg_share}%`;


// CHAMPION BAR CHART

var champs = player_stats["champs"];

function foo(arr) {
  var a = [],
    b = [],
    prev;

  arr.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  return [a, b];
}

var result = foo(champs);
 // console.log('[' + result[0] + ']','[' + result[1] + ']')



function dict([arr1, arr2]) {
	var champ_dict = {}
	
	 for(var i = 0; i < arr1.length; i++) {
		 
		 champ_dict[arr1[i]] = arr2[i]
		  
	 }

return champ_dict	
}


var sorted = dict(foo(champs));
console.log(sorted);


var items = Object.keys(sorted).map(function(key) {
  return [key, sorted[key]];
});

// Sort the array based on the second element
items.sort(function(first, second) {
  return second[1] - first[1];
});

// console.log(items)

var champ_count = []
var champ_name = []


for (var i = 0; i < items.length; i++) {

      champ_name.push(items[i][0]);
      champ_count.push(items[i][1]);
  }

// console.log(champ_name);
// console.log(champ_count);


champ_name_bar = []
for (var i = 0; i < champ_name.length; i++) {

      champ_name_bar.push(`${champ_name[i]} `);
     
  }


var data = [
  {
	type: 'bar',
	orientation: 'h',
    x: champ_count,
	y: champ_name_bar,
	width: .5,
      marker: {
            color: "#1E90FF"
          }
  }
];


 var layout = {
        
       
        title: {text: "Champions Played" ,
        font: {
        color: "white",
		size:25
        }},
		legend:{
			font: {
        color: "white"
        }
			
		},
        xaxis: { title: {text: "",  font: {
        color: "white",
		
		
        },
				}, 
        tickfont: {
        color: "#FFFFFF",
    },
	dtick: 1,
    showgrid: false


    },
        yaxis:{
		autorange: 'reversed',
		showgrid: false,
		tickfont: {
        color: "#FFFFFF"},
		dtick: 0.1
	},
   
        // hovermode:'closest',
        plot_bgcolor :'rgba(0,0,0,0)',
        paper_bgcolor: "rgba(0,0,0,0)"
};



Plotly.newPlot('champBar', data, layout);



// END CHAMPION BAR CHART










//Pie Chart





var roles = player_stats["roles"];



var role_result = foo(roles);
 // console.log('[' + result[0] + ']','[' + result[1] + ']')



function roledict([arr1, arr2]) {
	var role_dict = {}
	
	 for(var i = 0; i < arr1.length; i++) {
		 
		 role_dict[arr1[i]] = arr2[i]
		  
	 }

return role_dict	
}


var sorted_roles= roledict(foo(roles));
console.log(sorted_roles);


var role_items = Object.keys(sorted_roles).map(function(key) {
  return [key, sorted_roles[key]];
});

// Sort the array based on the second element
role_items.sort(function(first, second) {
  return second[1] - first[1];
});

console.log(role_items)

var role_count = []
var role_name = []
var pull_values = []




for (var i = 0; i < role_items.length; i++) {

      role_name.push(role_items[i][0]);
      role_count.push(role_items[i][1]);
	    if (i == 0) {
      pull_values.push(.15);
      
    } else {
      pull_values.push(0)
	}
	  
	  
	  
  }

var pie_data = [{
  type: "pie",
  values: role_count,
  labels: role_name,
  textfont: {
          
          size: 12,
          color: "white"
        },
 
  pull: pull_values ,
  textinfo: "label+percent",
  textposition: "outside",
  // automargin: true
  hoverinfo: 'label+percent',
  
   marker: {
	   
	colors: ['#1e90ff', '#abcdef', '#1f75fe' , '#0fc0fc' , '#0000cd' ,'#CAE1FF'  ,'#26619c' , '#80daeb' ,'#273be2'  ,'#00bfff'],   
    line: {
        color: 'white',
        width: 2
    },
  
  
}}]


var pie_layout = {
	
	title: {text: "Roles Played" ,
        font: {
			size:25,
        color: "white"
        }},

  // margin: {"t": 0, "b": 0, "l": 0, "r": 0},
  showlegend: false,
  paper_bgcolor: 'rgba(0,0,0,0)'
  
  }
  
  var config = {responsive: true}

Plotly.newPlot('role-pie', pie_data, pie_layout, config)

































var Twit = require('twit');

var config = require('./config.js'); 

var express = require('express');
const app = express();
app.use(express.static('static_files'));



var T = new Twit(config);

//random number generator
	function getRndInteger(min, max) {
		minn = 1000*min;
		maxx = 1000*max;
	  return (Math.floor(Math.random() * (maxx - minn + 1) ) + minn)/1000;
	}

//tweets based on location/geocode provided by us 

// T.get('search/tweets', { geocode:'26.8492251,74.2055586,20km' ,count: 10 ,result_type:'mixed'  }, function(err, data, response) {
//   console.log(data)
// });


// return trend tweets based on woied code(yahooo geo code stuff) 

	// var trend;
	app.locals.trending = [];
T.get('trends/place',{ id:2295401 }, function(err, trend_data, response){

 
	var trend = trend_data[0].trends;
	for (var i = 0; i < trend.length; i++) {
		if(trend[i].tweet_volume>0){
			trend[i].latitude = 26.9124+getRndInteger(-3,3);
			trend[i].longitude = 75.7873+getRndInteger(-3,3);
			app.locals.trending.push(trend[i]);
			console.log(app.locals.trending)

		}
	}
	
});

app.get('/tag', (req,res)=>{
	res.send(app.locals.trending);
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
var Twit = require('twit');

var config = require('./config.js'); 

var express = require('express');
const app = express();
app.use(express.static('static_files'));



var T = new Twit(config);

//tweets based on location/geocode provided by us 

// T.get('trends/closest', { geocode:'26.8492251,74.2055586' }, function(err, data, response) {
//   console.log(data)
// });


// return trend tweets based on woied code(yahooo geo code stuff) 
// T.get('trends/available',{},function(err,data,response){
// 	console.log(data);
// })
	
	 T.get('trends/place',{ id:2295401 }, function(err, trend_data , response){
	 	
	 app.locals.tdata = trend_data[0].trends;
 
	// var trend = trend_data[0].trends;
// 	for (var i = 0; i < trend.length; i++) {
// 		console.log(trend[i]);
// 	}
 });

	 

app.get('/tag', (req,res)=>{
	res.send(app.locals.tdata);
});

app.post('/cord', (req,res)=>{
	console.log(req.body);
});

//starting nodejs server on defined port 
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
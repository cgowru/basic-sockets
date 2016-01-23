var moment =  require('moment');

// What time is it right now
var now = moment();

// basic time stamp
console.log(now.format());

// First arg is a String
// visit moment js for this format String
console.log(now.format('h:mm a'));

console.log(now.subtract(1,'year').format('MMM Do YYYY, h:mm a -- X -- x'));	


var timestamp = now.valueOf();
var timestampMoment = moment.utc(timestamp);


console.log("utc time :"+timestampMoment.format('h:mm a'));

console.log("local time :"+timestampMoment.local().format('h:mm a'));
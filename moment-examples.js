var moment =  require('moment');

// What time is it right now
var now = moment();

// basic time stamp
console.log("moment js date : "+now.format());

// First arg is a String
// visit moment js for this format String
console.log('moment js formated time : '+now.format('h:mm a'));

console.log('moment js time in seconds -- millis: '+now.format('X -- x'));	


var timestamp = now.valueOf();
var timestampMoment = moment.utc(timestamp);


console.log("utc time :"+timestampMoment.format('h:mm a'));

console.log("local time :"+timestampMoment.local().format('h:mm a'));
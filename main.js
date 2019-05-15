
var possibleChars = 'ЙЦУКЕНГШЩЗХФІВАПРЛДЖЯЧСМИТБЮ';
var maxTrainCount = 2*(cities.length*(cities.length-1)/2);
var schedule = [];
function Train (trainName, dep, arr, depDay, arrTime, dist, mTime, cost) {
	this.train = trainName;
	this.departure = dep;
	this.arrival = arr;
	this.departureDay = depDay;
	this.arrivalDay = arrTime;
	this.distance = dist;
	this.moveTime = mTime;
	this.ticketCost = cost;
	this.sadlk = function () {

	}
}
function toLocaleString() {
	var a = 10;
	function () {
		
	}
}

function getRandom(min, max) {
  return Math.floor( Math.random() * (max - min) + min );    //random
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())); //randomDate
}

function generate () {
	var userTrainCount = prompt("Enter the train count, please:");
	if (userTrainCount > maxTrainCount){userTrainCount = maxTrainCount;}
		for (var i = 0; i < userTrainCount; i++) {
	schedule.push(generateTrain());
	console.log(schedule[i]);

	var tableBody=document.getElementById("tableBody");
		var newRow=document.createElement("tr");

		var newCell=document.createElement("td");
			newCell.innerHTML = schedule[i].train;
			newRow.appendChild(newCell);

		var newCell=document.createElement("td");
			newCell.innerHTML = schedule[i].departure;
			newRow.appendChild(newCell);

		var newCell=document.createElement("td");
			newCell.innerHTML = schedule[i].arrival;
			newRow.appendChild(newCell);

		var newCell=document.createElement("td");
			newCell.innerHTML = schedule[i].departureDay.toLocaleString("ru")
			newRow.appendChild(newCell);
 
		var newCell=document.createElement("td");
			newCell.innerHTML = schedule[i].arrivalDay.toLocaleString('ru');
			newRow.appendChild(newCell);

		var newCell=document.createElement("td");
			newCell.innerHTML = schedule[i].ticketCost + ' UAH';
			newRow.appendChild(newCell);

		var newCell=document.createElement("td"); 
	      	newCell.dataset.row = i+'-soon';
	      	newCell.className = "soon";
	      	newRow.appendChild(newCell);
			tableBody.appendChild(newRow);
	}
} 

function generateTrain() {

	var depCity = getRandom(0, cities.length - 1); //random departureCity
	var arrCity;
	do {
	  arrCity = getRandom(0, cities.length - 1);
	} while (arrCity == depCity);  //random arrivalCity
	var name = getRandom(100, 999) + possibleChars.charAt(getRandom(0, possibleChars.length - 1)); //trainName
	var distance = distanceArr[depCity][arrCity]; //distance
	var depDay = randomDate(new Date(), new Date("May 15, 2019 21:08:00")); //departure day
	var speed = getRandom(80, 120);
	var moveTime = Math.round(distance/speed);
	var cost = (moveTime * 40.251).toFixed(2);
	var arrTime = new Date(depDay.getTime()); //arrival time
	arrTime.setHours(arrTime.getHours() + moveTime); //adding time
	var myTrain = new Train (name, cities[depCity], cities[arrCity], depDay, arrTime, distance, moveTime, cost);  //object
	var dump = JSON.stringify(schedule, null, 10);
	document.getElementById('container').innerHTML = '<a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(dump) + '" download="schedule.txt">download JSON</a>';
	return myTrain;	

}

setInterval(function(){
  var soonArr = document.getElementsByClassName('soon');

    for (var i = 0; i < soonArr.length; i++) {
      var number = soonArr[i].dataset.row.split('-')[0];
      var diff = schedule[number].departureDay-(new Date());
   
        if(diff <= 0){
          document.getElementsByClassName('soon')[i].innerHTML =  "В дорозі";
        } 
          else {
          diff/=1000;
          var hour = Math.floor(diff/60/60).toString();
          hour = (hour.length < 2?"0":"")+hour;
          diff %= 60*60;
          var minutes = Math.floor(diff/60).toString();
          minutes = (minutes.length <2?"0":"")+minutes;
          diff %= 60;
          var seconds = diff.toString().substr(1, 1);
          seconds = (seconds.length <2?"0":"")+seconds;
          document.getElementsByClassName('soon')[i].innerHTML = (hour+":"+minutes + ":" + seconds);
      }
    }
    
	},1000);
	
	




//Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
console.log("Canvas Created");

//Keys
document.body.addEventListener("keydown", keyDown, false);
document.body.addEventListener("keyup", keyUp, false);

var defaults = true; //If true, skips the alert setup process.

var team1;
var team2;
var ui;

var time = 0;

var windowWidth;
var windowHeight;

//Either 1 or 2, depending on which team has the ball.
var possession;

function resize(){
	windowWidth = window.innerWidth || document.body.clientWidth;
	windowHeight =  window.innerHeight || document.body.clientHeight;
	
	canvas.width = windowWidth; //Change canvas size to window size
	canvas.height = windowHeight;
    
    document.body.style.overflow = 'hidden';
    
    ui.update();
}

window.addEventListener('resize', resize);

//Happens when page loads
function init(){
    windowWidth = window.innerWidth || document.body.clientWidth;
	windowHeight =  window.innerHeight || document.body.clientHeight;
	
	canvas.width = windowWidth; //Change canvas size to window size
	canvas.height = windowHeight;
    
    document.body.style.overflow = 'hidden';
    
    setUp();
    
    ui = new UI();
    console.log("UI Initialized");
    
    ui.update();
    ui.clock();
    console.log("First Refresh");
    console.log("");
}

function setUp(){
    if (defaults == false){
        name1 = prompt("Enter the first team's name.");
        score1 = parseInt(prompt("Enter the amount of points the team starts with."));
        turnovers1 = parseInt(prompt("Enter the amount of turnovers the team starts with."));
        fouls1 = parseInt(prompt("Enter the amount of fouls the team starts with."));
        team1 = new Team(name1, score1, turnovers1, fouls1);

        name2 = prompt("Enter the second team's name.");
        score2 = parseInt(prompt("Enter the amount of points the team starts with."));
        turnovers2 = parseInt(prompt("Enter the amount of turnovers the team starts with."));
        fouls2 = parseInt(prompt("Enter the amount of fouls the team starts with."));
        team2 = new Team(name2, score2, turnovers2, fouls2);

        minutes = parseInt(prompt("Enter the amount of minutes in the game."));
        seconds = parseInt(prompt("Enter the amount of seconds in the game."));
        time = minutes*60+seconds;
    }else{
        team1 = new Team("Siena", 0, 0, 0);
        team2 = new Team("Monmouth", 0, 0, 0);
        time = 20*60+0;
    }
    
}

function UI(){
	this.mouseX;
	this.mouseY;
	this.mousePressed = false;
    
    this.nameFont = 40;
    this.editNameFont = false;
    
    this.scoreFont = 60;
    this.editScoreFont = false;
    
    this.timerFont = 60;
    this.editTimerFont = false;
    
    this.statFont = 20;
    this.editStatFont = false;
    
    this.clockRunning = false;
    
    this.showStats = true;
    
    //Each array index corresponds to a color
    this.colorsRed =   [255, 110, 117, 255, 255, 255, 117, 195, 255, 200];
    this.colorsGreen = [255, 255, 190, 96,  178, 255, 158, 117, 117, 200];
    this.colorsBlue =  [255, 66,  255, 96,  96,  96,  255, 255, 213, 200];
    
    this.colorIndex = 0;
	UI.prototype.update = function(){
        ctx.clearRect(0, 0, windowWidth, windowHeight);
        
        //Background
        ctx.fillStyle = "rgb(" + this.colorsRed[this.colorIndex] + "," + this.colorsGreen[this.colorIndex] + "," + this.colorsBlue[this.colorIndex] + ")";
        ctx.fillRect(0, 0, windowWidth, windowHeight);
        
        this.team1();
        this.team2();
        
        ui.drawClock();
	}
    UI.prototype.clock = function(){
        minutes = Math.floor(time / 60);
        seconds = time % 60;
                
        if (time > 0){
            if (ui.clockRunning == true){
                setTimeout(ui.clock, 1000);
                
                time -= 1;
            }

            ui.update();
            
        }
    }
    UI.prototype.drawClock = function(){
        minutes = Math.floor(time / 60);
        seconds = time % 60;
        
        if (seconds < 10){
            seconds = "0" + seconds; 
        }
        
        font = this.timerFont;
        ctx.font = font + "px Arial";
        clockString = minutes + ":" + seconds;
        clockWidth = ctx.measureText(clockString).width;
        clockX = Math.round((windowWidth/2)-(clockWidth/2));
        clockY = Math.round((windowHeight/2)-(font/2));
        ctx.fillStyle = "black";
        ctx.fillText(clockString, clockX, clockY);
    }
    UI.prototype.team1 = function(){
        //Name
        ctx.fillStyle = "black";
        ctx.font = this.nameFont + "px Arial";
        nameWidth = ctx.measureText(team1.name).width;
        nameX = Math.round((windowWidth*(1/4)) - (nameWidth/2));
        nameY = Math.round((windowHeight*(1/6)) - (this.nameFont/2));
        ctx.fillText(team1.name, nameX, nameY);
        
        //Score
        ctx.font = this.scoreFont + "px Arial";
        scoreWidth = ctx.measureText(team1.score).width;
        scoreX = Math.round((windowWidth*(1/4)) - (scoreWidth/2));
        scoreY = nameY + this.scoreFont;
        ctx.fillText(team1.score, scoreX, scoreY);
        
        //Made
        if (team1.made == false){
            ctx.fillStyle = "red";
            madeWidth = nameWidth;
            madeX = nameX;
            madeY = scoreY + 10;
            ctx.fillRect(madeX, madeY, nameWidth, 2);
        }
        
        
        if (this.showStats == true){
            //Stats

            var maxWidth = 0; //Determines the width of the line
            var lineX = 0; //And the x

            //1s
            ctx.fillStyle = "black";
            made1s = team1.made1s;
            total1s = team1.made1s + team1.missed1s;

            if (total1s == 0){
                text = "1 Point: " + made1s + "/" + total1s;
            }else{
                text = "1 Point: " + made1s + "/" + total1s + " " + Math.round((made1s/total1s)*100) + "%";
            }

            ctx.font = this.statFont + "px Arial";
            statWidth = ctx.measureText(text).width;
            statX = Math.round((windowWidth*(1/4)) - (statWidth/2));
            stat1Y = (windowHeight*(11/16));
            ctx.fillText(text, statX, stat1Y);

            maxWidth = statWidth;
            lineX = statX;

            //2s
            ctx.fillStyle = "black";
            made2s = team1.made2s;
            total2s = team1.made2s + team1.missed2s;

            if (total2s == 0){
                text = "2 Point: " + made2s + "/" + total2s;
            }else{
                text = "2 Point: " + made2s + "/" + total2s + " " + Math.round((made2s/total2s)*100) + "%";
            }

            ctx.font = this.statFont + "px Arial";
            statWidth = ctx.measureText(text).width;
            statX = Math.round((windowWidth*(1/4)) - (statWidth/2));
            stat2Y = stat1Y + this.statFont;
            ctx.fillText(text, statX, stat2Y);

            if (statWidth > maxWidth){
                maxWidth = statWidth;
                lineX = statX;
            }

            //3s
            ctx.fillStyle = "black";
            made3s = team1.made3s;
            total3s = team1.made3s + team1.missed3s;

            if (total3s == 0){
                text = "3 Point: " + made3s + "/" + total3s;
            }else{
                text = "3 Point: " + made3s + "/" + total3s + " " + Math.round((made3s/total3s)*100) + "%";
            }

            if (statWidth > maxWidth){
                maxWidth = statWidth;
                lineX = statX;
            }

            ctx.font = this.statFont + "px Arial";
            statWidth = ctx.measureText(text).width;
            statX = Math.round((windowWidth*(1/4)) - (statWidth/2));
            stat3Y = stat2Y + this.statFont;
            ctx.fillText(text, statX, stat3Y);

            //Turnovers
            ctx.fillStyle = "black";
            text = "Turnovers: " + team1.turnovers;

            ctx.font = this.statFont + "px Arial";
            statWidth = ctx.measureText(text).width;
            statX = Math.round((windowWidth*(1/4)) - (statWidth/2));
            stat4Y = stat3Y + this.statFont;
            ctx.fillText(text, statX, stat4Y);

            if (statWidth > maxWidth){
                maxWidth = statWidth;
                lineX = statX;
            }

            //Fouls
            ctx.fillStyle = "black";
            text = "Fouls: " + team1.fouls;

            ctx.font = this.statFont + "px Arial";
            statWidth = ctx.measureText(text).width;
            statX = Math.round((windowWidth*(1/4)) - (statWidth/2));
            stat5Y = stat4Y + this.statFont;
            ctx.fillText(text, statX, stat5Y);

            if (statWidth > maxWidth){
                maxWidth = statWidth;
                lineX = statX;
            }

            //Line
            ctx.fillRect(lineX, stat1Y - this.statFont, maxWidth, 2);
        }
    }
    UI.prototype.team2 = function(){
        //Name
        ctx.fillStyle = "black";
        ctx.font = this.nameFont + "px Arial";
        nameWidth = ctx.measureText(team2.name).width;
        nameX = Math.round((windowWidth*(3/4)) - (nameWidth/2));
        nameY = Math.round((windowHeight*(1/6)) - (this.nameFont/2));
        ctx.fillText(team2.name, nameX, nameY);
        
        //Score
        ctx.font = this.scoreFont + "px Arial";
        scoreWidth = ctx.measureText(team2.score).width;
        scoreX = Math.round((windowWidth*(3/4)) - (scoreWidth/2));
        scoreY = nameY + this.scoreFont;
        ctx.fillText(team2.score, scoreX, scoreY);
        
        //Made
        if (team2.made == false){
            ctx.fillStyle = "red";
            madeWidth = nameWidth;
            madeX = nameX;
            madeY = scoreY + 10;
            ctx.fillRect(madeX, madeY, nameWidth, 2);
        }
        
        if (this.showStats == true){
        
            //Stats

            var maxWidth = 0; //Determines the width of the line
            var lineX = 0; //And the x

            //1s
            ctx.fillStyle = "black";
            made1s = team2.made1s;
            total1s = team2.made1s + team2.missed1s;

            if (total1s == 0){
                text = "1 Point: " + made1s + "/" + total1s;
            }else{
                text = "1 Point: " + made1s + "/" + total1s + " " + Math.round((made1s/total1s)*100) + "%";
            }

            ctx.font = this.statFont + "px Arial";
            statWidth = ctx.measureText(text).width;
            statX = Math.round((windowWidth*(3/4)) - (statWidth/2));
            stat1Y = (windowHeight*(11/16));
            ctx.fillText(text, statX, stat1Y);

            maxWidth = statWidth;
            lineX = statX;


            //2s
            ctx.fillStyle = "black";
            made2s = team2.made2s;
            total2s = team2.made2s + team2.missed2s;

            if (total2s == 0){
                text = "2 Point: " + made2s + "/" + total2s;
            }else{
                text = "2 Point: " + made2s + "/" + total2s + " " + Math.round((made2s/total2s)*100) + "%";
            }

            ctx.font = this.statFont + "px Arial";
            statWidth = ctx.measureText(text).width;
            statX = Math.round((windowWidth*(3/4)) - (statWidth/2));
            stat2Y = stat1Y + this.statFont;
            ctx.fillText(text, statX, stat2Y);

            if (statWidth > maxWidth){
                maxWidth = statWidth;
                lineX = statX;
            }

            //3s
            ctx.fillStyle = "black";
            made3s = team2.made3s;
            total3s = team2.made3s + team2.missed3s;

            if (total3s == 0){
                text = "3 Point: " + made3s + "/" + total3s;
            }else{
                text = "3 Point: " + made3s + "/" + total3s + " " + Math.round((made3s/total3s)*100) + "%";
            }

            ctx.font = this.statFont + "px Arial";
            statWidth = ctx.measureText(text).width;
            statX = Math.round((windowWidth*(3/4)) - (statWidth/2));
            stat3Y = stat2Y + this.statFont;
            ctx.fillText(text, statX, stat3Y);

            if (statWidth > maxWidth){
                maxWidth = statWidth;
                lineX = statX;
            }

            //Turnovers
            ctx.fillStyle = "black";
            text = "Turnovers: " + team2.turnovers;

            ctx.font = this.statFont + "px Arial";
            statWidth = ctx.measureText(text).width;
            statX = Math.round((windowWidth*(3/4)) - (statWidth/2));
            stat4Y = stat3Y + this.statFont;
            ctx.fillText(text, statX, stat4Y);

            if (statWidth > maxWidth){
                maxWidth = statWidth;
                lineX = statX;
            }

            //Fouls
            ctx.fillStyle = "black";
            text = "Fouls: " + team2.fouls;

            ctx.font = this.statFont + "px Arial";
            statWidth = ctx.measureText(text).width;
            statX = Math.round((windowWidth*(3/4)) - (statWidth/2));
            stat5Y = stat4Y + this.statFont;
            ctx.fillText(text, statX, stat5Y);


            if (statWidth > maxWidth){
                maxWidth = statWidth;
                lineX = statX;
            }


            //Line
            ctx.fillRect(lineX, stat1Y - this.statFont, maxWidth, 2);
        }
    }
    UI.prototype.printStats = function(){
        console.log("");
        console.log(team1.name);
        console.log(team1.score + " Points");
        
        made1s = team1.made1s;
        total1s = team1.made1s + team1.missed1s;
        console.log("1 Point: " + made1s + "/" + total1s + " " + Math.round((made1s/total1s)*100) + "%");
        
        made2s = team1.made2s;
        total2s = team1.made2s + team1.missed2s;
        console.log("2 Point: " + made2s + "/" + total2s + " " + Math.round((made2s/total2s)*100) + "%");
        
        made3s = team1.made3s;
        total3s = team1.made3s + team1.missed3s;
        console.log("3 Point: " + made3s + "/" + total3s + " " + Math.round((made3s/total3s)*100) + "%");
        
        console.log("");
        console.log(team2.name);
        console.log(team2.score + " Points");
        
        made1s = team2.made1s;
        total1s = team2.made1s + team2.missed1s;
        console.log("1 Point: " + made1s + "/" + total1s + " " + Math.round((made1s/total1s)*100) + "%");
        
        made2s = team2.made2s;
        total2s = team2.made2s + team2.missed2s;
        console.log("2 Point: " + made2s + "/" + total2s + " " + Math.round((made2s/total2s)*100) + "%");
        
        made3s = team2.made3s;
        total3s = team2.made3s + team2.missed3s;
        console.log("3 Point: " + made3s + "/" + total3s + " " + Math.round((made3s/total3s)*100) + "%");
        
        console.log("");
    }
    UI.prototype.findFontSize = function(pix, string){
		//Finds ideal font size for amount of pixels you want to fit a string into
		for (var x = 200; x > 1; x --){ //Loop through text fonts 100 - 1
			ctx.font = x + "px Arial";
			if (ctx.measureText(string).width < pix){ //If text size < requested size return it
				return x;
			}
		}
	}
}

//Name: String, team name. Score: Integer, starting amount of points.
function Team(name, score, turnovers, fouls){
    this.name = name;
    this.score = score;
    this.turnovers = turnovers;
    this.fouls = fouls;
    
    this.made1s = 0;
    this.missed1s = 0;
    
    this.made2s = 0;
    this.missed2s = 0;
    
    this.made3s = 0;
    this.missed3s = 0;
    
    this.made = true; //False if 0 is pressed, signifies missed shot.
    
    Team.prototype.addShot = function(points){
        //If shot is made, increment points
        if (this.made == true){
            this.score += points;
            
            if (points == 1){
                this.made1s += 1;
            }
            if (points == 2){
                this.made2s += 1;
            }
            if (points == 3){
                this.made3s += 1;
            }
            console.log(points + " Point shot made by " + this.name);
        }
        
        if (this.made == false){
            if (points == 1){
                this.missed1s += 1;
            }
            if (points == 2){
                this.missed2s += 1;
            }
            if (points == 3){
                this.missed3s += 1;
            }
            console.log(points + " Point shot missed by " + this.name);
        }
        
        //Resets made status
        this.made = true;
    }
}

function keyDown(evt){
  evt.preventDefault();
  set(evt.keyCode);
	evt.stopPropagation();
	return;
}

function keyUp(evt){
  evt.preventDefault();
  unSet(evt.keyCode);
	evt.stopPropagation();
	return;
}

function set(key){
    //O
    if (key == 79){
        possession = 1;
    }
    //P
    if (key == 80){
        possession = 2;
    }
    
    //0
    if (key == 48){
        if (team1.made == true){
            team1.made = false;
        }else{
            team1.made = true;
        }
    }
    //1
    if (key == 49){
        team1.addShot(1);
    }
    //2
    if (key == 50){
        team1.addShot(2);
    }
    //3
    if (key == 51){
        team1.addShot(3);
    }
    
    //0 Numpad or M
    if (key == 96 || key == 77){
        if (team2.made == true){
            team2.made = false;
        }else{
            team2.made = true;
        }
    }
    //1 Numpad or Z
    if (key == 97 || key == 90){
        team2.addShot(1);
    }
    //2 Numpad or X
    if (key == 98 || key == 88){
        team2.addShot(2);
    }
    //3 Numpad or C
    if (key == 99 || key == 67){
        team2.addShot(3);
    }
    //S
    if (key == 83){
        ui.printStats();
    }
    //G
    if (key == 71){
        if (ui.clockRunning == false){
            ui.clockRunning = true;
            ui.clock();
            console.log("Game clock started")
        }else{
            ui.clockRunning = false;
            console.log("Game clock paused")
        }
    }
    //Q
    if (key == 81){
        ui.editNameFont = true;
    }
    //W
    if (key == 87){
        ui.editScoreFont = true;
    }
    //E
    if (key == 69){
        ui.editTimerFont = true;
    }
    //R
    if (key == 82){
        ui.editStatFont = true;
    }
    //^
    if (key == 38){
        if (ui.editNameFont == true){
            ui.nameFont += 1;
        }
        if (ui.editScoreFont == true){
            ui.scoreFont += 1;
        }
        if (ui.editTimerFont == true){
            ui.timerFont += 1;
        }
        if (ui.editStatFont == true){
            ui.statFont += 1;
        }
    }
    //\/
    if (key == 40){
        if (ui.editNameFont == true && ui.nameFont > 0){
            ui.nameFont -= 1;
        }
        if (ui.editScoreFont == true && ui.scoreFont > 0){
            ui.scoreFont -= 1;
        }
        if (ui.editTimerFont == true && ui.timerFont > 0){
            ui.timerFont -= 1;
        }
        if (ui.editStatFont == true && ui.statFont > 0){
            ui.statFont -= 1;
        }
    }
    //-
    if (key == 189){
        team1.turnovers += 1;
        console.log("Turnover by " + team1.name);
    }
    //=
    if (key == 187){
        team1.fouls += 1;
        console.log("Foul by " + team1.name);
    }
    //Numpad - ,
    if (key == 109 || key == 188){
        team2.turnovers += 1;
        console.log("Turnover by " + team2.name);
    }
    //Numpad + or .
    if (key == 107 || key == 190){
        team2.fouls += 1;
        console.log("Foul by " + team2.name);
    }
    //L
    if (key == 76){
        if (ui.showStats == false){
            ui.showStats = true;
        }else{
            ui.showStats = false;
        }
    }
    //K
    if (key == 75){
        //Cycles through colors
        if (ui.colorsRed.length - 1 == ui.colorIndex){
            ui.colorIndex = 0;
        }else{
            ui.colorIndex += 1;
        }

    }
    ui.update();
}
    
function unSet(key){
    //Q
    if (key == 81){
        ui.editNameFont = false;
    }
    //W
    if (key == 87){
        ui.editScoreFont = false;
    }
    //E
    if (key == 69){
        ui.editTimerFont = false;
    }
    //R
    if (key == 82){
        ui.editStatFont = false;
    }
}

//Mouse
function getMousePos(evt) {
	var rect = bCanvas.getBoundingClientRect();

	ui.mouseX = evt.clientX - rect.left;
	ui.mouseY = evt.clientY - rect.top;

}


//Mouse click event listeners
function mouseDown(evt){
	ui.mousePressed = true;
}
function mouseUp(evt){
	ui.mousePressed = false;
}


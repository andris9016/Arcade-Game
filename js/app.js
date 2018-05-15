//Declaring variables for popups
let loseGame = document.getElementById('game-over');
let winGame = document.getElementById('win-game');
let playAgain = document.getElementById('play-again');
let tryAgain = document.getElementById('try-again');
let closeIcon1 = document.querySelector('.close-icon1');
let closeIcon2 = document.querySelector('.close-icon2');

//Variable for count the score
let points = 0;

// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    
	//Variables for X and Y axis
	this.x = x;
	this.y = y;
	//Variable for speed
	this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}


// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed * dt;
	
	//Update the enemy position and randomize their speed
	if (this.x > 520) {
		this.x = -40;
		this.speed = 150 + Math.ceil(Math.random() * 216);
	}
	
	//Check for collision
	//Original source from
	//https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
	if (player.x < this.x + 70 &&
		player.x + 70 > this.x &&
		player.y < this.y + 60 &&
		player.y + 60 > this.y) {
			player.x = 202;
			player.y = 405;
			allHearts.pop();
			checkHearts();
	}
}

//Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Player class
let Player = function(x, y){
	this.x = x;
	this.y = y;
	this.player = 'images/char-cat-girl.png';
}

Player.prototype.update = function() {
	
}

//Draw player ont the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

//Allows the player to move
Player.prototype.handleInput = function (keyPress) {

	if (keyPress == 'up' && this.y > 0) {
		this.y -= 83;
	}
	
	else if (keyPress == 'down' && this.y < 405) {
		this.y += 83;
	}
	
	else if (keyPress == 'left' && this.x > 0) {
		this.x -= 102;
	}
	
	else if (keyPress == 'right' && this.x < 405) {
		this.x += 102;
	}
	
	//If the player reach the water
	if (this.y < 0) {
		setTimeout(function () {
			player.x = 202;
			player.y = 405;
		}, 100);
		points += 100;
		playerScore.update();
		
		//When the player reach the water 5 times, wint the game
		if (points === 500) {
			win();
		}
	}
}

//Class for displaying the score
let Scores = function(x, y, score) {
	this.x = x;
	this.y = y;
	this.score = 'Score: ' + points;
}

//Show the scores ont the screen
Scores.prototype.render = function() {
	ctx.font = '22px Tahoma, sans-serif';
	ctx.fillStyle = '#fff'
	ctx.fillText(this.score, this.x, this.y);
}

Scores.prototype.update = function() {
	this.score = 'Score: ' + points;
}

// Class for lives
let Lives = function(x, y){
    this.x = x;
    this.y = y
    this.heart = 'images/Heart.png';
}

Lives.prototype.update = function() {
	
}

//Draw hearts on the screen
Lives.prototype.render = function(){
    ctx.drawImage(Resources.get(this.heart), this.x, this.y);
}

//Function to check the lives(hearts)
function checkHearts() {
	if(allHearts.length === 0) {
		gameOver();
	}
}

//function if player win the game
function win() {
	winGame.classList.remove('hidden');
	document.getElementById('myCanvas').style.visibility = 'hidden';
}

//function if the game is over
function gameOver() {
	loseGame.classList.remove('hidden');
	document.getElementById('myCanvas').style.visibility = 'hidden';
}

//function to play again the game
function reloadGame() {
	location.reload(true);
}

// Now instantiate your objects.
let playerScore = new Scores(370, 575);

let heart1 = new Lives(10, 540);
let heart2 = new Lives(40, 540);
let heart3 = new Lives(70, 540);
let allHearts = [heart1, heart2, heart3];

// Place all enemy objects in an array called allEnemies
let enemy1 = new Enemy(-50, 63, 350);
let enemy2 = new Enemy(-50, 147, 150);
let enemy3 = new Enemy(-50, 230, 250);
let allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
let player = new Player(202, 405);

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Event handlers to play the game again
playAgain.addEventListener('click', reloadGame);
tryAgain.addEventListener('click', reloadGame);
closeIcon1.addEventListener('click', reloadGame);
closeIcon2.addEventListener('click', reloadGame);
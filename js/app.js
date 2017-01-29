// Enemies our player must avoid
var Enemy = function() {
    var Row = [55, 138, 221];
    var Speed = Math.floor(Math.random() * 3);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.y = Row[Math.floor(Math.random() * 3)];
    this.speed =  Speed > 0 ? Speed * 100 : (Speed+1) * 100;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    console.log(this.speed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 505) {
        this.x = -700;
        this.speed < 700 ? this.speed += Math.floor(Math.random() * 50) : this.speed -= 200;
        console.log(this.speed);
    }

    //checking Collisions
    if(Math.abs(player.x - this.x) < 70 && Math.abs(player.y - this.y) < 40) {
      player.reset();
      console.log(player.x);
      console.log(this.x);
      
      gameLife.life -= 1;
      console.log(gameLife.life);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  var players = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png','images/char-pink-girl.png'];
  this.playerImage = players[Math.floor(Math.random() * 4)];
  this.x = 202;
  this.y = 392;
  //secret cause of her death
  this.drown = 0;
};

Player.prototype.update = function() {
  this.x = this.x;
  this.y = this.y;


  if (this.y < 60) {
    this.reset();
    this.drown += 1;
  }
};

Player.prototype.reset = function() {
  this.x = 202;
  this.y = 392;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerImage), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch (key) {
  case "left":
    this.x < 100 ? null : this.x = this.x - 101;
    break;
  case "right":
    this.x > 400 ? null : this.x = this.x + 101;
    break;
  case "up":
    this.y = this.y - 83;
    break;
  case "down":
    this.y > 390 ? null : this.y = this.y + 83;
    break;
  }
};


var Rock = function() {
  this.rockImage = 'images/Rock.png';
  this.x = -2000;
  this.y = 392;
  this.speed = 300;
  this.killbyrock = 0;
};

Rock.prototype.update = function(dt) {
  this.x += this.speed * dt;

  if(Math.abs(player.x - this.x) < 70 && Math.abs(player.y - this.y) < 40) {
    //gameLife.life -= 4;
    this.killbyrock += 1;
    player.reset();
  }
};

Rock.prototype.render = function() {
  ctx.drawImage(Resources.get(this.rockImage), this.x, this.y);
};


//Life class
var Life = function() {
  this.lifeImage = 'images/Heart.png';
  this.life = 5;
};

Life.prototype.render = function() {
  var lifePosition = 15;
  for (var i = 0; i < this.life; i++) {
  ctx.drawImage(Resources.get(this.lifeImage), lifePosition, 45, 50, 85);
  lifePosition += 50;
  }

  if (this.life === 0 || player.drown === 3 || rock.killbyrock > 0) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,600,600);

    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText("Game Over", 190,300);
    ctx.save();
  }
};

Life.prototype.decrease = function() {
  if (this.life > 0) {
    this.life -= 1;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(),
    gameLife = new Life(),
    rock = new Rock(),
    allEnemies = [];

for (var i = 0; i < 5; i++) {
  allEnemies.push(new Enemy());
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

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
    console.log(this.speed)
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
        console.log(this.speed)
    }

    //checking Collisions
    if(Math.abs(player.x - this.x) < 70 && Math.abs(player.y - this.y) < 40) {
      player.reset();
      console.log(player.x);
      console.log(this.x);
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
  this.playerImage = 'images/char-horn-girl.png';
  this.x = 202;
  this.y = 392;
}

Player.prototype.update = function() {
  this.x = this.x;
  this.y = this.y;

  if (this.y < 60) {
    this.reset();
  }
}

Player.prototype.reset = function() {
  this.x = 202;
  this.y = 392;
}

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
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(),
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

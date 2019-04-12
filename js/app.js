//random numbers generator
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Enemie class with all methods
class Enemy  {

    constructor() {
      this.sprite = 'images/enemy-bug.png';
      this.speed = random(2,3) / 3;
      this.row = [60,140,230];
      this.x = random(-300,-200);
      this.y = this.row[random(0,2)];
      this.width= 50;
      this.height= 50;
    }

    update(dt) {
      //here is the speed specification for the Enemies
      this.x = this.x + 101 * this.speed * (0.9 + 0.1 * player.level) * dt;
      if (this.x > 505) {
  			allEnemies.push(new Enemy(this.y));
  			allEnemies.splice(allEnemies.indexOf(this), 1);
  		}
    }

    render() {
      //here we render the Enemies
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Player class with all methods
class Player {

  constructor() {
    this.sprite = 'images/char-boy.png';
    this.lifeSprite = 'images/Heart.png';
    this.startLoction();
    this.level = 1;
    this.score = 0;
    this.lifes = 3;
  }

  update() {
    for (const enemie of allEnemies) {
        //here if the player hit the enemie
        //this has been taken from http://blog.sklambert.com/html5-canvas-game-2d-collision-detection/#d-collision-detection
      if (enemie.x < this.x + this.width  && enemie.x + enemie.width  > this.x &&
            enemie.y < this.y + this.height && enemie.y + enemie.height > this.y) {
        // this if the player lost
          this.lost();
  			}
		}

    // this if the player win
    if (this.y < 0) {
      this.win();
    }
  }

  render() {
    // here draw the player
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    //here we draw the text of the level
    ctx.font = 'bold 32px Cute Font';
    ctx.fillText("Level " + this.level, 10, 40);

    //here we draw the score
    ctx.font = 'bold 32px Cute Font';
    ctx.fillText("SCORE : " + this.score, 360, 40);


    //here we draw the life for the player
    let i = this.lifes;
		let x = 467;
		while (i > 0) {
			ctx.drawImage(Resources.get(this.lifeSprite), x, 560, 101 / 4, 171 / 4);
			x -= 25;
			i--;
		}
  }

  handleInput(keyCode) {
    //this where we give the player control to move
    			switch (keyCode) {
    				case "up":
    					this.y = this.y > 0 ? this.y - 83 : this.y;
    					break;
    				case "down":
    					this.y = this.y < 380 ? this.y + 83 : this.y;
    					break;
    				case "left":
    					this.x = this.x > 0 ? this.x - 101 : this.x;
    					break;
    				case "right":
    					this.x = this.x < 404 ? this.x + 101 : this.x;
    					break;
    			}
  }

  // the starting point for the player , and the default size.
  startLoction() {
    this.x = 202;
    this.y = 390;
    this.width= 50;
    this.height= 50;
  }

  // this function when the player win the game.
  win() {
      this.startLoction();
      this.level++;
      this.score+= 100;
  }

  lost() {
    if (this.lifes > 1) {
      this.startLoction();
      this.lifes--;
      this.score -= 50;
    }else {
      // here we rest everything if the player has lost (GAMEOVER)
      this.startLoction();
      this.level = 1;
      this.score = 0;
      this.lifes = 3;
      allEnemies = [];
      for(var i = 0; i < 4; i++) {
      	allEnemies.push(new Enemy);
      }
    }
  }

};

// Declare all objects.
let allEnemies = [];
for(var i = 0; i < 4; i++) {
	allEnemies.push(new Enemy);
}
let player = new Player();

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

var secs, mins, succ = 0,
    fail = 0,
    sec = 0;

//creating the timer
function pad(val) {
    return val > 9 ? val : "0" + val;
}
var timer = setInterval(function() {
    $(".seconds").empty();
    $(".minutes").empty();
    secs = pad(++sec % 60);
    mins = pad(parseInt(sec / 60, 10));
    $(".seconds").append(secs);
    $(".minutes").append(mins);
}, 1000);


// Enemies our player must avoid

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -100;
    this.y = getRanArb(1, 3) * 85;
    this.speed = getRanArb(1, 100) + 200;
    this.sprite = 'images/enemy-bug.png';
};

function getRanArb(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 90, 120);
};

Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = getRanArb(1, 3) * 85;
    this.speed = getRanArb(1, 100) + 200;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 425;
    this.sprite = "images/char-horn-girl.png";
};

Player.prototype.update = function(dt) {
    if (this.y <= 0) {
        $(".successes").empty();
        succ = succ + 1;
        $(".successes").append(succ);
        if (succ == 3) {
            clearInterval(timer); //timerstops
            $('.winModal').css('display', 'flex'); //winmodal displayed
            $('canvas').css('visibility', 'hidden'); //other content hidden
            $('.winMsg').append('CONGRATULATIONS!!! You have won in 3 games in ' + mins + ' mins and ' + secs + ' secs, with ' + fail + ' failures.');
            $('.newGame').on('click', function() { //play again button
                location.reload(true);
            });
        }
        this.reset();
    }
    if (this.y > 425) {
        this.y = 425;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    this.collide();
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 100, 140);
};

Player.prototype.handleInput = function(event) {
    this.userInput = event;
    if (this.userInput === 'left') {
        this.x = this.x - 100;
    } else if (this.userInput === 'right') {
        this.x = this.x + 100;
    } else if (this.userInput === 'up') {
        this.y = this.y - 85;
    } else if (this.userInput === 'down') {
        this.y = this.y + 85;
    }
};

Player.prototype.collide = function() {
    var now = this;
    allEnemies.forEach(function(enemy) {
        if (now.y == enemy.y) {
            if (enemy.x >= now.x - 70 && enemy.x <= now.x + 70) {
                $(".failures").empty();
                fail = fail + 1;
                $(".failures").append(fail);
                now.reset();
            }
        }
    })
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 425;
};



var player = new Player;

var enemy1 = new Enemy;
var enemy2 = new Enemy;
var enemy3 = new Enemy;
var enemy4 = new Enemy;
var enemy5 = new Enemy;
var enemy6 = new Enemy;




var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6]
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
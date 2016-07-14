var FlappyCombat = {}


window.onload = function() {
    FlappyCombat.game = new Phaser.Game(window.innerWidth,
        window.innerHeight,
        Phaser.AUTO,
        '', {
            preload: preload,
            create: create,
            update: update
        }
    );
}

//load resource
var preload = function() {
    FlappyCombat.game.load.image('birdLeftlv1', './images/sprite1.png');
    FlappyCombat.game.load.image('birdRightlv1', './images/sprite1.png');
    FlappyCombat.game.load.image('birdLeftlv2', './images/sprite1.png');
    FlappyCombat.game.load.image('birdRightlv2', './images/sprite1.png');
    FlappyCombat.game.load.image('birdLeftlv3', './images/sprite1.png');
    FlappyCombat.game.load.image('birdRightlv3', './images/sprite1.png');
    FlappyCombat.game.load.image('birdLeftlv4', './images/sprite1.png');
    FlappyCombat.game.load.image('birdRightlv4', './images/sprite1.png');
    FlappyCombat.game.load.image('birdLeftlv5', './images/sprite1.png');
    FlappyCombat.game.load.image('birdRightlv5', './images/sprite1.png');
    FlappyCombat.game.load.image('food', './images/wall_steel.png');
    FlappyCombat.game.load.image('food2', './images/Nintendo-Button-B.png');
    FlappyCombat.game.load.image('barrie', './images/big_explosion_5.png');
    FlappyCombat.game.load.image('background', './images/map.png');
}
var bird;
var numberOfFood = 0;
var create = function() {
    FlappyCombat.game.add.tileSprite(0, 0, 6000, 1000, "background");
    FlappyCombat.game.physics.startSystem(Phaser.Physics.ARCADE);
    FlappyCombat.keyboard = FlappyCombat.game.input.keyboard;
    //FlappyCombat.game.physics.arcade.gravity.y = 10;
    FlappyCombat.birdGroup = FlappyCombat.game.add.physicsGroup();
    FlappyCombat.foodGroup = FlappyCombat.game.add.physicsGroup();
    FlappyCombat.barieGroup = FlappyCombat.game.add.physicsGroup();

    FlappyCombat.game.world.setBounds(0, 0, 6000, 1000);
    bird = new Bird(500, 500, FlappyCombat.birdGroup, 1);
    FlappyCombat.inputController = new InputController(FlappyCombat.keyboard, bird);
    FlappyCombat.game.camera.follow(bird.sprite);
    for (var i = 0; i < 20; i++) {
        new Barrie(FlappyCombat.game.world.randomX, FlappyCombat.game.world.randomY, FlappyCombat.barieGroup);
    }


}


var update = function() {
    if (numberOfFood < 100) {
        new Food(FlappyCombat.game.world.randomX, FlappyCombat.game.world.randomY, FlappyCombat.foodGroup,Math.round(Math.random()));
        numberOfFood ++;
    }

    FlappyCombat.game.physics.arcade.overlap(
        FlappyCombat.birdGroup,
        FlappyCombat.foodGroup,
        onFoodMeetBird,
        null,
        this
    );

    FlappyCombat.game.physics.arcade.overlap(
        FlappyCombat.birdGroup,
        FlappyCombat.barieGroup,
        onBarieMeetBird,
        null,
        this
    );

    FlappyCombat.game.physics.arcade.overlap(
        FlappyCombat.foodGroup,
        FlappyCombat.barieGroup,
        onBarieMeetFood,
        null,
        this
    );

    if (FlappyCombat.inputController) FlappyCombat.inputController.update();
}

/*
 *  HELPER FUNCTIONS
 */


/*
 * PHYSICS EVENTS
 */

var onFoodMeetBird = function(birdSprite, foodSprite) {

    birdSprite.score += foodSprite.score;
    foodSprite.kill();
    numberOfFood--;
    //foodSprite.destroy();
}

var onBarieMeetBird = function(birdSprite, barrieSprite) {
    birdSprite.kill();
    //birdSprite.destroy();
}

var onBarieMeetFood = function(foodSprite, barrieSprite) {
  foodSprite.kill();
  numberOfFood--;
}
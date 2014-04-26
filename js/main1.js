
var game = new Phaser.Game(848, 450, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {
    this.game.load.image('player', 'assets/player.png');
    this.game.load.image('ground', 'assets/dirt1.png');
    this.game.load.image('block', 'assets/block.png');
    this.game.load.image('block_fall', 'assets/block_fall.png');
    this.game.load.image('flag', 'assets/flag.png');
};

// declare global vars here



function create() {
  text = game.add.text(250, 16, '', { fill: '#ffffff' });
  // Capture keys to prevent their default actions in browser
  game.input.keyboard.addKeyCapture([
    Phaser.Keyboard.LEFT,
    Phaser.Keyboard.RIGHT,
    Phaser.Keyboard.UP,
    Phaser.Keyboard.DOWN
  ]);
  this.game.stage.backgroundColor = '#ffaaaa';
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // Create some ground for the player to walk on
  ground = game.add.group();
  for(var x = 0; x < game.width; x += 32) {
    // Add the ground blocks, enable physics on each, make them immovable
    var groundBlock = game.add.sprite(x, this.game.height - 64, 'ground');
    game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
    groundBlock.body.immovable = true;
    groundBlock.body.allowGravity = false;
    ground.add(groundBlock);
  }
  // Define movement constants
  this.MAX_SPEED = 250; // pixels/second
  this.ACCELERATION = 600;
  this.DRAG = 600;
  this.GRAVITY = 670;
  this.JUMP_SPEED = -350; // pixels/second (negative y is up)
  game.time.deltaCap = 0.02;
  // PLAYER
  player = game.add.sprite(this.game.width/2, this.game.height - 96, 'player');
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.allowGravity = true; 
  player.body.mass = 1;
  player.body.collideWorldBounds = true;
  player.anchor.set(0, -this.height);
  // Set player maximum movement speed
  player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10); 
  player.body.drag.setTo(this.DRAG, 0); // x, y
  game.physics.arcade.gravity.y = this.GRAVITY;
  // BLOCKS
  blocks = game.add.group();
  blocks.enableBody = true; // PLAY WITH THIS TO SEE IF IT ALLOWS COLLISION
  blocks.physicsBodyType = Phaser.Physics.ARCADE;
  for (i = 0; i < 1; i++) {
       block1 = game.add.sprite(320, 336, 'block');
    block2 = game.add.sprite(220, 268, 'block');
    block3 = game.add.sprite(0, 118, 'block');
    block4 = game.add.sprite(120, 38, 'block');
    block5 = game.add.sprite(0, -30, 'block');
    blocks.add(block1);
    blocks.add(block2);
    blocks.add(block3);
    blocks.add(block4);
    blocks.add(block5);
    block1.body.allowGravity = false;
    block1.body.immovable = true;
    block2.body.allowGravity = false;
    block2.body.immovable = true;
    block3.body.allowGravity = false;
    block3.body.immovable = true;
    block4.body.allowGravity = false;
    block4.body.immovable = true;
    block5.body.allowGravity = false;
    block5.body.immovable = true;
  }

  block_fall = game.add.group();
  block_fall.enableBody = true;
  block_fall.physicsBodyType = Phaser.Physics.ARCADE;
  for (i = 0; i < 1; i++) {
    block_fall_1 = game.add.sprite(120, 188, 'block_fall');
    block_fall.add(block_fall_1);
    block_fall_1.body.immovable = true;
    block_fall_1.body.allowGravity = false;
  }
  // // FLAG
  // flag = game.add.group();
  // for (var i = 0; i < 1; i++) {
  //   flag1 = this.game.add.sprite(0, 86, 'flag');
  //   this.game.physics.enable(flag1, Phaser.Physics.ARCADE);
  //   flag1.body.allowGravity = false;
  //   flag1.body.immovable = true;
  //   flag.add(flag1);
  // }

      //  Resize our game world to be a 2000 x 2000 square
    game.world.setBounds(0, -480, 480, 2000);
    game.camera.follow(player);
    game.camera.deadzone = new Phaser.Rectangle((this.width/2), (this.height/2), 848, 450);
    // game.camera.focusOnXY(450, 225);
};

function update () {
  game.physics.arcade.collide(player, ground);
  game.physics.arcade.collide(player, blocks);
  // game.physics.arcade.collide(blocks, ground);
  game.physics.arcade.collide(block_fall, ground);
  game.physics.arcade.collide(player, block_fall);

  // this.game.physics.arcade.overlap(player, flag1, flagTouch, null, this);
  // game.physics.arcade.overlap(player, flag1, flagTouch, null, this);


  if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    player.body.acceleration.x = -this.ACCELERATION;

  } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    player.body.acceleration.x = this.ACCELERATION;
  } else {
    player.body.acceleration.x = 0;
  }

var onTheGround = player.body.touching.down;
    if (onTheGround && this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      // Jump when the player is touching the ground and the up arrow is pressed
      player.body.velocity.y = this.JUMP_SPEED;
    } 


};

// Called functions go here!
// function flagTouch (obj1, obj2) {
//   game.stage.backgroundColor = '#ddd';
//   victoryText = game.add.text(424, 125, "You reached the flag!", {
//     font: "30px Arial",
//     fill: "#eeee00",
//     align: "center"
//   });
//   victoryText.anchor.setTo(0.5, 0.5);
// }

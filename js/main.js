var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: false
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);
var map;
var player;
var cursors;
var groundLayer, coinLayer;
var text;
function preload() {
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
    this.load.image('coin', 'assets/coinGold.png');
    this.load.atlas('player', 'assets/player.png', 'assets/player.json');
}
function create() {
    //background code
    map = this.make.tilemap({key: 'map'});
    
    var groundTiles = map.addTilesetImage('tiles');
    groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
    groundLayer.setCollisionByExclusion([-1]);

    //camera limits
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;

    //player code
    player = this.physics.add.sprite(200, 200, 'player'); 
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(groundLayer, player);
    cursors = this.input.keyboard.createCursorKeys();

}
function update() {
    if (cursors.left.isDown) // if the left arrow key is down
    {
        player.body.setVelocityX(-200); // move left
    }
    else if (cursors.right.isDown) // if the right arrow key is down
    {
        player.body.setVelocityX(200); // move right
    }
    if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor())
    {
        player.body.setVelocityY(-500); // jump up
    }
}
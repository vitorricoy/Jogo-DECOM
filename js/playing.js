function playing(){}
var index=0;
var players;
var jump;
var spikes;
var virus;
var grpBits;
var onJump=Array();
var proxBit=0;
var proxCollectBit=0;
var bits=Array(true, false, false, false, false, false, false, false);

playing.prototype = {
  init: function(lv){
  	level=lv;
  },
  preload: function(){
    game.time.desiredFps = 30;
    game.forceSingleUpdate = true;
    map = game.add.tilemap('levelGer'+cont++, 30, 30)
        map.addTilesetImage('tileset', 'tile1');
        layer = map.createLayer('fundo');
        layer = map.createLayer('background');
        layer = map.createLayer('ground');
        map.setCollisionBetween(0, 2000, true, layer);
        layer.resizeWorld();
        spikes = game.add.group();
        spikes.enableBody=true;
        virus = game.add.group();
        virus.enableBody=true;
        grpBits = game.add.group();
        grpBits.enableBody=true;
        map.createFromObjects('virus', 1, 'virus', 0, true, false, virus);
        map.createFromObjects('bits', 2, 'collect', 0, true, false, grpBits);
        map.createFromObjects('spikes', 3, 'spike', 0, true, false, spikes);
        virus.forEach(function(item){
            game.physics.arcade.enable(item);
            item.animations.add('play');
            item.width*=0.5;
            item.height*=0.5;
            item.body.bounce.set(0, 1);
            item.body.collideWorldBounds=true;
        });
        spikes.forEach(function(item){
            game.physics.arcade.enable(item);
            item.width*=0.5;
            item.height*=0.5;
        });
        grpBits.forEach(function(item){
            game.physics.arcade.enable(item);
            item.width*=0.5;
            item.height*=0.5;
        });
        players=game.add.group();
        players.enableBody = true;
        players.physicsBodyType = Phaser.Physics.ARCADE;
        let player;
        player=game.add.sprite(0, 400, 'bit1');
        console.log(player);
        game.physics.arcade.enable(player);
        console.log(player.width*=0.5);
        console.log(player.height*=0.5);
        player.body.gravity.y = 500;
        player.body.velocity.x = 200;
        console.log("Created player");
        player.animations.add('walk', Phaser.Animation.generateFrameNames('Walk_', 0, 6, '.png'), 10);
        player.animations.add('jump', ['Jump.png'], 1);
        players.add(player);
        gerada=true;
        jumpT = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        jumpM = game.input.onDown.add(jump, this);
        game.camera.follow(players.getFirstAlive());
        proxCollectBit=1;
  },
  create: function() {
    game.add.plugin(Phaser.Plugin.Debug);
  },
  render: function(){
    //game.debug.text(game.time.fps || '--', 2, 14, "#00ff00"); 
  },
  update: function(){
	  game.physics.arcade.collide(players, layer);
    game.physics.arcade.collide(virus, layer);  	
    game.physics.arcade.overlap(players, grpBits, encostouBit, null, this);
    game.physics.arcade.overlap(players, spikes, encostouInimigo, null, this);
    game.physics.arcade.overlap(players, virus, encostouInimigo, null, this);
    grpBits.children[proxCollectBit].animations.frame=proxBit;
    virus.forEach(function(vir){
        if(vir.body.x<game.camera.x-450){
          vir.destroy();
        }else{
          if(vir.body.x>game.camera.x && vir.body.x>game.camera.x+500 && vir.body.velocity.y==0){
              vir.animations.play('play', 10, true);
              vir.body.velocity.y=200;
          }
        }
    }, this);
    game.camera.follow(players.getFirstAlive(), Phaser.Camera.FOLLOW_PLATFORMER);
    if (jumpT.isDown){
        jump();
    }
    var elem1=players.getFirstAlive();
    if(elem1==null){
      game.state.start("gameover", level);
    }
      var it=0;
      players.forEachAlive(function(pla) {
        if(pla!=elem1){
          if(onJump[it]){
            if(pla.body.onFloor()){
              onJump[it]=false;
            }
          }else{
          if(!pla.body.blocked.right && !pla.body.touching.right && pla.body.velocity.x>0){
            if(pla.body.onFloor())
               pla.animations.play('walk');
            else{
               pla.animations.play('jump');
            }  
          }else{
              pla.animations.play('walk');
              pla.animations.stop(null, true);
          }
          pla.body.velocity.x=elem1.body.velocity.x;
          if(pla.y>600){
            pla.kill();
            bits[it]=false;
          }
        }
      }else{
        if(!pla.body.blocked.right && !pla.body.touching.right && pla.body.velocity.x>0){
            if(pla.body.onFloor())
               pla.animations.play('walk');
            else{
               pla.animations.play('jump');
            }  
        }else{
          pla.animations.play('walk');
              pla.animations.stop(null, true);
        }
        pla.body.velocity.x=250;
        if(pla.y>600){
          pla.kill();
          bits[it]=false;
        }
      }
      it++;
      }, this);
    }
};

	var map;
  function encostouBit(player, bit){
     var i=0;
     for(i=0; i<8; i++){
      if(!bits[i]){
        break;
      }
     }
     let sprite;
     if(proxBit==1){
        sprite=game.add.sprite(players.getFirstAlive().x, players.getFirstAlive().y, 'bit1');
     }else{
        sprite=game.add.sprite(players.getFirstAlive().x, players.getFirstAlive().y, 'bit0');
     }
     game.physics.arcade.enable(sprite);
     sprite.width*=0.5;
     sprite.height*=0.5;
     sprite.body.gravity.y = 500;
     console.log(sprite.body.velocity.y = -502/2);
     console.log(sprite.body.velocity.x = (-1*52*i)+250);
     onJump[i]=true;
     sprite.animations.add('walk', Phaser.Animation.generateFrameNames('Walk_', 0, 6, '.png'), 10);
     sprite.animations.add('show', Phaser.Animation.generateFrameNames('Show_', 0, 3, '.png'), 2);
     sprite.animations.add('jump', ['Jump.png'], 1);
     players.add(sprite);
     sprite.animations.play('show');
     proxBit=Math.round(Math.random());
     bit.kill();
  }
  function encostouInimigo(player, inim){
     player.kill();
     var i;
     for(i=0; i<8; i++){
        if(players.children[i]==player)
          break;
     }
     bits[i]=false;
     inim.destroy();
     var fum=game.add.sprite(player.x+20, player.y, 'fumaca');
     fum.animations.add('play');
     fum.animations.play('play', 2, false);
     fum.animations.currentAnim.onComplete.add(function () { fum.destroy();}, this);
  }
  function jump(){
    let cont=0;
    players.forEach(function(player) {
      if(player.body.onFloor()){
         setTimeout(function(){ player.body.velocity.y = -300; }, 300*cont);
      }
      cont++;
    });  
  }

    
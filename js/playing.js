function playing(){}
var jumpTimer=Array(0);
var jumpTimerAll=0;
var index=0;
var players;
var jump;
var spikes;
var virus;
var grpBits;
var onJump=Array();
var presentes = Array();
var bits = Array();
var bitsToCollect = Array();
playing.prototype = {
  init: function(lv){
  	level=lv;
    bits = Array(1, 0, 1, 0, 1, 0, 1, 0);
  },
  preload: function(){
  },
  create: function() {
  },
  update: function(){
    definirJogo();
	  game.physics.arcade.collide(players, layer);
    game.physics.arcade.collide(virus, layer);  	
    game.physics.arcade.overlap(players, grpBits, encostouBit, null, this);
    game.physics.arcade.overlap(players, spikes, encostouInimigo, null, this);
    game.physics.arcade.overlap(players, virus, encostouInimigo, null, this);
    players.forEach(function(player) {
      if(!player.alive){
        player.destroy();
      }
    });
    if(players.children.length<=0){
      game.state.start('gameover', true, false, level);
    }else{
         let j;
         for(j=0; j<8; j++){
            if(!presentes[j]){
              break;
            }
         }
         
          for(let i=0; i<bitsToCollect.length; i++){
            if(bitsToCollect[i].body.x>game.camera.x){
              bitsToCollect[i].animations.frame=bits[j];
            }
          }
      game.camera.follow(players.children[0], Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
      if (jumpT.isDown){
          jump();
      }
      for(i=1; i<players.children.length; i++){
        if(onJump[i]){
           if(players.children[i].body.onFloor()){
             onJump[i]=false;
           }
        }else{
          if(!players.children[i].body.blocked.right && !players.children[i].body.touching.right && players.children[i].body.velocity.x>0){
            if(players.children[i].body.onFloor())
               players.children[i].animations.play('walk');
            else{
               players.children[i].animations.play('jump');
            }  
        }else{
            players.children[i].animations.stop(null, true);
          }
          if(!onJump[i]){
            players.children[i].body.velocity.x=players.children[0].body.velocity.x;
          }
          if(players.children[i].y>600){
            players.children[i].kill();
            presentes[i]=false;
          }
        }
      }
      
      if(!players.children[0].body.blocked.right && !players.children[0].body.touching.right){
             
          if(players.children[0].body.onFloor()){
               players.children[0].animations.play('walk'); 
          }else{
             players.children[0].animations.play('jump');
          }
              
        }else{
          players.children[0].animations.stop(null, true);
        }
        players.children[0].body.velocity.x=200;
      if(players.children[0].y>600){
          players.children[0].kill();
          presentes[0]=false;
        }
      }
    }
};
var gerada=false;

	var map;
  function encostouBit(player, bit){
     var i;
     for(i=0; i<7; i++){
       if(!presentes[i]){
         break;
       }
     }
     let sprite;
     if(bits[i]==1){
        sprite=game.add.sprite(players.children[0].x, players.children[0].y, 'bit1');
     }else{
        sprite=game.add.sprite(players.children[0].x, players.children[0].y, 'bit0');
     }
     game.physics.arcade.enable(sprite);
     sprite.width*=0.5;
     sprite.height*=0.5;
     sprite.body.gravity.y = 500;
     console.log(game.time.now);
     console.log(sprite.body.velocity.y = -502/2);
     console.log(sprite.body.velocity.x = (-1*52*i)+200);
     onJump[i]=true;
     sprite.animations.add('walk', Phaser.Animation.generateFrameNames('Walk_', 0, 6, '.png'), 10);
     sprite.animations.add('show', Phaser.Animation.generateFrameNames('Show_', 0, 3, '.png'), 2);
     sprite.animations.add('jump', ['Jump.png'], 1);
     players.add(sprite);
     jumpTimer.push(0);
     presentes[i]=true;
     sprite.animations.play('show');
     bit.kill();
  }
  function encostouInimigo(player, inim){
     player.kill();
     inim.kill();
     var fum=game.add.sprite(player.x+100, player.y, 'fumaca');
     fum.animations.add('play');
     fum.animations.play('play', 2, false);
     fum.animations.currentAnim.onComplete.add(function () { fum.destroy();}, this);
  }
	function definirJogo(){
		if(!gerada){
    		map = game.add.tilemap('levelGer'+cont++, 30, 30)
    		map.addTilesetImage('tileset', 'tile1');
    		layer = map.createLayer('fundo');
        layer = map.createLayer('background');
    		layer = map.createLayer('ground');
    		map.setCollisionBetween(0, 999, true, layer);
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
            item.animations.play('play', 10, true);
            item.width*=0.5;
            item.height*=0.5;
            item.body.velocity.y=200;
            item.body.bounce.set(0, 1);
            item.body.collideWorldBounds=true;
        });
        spikes.forEach(function(item){
            game.physics.arcade.enable(item);
            item.width*=0.5;
            item.height*=0.5;
            item.body.gravity.y=500;
        });
        grpBits.forEach(function(item){
            game.physics.arcade.enable(item);
            item.width*=0.5;
            item.height*=0.5;
            item.body.gravity.y=500;
            bitsToCollect.push(item);
        });
        players=game.add.group();
        players.enableBody = true;
        players.physicsBodyType = Phaser.Physics.ARCADE;
        let player;
        if(bits[index]==1){
          player=game.add.sprite(0, 400, 'bit1');
        }else{
          player=game.add.sprite(0, 400, 'bit0');
        }
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
        game.camera.follow(players.children[0]);
        presentes[0]=true;
        presentes[1]=false;
        presentes[2]=false;
        presentes[3]=false;
        presentes[4]=false;
        presentes[5]=false;
        presentes[6]=false;
        presentes[7]=false;

		}
	}

  function jump(){
    let cont=0;
    players.forEach(function(player) {
      if(player.body.onFloor() && game.time.now > jumpTimerAll){
         setTimeout(function(){ player.body.velocity.y = -300; }, 300*cont);
      }
      cont++;
    });
     
    jumpTimerAll = game.time.now + 200;
     
  }

    
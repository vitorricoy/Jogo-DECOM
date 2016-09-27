function playing(){}
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
var bitAnterior=-1;

playing.prototype = {
  init: function(lv){
  	level=lv;
    bits = Array(1, 0, 1, 0, 1, 0, 1, 0);
  },
  preload: function(){
    game.time.advancedTiming = true;
  },
  create: function() {
  },
  render: function(){
    //game.debug.text(game.time.fps || '--', 2, 14, "#00ff00"); 
  },
  update: function(){
    definirJogo();
	  game.physics.arcade.collide(players, layer);
    game.physics.arcade.collide(virus, layer);  	
    game.physics.arcade.overlap(players, grpBits, encostouBit, null, this);
    game.physics.arcade.overlap(players, spikes, encostouInimigo, null, this);
    game.physics.arcade.overlap(players, virus, encostouInimigo, null, this);
    if(players.children.length<=0){
      game.state.start('gameover', true, false, level);
    }else{
      let j;
      for(j=0; j<8; j++){
        if(!presentes[j]){
          break;
        }
      } 
      if(bitAnterior>=0){
        if(grpBits.children[bitAnterior].x<camera.x){
           bitAnterior++;
           grpBits.children[bitAnterior].animations.frame=bits[j];
        }
      }
      game.camera.follow(players.children[0], Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
      if (jumpT.isDown){
          jump();
      }
      var elem1=players.getFirstAlive();
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
              pla.animations.stop(null, true);
          }
          pla.body.velocity.x=elem1.body.velocity.x;
          if(pla.y>600){
            pla.kill();
            presentes[it]=false;
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
              pla.animations.stop(null, true);
        }
        pla.body.velocity.x=250;
        if(players.children[0].y>600){
          players.children[0].kill();
          presentes[0]=false;
        }
      }
      it++;
      }, this);
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
        });
        grpBits.forEach(function(item){
            game.physics.arcade.enable(item);
            item.width*=0.5;
            item.height*=0.5;
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
      if(player.body.onFloor()){
         setTimeout(function(){ player.body.velocity.y = -300; }, 300*cont);
      }
      cont++;
    });  
  }

    
function Preload(){}


Preload.prototype = {
  preload: function() {
    for(let i=0; i<6; i++){
      for(let f=0; f<6; f++){
         $.getJSON( "assets/levels/level"+(eval(i+1))+"/bloco"+f+ ".json", function( data ) { 
          if(f==0)
            console.log(data);
          levelsPossiveis[i][f]=data;});
      }
    }
    game.load.atlasJSONHash('animFundo', 'assets/frame/fundo.png', 'assets/frame/fundo.json');
	  game.load.image('min1', 'assets/min1.png');
	  game.load.image('min2', 'assets/min2.png');
	  game.load.image('min3', 'assets/min3.png');
	  game.load.image('min4', 'assets/min4.png');
	  game.load.image('min5', 'assets/min5.png');
	  game.load.image('min6', 'assets/min6.png');
	  game.load.image('back', 'assets/voltar.png');
   	game.load.image('tile1', 'assets/levels/level1/tileset.png');
   	game.load.image('player', 'assets/levels/player.png');
    game.load.image('fundo', 'assets/Background_Logo.png');
    game.load.image('textoJogar', 'assets/jogar.png');
    game.load.image('textoArcade', 'assets/arcade.png');
    game.load.image('textoCreditos', 'assets/creditos.png');
    game.load.image('somOn', 'assets/somOn.png');
    game.load.image('somOff', 'assets/somOff.png');
    game.load.atlasJSONHash('bit1', 'assets/frame/Bit_1/Bit1.png', 'assets/frame/Bit_1/Bit1.json');
    game.load.atlasJSONHash('bit0', 'assets/frame/Bit_0/Bit0.png', 'assets/frame/Bit_0/Bit0.json');
    game.load.atlasJSONHash('virus', 'assets/frame/Virus/Virus.png', 'assets/frame/Virus/Virus.json');
    game.load.atlasJSONHash('collect', 'assets/frame/collect.png', 'assets/frame/collect.json');
    game.load.atlasJSONHash('fumaca', 'assets/frame/fumaca.png', 'assets/frame/fumaca.json');
    game.load.image('spike', 'assets/frame/Spike/Spike.png');
    //game.load.spritesheet('walk1', 'assets/frame/walk1.png', 56, 146, 7);
    game.physics.startSystem(Phaser.Physics.ARCADE);
  },
  create: function() {
     game.state.start('mainmenu');
  }
};

function mainmenu() {}

mainmenu.prototype = {

  preload: function(){
    slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
    slickUI.load('assets/kenney/kenney.json');
  },
  create: function() {
    slickUI.add(panelMenu = new SlickUI.Element.Panel(0, 0, game.width, game.height));
    var spriteFundo = game.add.sprite(0, 0, 'animFundo');
    var spriteSom = game.add.sprite(699, 8, 'somOn');
    spriteFundo.animations.add('mov');
    var spriteJogar = game.make.sprite(0, 0, 'textoJogar');
    var spriteArcade = game.make.sprite(0, 0, 'textoArcade');
    var spriteCreditos = game.make.sprite(0, 0, 'textoCreditos');
    panelMenu.add(new SlickUI.Element.DisplayObject(0, 0, spriteFundo));
    spriteFundo.animations.play('mov', 10, true);
    panelMenu.add(hist = new SlickUI.Element.Button(282, 248, 215, 54));
    hist.add(new SlickUI.Element.DisplayObject(20, 5, spriteJogar));
    panelMenu.add(arcade = new SlickUI.Element.Button(272, 319, 232, 54));
    arcade.add(new SlickUI.Element.DisplayObject(20, 5, spriteArcade));
    panelMenu.add(opt = new SlickUI.Element.Button(251, 392, 277, 54));
    opt.add(new SlickUI.Element.DisplayObject(20, 2, spriteCreditos));
    panelMenu.add(som = new SlickUI.Element.Button(699, 8, 70, 32));
    som.events.onInputDown.add(function(){
       if(musica){
         spriteSom.destroy();
         spriteSom = game.add.sprite(699, 8, 'somOff');
         musica=false;
       }else{
         spriteSom.destroy();
         spriteSom = game.add.sprite(699, 8, 'somOn');
         musica=true;
       }
       
    }, this);
    opt.events.onInputDown.add(function(){
       game.state.start("creditos");
    }, this);
    
    hist.events.onInputDown.add(function(){
       game.state.start("levelSelection");
    }, this);
    
    arcade.events.onInputDown.add(function(){
       game.state.start("arcade");
    }, this);
  },
};
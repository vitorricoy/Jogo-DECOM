function levelSelection() {}

levelSelection.prototype = {
  preload: function(){
    slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
    slickUI.load('assets/kenney/kenney.json');
  },
  create: function() {
    slickUI.add(panelSelecao=new SlickUI.Element.Panel(0, 0, game.width, game.height));
    panelSelecao.add(fase1=new SlickUI.Element.Button(45, 70, 200, 200));
    fase1.add(new SlickUI.Element.DisplayObject(0, 0, game.make.sprite(0, 0, 'min1')));
    panelSelecao.add(fase2=new SlickUI.Element.Button(290, 70, 200, 200));
    fase2.add(new SlickUI.Element.DisplayObject(0, 0, game.make.sprite(0, 0, 'min2')));
    panelSelecao.add(fase3=new SlickUI.Element.Button(535, 70, 200, 200));
    fase3.add(new SlickUI.Element.DisplayObject(0, 0, game.make.sprite(0, 0, 'min3')));
    panelSelecao.add(fase4=new SlickUI.Element.Button(45, 290, 200, 200));
    fase4.add(new SlickUI.Element.DisplayObject(0, 0, game.make.sprite(0, 0, 'min4')));
    panelSelecao.add(fase5=new SlickUI.Element.Button(535, 290, 200, 200));
    fase5.add(new SlickUI.Element.DisplayObject(0, 0, game.make.sprite(0, 0, 'min5')));
    panelSelecao.add(fase6=new SlickUI.Element.Button(290, 290, 200, 200));
    fase6.add(new SlickUI.Element.DisplayObject(0, 0, game.make.sprite(0, 0, 'min6')));
    fase6.visible=false;
    panelSelecao.add(volt=new SlickUI.Element.Button(0, 0, 30, 30));
    sprite= game.make.sprite(0, 0, 'back');
    sprite.width=25;
    sprite.height=25;
    volt.add(new SlickUI.Element.DisplayObject(0, 0, sprite));
    volt.events.onInputDown.add(function(){
        game.state.start("mainmenu");
    }, this);
    fase1.events.onInputDown.add(function(){
        game.state.start("loadLevel", true, false, 1);
    }, this);
    fase2.events.onInputDown.add(function(){
        game.state.start("loadLevel", true, false, 2);
    }, this);
    fase3.events.onInputDown.add(function(){
        game.state.start("loadLevel", true, false, 3);
    }, this);
    fase4.events.onInputDown.add(function(){
        game.state.start("loadLevel", true, false, 4);
    }, this);
    fase5.events.onInputDown.add(function(){
        game.state.start("loadLevel", true, false, 5);
    }, this);
    fase6.events.onInputDown.add(function(){
        game.state.start("loadLevel", true, false, 6);
    }, this);
  },
};
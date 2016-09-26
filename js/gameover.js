function gameover(){}
var lvl;
gameover.prototype= {
	init: function(level){
		lvl=level;
	},
	preload: function(){
		slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
    	slickUI.load('assets/kenney/kenney.json');
	},
	create: function(){
		game.state.start('loadLevel', true, false, lvl);
		slickUI.add(panelSelecao=new SlickUI.Element.Panel(0, 0, game.width, game.height));
    	panelSelecao.add(new SlickUI.Element.Text(0, 0, "Game Over!\nPressione espaço ou clique na tela para continuar.")).centerHorizontally();
		contT = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	contT.onDown.add(conti, this);
        contM = game.input.onDown.add(conti, this);
	}
}

function conti(){
	
}
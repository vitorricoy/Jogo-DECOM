function loadLevel(){}

var JSONLevel;
var lvl;
loadLevel.prototype = {
	init: function(lev){
		lvl=lev;
	},
	preload: function(){
		gerarLevel();
    	game.load.onLoadComplete.add(function(){
            game.state.start('playing', true, false, lvl);
		}, this);
		console.log('key do level ' + 'levelGer'+cont);
    	game.load.tilemap('levelGer'+cont, null, JSONLevel, Phaser.Tilemap.TILED_JSON);
    	game.load.start();
	},
	create: function(){
		
	}
}

var jsonData=Array();
function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;
       while (0 !== currentIndex) {
        randomIndex = Math.ceil((Math.floor(Math.random() * currentIndex)+Math.floor(Math.random() * currentIndex))/2);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }
      return array;
  }

  function gerarLevel(){
  	   console.log(levelsPossiveis[lvl-1]);
       var aux = shuffle(levelsPossiveis[lvl-1]);
       console.log(aux);
       jsonData = Array(aux[3], aux[2], aux[1], aux[0]);
       var novArray;
       var controlx;
       for (var i = 1; i < jsonData.length; i++) {
            jsonData[0].width+=jsonData[i].width;
            for(let j=0; j<jsonData[i].layers.length; j++){
              novArray=Array();
              controlx=0;
              if(jsonData[i].layers[j].data!=undefined){
              for(let x=0; x<jsonData[i].layers[j].data.length; x+=jsonData[i].layers[j].width){
                  var auxi=Array();
                  auxi=jsonData[0].layers[j].data.slice(controlx, controlx+(jsonData[0].layers[j].width));
                  var aux2=jsonData[i].layers[j].data.slice(x, x+jsonData[i].layers[j].width);
                  auxi=auxi.concat(aux2);
                  novArray=novArray.concat(auxi);
                  controlx+=jsonData[0].layers[j].width;
              }
              jsonData[0].layers[j].data=novArray;
              jsonData[0].layers[j].width+=jsonData[i].layers[j].width;
            }
            else{
              if(jsonData[i].layers[j].objects!=undefined){
                    var auxi=Array();
                    for(let x=0; x<jsonData[i].layers[j].objects.length; x++){
                       jsonData[i].layers[j].objects[x].x+=4000*i;
                       jsonData[i].layers[j].objects[x].id+=20*i;
                    }
                    novArray=jsonData[0].layers[j].objects.concat(jsonData[i].layers[j].objects);
                    jsonData[0].layers[j].objects=novArray;
                    jsonData[0].layers[j].width+=jsonData[i].layers[j].width;
              }
            }
            
            }
       }
       JSONLevel=jsonData[0];
       
       console.log(JSON.stringify(jsonData[0], null, 2));
  }
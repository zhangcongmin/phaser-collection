function preload(){game.load.image("rectangle",imagesPath+"rectangle.png"),game.load.image("moon",imagesPath+"moon.png"),game.load.image("dash",imagesPath+"dash.png"),game.load.spritesheet("take_photo",imagesPath+"take_photo.png"),game.load.spritesheet("person_head",imagesPath+"person_head.png",124,190),game.load.spritesheet("person_all",imagesPath+"person.png",150,354),game.load.audio("kacha",imagesPath+"kacha.mp3")}function create(){game.stage.backgroundColor="#4B4387",mask_1=game.add.bitmapData(winWidth,winHeight),mask_1.context.fillStyle="#3F3678",mask_1.context.fillRect((winWidth-rectangleWidth)/2,toTop,rectangleWidth,rectangleHeight),mask_1.addToWorld(),group_bg=game.add.group(),group_dash_behind=game.add.group(),group_person_behind=game.add.group(),group_person_behind_move=game.add.group(),group_dash_front=game.add.group(),group_person_front=game.add.group(),group_person_front_move=game.add.group(),group_mask=game.add.group(),mask_2=game.add.bitmapData(winWidth,winHeight),mask_2.context.fillStyle="#4B4387",mask_2.context.fillRect((winWidth-rectangleWidth)/2,rectangleHeight+toTop,rectangleWidth,rectangleHeight),mask_2.addToWorld(),mask_3=game.add.bitmapData(winWidth,winHeight),mask_3.context.fillStyle="#4B4387",mask_3.context.fillRect(0,toTop,(winWidth-rectangleWidth)/2,2*rectangleHeight),mask_3.addToWorld(),mask_4=game.add.bitmapData(winWidth,winHeight),mask_4.context.fillStyle="#4B4387",mask_4.context.fillRect(winWidth-(winWidth-rectangleWidth)/2,toTop,(winWidth-rectangleWidth)/2,2*rectangleHeight),mask_4.addToWorld(),mask_5=game.add.bitmapData(winWidth,winHeight),mask_5.context.fillStyle="#4B4387",mask_5.context.fillRect(0,0,winWidth,toTop),mask_5.addToWorld();var a=28*ratio,b={font:"bold "+a+"px Arial",fill:"#fff",boundsAlignH:"center",boundsAlignV:"middle"};text=game.add.text(0,0,"将人物拖动至上方照片内",b),text.setTextBounds(0,.7*winHeight,winWidth,100),group_move=game.add.group(),rectangle=game.add.sprite(winWidth/2,toTop,"rectangle"),rectangle.anchor.set(.5,0,5),rectangle.scale.set(ratio,ratio),group_mask.add(rectangle),kacha=game.add.audio("kacha")}function update(){}function init(){for(var a=["FFFFFF","ADADFF"],b=0;50>b;b++){var c=a[parseInt(2*Math.random())],d=parseInt(2*Math.random()+6)*ratio,e=(Math.random()*rectangleWidth+(winWidth-rectangleWidth)/2).toFixed(1),f=(Math.random()*rectangleHeight+toTop).toFixed(1),g=game.add.graphics(e,f);parseInt(10*Math.random());g.beginFill("0x"+c,1),g.drawCircle(d,d,d),group_bg.add(g)}moon=game.add.sprite(winWidth/2,toTop+.5*rectangleHeight,"moon"),moon.scale.set(2*ratio,2*ratio),group_bg.add(moon),game.add.tween(moon.scale).to({x:ratio,y:ratio},2e3,Phaser.Easing.Quadratic.In,!0),game.add.tween(moon.position).to({x:(winWidth-rectangleWidth)/2+30,y:toTop+20},2e3,Phaser.Easing.Quadratic.In,!0);for(var b=0;7>b;b++){var h=game.add.sprite(0,0,"dash");h.scale.set(ratio,ratio),h.alpha=0,4>b?(h.position.x=(winWidth-4*h.width)/2+b*h.width,h.position.y=rectangle.height+rectangle.top-h.height,group_dash_front.add(h)):(h.position.x=(winWidth-3*h.width)/2+(b-4)*h.width,h.position.y=rectangle.height+rectangle.top-h.height-distance,group_dash_behind.add(h))}for(var b=0;7>b;b++)if(3>b){var i=game.add.sprite(0,0,"person_head",b);i.scale.set(ratio,ratio),i.position.x=(winWidth-4*i.width)/2+b*i.width+3*b*(4*i.width/3-i.width)/2+.5*winWidth,i.position.y=rectangle.height+rectangle.top-i.height+toRectangle-100*ratio,i.positionIndex=b,i.name=b,i.inputEnabled=!0,i.input.enableDrag(),i.events.onDragUpdate.add(dragUpdate,this),i.events.onDragStop.add(dropHandler,this),group_move.add(i),game.add.tween(i.position).to({x:(winWidth-4*i.width)/2+b*i.width+3*b*(4*i.width/3-i.width)/2},2e3,Phaser.Linear,!0)}else array.push(b);shoot=game.add.button(winWidth/2,.8*winHeight,"take_photo",shoot,this),shoot.scale.set(ratio,ratio),shoot.anchor.set(.5,0,5),shoot.alpha=0,game.time.events.loop(1*Phaser.Timer.SECOND,moveOut,this)}function moveOut(a){var b=game.rnd.integerInRange(1,3);game.time.events.add(Phaser.Timer.SECOND*b,function(){if(0!=group_person_front.children.length||0!=group_person_behind.children.length){if(4>moveIndex){var a=parseInt(group_person_front.children[0].name),b=group_person_front.children[0].positionIndex,c=game.add.sprite(0,0,"person_all",a);c.scale.set(ratio,ratio),c.position.x=(winWidth-4*dashWidth)/2+b*dashWidth-15*ratio,c.position.y=rectangle.height+rectangle.top-c.height+160*ratio-6,c.alpha=.8,group_person_front_move.add(c),group_person_front.children[0].destroy();var d=game.rnd.integerInRange(1,2),e=1==d?(winWidth-rectangleWidth)/2-dashWidth:winWidth-(winWidth-rectangleWidth)/2,f=1==d?(c.position.x+dashWidth)/(winWidth/2-dashWidth-15*ratio):(winWidth-c.position.x)/(winWidth/2-dashWidth-15*ratio);moveFlag=!0,group_dash_front.children[b].alpha=1;var g=game.add.tween(c).to({x:e},(500*f).toFixed(0),Phaser.Linear,!0);g.onComplete.addOnce(function(){moveFlag=!1,c.destroy(),array.push(a),count--,group_dash_front.children[b].alpha=0,group_move.children.length<3&&dispose(null,array_move[0])},this)}else{var a=parseInt(group_person_behind.children[0].name),b=group_person_behind.children[0].positionIndex,c=game.add.sprite(0,0,"person_all",a);c.scale.set(ratio,ratio),c.position.x=(winWidth-3*dashWidth)/2+b*dashWidth-15*ratio,c.position.y=rectangle.height+rectangle.top-c.height-100*ratio+160*ratio-3,c.alpha=.8,group_person_behind_move.add(c);var d=game.rnd.integerInRange(1,2),e=1==d?(winWidth-rectangleWidth)/2-dashWidth:winWidth-(winWidth-rectangleWidth)/2,f=1==d?(c.position.x+dashWidth)/(winWidth/2-dashWidth-15*ratio):(winWidth-c.position.x)/(winWidth/2-dashWidth-15*ratio);group_dash_behind.children[b].alpha=1,moveFlag=!0;var g=game.add.tween(c).to({x:e},(500*f).toFixed(0),Phaser.Linear,!0);g.onComplete.addOnce(function(){moveFlag=!1,c.destroy(),array.push(a),count--,group_dash_behind.children[b].alpha=0,group_move.children.length<3&&dispose(null,array_move[0])},this),group_person_behind.children[0].destroy()}moveIndex++,7==moveIndex&&(moveIndex=0)}},this)}function dragUpdate(a){if(judgeDrop(a))7==index&&(index=0),4>index?group_dash_front.children[index].alpha=1:group_dash_behind.children[index-4].alpha=1;else{if(7==index)return;4>index?group_dash_front.children[index].alpha=0:group_dash_behind.children[index-4].alpha=0}}function dropHandler(a){var b=parseInt(a.name),c=a.positionIndex;judgeDrop(a)?(7==index&&(index=0),4>index?group_dash_front.children[index].alpha=0:group_dash_behind.children[index-4].alpha=0,dispose(a,c),generate(b)):game.add.tween(a.position).to({x:(winWidth-4*dashWidth)/2+c*a.width+3*c*(4*dashWidth/3-a.width)/2,y:rectangle.height+rectangle.top-a.height-100*ratio+toRectangle},150,Phaser.Easing.Cubic.InOut,!0)}function dispose(a,b){a&&(a.destroy(),array_move.push(b));var c=parseInt(array_move[0]);if(!isNaN(array[0])){array_move.splice(0,1);var d=parseInt(array.splice(0,1)),e=game.add.sprite(0,0,"person_head",d);e.scale.set(ratio,ratio),e.positionIndex=b,e.name=d,e.position.x=(winWidth-4*dashWidth)/2+c*e.width+3*c*(4*dashWidth/3-e.width)/2,e.position.y=rectangle.height+rectangle.top-e.height-100*ratio+toRectangle,e.inputEnabled=!0,e.input.enableDrag(),e.events.onDragUpdate.add(dragUpdate,this),e.events.onDragStop.add(dropHandler,this),group_move.add(e)}}function generate(a){var b=game.add.sprite(0,0,"person_all",a);b.scale.set(ratio,ratio),4>index?(b.position.x=(winWidth-4*dashWidth)/2+index*dashWidth-15*ratio,b.position.y=rectangle.height+rectangle.top-b.height+160*ratio-6,b.positionIndex=index,b.name=a,group_person_front.add(b)):(b.position.x=(winWidth-3*dashWidth)/2+(index-4)*dashWidth-15*ratio,b.position.y=rectangle.height+rectangle.top-b.height-100*ratio+160*ratio-3,b.positionIndex=index-4,b.name=a,group_person_behind.add(b)),count++,index++}function shootFlash(){white.style.display="none",white.setAttribute("class","abs white"),white.style.display="block",setTimeout(function(){white.setAttribute("class","abs white flash"),white.style.display="none"},100)}function judgeDrop(a){return 7==count?!1:a.y>toTop/2&&a.y<rectangleHeight+toTop-headHeight/2&&a.x>(winWidth-rectangleWidth)/4&&a.x<winWidth-(winWidth-rectangleWidth)/4?!0:!1}function shoot(){kacha.play(),shootFlash(),shoot.alpha=0;var a=game.make.bitmapData(rectangleWidth,rectangleHeight),b=game.make.bitmapData(game.width,game.height);b.drawFull(game.world);var c=a.copy(b,(winWidth-rectangleWidth)/2,toTop,rectangleWidth,rectangleHeight,0,0,rectangleWidth,rectangleHeight);$(".container").removeClass("game").addClass("result"),$("#result").attr("src",c.canvas.toDataURL()),7!=count||moveFlag?($(".page1").addClass("failed"),window.shareData.tTitle="家里人聚齐实在太困难了！熊孩子总乱跑，臣妾抓不到啊！！！"):($(".page1").removeClass("failed"),window.shareData.tTitle="终于抓住乱跑的熊孩子了！拍摄全家福太不容易了！")}function RndNum(a){for(var b="",c=0;a>c;c++)b+=Math.floor(10*Math.random());return b}var winWidth=window.innerWidth,winHeight=window.innerHeight,imagesPath="http://mat1.gtimg.com/zj/yuwanli/dzw1609/photo/images/",game=new Phaser.Game(winWidth,winHeight,Phaser.CANVAS,"game",{preload:preload,create:create,update:update}),group_bg,group_dash_behind,group_dash_front,group_person_behind,group_person_behind_move,group_person_front_move,group_person_front,group_move,group_mask,mask_1,mask_2,mask_3,mask_4,mask_5,index=0,count=0,array=[],array_move=[],rectangle,moveIndex=0,text,shoot,moon,kacha,time,moveFlag=!1,ratio=parseInt(document.getElementById("html").getAttribute("data-dpr"))/2,distance=100*ratio,toTop=.06*winHeight.toFixed(0)*ratio,toRectangle=.35*winHeight.toFixed(0),rectangleWidth=590*ratio,rectangleHeight=386*ratio,dashWidth=120*ratio,personWidth=150*ratio,headWidth=124*ratio,headHeight=190*ratio;$(function(){function a(){0!=window.orientation?$(".error").show():$(".error").hide()}window.addEventListener("orientationchange",function(){a()},!1),audiojs.events.ready(function(){audiojs.create(document.getElementsByTagName("audio")[0],{css:!1,createPlayer:{markup:!1,playPauseClass:"play-pauseZ",scrubberClass:"scrubberZ",progressClass:"progressZ",loaderClass:"loadedZ",timeClass:"timeZ",durationClass:"durationZ",playedClass:"playedZ",errorMessageClass:"error-messageZ",playingClass:"playingZ"}})});for(var b=["#FFFFFF","#ADADFF"],c=0;100>c;c++){var d=b[parseInt(2*Math.random())],e=parseInt(4*Math.random()+6)*ratio,f=(100*Math.random()).toFixed(1),g=(100*Math.random()).toFixed(1),h=Math.random().toFixed(1),i='<i style="-webkit-animation-delay:'+h+"s;width: "+e+"px;height:"+e+"px;left:"+f+"%;top:"+g+"%;background-color:"+d+'"></i>';$("#star").append(i)}$("#enter").on("tap",function(){$(".container").removeClass("cover").addClass("rule")}),$("#start").on("tap",function(){$(".container").removeClass("rule").addClass("game"),shoot.alpha=1}),$("#more").on("tap",function(){$(".page1").removeClass("failed"),$(".container").removeClass("result").addClass("game"),shoot.alpha=1}),$("#share").on("tap",function(){$(".page1 .shareCon").fadeIn()}),$(".page1 .shareCon").on("tap",function(){$(".page1 .shareCon").fadeOut()})});
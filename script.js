
var colors=["red","blue","green","yellow"];
var userSequence=[];
var randomSequence=[];
var started=false;

function restart(){
    location.reload();
}


$("body").keypress(function(){
    if(!started){
        $("h1").text("Level 1");
        $('.ans').remove();
        $('h3').remove();
        $('.how_to').after('<button class="guide_btn retry">restart</button>');
        $('.retry').click(function(){
            location.reload();
        });
        sequence();
        started=true;
    }
})

$(".btn").click(function(){
    if(started){
        $(this).addClass("pressed");  //clicked animation

        var that = $(this);
        setTimeout(function(){
            that.removeClass("pressed"); //clicked animation
        }, 100);

        var audio = new Audio ("sounds/" + this.id + ".mp3");  //clicked sound
        audio.play();

        var userColor=$(this).attr("id");
        userSequence.push(userColor);        
        console.log(userSequence);

        compare();
    }
    else{
        for (var i = 0; i < 3; i++) {
            $("h1").text("Press A Key to Start");
            setTimeout(function(){
                $("h1").css("font-weight","900");
                $("h1").css("color","red");
            }, i * 300);
            setTimeout(function(){
                $("h1").css("font-weight","normal");
                $("h1").css("color","white");
            }, (i+1) * 300);
        }
    }
})

function sequence(){
    var randomColor=colors[Math.floor(Math.random()*4)];
    
    //animation
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100); 

    randomSequence.push(randomColor);
   
    console.log(randomSequence);
}

function compare(){
  for(var i=0;i<userSequence.length;i++){
    if(userSequence[i]!==randomSequence[i]){

    var sequenceCopy = randomSequence.slice();

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");  //animation
      }, 200);

      var audio = new Audio ("sounds/wrong.mp3");   //sound
      audio.play();

      $("h1").text("Game Over, Press Any Key to Restart");
      $("h1").after("<h3>your next sequence was :" + randomSequence[i] + "</h3><br><h3>you clicked: " + userSequence[i] + "</h3>");
      $('h3').addClass('text_design').css('padding','1rem').css('font-weight','400').css('margin','0.2rem');

      $(".retry").after("<button class='guide_btn ans'>answer</button>");

      $('.retry').remove();
      
    $(".ans").click(function(){

        $(".container").slideToggle();

        if($(".how_toText").text()!=""){
            $(".how_toText").text("");
            $(".how_toText").css("padding",'0');
        }
        else{
            $(".how_toText").text("-> The sequence was: " + sequenceCopy.join(', '));
            $('.how_toText').css("padding",'1rem');
        }

    });

      started=false;

      userSequence=[];
      randomSequence=[];

      return;
    }
  }


    if(userSequence.length===randomSequence.length){
        userSequence=[];
        sequence();

        $("h1").css('color','green');
        setTimeout(function(){
            $("h1").css('color','white')
        }, 200);

        $("h1").text("Level " + (randomSequence.length));
    }
}

$(".hint").click(function hint(){
    if(started){
        $("h1").text("next press is =" + randomSequence[userSequence.length]);
        $(".hint").css("background-color",'green');
        setTimeout(function(){
            $(".hint").css("background-color",'rgba(51, 51, 51, 0.726)');
        }, 200);
    }
    else{
        $("h1").text("Game not yet started");
        setTimeout(function(){
            $("h1").text("Press A Key to Start");
        }, 2000);
    }
})

$(".how_to").click(function(){

    $(".container").slideToggle();

    if($(".how_toText").text()!=""){
        $(".how_toText").text("");
        $(".how_toText").css("padding",'0');
    }
    else{
        $(".how_toText").html("-> remember the sequence and click the buttons in that exact sequence. <br><br> -> if you get it wrong, the game will restart. <br><br> -> if you get it right, the next button will be shown. <br><br> -> you have infinite chances. <br><br>good luck! <br><br><em>dont forget the hint, if you dont remember the sequence</em>");
        $('.how_toText').css("padding",'1rem');
    }
})

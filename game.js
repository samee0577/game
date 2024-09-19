
var flippedCards = [];
var started =false;
var match_count=0;

$('.how-to-play').click(function(){
    var audio = new Audio ("sounds/wrong.mp3");   //sound
      audio.play();
});


//game start keypress
if(started === false){
    $('body').keypress(function(){
        started = true;
        $('h3').text("");
        $('h1').text('Game started');
        $('.box').css('transform', 'rotateY(0deg)');
        $('.box').css('transition', 'all 0.5s ease');
        $('.box').addClass('unmatched');
        flippedCards = [];
        match_count = 0;
        console.log(started);
    })
}

function won(){
    if(match_count === 6){
        $('h1').text('Game Over, you won!');
        $('h3').text('Press any key to play again');
        $('h3').css('color', 'green');
        $('h3').fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
        started = false;
        console.log(started);
    }
}

//on click flip
$(".box").click(function(){

        //start
        if(started && match_count <= 6){
        
            //2 cards
            if(flippedCards.length < 2){

                var cardId = $(this).attr('id');   
                flippedCards.push(cardId);              //taking the card id and into the array

                $(this).css('transform', 'rotateY(180deg)');   //flipping the card

                console.log(flippedCards);
                //check for match
                if(flippedCards.length === 2){
                    var matched = checkForMatch();

                    if(!matched){
                        setTimeout(function(){
                            $('.unmatched').css('transform', 'rotateY(0deg)')
                        }, 500);
                        flippedCards = [];
                    }
                    else {
                      $('#' + flippedCards.join(', #')).removeClass('unmatched');
                      flippedCards = [];
                      match_count++;
                      won();
                    }
                }                                         
            }
        }
        else{
            $('h3').css('color', 'red');
            $('h3').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

            setTimeout(function(){
                $('h3').css('color', 'black');
            }, 1500);
        }
})

//for checking matches
function checkForMatch(){
    if(flippedCards[0] === flippedCards[1]){
        return true;
    }
}

//random after each game
//how to play & hint button {optional}
//images to the back of card
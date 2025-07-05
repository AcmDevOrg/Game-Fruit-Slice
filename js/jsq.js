let playing=false;
let score;
let step;
let action;
let trialLeft;
let fruits=["apple","banana","berry","cherries","grapes","mango","orange","peach","pear","pineapple","watermelon"];
$(()=>
{
    //click on start/restart
    $("#startreset").click(()=>
    {
        //if we are playing
        if(playing)
        {
            //reload page
            location.reload();
            playing=false;
        }
        else
        {
            //if we are not playing
            //hide the game over
            $("#gameover").hide();
            //change the text reset game
            $("#startreset").html("Reset Game");
            //playing the game
            playing=true;
            //score initialize to 0
            score=0;
            $("#scorevalue").html(score);
            //show left trial or life left
            $("#trialleft").show();
            //setting initial trial value
            trialLeft=3;
            //Adding Trial Heart
            addHearts();
            //Starting Sending Fruit
            startAction(); 
        }
    });
    function addHearts()
    {
        //clear hearts
        $("#trialleft").empty();
        //fill load the heart
        for(let i=0;i<trialLeft;i++)
        {
            $("#trialleft").append('<img src="img/heart.png" class="heart">');
        }
    }
    //start action
    function startAction()
    {
        //genrate fruits
        $("#fruit").show();
        //generate random fruits
        chooseFruit();
        //randam position
        let containerWidth = $("#fruitcontainer").width();
        let fruitWidth = $("#fruit").width();
        let maxLeft = containerWidth - fruitWidth;
            $("#fruit").css({
                "left": Math.round(maxLeft * Math.random()),
                "top": -50
            });
        //generate step
        step=1 + Math.round( 5 * Math.random());
        //Move fruit down by steps every 10ms
        action=setInterval(()=>{
            $("#fruit").css("top",$("#fruit").position().top + step);
            //To Check fruit is too slow
            if($("#fruit").position().top > $("#fruitcontainer").height())
            {
                //to check we have life left
                if(trialLeft > 1)
                {                    
                    chooseFruit();
                    containerWidth = $("#fruitcontainer").width();
                    fruitWidth = $("#fruit").width();
                      maxLeft = containerWidth - fruitWidth;
                    $("#fruit").css({"left":Math.round(maxLeft * Math.random()),"top":-50});
                    step=1 + Math.round( 5 * Math.random());
                    //reduce the life left
                    trialLeft--;
                    //populate hearts
                    addHearts();
                }
                else //GameOver
                {
                    playing=false;
                    //We are not playing
                    $("#startreset").html("Start Game");
                    $("#gameover").show();
                    $("#gameover").html("<p>Game Over !</p><p>Your Score is " + score + "</p>");
                    //hide the trial left
                    $("#trialleft").hide();   
                    stopAction();
                }
            }
        },10)
    }
    //genrate random fruit
    function chooseFruit()
    {
        let rand=fruits[Math.round(9*Math.random())];
        // console.log(rand);
        $("#fruit").attr('src','img/' + rand + '.png');
    }
    function stopAction()
    {
        clearInterval(action);
        //hide the fruit
        $("#fruit").hide();
    }
    //slice the fruit
    $("#fruit").on("mouseover touchstart",()=>
    {
        //increse the score by one
        score++;
        //update the score value
        $("#scorevalue").html(score);
        //play the sound
        $("#slicesound")[0].play();
        // stop action
        clearInterval(action);
        //hide fruit animation
        $("#fruit").hide("explode",200);
        //send new fruit
        setTimeout(startAction,400);
    });
})
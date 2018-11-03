//create a multidimensional array composed of questions and the index value of the correct answer in the answer array
var questions = [
                    ["At what Chicago college did Paul Sills and Mike Nichols first meet?",0],
                    ["What was the name of the first improvisational troupe to perform in Chicago?",2],
                    ["Which legandary comedic duo began in Chicago Improv?",1],
                    ["Which of these original SNL cast-members was NOT a performer for The Second City",2],
                    ["Which of these performers is not an author of the Improv manual 'Truth in Comedy'?",0],
                    ["The Upright Citizens Brigade began as an improv troupe in Chicago.",0],
                    ["What is the name of the signature long-form improv structure created by Del Close?",2],
                    ["Which of these is not an Improvisational Theatre in Chicago?",1],
                    ["What is the cardinal rule of improv?",3],
                    ["Which one of these late-night hosts performed at Second City?",2]
                ];
//multidimsional array composed of multiple choice answers corresponding to the questions in the first array
var answers =   [
                    ["University of Chicago","Northwestern","DePaul","Loyola"],
                    ["The Second City","Impro","The Compass Players","The Committee"],
                    ["Abbott and Costello","Nichols and May","Laurel and Hardy","Martin and Lewis"],
                    ["Bill Murray","Dan Aykroyd","Chevy Chase","Gilda Radner"],
                    ["Paul Sills","Del Close","Charna Halpern","Kim Johnson"],
                    ["True","False"],
                    ["The Armando","The Heraldo","The Harold","The Maude"],
                    ["iO Theatre","Upright Citizens Brigade Theatre","The Second City","The Annoyance Theatre and Bar"],
                    ["Follow The Follower", "If Then","It's Never Too Late To Put on an Accent","Yes And"],
                    ["Jimmy Kimmell","Jimmy Fallon","Stephen Colbert","Seth Meyers"]
                ];
//function that prints out a button for each value of the inner array in answers, takes the index of the selected inner array as an argument
var generateAnswers = function(number){
    for(var i = 0; i < answers[number].length; i++){
        var answerButton = $("<a>");
        answerButton.text(answers[number][i]);
        answerButton.attr("answer_data",i).attr("class","answer btn btn-primary btn-lg");
        $("#answers").append($("<div>").append(answerButton));
    }
}
//intilizes the game, button calls the play game function
var resetGame = function(){
    $("#question").html("<h1> Welcome to the Chicago Improv Comedy Trivia Game! </h1>");
    $("#answers").html(`<a id="start" class ="btn btn-primary btn-lg text-center"> Click to start the game!</button>`);
    $("#start").on("click",playGame);
}
//displays the correct counter and the wrong counter and allows the player to call the reset function
var endScreen = function(correctCounter,wrongCounter){
    $("#question").html(`<h1>You got ${correctCounter} right and ${wrongCounter} wrong!<h1>`);
    $("#answers").html( $("<a>").text("Restart").attr("id","restart").attr("class","btn btn-primary btn-lg"));
    $("#restart").on("click", resetGame);
}
//game play function
var playGame = function(){
    //intilizes the  counter variables and the incrementor
    var correctCounter = 0;
    var wrongCounter = 0;
    var j=0;
    //recursive function that defines each instance of a question and answer
    var answerQuestion = function(i){
        //base case if i the number we are passed into questions.length we have gone through every question and can proceed to the end screen 
        if(i == questions.length){
            endScreen(correctCounter,wrongCounter);
        }
        else{
            //empty the answers so old buttons are not appended to
            $("#answers").empty();
            //print question corresponding to i index
            $("#question").html(`<h1>${questions[i][0]}</h1>`);
            //setting a 20 second timer
            var num = 20;
            //displays timer underneath the question
            $("#question").append(`<h3 id=timer>Timer: ${num}</h3>`);
            //on the second interval, decrement num and display it
            var timer = setInterval(function(){
                num--;
                $("#timer").text(`Timer: ${num}`);
            },1000);
            //run generate answers for index i
            generateAnswers(i);
            //define the timeout for answering the question
            var questionTime = setTimeout(function(){
                //stop timer from decrementing
                clearInterval(timer);
                
                //saves the answer index to var answer
                var answer = questions[i][1];
                //alerts user to correct answer
                $("#question").html(`<h1>Time's Up! The correct answer is ${answers[i][answer]}</h1>`)
                //prints corresponding image
                $("#answers").empty().append($("<img>").attr("src",`assets/images/answer_${i+1}.jpg`));
                //count as wrong answer
                wrongCounter++;
                //increment to the next index
                i++;
                var answerTimeout = setTimeout(function(){
                    //calls answer
                    answerQuestion(i);   
                },3000);
            },20000); 
        } //defines what happens each a user chooses an answer
        $(".answer").on("click", function(){
            //if the index of the answer matches the number in the questions two way array
            if( $(this).attr("answer_data") == questions[i][1]){
                //stop the timer and the timeout
                clearInterval(timer);
                clearTimeout(questionTime);
                //message winner and display the image
                $("#question").html('<h1>You are correct!</h1>')
                $("#answers").empty().append($("<img>").attr("src",`assets/images/answer_${i+1}.jpg`));
                //count as corrdet
                correctCounter++;
                i++;
                //move on to next question after 3 sec
                setTimeout(function(){
                    answerQuestion(i);
                },3000);
            }
            else{
                clearInterval(timer);
                clearTimeout(questionTime);
                //display correct answer for user and the image
                $("#question").html(`<h1>Nope! The correct answer is ${answers[i][questions[i][1]]}</h1>`)
                $("#answers").empty().append($("<img>").attr("src",`assets/images/answer_${i+1}.jpg`));
                //count as wrong
                wrongCounter++;
                setTimeout(function(){
                    i++;
                    answerQuestion(i);   
                },3000);
            } 
            
    });

   
    }
    //intial call of the answer question function
    answerQuestion(j); 
} //initial call of the game
resetGame();

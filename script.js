"use strict";
import * as lib from "./Class1data.js"
// import {toTaatik} from "./taatik" 

// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         const jasonIn =JSON.parse(xhttp.responseText);
//         return jasonIn;
//     }
// };

// xhttp.open("GET", "input.json", false);
// xhttp.send();


// var globlajason = xhttp.onreadystatechange(); 
// console.log(globlajason);

const chat = $(".chat");
const director = $(".director-container");
var Iter = "step0";


function showBotAnswer(replay){
    
    chat.append('<div class="msg bot">' + toTaatik(replay) + '</div>');
    director.html("");
}

function giveOptions(replay){
    director.append(
        '<div class="msg director">אנא הקליטו... <br> אפשרויות: '
      );
    for(const option in replay){
        console.log(option);
        director.append('<span>'+option+'<br></span>');
    }
    director.append(
        '</div> '
      );
}

function appendUserAnswer(replay){
    chat.append('<div class="msg user">'+replay +' </div>');
    director.html("");
    
}

function showBotton(repet){
    director.html('<button id="myBtn"> play Question back </button>');
    // document.getElementById("myBtn").removeEventListener("click",()=>{});
    document.getElementById("myBtn").addEventListener("click", () => {lib.sayTheWord(repet)});
}


if(annyang){

    function handleCommand(XX){
        for(const x in XX){
            annyang.removeCommands(x);
        }
    }

    function automateRun(data,step){
        // console.log(data[step]["bot"]);
        showBotAnswer(data[step]["bot"]);
        lib.sayTheWord(data[step]["voice"]);
        annyang.addCommands(data[step]["user"]);
        showBotton(data[step]["voice"]);
        setTimeout(() =>{
            giveOptions(data[step]["user"]);
        },2000);
    }

    annyang.addCallback('resultMatch', function(phrases) {
        SpeechKITT.abortRecognition();
        appendUserAnswer(phrases);
        handleCommand(lib.AllData[Iter]["user"]);
        if(lib.AllData[Iter]["flag_options"]){
            var randomm = Math.round(Math.random() * (lib.AllData[Iter]["next_step"].length));
            Iter = lib.AllData[Iter]["next_step"][randomm];
        }else{
            Iter = lib.AllData[Iter]["next_step"];
        }
        if(lib.AllData[Iter]["bot"] != "stop"){
            setTimeout(() =>{
                automateRun(lib.AllData,Iter);
            },2000);
        }else{
            setTimeout(() =>{
                showBotAnswer("GoodBye :)");
            },2000);
        }
    });

    annyang.addCallback('resultNoMatch', function(phrases) {
        SpeechKITT.abortRecognition();
        showBotAnswer("حاول مرة أخرى <br>"+phrases[0] + " :أسف لم أفهم");
    });
    
    // annyang.addCallback('result', function(phrases) {
    //     console.log("I think the user said: ", phrases[0]);
    //     console.log("But then again, it could be any of the following: ", phrases);
    // });
    
    annyang.setLanguage("ar-JO");
    annyang.start({ autoRestart: false, continuous: false , paused : true });
    
    
    SpeechKITT.annyang();
    SpeechKITT.setStylesheet(
        "https://cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat-pumpkin.css"
    );
    SpeechKITT.setStartCommand(annyang.start);
    SpeechKITT.setAbortCommand(annyang.abort);
    
    SpeechKITT.vroom();
    $("#skitt-listening-text").hide();

    automateRun(lib.AllData,Iter);
}else{
    showBotAnswer("Speech Recognition is not supported");
}


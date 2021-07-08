// "use strict";

const chat = $(".chat");
const director = $(".director-container");


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const jasonIn =JSON.parse(xhttp.responseText);
        return jasonIn;
    }
};

xhttp.open("GET", "input.json", false);
xhttp.send();

let arabicToHebrew = {};
let finalLetters = {};

arabicToHebrew["ا"] = "א";
arabicToHebrew["أ"] = "א";
arabicToHebrew["إ"] = "א";
arabicToHebrew["ء"] = "א";
arabicToHebrew["ئ"] = "א";
arabicToHebrew["ؤ"] = "א";
arabicToHebrew["آ"] = "אא";
arabicToHebrew["ى"] = "א";
arabicToHebrew["ب"] = "ב";
arabicToHebrew["ت"] = "ת";
arabicToHebrew["ث"] = "ת'";
arabicToHebrew["ج"] = "ג'";
arabicToHebrew["ح"] = "ח";
arabicToHebrew["خ"] = "ח'";
arabicToHebrew["د"] = "ד";
arabicToHebrew["ذ"] = "ד'";
arabicToHebrew["ر"] = "ר";
arabicToHebrew["ز"] = "ז";
arabicToHebrew["س"] = "ס";
arabicToHebrew["ش"] = "ש";
arabicToHebrew["ص"] = "צ";
arabicToHebrew["ض"] = "צ'";
arabicToHebrew["ط"] = "ט";
arabicToHebrew["ظ"] = "ט'";
arabicToHebrew["ع"] = "ע";
arabicToHebrew["غ"] = "ע'";
arabicToHebrew["ف"] = "פ";
arabicToHebrew["ق"] = "ק";
arabicToHebrew["ك"] = "כ";
arabicToHebrew["ل"] = "ל";
arabicToHebrew["م"] = "מ";
arabicToHebrew["ن"] = "נ";
arabicToHebrew["ه"] = "ה";
arabicToHebrew["و"] = "ו";
arabicToHebrew["ي"] = "י";
arabicToHebrew["ة"] = "ה";

arabicToHebrew["،"] = ",";
arabicToHebrew["َ"] = "ַ";
arabicToHebrew["ُ"] = "ֻ";
arabicToHebrew["ِ"] = "ִ";

finalLetters["ن"] = "ן";
finalLetters["م"] = "ם";
finalLetters["ص"] = "ץ";
finalLetters["ض"] = "ץ'";
finalLetters["ف"] = "ף";

function toTaatik(arabic) {
  // let arabic = this.toString();
  let taatik = "";
  let index = 0;

  [...arabic].forEach(function (letter) {

    if (
      (arabic[index + 1] == " " || arabic[index + 1] == "." || arabic[index + 1] == "،" || arabic.length <= (index+1))  &&
      Object.keys(finalLetters).includes(letter)
    ) {
      taatik += finalLetters[letter];
    } else if (!Object.keys(arabicToHebrew).includes(letter)) {
      taatik += letter;
    } else {
      taatik += arabicToHebrew[letter];
    }
    index++;
  });

  return taatik;
};


async function playAudio(fileName) {
    var audio = new Audio(fileName);  
    try {
      await audio.play();
      console.log('Playing...');
    } catch (err) {
      console.log('Failed to play...' + err);
    }
  }


var globlajason = xhttp.onreadystatechange(); 

function showBotAnswer(replay){
    chat.append('<div class="msg bot">' + toTaatik(replay) + '</div>');
    director.html("");
}

function appendUserAnswer(replay){
    chat.append('<div class="msg user">'+toTaatik(replay) +' </div>');
    director.html("");
    
}

function giveOptions(replay){
    director.append(
        '<div class="msg director">אנא הקליטו... <br> אפשרויות: '
      );
    for(var option in replay ){
        director.append('<span>'+ toTaatik(option)+'<br></span>');
    }
    director.append(
        '</div> '
      );
}

function showBotton(repet){
    director.html('<button id="myBtn"> play Question back </button>');
    document.getElementById("myBtn").addEventListener("click", () => {playAudio(repet)});
}


if(annyang){

    function handleCommand(XX){
        for(let x in XX){
            console.log(x + " SSS");
            annyang.removeCommands(x);
        }
    }

    function empty(){}

    var userAnswers = new Object();

    function nodesToStringArray(nodeArray){
        for(var i=0 ; i < nodeArray.length ; i++ ){
            userAnswers[(nodeArray[i].USER_ANSWER)] = empty;
        }
    }

    function automateRun(innerIter){
        if(innerIter[0].category == "Conditional"){
            showBotAnswer(innerIter[0].BOT_Q);
            playAudio(innerIter[0].RECORDING);
        }
        Iterator= getTragetNodes(innerIter[0]);
        nodesToStringArray(Iterator);
        annyang.addCommands(userAnswers);
        showBotton(innerIter[0].RECORDING);
        setTimeout(() =>{
            giveOptions(userAnswers);
        },2000);
    }

    function getNodeFromKey(Key){
        for(var i=0; i <  globlajason.nodeDataArray.length ; i++ ){
            if(globlajason.nodeDataArray[i].key == Key){
                return globlajason.nodeDataArray[i];
            }
        }
        return null;
    }

    function getTragetNodes(Source){
        var keysArray = [];
        for(var i=0; i <  globlajason.linkDataArray.length ; i++ ){
            if(globlajason.linkDataArray[i].from == Source.key){
                keysArray.push(getNodeFromKey(globlajason.linkDataArray[i].to));
            }
        }
        return keysArray;
    }

    function hasStarInIt(word){
        for (var i=0; i< word.length ;i++){
            if(word[i] == '*'){
                return true;
            }
        }
        return false;
    }

    annyang.addCallback('resultMatch', function(phrases) {
        SpeechKITT.abortRecognition();
        appendUserAnswer(phrases);
        handleCommand(userAnswers);
        userAnswers = new Object();
        var userAnswerIndex;
        for(var i=0 ; i < Iterator.length ; i++ ){
            if(Iterator[i].USER_ANSWER==phrases || hasStarInIt(Iterator[i].USER_ANSWER)){
                userAnswerIndex=(getTragetNodes(Iterator[i]));
            }
        }
        if(userAnswerIndex[0].category != "End"){
            setTimeout(() =>{
                automateRun(userAnswerIndex);
            },2000);
        }else{
            setTimeout(() =>{
                showBotAnswer("GoodBye :)");
            },2000);
        }
    });

    annyang.addCallback('resultNoMatch', function(phrases) {
        SpeechKITT.abortRecognition();
        console.log(phrases);
        showBotAnswer("סליחה לא הבנתי"+" :" + "\""+phrases[0] + "\""+ "<br> תנסה עוד פעם" );
        setTimeout(() =>{
            giveOptions(userAnswers);
        },2000);
    });
    
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

    
    var startNode;
    for(var i=0; i <  globlajason.nodeDataArray.length ; i++ ){
        if(globlajason.nodeDataArray[i].category == "Start"){
            startNode = globlajason.nodeDataArray[i];
        }
    }
    var Iterator= getTragetNodes(startNode);
    
    automateRun(Iterator);
}else{
    showBotAnswer("Speech Recognition is not supported");
}


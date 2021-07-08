"use strict";
var slaam = new Audio('slaam.m4a');
var kefak = new Audio('kefak.m4a');
var mnWen1 = new Audio('mnwain1.m4a');
var mnWen2 = new Audio('mnwain2.m4a');
var sakeen = new Audio('sakin.m4a');
var alasm = new Audio('shoAsmk.m4a');

function sayTheWord(command){
    switch(command){
        case slaam:
            slaam.play();
            break;
        case kefak:
            kefak.play();
            break;
        case alasm:
            alasm.play();
            break;
        case mnWen1:
            mnWen1.play();
            break;
        case mnWen2:
            mnWen2.play();
            break;
        case sakeen:
            sakeen.play();
            break;
        default:
        break;
    }
  }

export {sayTheWord};

export const user_answer= [{
        'وعليكم السلام': () =>{}
        ,'اهلين': ()=>{}
        ,"أهلين.": ()=>{}
    },
    {
        "تمام.": () => {},
        "عايشين": () => {},
        "الحمد لله": () => {}
    },
    {
        'أنا *asmk': () => {},
        'إسمي *asmk': () => {}
    },
    {
        'انا من *area':()=>{},
        '*Area' :() =>{}
    },
    {
        '*City' : ()=>{}
    },
    {
        '*alkhal' : ()=>{}
    }
];

export const AllData = {
    "step0" : {
        "bot" : "السلام عليكم",
        "user" : user_answer[0],
        "voice" : slaam,
        "next_step" : "step1",
        "flag_options" : false
    },
    "step1" : {
        "bot" : "كيف حالك؟",
        "user" : user_answer[1],
        "voice" : kefak,
        "next_step" : "step2",
        "flag_options" : false
    },
    "step2" : {
        "bot" : "شو أسمك",
        "user" : user_answer[2],
        "voice" : alasm,
        "next_step" : "step3",
        "flag_options" : false
    },
    "step3" : {
        "bot" : "يا هلا تشرفنا,<br> من وين أنت بالبلاد؟",
        "user" : user_answer[3],
        "voice" : mnWen1,
        "next_step" : "step4",
        "flag_options" : false
    },
    "step4" : {
        "bot" : "من وين بالضبط؟",
        "user" : user_answer[4],
        "voice" : mnWen2,
        "next_step" : ["step5","stepB5","stepC5","stepD5"],
        "flag_options" : true
    },
    "step5" : {
        "bot" : "والله!!<br>دار خالي كمان ساكنين هناك",
        "user" : user_answer[4],
        "voice" : sakeen,
        "next_step" : "step6",
        "flag_options" : false
    },
    "stepB5" : {
        "bot" : "والله!!<br>كثير حلوة هالبلد",
        "user" : user_answer[4],
        "voice" : sakeen,
        "next_step" : "step6",
        "flag_options" : false
    },
    "stepC5" : {
        "bot" : "عنجد!!<br>عندي صاحب من هناك",
        "user" : user_answer[4],
        "voice" : sakeen,
        "next_step" : "step6",
        "flag_options" : false
    },
    "stepD5" : {
        "bot" : "والله!!<br>أشتريت سيارتي من هناك",
        "user" : user_answer[4],
        "voice" : sakeen,
        "next_step" : "step6",
        "flag_options" : false
    },
    "step6" : {
        "bot" : "stop",
        "user" : user_answer[1],
        "voice" : kefak,
        "next_step" : "step3",
        "flag_options" : false
    }
    // ,
    // "step7" : {
    //     "bot" : "stop",
    //     "user" : user_answer[1],
    //     "voice" : kefak,
    //     "next_step" : "step3"
    // }
};
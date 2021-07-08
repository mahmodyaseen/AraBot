
export {toTaatik}; 

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


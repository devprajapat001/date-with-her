const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const messages = [
    "Are you sure? 🥺",
    "Sachiiii? 😭",
    "Ek baar aur soch lo ❤️",
    "Chocolate bhi khilaunga 🍫",
    "Pretty Please 🥹",
    "Free Hugs 🤗",
    "Fine...Yes ❤️"
];

let index = 0;

yesBtn.onclick = function(){

alert("Yayyyyy ❤️🥳");

}

noBtn.onclick = function(){

if(index < messages.length){

noBtn.innerHTML = messages[index];

index++;

}

}
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const messages=[
"Are you sure? 🥺",
"Sachiii? 😭",
"Ek baar aur soch lo ❤️",
"Chocolate bhi khilaunga 🍫",
"Pretty Please 🥹",
"Free Hugs 🤗",
"No is unavailable 😂",
"Fine...Yes ❤️"
];

let i=0;

yesBtn.onclick=function(){

alert("Yayyyy ❤️");

}

noBtn.onclick=function(){

if(i<messages.length){

noBtn.innerHTML=messages[i];

i++;

}

}

function createHeart(){

const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML="❤️";

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=(20+Math.random()*25)+"px";

heart.style.animationDuration=(5+Math.random()*5)+"s";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},10000);

}

setInterval(createHeart,300);
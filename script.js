let xp=0;
let health=100;
let gold = 50;
let currentWeapon=0;
let fighting=0;
let monsterHealth;
let inventory=["stick"];

const button1= document.querySelector("#button1");
const button2= document.querySelector("#button2");

const button3= document.querySelector("#button3");
const text= document.querySelector("#text");
const xpText= document.querySelector("#xpText");
const goldText= document.querySelector("#goldText");
const monsterStats= document.querySelector("#monsterStats");
const monsterNameText= document.querySelector("#monsterName");
const monsterHealthText= document.querySelector("#monsterHealth");
const healthText= document.querySelector("#healthText");

/* comments */
//initialize button

const weapons=[
    {
        name:"stick",
        power:5
    },
    {
        name:"dagger",
        power:30
    },
    {
        name:'claw hammer',
        power:50
    },
    {
        name:"sword",
        power:100
    }
]
const monsters=[
    {
        name:"slime",
        level:2,
        health:15
    },
    {
        name:"fanged beast",
        level:8,
        health:60
    },
    {
        name:"dragon",
        level:20,
        health:300
    }
]
const locations=[
    {
        name: "town squre",
        "button text":["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in town squre .You see a sign that says \"Store.\""

    },
    {
        name: "store",
        "button text":["Buy 10 Health(10 gold)", "Buy Weapon(30 gold)", "Go to town Squre"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store"

    },
    {
        name: "cave",
        "button text":["Fight slime)", "Fight fanged beast", "Go to town Squre"],
        "button functions": [fightslime, fightbeast, goTown],
        text: "You entered the cave. You see some monsters"

    },
    {
        name: "fight",
        "button text":["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."

    },
    {
        name: "kill monsters",
        "button text":["Go to town squre", "Go to town squre", "Go to town squre"],
        "button functions": [goTown, goTown, goTown],
        text: "The monster screams \"Arg!\" as it dies.you gain experience points and find gold"

    },
    {
        name: "lose",
        "button text":["REPLAY", "REPLAY", "REPLAY"],
        "button functions": [restart, restart, restart],
        text: "you die"

    },
    {
        name: "win",
        "button text":["REPLAY", "REPLAY", "REPLAY"],
        "button functions": [restart, restart, restart],
        text: "you defeat the dragon! YOU WIN THE GAME"

    }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display="none";
    button1.innerText=location["button text"][0];
    button2.innerText=location["button text"][1];
    button3.innerText=location["button text"][2];

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText=location.text

}
function goTown()
{
   update(locations[0]);
}

function goStore(){
    update(locations[1]);
}


function goCave(){
    update(locations[3]);
}


function buyHealth(){
    if(gold>=10){
        gold-=1010
        health+=10
        goldText.innerText=gold;
        healthText.innerText=health;
     }else{
        text.innerText="you do not have enough gold to buy health";
     }
    }
   
function buyWeapon()
{
if(currentWeapon<weapons.length-1){
    if(gold>=30){
        gold-=30;
        currentWeapon++;
        goldText.innerHTML=gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText="you have a " + newWeapon +".";
        inventory.push(newWeapon);
        text.innerText += "In your Inventory you have: "+ inventory;
    }else{
        text.innerText="You dont have enough gold to buy your next weapon";
    }
}else{
    text.innerText="you have the best weapon"
    button2.innerText="sell weapon for 15 gold";
    button2.onclick=sellWeapon;
}

}
function sellWeapon(){
    if(inventory.length>1){
        gold+=15;
        gold.innerText=gold;
        let currenteWapon=inventory.shift();
        text.innerText="you sold a "+ currentWeapon+ ".";
        
    }else{
        text.innerText="Dont sell your only weapon";
    }
}
function fightslime(){
    fighting=0;
    goFight();
}
function fightbeast(){
    fighting=1;
    goFight();
}
function fightDragon(){
    fighting=2;
    goFight();
}
function goFight(){
   update(locations[3]);
   monsterHealth=monsters[fighting].health;
   monsterStats.style.display="block";
   monsterNameText.innerText=monsters[fighting].name;
   monsterHealthText.innerText=monsterHealth;
}
function attack(){

    text.innerText="The "+ monsters[fighting].name + " attacks.";
    text.innerText+="you attack it with your "+weapons[currentWeapon].name+".";
    
    health-=monsters[fighting].level;
    monsterHealth-=weapons[currentWeapon].power+ Math.floor(Math.random()*xp)+1;
    healthText.innerText=health;
    monsterHealthText.innerText=monsterHealth;
    if(health<=0){
        lose();
    }else if(monsterHealth<=0){
         fighting === 2 ? winGame() : defeatMonster();
       
    }
}
function dodge(){
   text.innerText="you dodged the attack from the "+ monsters[fighting].name + ".";

}
function defeatMonster(){
      gold+=Math.floor(monsters[fighting].level * 6.7);
      xp+=monsters[fighting].level;
      goldText.innerText=gold;
      xpText.innerText=xp;
      update(locations[4])
}
function lose(){
     update(locations[5]);
}
function winGame(){
    update(locations[6]);
}
function restart(){
    let xp=0;
    let health=100;
    let gold = 50;
    currenteWapon=0;
    inventory=["stick"];
    goldText.innerText=gold;
    healthText.innerText=health;
    xpText.innerText=xp;
    goTown();
}
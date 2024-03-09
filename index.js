
"use strict";

/*Game*/ 

const gameSection = document.querySelector(".gameSection");
const choiceNumber = document.querySelector("#choiceNumber");
const guessButton = document.querySelector("#guessButton");
const lifePoints = document.querySelector(".lifePoints");
const logs = document.querySelector(".gameLogs");
const playAgainButton = document.querySelector("#playAgainButton");
const misteryNumber = document.querySelector(".mistery-number");   
const misteryBox =  document.querySelector(".mistery-box");
const iconQuestion = document.querySelector(".fa-question");


const gameLogsDictionary = {
  initial: "¡Comienza el juego!",
  winner: "¡Has ganado! ",
  loser: "Has agotado los intentos", 
  integerNumber: "⚠️ Ingrese un entero ",
  error: "⛔ Ingrese número entre 1 y 15",
  upperNumber: "Mas alto 🆙",
  lowerNumber: "Mas bajo ⬇️",
  repeated:  "⛔ El número ya fue utilizado",
};


let secretNumber = Math.trunc(Math.random()*15 + 1);
let points = 5;
let listOfNumbers = [];
logs.textContent = gameLogsDictionary.initial;
lifePoints.textContent = points;


const changeLogs = (value) => (logs.textContent = value);

const changeDisplay = (selector, value) => (selector.style.display=value);


const PlayAgain= () => {
 points=5;
  secretNumber = Math.trunc(Math.random()*15 + 1);
  lifePoints.textContent = points;
  listOfNumbers = [];
  changeLogs(gameLogsDictionary.initial);
  changeDisplay(playAgainButton, "none");
  changeDisplay(guessButton, "block");
  choiceNumber.value = null;
  misteryNumber.textContent="";
  misteryNumber.classList.remove("activation");
  misteryBox.classList.remove("game-over");

};



const adivinar = (e) => {
const {value} = choiceNumber;
const numeroValor = Number(value);
choiceNumber.value = "";
let numeroNuevo = null;

if(numeroValor>0 && numeroValor<=20 ){
  
  if(!Number.isInteger(numeroValor)){
    changeLogs(gameLogsDictionary.integerNumber);
   
  } else if(!listOfNumbers.includes(numeroValor)){
    listOfNumbers.push(numeroValor);
    numeroNuevo = numeroValor;
  }
  
  if (numeroNuevo === secretNumber){
  
    changeLogs(gameLogsDictionary.winner);
    changeDisplay(playAgainButton, "block");
    changeDisplay(guessButton, "none");
    misteryNumber.textContent=secretNumber;
    misteryNumber.classList.add("activation");
    misteryBox.classList.add("shadow-animation");
    
   
  }else {

    if(listOfNumbers.includes(numeroNuevo)){
     points --;
     lifePoints.textContent = points; 
      numeroNuevo < secretNumber 
      ? changeLogs(gameLogsDictionary.upperNumber)
      : changeLogs(gameLogsDictionary.lowerNumber);
    
      
      if (points == 0) {
        changeLogs(gameLogsDictionary.loser);
        changeDisplay(playAgainButton, "block");
        changeDisplay(guessButton, "none");
        misteryBox.classList.add("game-over");
      }else{return;}
    
    }else {changeLogs(gameLogsDictionary.repeated);};
} 
}else changeLogs(gameLogsDictionary.error);

}

guessButton.addEventListener("click", adivinar)
playAgainButton.addEventListener("click", PlayAgain )



/*Log in*/ 

const registerButton = document.querySelector("#registerButton");
const cancelButton = document.querySelector("#cancelButton");
const userName =  document.querySelector("#userName");
const registrationContainer = document.querySelector(".registrationContainer");
const registrationForm = document.querySelector(".registrationForm");
const getimputsAll = document.querySelectorAll(".registrationForm input");
let registerName;


const expresions = {
  user: /(?!.*[\.\-]{,})^[a-zA-Z0-9\.\-]{3,16}$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,16}$/,
}

const inputsToCheck = {
  user: false,
  password: false,
  passwordrepet: false,
}

const abrirFormulario = () =>{
  registrationContainer.style.display = "flex";
  gameSection.style.display="none";
};

const cerrarFormulario = () => {
  registrationContainer.style.display = "none";
  gameSection.style.display="flex";

};


const validarFormulario = (e) => {
switch (e.target.name) {
  case "userRegister": 
 validarCampo(expresions.user, e.target, "user", "user" );
 registerName=e.target.value;
  break;
  case "password":
  validarCampo(expresions.password, e.target, "password", "password");
   break;
   case "repeatedPassword":
   validarPassword(e.target);
      break;
 default:
  break;
}
 }

 const validarCampo = (expresion, input, campo, checked) =>{

  if(expresion.test(input.value.trim())){
    document.querySelector(`.${campo}Group .validationError`).classList.remove("validationError_active");
    inputsToCheck[checked]=true;

   
  }else{
    document.querySelector(`.${campo}Group .validationError`).classList.add("validationError_active");
    inputsToCheck[checked]=false;
  }
 }

 const validarPassword= (input) => {
  const firstPassword=password.value;
  if(input.value == firstPassword){
    inputsToCheck.passwordrepet=true;
    document.querySelector(".validationPasswordGroup .validationError").classList.remove("validationError_active");
  }else{
    inputsToCheck.passwordrepet=false;
    document.querySelector(".validationPasswordGroup .validationError").classList.add("validationError_active");
  }
 }

const Registrarme = (e) => {
  e.preventDefault();
  
if(inputsToCheck.user && inputsToCheck.password && inputsToCheck.passwordrepet){
 
  registerButton.remove();
  cerrarFormulario();
  userName.innerHTML=registerName;
  userName.style.display = "flex"
 
}else{
  document.querySelector(".validationAll").classList.add("validationAll_active");
}
 
};

getimputsAll.forEach((input) => {
  input.addEventListener("blur", validarFormulario);
   
 });
 
 registerButton.addEventListener("click", abrirFormulario);
 cancelButton.addEventListener("click", cerrarFormulario);
registrationForm.addEventListener("submit", Registrarme);






// * IMPORT AREA

import { data } from "./data.js";

let initialState = false;

// * BUTTON ATTACK

document.getElementById("attack-button").addEventListener("click", function () {
  initialState = true;
  render();
  // TODO console.log(consHero.damageArr);
  // TODO console.log(consMonster.damageArr);

  consHero.takeDamage(consMonster.damageArr);
  consMonster.takeDamage(consHero.damageArr);
});

/////////////////////////////////////////////////a//////////////////////////////////////////////////////////////////

// ! Constructor Function => Object + Object = Object

function Character(data) {
  Object.assign(this, data);
  this.damageArr = [];

  // ! Random Number Generator
  this.randomNumArr = function (diceCount) {
    return new Array(diceCount)
      .fill(0)
      .map(() => Math.floor(Math.random() * 6) + 1);
  };

  // ! Initial Num Cont Empty Boxes

  this.randomNumEmptyCont = function (diceCount) {
    return this.randomNumArr(diceCount)
      .map(() => `<div class = "placeholder-dice"></"></div>`)
      .join("");
  };

  // ! Random Num HTML Generator

  this.randomNumHtmlGenerator = function (diceCount) {
    this.damageArr = this.randomNumArr(diceCount);

    return this.damageArr
      .map((num) => `<div class = "dice">${num}</div>`)
      .join("");
  };

  // ! Damage Function

  this.takeDamage = function (powerArr) {
    const reducedArrValue = powerArr.reduce(
      (total, current) => total + current
    );

    this.health -= reducedArrValue;
    if (this.health <= 0) {
      this.dead = true;
      this.health = 0;
    }
  };

  // ! RenderCharacter Function
  this.renderCharacter = function () {
    const { elementId, name, avatar, health, diceCount } = this;
    const randomNumCont = initialState
      ? this.randomNumHtmlGenerator(diceCount)
      : this.randomNumEmptyCont(diceCount);
    return `
        <div class="character-card">
        <h4 class="name"> ${name} </h4>
        <img class="avatar" src="${avatar}"/>
        <p class="health">health: <b> ${health} </b></p>
        <div class="dice-container"> ${randomNumCont} </div>
        </div>`;
  };
}

/////////////////////////////////////////////////////////////////////////////////////////////

// !Render Area

function render() {
  document.getElementById("hero").innerHTML = consHero.renderCharacter();
  document.getElementById("monster").innerHTML = consMonster.renderCharacter();
}

// ! Constructor Function Setup

const consHero = new Character(data.hero);
const consMonster = new Character(data.monster);
render();

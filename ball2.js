"use strict";
let ballContainer = document.querySelector(".Ball-Container");
let ballBoundaries = ballContainer.getBoundingClientRect();
let leftBoundary = parseInt(ballBoundaries.left);
let rightBoundary = parseInt(ballBoundaries.right) - leftBoundary;
let topBoundary = parseInt(ballBoundaries.top);
let bottomBoundary = parseInt(ballBoundaries.bottom) - topBoundary;

//DOM connection to Buttons
const addBallButton = document.querySelector(".Add-Ball-Container");
const subtractBallButton = document.querySelector(".Subtract-Ball-Container");

//Array containing all of the balls
const ballArray = [];

//Add and Subtract Functions

const addBall = function () {
  console.log("clicked");
  let example = document.createElement("div");
  example.className = "Ball";
  let addNewBall = new Ball(
    randomPosition(),
    randomPosition(),
    example,
    randomColor(),
    randomVelocity(),
    randomDiameter(),
    randomVelocity()
  );
  addNewBall.startBouncing();
  ballContainer.append(example);
  ballArray.push(example);

  console.log(ballArray);
};

const subtractBall = function () {
  if (ballArray.length === 0) {
    return;
  } else {
    let lastOne = ballArray[ballArray.length - 1];
    lastOne.remove();
    ballArray.splice(ballArray.length - 1, 1);
  }
};
//Random Generation Functions
const randomPosition = function () {
  return Math.floor(Math.random() * 400);
};
const randomDiameter = function () {
  return Math.floor(Math.random() * 100 + 25);
};
const randomVelocity = function () {
  return Math.floor(Math.random() * 3 + 1);
};
const randomColor = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};
//Constructor Class for each new Ball
class Ball {
  constructor(positionX, positionY, ballNum, color, velocity, diameter, speed) {
    this.velocity = velocity;
    this.positionX = positionX + this.velocity;
    this.positionY = positionY + this.velocity;
    this.reverseX = false;
    this.reverseY = false;
    this.ballNum = ballNum;
    this.color = color;
    this.diameter = diameter;
    this.speed = speed;
  }
  compareXY() {
    let ballContainer = document.querySelector(".Ball-Container");
    let ballBoundaries = ballContainer.getBoundingClientRect();
    let leftBoundary = parseInt(ballBoundaries.left);
    let rightBoundary = parseInt(ballBoundaries.right) - leftBoundary;
    let topBoundary = parseInt(ballBoundaries.top);
    let bottomBoundary = parseInt(ballBoundaries.bottom) - topBoundary;
    if (this.positionX >= rightBoundary - this.diameter) {
      this.reverseX = true;
    } else if (this.positionX <= 0) {
      this.reverseX = false;
    }
    if (this.positionY >= bottomBoundary - this.diameter) {
      this.reverseY = true;
    } else if (this.positionY <= 0) {
      this.reverseY = false;
    }
  }
  moveBallX() {
    this.positionX = this.positionX + this.velocity;
    this.ballNum.style.left = this.positionX + "px";
  }
  moveBallBackX() {
    this.positionX = this.positionX - this.velocity;
    this.ballNum.style.left = this.positionX + "px";
  }
  moveBallDown() {
    this.positionY = this.positionY + this.velocity;
    this.ballNum.style.top = this.positionY + "px";
  }
  moveBallUp() {
    this.positionY = this.positionY - this.velocity;
    this.ballNum.style.top = this.positionY + "px";
  }
  style1() {
    this.ballNum.style.backgroundColor = `${this.color}`;
    this.ballNum.style.border = `0px solid ${this.color}`;
    this.ballNum.style.boxShadow = `inset 0px 0px ${
      this.diameter / 3
    }px #00000050`;
    this.ballNum.style.width = `${this.diameter}px`;
    this.ballNum.style.height = `${this.diameter}px`;
  }
  style2() {
    this.ballNum.style.backgroundColor = `${this.color}00`;
    this.ballNum.style.border = `2px solid ${this.color}`;
    this.ballNum.style.boxShadow = `0px 0px 30px #ffffff`;
  }
  startBouncing() {
    setInterval(() => {
      this.compareXY();
      if (this.reverseX === true && this.reverseY === true) {
        this.moveBallBackX();
        this.moveBallUp();
        this.style1();
      } else if (this.reverseX === true && this.reverseY === false) {
        this.moveBallBackX();
        this.moveBallDown();
        this.style2();
      } else if (this.reverseX === false && this.reverseY === true) {
        this.moveBallX();
        this.moveBallUp();
        this.style2();
      } else if (this.reverseX === false && this.reverseY === false) {
        this.moveBallX();
        this.moveBallDown();
        this.style1();
      }
    }, this.speed);
  }
}

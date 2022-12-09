"use strict";
let ball1 = document.querySelector(".Ball1");
let ball2 = document.querySelector(".Ball2");
let ball3 = document.querySelector(".Ball3");
let ball4 = document.querySelector(".Ball4");
let ball5 = document.querySelector(".Ball5");
let ball6 = document.querySelector(".Ball6");

const randomPosition = function () {
  return Math.floor(Math.random() * 400);
};
const randomVelocity = function () {
  return Math.floor(Math.random() * 3 + 1);
};
const randomColor = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

class Ball {
  constructor(positionX, positionY, ballNum, color, velocity) {
    this.velocity = velocity;
    this.positionX = positionX + this.velocity;
    this.positionY = positionY + this.velocity;
    this.reverseX = false;
    this.reverseY = false;
    this.ballNum = ballNum;
    this.color = color;
  }
  compareXY() {
    let ballContainer = document.querySelector(".Ball-Container");
    let ballBoundaries = ballContainer.getBoundingClientRect();
    let leftBoundary = parseInt(ballBoundaries.left);
    let rightBoundary = parseInt(ballBoundaries.right) - leftBoundary;
    let topBoundary = parseInt(ballBoundaries.top);
    let bottomBoundary = parseInt(ballBoundaries.bottom) - topBoundary;
    if (this.positionX >= rightBoundary - 50) {
      this.reverseX = true;
    } else if (this.positionX <= 0) {
      this.reverseX = false;
    }
    if (this.positionY >= bottomBoundary - 50) {
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
    this.ballNum.style.boxShadow = `0px 0px 10px #ffffff00`;
  }
  style2() {
    this.ballNum.style.backgroundColor = `${this.color}00`;
    this.ballNum.style.border = `2px solid ${this.color}`;
    this.ballNum.style.boxShadow = `0px 0px 30px #ffffff`;
  }
}

class Interval {
  constructor(ballNum, speed) {
    this.ballNum = ballNum;
    this.speed = speed;
  }
  startBouncing() {
    setInterval(() => {
      this.ballNum.compareXY();
      if (this.ballNum.reverseX === true && this.ballNum.reverseY === true) {
        this.ballNum.moveBallBackX();
        this.ballNum.moveBallUp();
        this.ballNum.style1();
      } else if (
        this.ballNum.reverseX === true &&
        this.ballNum.reverseY === false
      ) {
        this.ballNum.moveBallBackX();
        this.ballNum.moveBallDown();
        this.ballNum.style2();
      } else if (
        this.ballNum.reverseX === false &&
        this.ballNum.reverseY === true
      ) {
        this.ballNum.moveBallX();
        this.ballNum.moveBallUp();
        this.ballNum.style2();
      } else if (
        this.ballNum.reverseX === false &&
        this.ballNum.reverseY === false
      ) {
        this.ballNum.moveBallX();
        this.ballNum.moveBallDown();
        this.ballNum.style1();
      }
    }, this.speed);
  }
}

let bball1 = new Ball(
  randomPosition(),
  randomPosition(),
  ball1,
  randomColor(),
  randomVelocity()
);
let bball2 = new Ball(
  randomPosition(),
  randomPosition(),
  ball2,
  randomColor(),
  randomVelocity()
);
let bball3 = new Ball(
  randomPosition(),
  randomPosition(),
  ball3,
  randomColor(),
  randomVelocity()
);
let bball4 = new Ball(
  randomPosition(),
  randomPosition(),
  ball4,
  randomColor(),
  randomVelocity()
);
let bball5 = new Ball(
  randomPosition(),
  randomPosition(),
  ball5,
  randomColor(),
  randomVelocity()
);
let bball6 = new Ball(
  randomPosition(),
  randomPosition(),
  ball6,
  randomColor(),
  randomVelocity()
);

let ball1Int = new Interval(bball1, randomVelocity());
let ball2Int = new Interval(bball2, randomVelocity());
let ball3Int = new Interval(bball3, randomVelocity());
let ball4Int = new Interval(bball4, randomVelocity());
let ball5Int = new Interval(bball5, randomVelocity());
let ball6Int = new Interval(bball6, randomVelocity());

ball1Int.startBouncing();
ball2Int.startBouncing();
ball3Int.startBouncing();
ball4Int.startBouncing();
ball5Int.startBouncing();
ball6Int.startBouncing();

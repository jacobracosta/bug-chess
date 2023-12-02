#!/usr/bin/node
import { Player } from "../gameObjects/player.js"
import Board from "../../gameCode/gameObjects/board.js"

import promptSync from 'prompt-sync';
import { processTurn } from "./gameLoop.js";
const prompt = promptSync({sigint:true});

let queenSurrounded = false;

const red = new Player(true)
const blue = new Player(false)
const board = new Board(15)

while (!queenSurrounded) {

  let userInput, currentPlayer, otherPlayer
  if(board.turn % 2 != 0) { 
    userInput = prompt("Player 1's Turn: ")
    currentPlayer = red
    otherPlayer = blue
  } else {
    userInput = prompt("Player 2's Turn: ")
    currentPlayer = blue
    otherPlayer = red
  }

  const [turnSuccess, message] = processTurn(userInput,currentPlayer,otherPlayer,board)
  if(turnSuccess) {
    if(message.indexOf("Game Over!") != -1) {
        console.log(message)
        queenSurrounded = true
    }
  } else {
    console.log(message)
  }
}
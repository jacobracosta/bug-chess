#!/usr/bin/node
import { Player } from "../../gameCode/game/player.js"
import Board from "../../gameCode/gameObjects/board.js"

import promptSync from 'prompt-sync';
import {isWinConditionMet, processMovement, processPlacement } from "./gameLoop.util.js";
const prompt = promptSync({sigint:true});

let queenSurrounded = false;

const red = new Player("red", true)
const blue = new Player("blue", false)
const board = new Board(15)

while (!queenSurrounded) {

  const [winConditionMet, message] = isWinConditionMet(red,blue,board)
  if(winConditionMet) {
    console.log(message)
    break
  }

  let userInput, currentPlayer
  if(board.turn % 2 != 0) { 
    userInput = prompt("Player 1's Turn: ")
    currentPlayer = red
  } else {
    userInput = prompt("Player 2's Turn: ")
    currentPlayer = blue
  }
  
  //instructions of the form
  //verb bug location
  // move beetle-0 [coordinate] (work on temp relative placement)
  const inputArray = userInput.split(" ")
  const verb = inputArray[0].toLowerCase()
  const [bug,index] = inputArray[1].split("-")
  const coord = (inputArray[2].split(",")).map(Number)

  if(index > 2) {
    console.log("Invalid index. Must be less than 2.")
    continue
  }

  if(verb == "move") {
    const [processSuccess, message] = processMovement(currentPlayer,bug,index,coord,board)
    if(!processSuccess) {
      console.log(message)
      continue
    }
  } else if(verb == "place") {
    const [processSuccess, message] = processPlacement(currentPlayer,bug,coord,board)
    if(!processSuccess) {
      console.log(message)
      continue
    }
  } else {
    console.log ("Invalid verb. Start with 'move' or 'place'.")
    continue
  }
}
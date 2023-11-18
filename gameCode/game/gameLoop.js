#!/usr/bin/node
import { Player } from "../../gameCode/game/player.js"
import Board from "../../gameCode/gameObjects/board.js"

import promptSync from 'prompt-sync';
import Move from "../gameObjects/move.js";
import Placement from "./placement.js";
import addBugToGame, { checkPlacement } from "./gameLogic.js";
const prompt = promptSync({sigint:true});

let queenSurrounded = false;

//create players
//when bug is placed, add to player
//add to board, need logic to check if it's next to a piece of it's own color or not
//need to check that there aren't more than the allowed number of bugs during each placement

const red = new Player("red", true)
const blue = new Player("blue", false)
const board = new Board(15)

while (!queenSurrounded) {

  const p1Surrounded = red.isQueenSurrounded(board)
  const p2Surrounded = blue.isQueenSurrounded(board)
  if(p1Surrounded || p2Surrounded) {
    if(p1Surrounded && !p2Surrounded) console.log("Game Over! Player 2 Wins!")
    else if(p2Surrounded && !p1Surrounded) console.log("Game Over! Player 1 Wins!")
    else console.log("Game Over! Draw.")
  }

  let userInput, currentPlayer, currentBug
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
  const coord = inputArray[2]

  if(index > 2) {
    console.log("Invalid index. Must be less than 2.")
    continue
  }

  if(verb == "move") {
    if(!currentPlayer.queenBee){
      console.log("Cannot move until your queen is placed.")
      continue
    } else {
      if(bug == "queenBee") currentBug = currentPlayer.queenBee
      else if (bug == "beetle") currentBug = currentPlayer.beetles[index]
      else if (bug == "hopper") currentBug = currentPlayer.hoppers[index]
      else if (bug == "spider") currentBug = currentPlayer.spiders[index]
      else if (bug == "ant") currentBug = currentPlayer.ants[index]
      else console.log("Invalid bug. Re-input command.")
      const move = new Move(currentBug, coord)
      const [bIsMoveGood, failureMessage] = checkMove(move, board)
      if(bIsMoveGood) {
        board.updateBugCoord(move)
        board.incrementTurn()
        continue
      } else {
        console.log(failureMessage, "Re-input command.")
        continue
      }
    }
  } else if(verb == "place") {
    if(currentPlayer.isFirst) {
      if(board.turn >= 7 && !currentPlayer.queenBee){
        console.log("You must place your queen by your 4th turn.")
        continue
      }
    } else {
      if(board.turn >= 8 && !currentPlayer.queenBee){
        console.log("You must place your queen by your 4th turn.")
        continue
      }
    }

    const placement = new Placement(currentPlayer, coord, bug)
    const [bIsPlacementGood, failureMessage] = checkPlacement(placement,board)
    if(bIsPlacementGood) {
      addBugToGame(placement, board)
      board.incrementTurn()
      continue
    } else {
      console.log(failureMessage, "Re-input command.")
      continue
    }
  } else {
    console.log ("Invalid verb. Start with 'move' or 'place'.")
    continue
  }
}
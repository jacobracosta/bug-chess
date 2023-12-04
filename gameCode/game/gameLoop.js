import { Player } from "../gameObjects/player.js"
import Board from "../../gameCode/gameObjects/board.js"
import {isWinConditionMet, processCommand, processMovement, processPlacement } from "./gameLoop.util.js";

export function processTurn(userInput, currentPlayer, otherPlayer, board) {
  let message = "Move Good."
  let turnSuccess = false
  let moveSuccess, moveMessage, placeSuccess, placeMessage
  const [processSuccess, processMessage, processResults] = processCommand(userInput)

  if(processSuccess) {
    const [verb, bug, index, coord] = processResults

    if(verb == "move") {
      [moveSuccess, moveMessage] = processMovement(currentPlayer,bug,index,coord,board)
      if(!moveSuccess) {
        message = moveMessage
      }
    } else if(verb == "place") {
      [placeSuccess, placeMessage] = processPlacement(currentPlayer,bug,coord,board)
      if(!placeSuccess) {
        message = placeMessage
      }
    } 

    if(placeSuccess || moveSuccess) {
      turnSuccess = true
      const [winConditionMet, winMessage] = isWinConditionMet(currentPlayer,otherPlayer,board)
      if(winConditionMet) {
        message = winMessage
      }
    }
  }
  else message = processMessage
  return [turnSuccess, message]
}

export function gameLoopTestHandle(commandsJson) {
  let queenSurrounded = false;
  const red = new Player(true)
  const blue = new Player(false)
  const board = new Board(16)

  let errors = [] //make json obj later
  let gameOverMessage = "Did Not Reach."
  let commandNum = 0;
  const numCommands = commandsJson.length
  while (!queenSurrounded) {

    let userInput, currentPlayer, otherPlayer
    if(board.turn % 2 != 0) { 
      userInput = commandsJson[commandNum]['command']
      currentPlayer = red
      otherPlayer = blue
    } else {
      userInput = commandsJson[commandNum]['command']
      currentPlayer = blue
      otherPlayer = red
    }

    const [turnSuccess, message] = processTurn(userInput,currentPlayer,otherPlayer,board)
    if(turnSuccess) {
      if(message.indexOf("Game Over!") != -1) {
          gameOverMessage = message
          queenSurrounded = true
          break //questionable, should be using queenSurrounded to break loop
      }
    } else {
      errors.push(message)
    }
    commandNum++ //increment no matter what so we can test handling of bad commands
    if(commandNum == numCommands) {
      gameOverMessage = "End of Test Input."
      break
    }
  }
  return [gameOverMessage, errors]
}
#!/usr/bin/node

import promptSync from 'prompt-sync';

const prompt = promptSync({sigint:true});

let queenSurrounded = false;

//create players
//when bug is placed, add to player
//add to board, need logic to check if it's next to a piece of it's own color or not
//need to check that there aren't more than the allowed number of bugs during each placement

while (!queenSurrounded) {
  // Get user input
  /*
  "Red Player place a bug:"
  "Blue Player place a bug:" (loop between these two until a queen is surrounded)
  can't move until queen placed
  need to place queen by 4th turn
  */
  let userInput = prompt('Type something: ');

  // Compare the guess to the secret answer and let the user know.
  if (userInput === 'something') {
    console.log('Congrats, smartass');
    condition = true;
  } else {
    console.log('Try again');
  }
}
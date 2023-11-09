#!/usr/bin/node

import promptSync from 'prompt-sync';

const prompt = promptSync({sigint:true});

let queenSurrounded = false;

while (!queenSurrounded) {
  // Get user input
  /*
  "Red Player place a bug:"
  "Blue Player place a bug:" (loop between these two until a queen is surrounded)
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
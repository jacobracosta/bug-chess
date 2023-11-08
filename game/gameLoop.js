#!/usr/bin/node

import promptSync from 'prompt-sync';

const prompt = promptSync({sigint:true});

let condition = false;

while (!condition) {
  // Get user input
  let userInput = prompt('Type something: ');

  // Compare the guess to the secret answer and let the user know.
  if (userInput === 'something') {
    console.log('Congrats, smartass');
    condition = true;
  } else {
    console.log('Try again');
  }
}
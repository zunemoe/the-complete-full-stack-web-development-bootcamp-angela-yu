// import { randomSuperhero } from "superheroes";
// const name = randomSuperhero();

import generateName from "sillyname";
import {randomSuperhero} from "superheroes";

//var generateName = require('sillyname');
var sillyName = generateName();
var superheroName = randomSuperhero();
console.log(`My name is ${sillyName} and my superhero name is ${superheroName}.`);
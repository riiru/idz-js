import Sword from './Sword.js';

// Класс Axe (топор)
export default class Axe extends Sword {
  constructor() {
    super();
    this.name = 'Топор';
    this.attack = 6;
    this.durability = 250;
    this.range = 2;
  }
}
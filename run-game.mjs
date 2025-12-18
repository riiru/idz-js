import { play } from './dist/js/game.js';
import Warrior from './dist/js/Warrior.js';
import Archer from './dist/js/Archer.js';

// Простая симуляция: воин vs лучник
const warrior = new Warrior('Воин');
const archer = new Archer('Лучник');

warrior.position.x = 0;
archer.position.x = 5;

const winner = play([warrior, archer]);

if (winner) {
  console.log(`\nРезультат: Победил ${winner.name}`);
} else {
  console.log('\nРезультат: Ничья');
}

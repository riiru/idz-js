import { play } from './js/game.js';
import Warrior from './js/Warrior.js';
import Archer from './js/Archer.js';
import Mage from './js/Mage.js';
import Dwart from './js/Dwart.js';
import Crossbowman from './js/Crossbowman.js';
import Demourge from './js/Demourge.js';

// Создание игроков
const players = [
  new Warrior('Гор'),
  new Archer('Лили'),
  new Mage('Мерлин'),
  new Dwart('Борис'),
  new Crossbowman('Генри'),
  new Demourge('Зевс')
];

// Рандомизация позиций игроков
players.forEach((player, index) => {
  player.position.x = Math.floor(Math.random() * 20) - 10; // от -10 до 9
});

let currentWinner = null;

console.log('🎮 Добро пожаловать в RPG игру!');
console.log('Участники битвы:');

for (const player of players) {
  console.log(`- ${player.name}: ${player.description}`);
}

console.log('\n🎯 Начало битвы!');

// Создание простого интерфейса для отображения результатов
function createGameInterface() {
  const body = document.body;
  
  body.innerHTML = `
    <div style="text-align: center; font-family: Arial, sans-serif; padding: 20px;">
      <h1>🎮 RPG Битва</h1>
      <div id="players-status"></div>
      <div id="game-result"></div>
    </div>
  `;
  
  updateGameInterface();
}

function updateGameInterface() {
  const playersDiv = document.getElementById('players-status');
  const resultDiv = document.getElementById('game-result');
  
  if (playersDiv) {
    playersDiv.innerHTML = `
      <h3>Состояние игроков:</h3>
      ${players.map(player => `
        <div style="margin: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
          <strong>${player.name}</strong> - ${player.description}<br>
          Здоровье: ${player.life}/100<br>
          Магия: ${player.magic}/100<br>
          Оружие: ${player.weapon.name} (${player.weapon.durability}/${player.weapon.maxDurability})
        </div>
      `).join('')}
    `;
  }
  
  if (resultDiv && currentWinner) {
    resultDiv.innerHTML = `
      <h2>🏆 Победитель: ${currentWinner.name}!</h2>
    `;
    resultDiv.style.display = '';
  }
}

// Экспорт функции для запуска игры
export async function startGame() {
  console.log('🎮 Запуск RPG игры...');

  if (typeof document !== 'undefined') {
    createGameInterface();

    // Запускаем симуляцию асинхронно
    const winner = await play(players, (players, round) => {
      updateGameInterface();
      // Можно добавить задержку, если нужно замедлить
      // return new Promise(resolve => setTimeout(resolve, 100));
    });
    currentWinner = winner;
    updateGameInterface();

    return null;
  }

  // Если не в браузере (например, при запуске в Node), запускаем синхронно
  return play(players);
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    startGame();
  });
}
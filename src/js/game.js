import Warrior from './Warrior.js';
import Archer from './Archer.js';
import Mage from './Mage.js';
import Dwart from './Dwart.js';
import Crossbowman from './Crossbowman.js';
import Demourge from './Demourge.js';

// Функция для проверки возможности атаки
export function checkWeapon(player) {
  return !player.weapon.isBroken();
}

// Функция для проверки блокировки атаки
export function isAttackBlocked(player) {
  return player.isAttackBlocked && player.isAttackBlocked();
}

// Функция для проверки уклонения
export function dodged(player) {
  return player.dodged && player.dodged();
}

// Функция для получения урона
export function tryAttack(attacker, defender) {
  if (attacker.isDead()) {
    return 0;
  }

  // Если защитник уже мёртв, урона быть не должно
  if (defender.isDead && defender.isDead()) {
    return 0;
  }

  let damage = attacker.getDamage();
  
  // Проверка блокировки атаки
  if (isAttackBlocked(defender)) {
    damage = Math.floor(damage * 0.5);
  }
  
  // Проверка уклонения
  if (dodged(defender)) {
    damage = 0;
  }
  
  return damage;
}

// Функция для принятия атаки
export function takeAttack(player, damage) {
  if (player.takeAttack) {
    damage = player.takeAttack(damage);
  }
  
  player.takeDamage(damage);
}

// Функция для выбора противника
export function chooseEnemy(players, currentPlayer) {
  const alivePlayers = players.filter(p => !p.isDead() && p !== currentPlayer);
  
  if (alivePlayers.length === 0) {
    return null;
  }
  
  // Выбираем ближайшего живого противника
  let nearestEnemy = alivePlayers[0];
  let minDistance = Math.abs(nearestEnemy.position.x - currentPlayer.position.x);
  
  for (const player of alivePlayers) {
    const distance = Math.abs(player.position.x - currentPlayer.position.x);
    if (distance < minDistance) {
      minDistance = distance;
      nearestEnemy = player;
    }
  }
  
  return nearestEnemy;
}

// Функция для движения к противнику
export function moveToEnemy(player, enemy) {
  const distance = enemy.position.x - player.position.x;
  
  if (Math.abs(distance) <= player.weapon.range) {
    return; // Уже в радиусе атаки
  }
  
  if (distance > 0) {
    player.moveRight();
  } else {
    player.moveLeft();
  }
}

// Основная функция хода игрока
// Возвращает объект { players, acted }, где acted=true если игрок передвинулся или нанес урон
export function turn(players, currentPlayerIndex) {
  const currentPlayer = players[currentPlayerIndex];
  let acted = false;

  if (currentPlayer.isDead()) {
    return { players, acted };
  }

  // Выбор противника
  const enemy = chooseEnemy(players, currentPlayer);

  if (!enemy) {
    return { players, acted }; // Нет противников
  }

  // Движение к противнику (двигаемся даже если оружие сломано)
  const prevX = currentPlayer.position.x;
  moveToEnemy(currentPlayer, enemy);
  if (currentPlayer.position.x !== prevX) {
    acted = true;
  }

  // Проверка дистанции атаки и пригодности оружия
  const distance = Math.abs(enemy.position.x - currentPlayer.position.x);

  if (distance <= currentPlayer.weapon.range && checkWeapon(currentPlayer)) {
    // Атака
    const damage = tryAttack(currentPlayer, enemy);

    if (damage > 0) {
      takeAttack(enemy, damage);
      acted = true;

      // Нанесение урона оружию
      currentPlayer.weapon.takeDamage(10);
    }
  }

  return { players, acted };
}

// Основная функция игры
export async function play(players, onRoundEnd) {
  let gameOver = false;
  let round = 1;
  
  while (!gameOver && round < 1000) { // Ограничение на 1000 раундов для предотвращения зависания
    console.log(`\n=== Раунд ${round} ===`);
    let anyActionThisRound = false;

    for (let i = 0; i < players.length; i++) {
      if (!players[i].isDead()) {
        console.log(`\nХодит: ${players[i].name} (${players[i].description})`);
        console.log(`Здоровье: ${players[i].life}, Магия: ${players[i].magic}`);
        
        const result = turn(players, i);
        players = result.players;
        if (result.acted) {
          anyActionThisRound = true;
        }
        
        // Вывод состояния игроков
        for (const player of players) {
          if (!player.isDead()) {
            console.log(`${player.name}: ${player.life} HP, ${player.magic} MP`);
          } else {
            console.log(`${player.name}: МЕРТВ`);
          }
        }
      }
    }
    
    // Проверка окончания игры
    const alivePlayers = players.filter(p => !p.isDead());
    
    if (alivePlayers.length <= 1) {
      gameOver = true;
      
      if (alivePlayers.length === 1) {
        console.log(`\n🏆 Побеждает ${alivePlayers[0].name}!`);
        return alivePlayers[0];
      } else {
        console.log('\n🤝 Ничья! Все игроки мертвы.');
        return null;
      }
    }

    // Если в раунде не было ни перемещений, ни атак — зацикливания (застой)
    if (!anyActionThisRound) {
      const alivePlayers = players.filter(p => !p.isDead());

      if (alivePlayers.length === 0) {
        console.log('\n⚠️ Ничья! Ни один игрок не может совершать действия (все мертвы).');
        return null;
      }

      // В ситуации застоя выбираем игрока с наибольшим здоровьем как условного победителя
      alivePlayers.sort((a, b) => b.life - a.life);
      console.log('\n⚠️ Застой! Победитель по наибольшему здоровью: ' + alivePlayers[0].name);
      return alivePlayers[0];
    }
    
    round++;
    
    // Вызываем колбек после раунда, если передан
    if (onRoundEnd) {
      onRoundEnd(players, round);
      // Ждем немного, чтобы браузер не зависал
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
  
  // Если достигнуто ограничение раундов
  if (round >= 1000) {
    console.log('\n⏰ Игра прервана из-за превышения лимита раундов (1000).');
    const alivePlayers = players.filter(p => !p.isDead());
    if (alivePlayers.length > 0) {
      alivePlayers.sort((a, b) => b.life - a.life);
      console.log('Победитель по здоровью: ' + alivePlayers[0].name);
      return alivePlayers[0];
    }
    return null;
  }
}
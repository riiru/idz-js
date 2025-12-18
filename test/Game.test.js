import { play, checkWeapon, tryAttack, takeAttack } from '../src/js/game.js';
import Warrior from '../src/js/Warrior.js';
import Archer from '../src/js/Archer.js';

describe('Game Functions', () => {
  let warrior;
  let archer;

  beforeEach(() => {
    warrior = new Warrior('Warrior');
    archer = new Archer('Archer');
  });

  test('checkWeapon должен возвращать true для целого оружия', () => {
    expect(checkWeapon(warrior)).toBe(true);
  });

  test('checkWeapon должен возвращать false для сломанного оружия', () => {
    warrior.weapon.takeDamage(1000);
    expect(checkWeapon(warrior)).toBe(false);
  });

  test('tryAttack должен наносить урон живому противнику', () => {
    const damage = tryAttack(warrior, archer);
    expect(damage).toBeGreaterThanOrEqual(0);
    expect(archer.life).toBeLessThan(100);
  });

  test('tryAttack не должен наносить урон мертвому противнику', () => {
    archer.takeDamage(1000);
    const damage = tryAttack(warrior, archer);
    expect(damage).toBe(0);
  });

  test('takeAttack должен уменьшать здоровье игрока', () => {
    const initialLife = warrior.life;
    takeAttack(warrior, 20);
    expect(warrior.life).toBeLessThan(initialLife);
  });

  test('игра должна завершаться с победителем', async () => {
    const players = [warrior, archer];
    const winner = await play(players);
    
    expect(winner).toBeDefined();
    expect(winner.life).toBeGreaterThan(0);
  });
});
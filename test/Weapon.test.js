import Weapon from '../src/js/Weapon.js';

describe('Weapon', () => {
  let weapon;

  beforeEach(() => {
    weapon = new Weapon('Test Sword', 10, 100, 2);
  });

  test('должен создавать оружие с правильными свойствами', () => {
    expect(weapon.name).toBe('Test Sword');
    expect(weapon.attack).toBe(10);
    expect(weapon.durability).toBe(100);
    expect(weapon.range).toBe(2);
    expect(weapon.maxDurability).toBe(100);
  });

  test('метод takeDamage должен уменьшать прочность', () => {
    weapon.takeDamage(25);
    expect(weapon.durability).toBe(75);
  });

  test('метод takeDamage не должен делать прочность отрицательной', () => {
    weapon.takeDamage(150);
    expect(weapon.durability).toBe(0);
  });

  test('метод getDamage должен возвращать урон, если оружие не сломано', () => {
    expect(weapon.getDamage()).toBe(10);
  });

  test('метод getDamage должен возвращать 0, если оружие сломано', () => {
    weapon.takeDamage(150);
    expect(weapon.getDamage()).toBe(0);
  });

  test('метод isBroken должен возвращать false для целого оружия', () => {
    expect(weapon.isBroken()).toBe(false);
  });

  test('метод isBroken должен возвращать true для сломанного оружия', () => {
    weapon.takeDamage(100);
    expect(weapon.isBroken()).toBe(true);
  });
});
import Warrior from '../src/js/Warrior.js';

describe('Warrior', () => {
  let warrior;

  beforeEach(() => {
    warrior = new Warrior('Test Warrior');
  });

  test('должен создавать воина с правильными свойствами', () => {
    expect(warrior.name).toBe('Test Warrior');
    expect(warrior.life).toBe(120);
    expect(warrior.magic).toBe(20);
    expect(warrior.speed).toBe(8);
    expect(warrior.attack).toBe(15);
    expect(warrior.agility).toBe(8);
    expect(warrior.luck).toBe(5);
    expect(warrior.description).toBe('Воин - сильный боец ближнего боя');
  });

  test('должен наносить больше урона при низком здоровье', () => {
    warrior.takeDamage(100); // Оставляем 20 HP
    const normalDamage = new Warrior('Normal').getDamage();
    const lowHealthDamage = warrior.getDamage();
    
    expect(lowHealthDamage).toBeGreaterThan(normalDamage);
  });

  test('метод takeAttack должен уменьшать урон при блокировке', () => {
    const damage = warrior.takeAttack(20);
    expect(damage).toBeLessThanOrEqual(20);
  });
});
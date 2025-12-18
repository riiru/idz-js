import Player from '../src/js/Player.js';

describe('Player', () => {
  let player;

  beforeEach(() => {
    player = new Player('Test Player');
  });

  test('должен создавать игрока с правильными свойствами', () => {
    expect(player.name).toBe('Test Player');
    expect(player.life).toBe(100);
    expect(player.magic).toBe(50);
    expect(player.speed).toBe(10);
    expect(player.attack).toBe(10);
    expect(player.agility).toBe(10);
    expect(player.luck).toBe(10);
    expect(player.description).toBe('Базовый персонаж');
    expect(player.position).toEqual({ x: 0, y: 0 });
    expect(player.weapon).toBeDefined();
  });

  test('метод getDamage должен возвращать урон больше 0 для живого игрока', () => {
    const damage = player.getDamage();
    expect(damage).toBeGreaterThan(0);
  });

  test('метод getDamage должен возвращать 0 для мертвого игрока', () => {
    player.takeDamage(150);
    expect(player.getDamage()).toBe(0);
  });

  test('метод takeDamage должен уменьшать здоровье', () => {
    player.takeDamage(25);
    expect(player.life).toBe(75);
  });

  test('метод takeDamage не должен делать здоровье отрицательным', () => {
    player.takeDamage(150);
    expect(player.life).toBe(0);
  });

  test('метод isDead должен возвращать false для живого игрока', () => {
    expect(player.isDead()).toBe(false);
  });

  test('метод isDead должен возвращать true для мертвого игрока', () => {
    player.takeDamage(150);
    expect(player.isDead()).toBe(true);
  });

  test('метод moveLeft должен уменьшать координату x', () => {
    player.moveLeft();
    expect(player.position.x).toBe(-1);
  });

  test('метод moveRight должен увеличивать координату x', () => {
    player.moveRight();
    expect(player.position.x).toBe(1);
  });

  test('метод move должен двигать игрока в указанную сторону', () => {
    player.move('left');
    expect(player.position.x).toBe(-1);
    
    player.move('right');
    expect(player.position.x).toBe(0);
  });
});
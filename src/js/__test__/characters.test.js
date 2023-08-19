import Character from '../character';
import Team from '../team';

// Character test

test('name must be string', () => {
  function testName() {
    const character = new Character(55, 'Any');
    return character;
  }

  expect(testName).toThrow(Error('Имя должно быть строкой!'));
});

test('name length must be >= 2', () => {
  function testName() {
    const character = new Character('X', 'Bowerman');
    return character;
  }
  expect(testName).toThrow(Error('Длина имени не должна быть менее 2 и более 10 символов!'));
});

test('name length must be <= 10', () => {
  function testName() {
    const character = new Character('character10', 'Bowerman');
    return character;
  }
  expect(testName).toThrow(Error('Длина имени не должна быть менее 2 и более 10 символов!'));
});

test('type must be string', () => {
  function testType() {
    const character = new Character('Any', 55);
    return character;
  }
  expect(testType).toThrow(Error('Тип персонажа должен быть строкой!'));
});

test('type class name must be legal', () => {
  function testWrongType() {
    const character = new Character('character1', 'Any');
    return character;
  }
  expect(testWrongType).toThrow(Error('Неверный тип персонажа!'));
});

test('levelUp method must be work with not dead character', () => {
  function testOnDeadCharacter() {
    const character = new Character('character1', 'Bowerman');
    character.health = 0;
    character.levelUp();
  }
  expect(testOnDeadCharacter).toThrow(Error('Нельзя повысить уровень умершего персонажа!'));
});

test('levelUp method must set correct values for level, attack and defence properties', () => {
  const result = (function testLevelUp() {
    const sourceObject = new Character('character1', 'Bowerman');
    sourceObject.health = 10;
    sourceObject.levelUp();

    const destObject = new Character('character1', 'Bowerman');
    destObject.level = 2;
    destObject.attack = 12;
    destObject.defence = 12;

    return { sourceObject, destObject };
  }());
  expect(result.sourceObject).toEqual(result.destObject);
});

test('damage method must evaluate and set correct value for health property', () => {
  const result = (function testDamage() {
    const character = new Character('character1', 'Bowerman');
    character.damage(10);
    return character.health;
  }());

  expect(result).toBe(91);
});

test('health should be 0 when damage method decrease health less than 0', () => {
  const result = (function testDamage() {
    const character = new Character('character1', 'Bowerman');
    character.damage(500);
    return character.health;
  }());

  expect(result).toBe(0);
});

// team test

test('add method must add character to member set if it not in member set', () => {
  const result = (function testAddCharacner() {
    const sourceTeam = new Team();
    const character1 = new Character('character1', 'Bowerman');
    const character2 = new Character('character2', 'Swordsman');
    sourceTeam.add(character1);
    sourceTeam.add(character2);

    const destTeam = new Team();
    destTeam.addAll(character1, character2);
    return { sourceTeam, destTeam };
  }());

  expect(result.sourceTeam).toEqual(result.destTeam);
});

test('add method must trow error if adding character in member set', () => {
  function testAddCharacter() {
    const sourceTeam = new Team();
    const character1 = new Character('character1', 'Bowerman');
    const character2 = new Character('character2', 'Swordsman');
    sourceTeam.add(character1);
    sourceTeam.add(character2);
    sourceTeam.add(character1);
  }

  expect(testAddCharacter).toThrow(new Error('Уже есть character1 в команде!'));
});

test('addAll method must add characters to member set without throw errors if there are duplicate members', () => {
  const result = (function testAddCharacner() {
    const sourceTeam = new Team();
    const character1 = new Character('character1', 'Bowerman');
    const character2 = new Character('character2', 'Swordsman');
    const character3 = new Character('character3', 'Daemon');
    const character4 = new Character('character4', 'Zombie');
    sourceTeam.addAll(character1, character2, character3);
    sourceTeam.addAll(character2, character4);

    const destTeam = new Team();
    destTeam.addAll(character1, character2, character3, character4);
    return { sourceTeam, destTeam };
  }());

  expect(result.sourceTeam).toEqual(result.destTeam);
});

test('toArray method must convert members set to array', () => {
  const result = (function testToArray() {
    const team = new Team();
    const character1 = new Character('character1', 'Bowerman');
    const character2 = new Character('character2', 'Swordsman');
    const character3 = new Character('character3', 'Daemon');
    team.addAll(character1, character2, character3);
    const sourceArr = team.toArray();

    const destArr = [character1, character2, character3];
    return { sourceArr, destArr };
  }());

  expect(result.sourceArr).toEqual(result.destArr);
});

test('test Team iterator with spread', () => {
  const result = (function testIterator() {
    const team = new Team();
    const character1 = new Character('character1', 'Bowerman');
    const character2 = new Character('character2', 'Swordsman');
    const character3 = new Character('character3', 'Daemon');
    team.addAll(character1, character2, character3);
    const sourceArr = [...team];

    const destArr = [character1, character2, character3];
    return { sourceArr, destArr };
  }());

  expect(result.sourceArr).toEqual(result.destArr);
});

test('test Team iterator with for of', () => {
  const result = (function testIterator() {
    const team = new Team();
    const character1 = new Character('character1', 'Bowerman');
    const character2 = new Character('character2', 'Swordsman');
    const character3 = new Character('character3', 'Daemon');
    team.addAll(character1, character2, character3);
    const sourceArr = [];

    for (const character of team) {
      sourceArr.push(character);
    }

    const destArr = [character1, character2, character3];
    return { sourceArr, destArr };
  }());

  expect(result.sourceArr).toEqual(result.destArr);
});

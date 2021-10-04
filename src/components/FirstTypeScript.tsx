// generics
function getArray<T>(items: T[]): T[] {
  return new Array().concat(items);
}

const numberArray = getArray([1, 2, 3, 4, 5]);
const stringArray = getArray(['1', '2', '3', '4', '5']);

const secondNumberArray = [...numberArray, 6, 7, 8, 9, 10];

// interfaces

interface User5 {
  readonly id: number | string;
  name: string;
  gender?: string | number;
}

const user5: User5 = {
  id: 1,
  name: 'John',
  gender: '5',
};

// this value id from User5 is only readonly
//user5.id = 6

// function inside interface
interface MathOperationFunction {
  (x: number, y: number): number;
}

const add: MathOperationFunction = (x, y): number => x + y;
const decrease: MathOperationFunction = (x, y): number => x - y;

// interface together with classes
interface PersonInterface {
  id: number | string;
  name?: string;
  register(): string;
}

class Person implements PersonInterface {
  id: number | string;
  name?: string;

  constructor(idParam: number | string, nameParam: string) {
    this.id = idParam;
    this.name = nameParam;
  }

  register() {
    return `This ${this.name} is now register`;
  }
}

const drazenPetrovic: Person = new Person(1, 'drazen petrovic');
drazenPetrovic.register();
const toniKukoc: Person = new Person(1, 'toni kukoc');

// subclass of Person
class Employee extends Person {
  position: string;

  constructor(id: number | string, name: string, position: string) {
    super(id, name);
    this.position = position;
  }
}

const reactProgramer = new Employee(1, 'Brc Nikola', 'Programer');
console.log(reactProgramer.register());

// array inside of array
let customArray: [number, string][] = [
  [1, '2'],
  [1, '2'],
  [1, '2'],
  [1, '2'],
];

// custom object type
type User = {
  id: number;
  name: string;
};

const user: User = {
  id: 1,
  name: 'John',
};

// example of Union, this character -> |
let numberOstring: number | string = '5';

// Type Assertion
let cid: any = 1;
let customerId = cid as number; // here customerId is only a type of number

// functions
function addNum(x: number, y: number): number {
  return x + y;
}

console.log(addNum(1, 5));

// void function
function logSomething(message: number | string): void {
  console.log(message);
}

console.log(logSomething('1'));

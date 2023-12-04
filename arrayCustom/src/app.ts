interface Array<T> {
  all(callback: (element: T, index: number, array: T[]) => boolean): boolean;
  any(callback: (element: T, index: number, array: T[]) => boolean,): boolean;
  multiply(num?: number): T[]
  average(this: Array<number>): number;
  chunked(size: number): T[][];
  distinctBy(this: Array<T>, func?: Function): Array<Object>;
  filter(predicate: (item: T) => boolean): T[];
  filterIndexed(predicate: (item: T, index: number) => boolean): T[];
  filterNot(predicate: (value: T) => boolean): T[];
  find(predicate: (item: T) => boolean): T | undefined;
  findLast(this: Array<T>, func: (v: T) => boolean): T;
  flatten(): T;
  fold<R>(accumulator: (acc: R, item: T) => R, initialValue: R): R;
  maxBy<R>(selector: (item: T) => R): T | undefined;
  minBy<R>(selector: (item: T) => R): T | undefined;
  count(selector: (item: T) => number): number;
  groupBy<U>(callback: (value: T, index: number, array: T[]) => string): U;
}

const numbers = [1, 2, 3, 4, 5, 6];

// ALL 
Array.prototype.all = function (callback) {
  for (let i = 0; i < this.length; i += 1) {
    const value = callback(this[i], i, this);

    if (!value) return false;
  }
  return true;
};

const allResult = numbers.all((value: number) => {
  return value > 3;
})
console.log("All result: " + allResult)

// ANY 
Array.prototype.any = function (callback) {
  for (let i = 0; i < this.length; i += 1) {
    const value = callback(this[i], i, this);

    if (value) return true;
  }
  return false;
};
const anyResult = numbers.any((x) => x >= 5);
console.log("Any result: " + anyResult)

// MULTIPLY
Array.prototype.multiply = function (num = 10) {
  return this.map((el) => el * num);
}
const multiplyResult = [1, 2, 3, 4, 5].multiply()
console.log(`Multiply: ${multiplyResult}`)

// AVARAGE
Array.prototype.average = function () {
  let sum = 0;
  return this.reduce((a, b) => a + b, sum) / this.length;
};
const averageResult = [1, 2, 3, 4, 5].average()
console.log(`Avarage: ${averageResult}`)

// CHUNKED
Array.prototype.chunked = function (size) {
  const result = [];
  for (let i = 0; i < this.length; i += size) {
      result.push(this.slice(i, i + size));
  }
  return result;
}

let words = "one two three four five six seven eight nine ten".split(" ");
const chunkedResult = words.chunked(2)
console.log("Chunked result:")
console.log(chunkedResult);

// DISTINCTBY 
Array.prototype.distinctBy = function (func?: Function) {
  if (!func) {
    return Array.from(new Set(this));
  } else {
    const resultArray: string[] = [];
    this.forEach((element) => resultArray.push(func(element)));
    return Array.from(new Set(resultArray));
  }
};
let arr = ["a", "A", "b", "B", "A", "a"];
console.log("Distinct By:")
console.log(arr.distinctBy());
console.log(arr.distinctBy((el: string) => el.toLowerCase()));

// FILTER
Array.prototype.filter = function (predicate?:any) {
  const filteredArray = [];

  for (const item of this) {
    if (predicate(item)) {
      filteredArray.push(item);
    }
  }

  return filteredArray;
};

const filterResult = numbers.filter((number) => number % 2 === 0);
console.log("Filter result: ")
console.log(filterResult); 

// FILTER INDEXED
Array.prototype.filterIndexed = function (predicate) {
  const filteredArray: string[] = [];

  for (let index = 0; index < this.length; index++) {
    if (predicate(this[index], index)) {
      filteredArray.push(this[index]);
    }
  }

  return filteredArray;
};

let filterIndexed = [0, 1, 2, 3, 4, 8, 6];
const filteredIndexedResult = filterIndexed.filterIndexed((index: number, element: any) => {
  return index === element;
})
console.log("Filter indexed result: ")
console.log(filteredIndexedResult)

// FLITER NOT 
Array.prototype.filterNot = function (predicate) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
      if (!predicate(this[i])) result.push(this[i]);
  }
  return result;
}
const filterNotResult = numbers.filterNot(number => number % 2 === 0);
console.log("Filter Not result: ")
console.log(filterNotResult); 

// FIND 
Array.prototype.find = function (predicate?:any) {
  for (let i = 0; i < this.length; i++) {
    const currentItem = this[i];
    if (predicate(currentItem)) {
      return currentItem;
    }
  }
  return undefined;
};
const findResult = numbers.find(number => number % 2 === 0);
console.log("Find result:")
console.log(findResult);

// FINDLAST
Array.prototype.findLast = function (number) {
  for (let i = this.length - 1; i >= 0; i--) {
    const currentItem = this[i];
    if (number(currentItem)) {
      return currentItem;
    }
  }
  return undefined;
};
const findLastResult = numbers.findLast(number => number % 2 === 0);
console.log("Find Last result")
console.log(findLastResult);

// FLATTEN
Array.prototype.flatten = function <T>(): T[] {
  const flattenedArray: T[] = [];

  function flattenArray(array: any[]): void {
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        flattenArray(array[i]);
      } else {
        flattenedArray.push(array[i]);
      }
    }
  }

  flattenArray(this);

  return flattenedArray;
};

const array = [1, [2, [3, 4], 5], 6];
const flattenResult = array.flatten();
console.log("Flattened result: ")
console.log(flattenResult);

// FOLD 
Array.prototype.fold = function (accumulator, initialValue) {
  let result = initialValue;

  for (let i = 0; i < this.length; i++) {
    result = accumulator(result, this[i]);
  }

  return result;
};
const foldResult = numbers.fold((acc, number) => acc + number, 0);
console.log("Fold result: " + foldResult)

// MAX BY 
Array.prototype.maxBy = function (selector) {
  let max = this[0];
  for (let i = 1; i < this.length; i++) {
      if (selector(this[i]) > selector(max)) max = this[i];
  }
  return max;
}
const list = [
  { name: 'Maksim', age: 19 },
  { name: 'Vova', age: 15 },
  { name: 'Tolik', age: 99 },
  { name: 'Arkasha', age: 80 },
];

const maxByResult = list.maxBy((person) => person.age);
console.log("Max By result: ") 
console.log(maxByResult)

// MIN BY 
Array.prototype.minBy = function (selector) {
  let min = this[0];
  for (let i = 1; i < this.length; i++) {
      if (selector(this[i]) < selector(min)) min = this[i];
  }
  return min;
}
const minByResult = list.minBy((person) => person.age);
console.log("Min By result: ")
console.log(minByResult)

// COUNT 
Array.prototype.count = function (nums) {
  let sum = 0;

  for (let i = 0; i < this.length; i++) {
    sum += nums(this[i]);
  }

  return sum;
};
const populations = [
  {
    population: 1000
  }, {
    population: 500
  }, {
    population: 300
  }
]
const countResult = populations.count((value) => value.population)
console.log("Count result: " + countResult)

// GROUP BY
Array.prototype.groupBy = function (callback) {
  const obj: any = {};

  for (let i = 0; i < this.length; i += 1) {
    const key = callback(this[i], i, this);
    if (!obj[key]) {
      obj[key] = [];
    }
    obj[key] = [...obj[key], this[i]];
  }

  for (let i = 0; i < Object.keys(obj).length; i++) {}
  return obj;
};


const groupedNumbers = numbers.groupBy((number) => number % 2 === 0 ? 'S' : 'F');
console.log("Group by: ")
console.log(groupedNumbers);

// Hash function used for hashing string
import { murmur3 } from "murmurhash-js";
// Plain linked list, optimized for insertion
import { LinkedList } from "../linked-lists/sll.js";

// memoize execution of heavy functions as hashing
function memoize(fn) {
  const obj = {};

  return function (arg) {
    if (obj[arg]) {
      return obj[arg];
    } else {
      const res = fn(arg);

      obj[arg] = res;

      return res;
    }
  };
}

function getHashCode(value) {
  if (typeof value === "number") return value * 397;

  const str = JSON.stringify(value);

  return murmur3(str, "seed");
}

const memoizedHash = memoize(getHashCode);

export class HashTable {
  constructor() {
    this._array = Array(this.#MIN_LENGTH);
    this._size = 0;
  }

  get size() {
    return this._size;
  }

  get #MIN_LENGTH() {
    return 5;
  }

  get #LOAD_FACTOR_UPPER_BOUND() {
    return 0.7;
  }

  get #LOAD_FACTOR_LOWER_BOUND() {
    return 0.25;
  }

  #getLoadFactor() {
    return this._size / this._array.length;
  }

  #getHash(value) {
    return memoizedHash(value);
  }

  #resize(arrayLength) {
    if (arrayLength <= this.#MIN_LENGTH) return false;

    const resizedArray = Array(arrayLength);

    for (let i = 0; i < this._array.length; i++) {
      const oldLinkedList = this._array[i];

      if (!oldLinkedList) continue;

      let node = oldLinkedList.head;
      let left = oldLinkedList.size;

      while (left > 0) {
        const hash = this.#getHash(node.value);
        const idx = hash % resizedArray.length;
        const newLinkedList = resizedArray[idx] || new LinkedList();

        newLinkedList.push(node.value);

        resizedArray[idx] = newLinkedList;

        node = node.next;
        left--;
      }
    }

    this._array = resizedArray;
  }

  #resizeIfNeeded() {
    const loadFactor = this.#getLoadFactor();

    if (loadFactor > this.#LOAD_FACTOR_UPPER_BOUND) {
      const newLength = this._array.length * 2;
      this.#resize(newLength);
    }

    if (loadFactor < this.#LOAD_FACTOR_LOWER_BOUND) {
      const newLength = Math.floor(this._array.length / 2);
      this.#resize(newLength);
    }
  }

  insert(value) {
    this.#resizeIfNeeded();

    const hash = this.#getHash(value);
    const idx = hash % this._array.length;

    if (!this._array[idx]) {
      this._array[idx] = new LinkedList();
    }

    const linkedList = this._array[idx];

    linkedList.push(value);

    this._size++;

    return true;
  }

  has(value) {
    const hash = this.#getHash(value);
    const idx = hash % this._array.length;

    if (!this._array[idx]) return false;

    const linkedList = this._array[idx];

    return !!linkedList.find(value);
  }

  remove(value) {
    this.#resizeIfNeeded();

    if (!this.has(value)) return false;

    const hash = this.#getHash(value);
    const idx = hash % this._array.length;
    const linkedList = this._array[idx];

    linkedList.remove(value);
    this._size--;

    return true;
  }
}

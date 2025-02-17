import murmur from "murmurhash-js";
import { LinkedList } from "../linked-lists/sll.js";

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
    const hashFn = (value) => murmur.murmur3(value, "seed");
    return hashFn(value);
  }

  #resize(arrayLength) {
    if (arrayLength <= this.#MIN_LENGTH) return false;

    const resizedArray = Array(arrayLength);

    for (let i = 0; i < this._array.length; i++) {
      const oldLinkedList = this._array[i] || new LinkedList();

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
    if (this.has(value)) return false;

    this.#resizeIfNeeded();

    const hash = this.#getHash(value);
    const idx = hash % this._array.length;
    const linkedList = this._array[idx] || new LinkedList();

    linkedList.push(value);

    this._array[idx] = linkedList;
    this._size++;

    return true;
  }

  has(value) {
    const hash = this.#getHash(value);
    const idx = hash % this._array.length;
    const linkedList = this._array[idx] || new LinkedList();

    return !!linkedList.find(value);
  }

  remove(value) {
    if (!this.has(value)) return false;

    this.#resizeIfNeeded();

    const hash = this.#getHash(value);
    const idx = hash % this._array.length;
    const linkedList = this._array[idx];

    linkedList.remove(value);
    this._size--;

    return true;
  }
}

// const hashTable = new HashTable();

// hashTable.insert("value1");
// hashTable.insert("value2");
// hashTable.insert("value2");
// hashTable.insert("value3");
// hashTable.insert("value4");
// hashTable.insert("value5");
// console.log(hashTable);
// hashTable.remove("value2");
// hashTable.remove("value1");
// hashTable.remove("value3");
// hashTable.remove("value4");
// console.log(hashTable);
// hashTable.insert("value2");
// hashTable.insert("value3");
// hashTable.insert("value4");
// hashTable.insert("value5");
// hashTable.insert("value6");
// console.log(hashTable);
// hashTable.insert("value6");

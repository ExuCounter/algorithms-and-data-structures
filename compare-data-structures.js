import { HashTable } from "./hash-tables/separate-chaining.js";

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.sentinel = new Node(null);
    this.sentinel.next = this.sentinel;

    this.head = this.sentinel;
    this.tail = this.sentinel;

    this.size = 0;
  }

  push(value) {
    const node = new Node(value);
    this.tail.next = node;
    this.tail = node;
    this.size++;
  }

  find(value) {
    let current = this.head.next;
    while (current !== this.sentinel) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  delete(value) {
    let current = this.head;
    while (current.next !== this.sentinel) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }
}

const dataset = new Array(Math.pow(10, 5)).fill(0).map((_, i) => i);
const shuffledDataset = [...dataset].sort(() => Math.random() - 0.5);

// Dynamic Array Operations
const fillDynamicArray = (array) => {
  for (let i = 0; i < dataset.length; i++) {
    array.push(dataset[i]);
  }
  return array;
};

const searchDynamicArray = (array) => {
  for (let i = 0; i < dataset.length; i++) {
    array.includes(shuffledDataset[i]);
  }
};

const deleteDynamicArray = (array) => {
  for (let i = dataset.length; i > 0; i--) {
    const index = array.indexOf(shuffledDataset[i]);
    if (index > -1) array.splice(index, 1);
  }
  return array;
};

// Linked List Operations
const fillLinkedList = (linkedList) => {
  for (let i = 0; i < dataset.length; i++) {
    linkedList.push(dataset[i]);
  }
  return linkedList;
};

const searchLinkedList = (linkedList) => {
  for (let i = 0; i < 1000; i++) {
    linkedList.find(shuffledDataset[i]);
  }
};

const deleteLinkedList = (linkedList) => {
  for (let i = 0; i < 1000; i++) {
    linkedList.delete(shuffledDataset[i]);
  }
  return linkedList;
};

// Map Operations
const fillMap = (map) => {
  for (let i = 0; i < dataset.length; i++) {
    map.set(dataset[i], true);
  }
  return map;
};

const searchMap = (map) => {
  for (let i = 0; i < 1000; i++) {
    map.has(shuffledDataset[i]);
  }
};

const deleteMap = (map) => {
  for (let i = 0; i < 1000; i++) {
    map.delete(shuffledDataset[i]);
  }
  return map;
};

// HashTable Operations
const fillCustomHashTable = (hashTable) => {
  for (let i = 0; i < dataset.length; i++) {
    hashTable.insert(dataset[i]);
  }

  return hashTable;
};

const searchCustomHashTable = (hashTable) => {
  for (let i = 0; i < 1000; i++) {
    hashTable.has(shuffledDataset[i]);
  }
};

const deleteCustomHashTable = (hashTable) => {
  for (let i = 0; i < 1000; i++) {
    hashTable.remove(shuffledDataset[i]);
  }

  return hashTable;
};

const measurements = {
  Insert: {},
  Search: {},
  Delete: {},
};

// Helper to measure and save time
const measure = (structure, operation, fn) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  const time = `${(end - start).toFixed(2)} ms`;

  // Store result in the right cell of the table
  measurements[operation][structure] = time;
};

// Dynamic Array Benchmark
let array = [];
measure("Dynamic Array", "Insert", () => {
  array = fillDynamicArray([]);
});

measure("Dynamic Array", "Search", () => {
  searchDynamicArray(array);
});

measure("Dynamic Array", "Delete", () => {
  array = deleteDynamicArray(array);
});

// Linked List Benchmark
let linkedList = new LinkedList();
measure("Linked List", "Insert", () => {
  linkedList = fillLinkedList(new LinkedList());
});

measure("Linked List", "Search", () => {
  searchLinkedList(linkedList);
});

measure("Linked List", "Delete", () => {
  linkedList = deleteLinkedList(linkedList);
});

// Map Benchmark
let map = new Map();
measure("Map", "Insert", () => {
  map = fillMap(new Map());
});

measure("Map", "Search", () => {
  searchMap(map);
});

measure("Map", "Delete", () => {
  map = deleteMap(map);
});

// Custom HashTable Benchmark
let customHashTable = new HashTable();

measure("CustomHashTable", "Insert", () => {
  customHashTable = fillCustomHashTable(customHashTable);
});

measure("CustomHashTable", "Search", () => {
  searchCustomHashTable(customHashTable);
});

measure("CustomHashTable", "Delete", () => {
  customHashTable = deleteCustomHashTable(customHashTable);
});

console.log("Speed of execution on dataset of 100,000 elements");
// Displaying the Summary Table
console.table(measurements);

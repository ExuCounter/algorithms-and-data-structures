class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.sentinel = new Node(null);
    this.sentinel.next = this.sentinel;

    this.size = 0;
  }

  push(value) {
    const node = new Node(value);

    node.next = this.sentinel.next;

    this.sentinel.next = node;

    this.size++;
  }

  find(value) {
    let current = this.sentinel.next;

    while (current !== this.sentinel) {
      if (current.value === value) return current;
      current = current.next;
    }

    return null;
  }

  remove(value) {
    let current = this.sentinel;

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

  get head() {
    return this.sentinel.next;
  }
}

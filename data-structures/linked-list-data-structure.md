# Linked list Data Structure

A linked list is a linear data structure that includes a series of connected nodes. Here, each node stores **the data** and **the address of the next node**. For example, you have to start somewhere, so we give the address of the first node a special name called HEAD. Also, the last node in the linked list can be identified because its next portion points to NULL.

```js
class Node {
  next = null;
  constructor(value) {
    this.value;
  }
}
```

Each node has a data item and a pointer to another struct node.

```js
class LinkedList {
  length = 0;
  head = null;

  insert(value) {
    if (this.head) {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = new Node(value);
    } else {
      this.head = new Node(value);
      this.tail = new Node(value);
    }
    this.length++;
    return this.length;
  }

  search(index) {
    this.#search(index)[1]?.value;
  }

  #search(index) {
    let count = 0;
    let current = this.head;
    let prev;
    while (count < index) {
      prev = current;
      current = current?.next;
      count++;
    }
    return [prev, current];
  }

  delete(index) {
    const [prev, current] = this.#search(index);
    if (prev && current) {
      prev.next = current.next;
      this.length--;
    } else if (current) {
      this.head = current.next;
      this.length--;
    }
    return this.length;
  }
}
```

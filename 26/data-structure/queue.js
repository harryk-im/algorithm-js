/**
 * @note
 * FIFO(First In First Out) 선입선출
 * Linear Queue, Circular Queue
 *
 * JavaScript에서 Queue를 배열로 구현한다면?
 * dequeue()시 Front 부분이 그대로 비어버리고,
 * shift()를 사용하면 O(n) 시간 복잡도가 소요된다.
 * 따라서, Linked List를 따로 구현하고 Queue로서 활용하자!
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/**
 * @example
 * 선형 Queue 구현
 */
class LinearQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(newValue) {
    const newNode = new Node(newValue);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size += 1;
  }

  dequeue() {
    if (!this.head) return null;

    const value = this.head.value;
    this.head = this.head.next;
    this.size -= 1;

    return value;
  }

  peek() {
    return this.head.value;
  }
}

/**
 * @example
 * 찍히는 로그 순서
 * 1, 3, 2, 2, 4
 */
console.log(">>> LinearQueue")
const linearQueue = new LinearQueue
linearQueue.enqueue(1)
linearQueue.enqueue(2)
linearQueue.enqueue(4)
console.log(linearQueue.dequeue());
linearQueue.enqueue(8)
console.log(linearQueue.size);
console.log(linearQueue.peek());
console.log(linearQueue.dequeue());
console.log(linearQueue.dequeue());

/**
 * @example
 * 원형 Queue 구현
 */
class CircularQueue {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  isEmpty() {
    return this.size === 0;
  }

  isFull() {
    return this.size === this.maxSize;
  }

  enqueue(newValue) {
    if (this.isFull()) return false;

    const newNode = new Node(newValue);
    if (this.isEmpty()) {
      this.head = this.tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this.head;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size += 1;

    return true;
  }

  dequeue() {
    if (this.isEmpty()) return null;

    const value = this.head.value;
    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      this.tail.next = this.head;
    }
    this.size -= 1

    return value;
  }

  front() {
    return this.head.value
  }

  rear() {
    return this.tail.value
  }
}

/**
 * @example
 * 찍히는 로그 순서
 * 1, 2, 2, 4, true
 */
const circularQueue = new CircularQueue(4);
console.log(">>> CircularQueue")
circularQueue.enqueue(1)
circularQueue.enqueue(2)
circularQueue.enqueue(4)
circularQueue.enqueue(8)
circularQueue.enqueue(16)
console.log(circularQueue.dequeue())
console.log(circularQueue.dequeue())
console.log(circularQueue.size)
console.log(circularQueue.front());
circularQueue.enqueue(16)
circularQueue.enqueue(32)
console.log(circularQueue.isFull())

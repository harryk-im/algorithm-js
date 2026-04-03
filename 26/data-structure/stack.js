/**
 * @note
 * LIFO(Last In First Out) 후입선출
 *
 * @example
 * Stack은 Array로 표현할 수 있다.
 */
const stack = []

/**
 * @example
 * 찍히는 로그 순서
 * 3, 3, 2
 */
console.log(">>> ByArray")
stack.push(1)
stack.push(2)
stack.push(3)
console.log(stack.length)
console.log(stack.pop())
console.log(stack[stack.length - 1]) // Stack의 Top

/**
 * @example
 * Linked List로 구현할 수 있다.
 */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(newValue) {
    const newNode = new Node(newValue);

    newNode.next = this.top;
    this.top = newNode;

    this.size += 1;
  }

  pop() {
    if (this.isEmpty()) return null;

    const value = this.top.value;
    this.top = this.top.next

    this.size -= 1;

    return value;
  }

  isEmpty() {
    return this.size === 0
  }

  peek() {
    return this.isEmpty() ? null : this.top.value;
  }
}

/**
 * @example
 * 찍히는 로그 순서
 * 3, 4, 3
 */
console.log(">>> ByLinkedList")
const stackByLinkedList = new Stack();
stackByLinkedList.push(1)
stackByLinkedList.push(2)
stackByLinkedList.push(3)
console.log(stackByLinkedList.size)
stackByLinkedList.push(4)
console.log(stackByLinkedList.pop())
console.log(stackByLinkedList.peek()) // Stack의 Top

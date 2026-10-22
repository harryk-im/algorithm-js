/**
 * 프로세스
 * https://school.programmers.co.kr/learn/courses/30/lessons/42587
 */

function solution(priorities, location) {
  let answer = 0;
  const stack = priorities.map((v) => v).sort((a, b) => a - b);
  const queue = [];
  priorities.forEach((value, idx) =>
    queue.push({ priority: value, target: idx === location })
  );

  let queueHead = 0;
  while (stack.length > 0) {
    if (queue[queueHead].priority === stack[stack.length - 1]) {
      answer += 1;
      if (queue[queueHead].target) return answer;

      stack.pop();
    } else {
      queue.push(queue[queueHead]);
    }

    queue[queueHead] = null;
    queueHead += 1;
  }

  return answer;
}

//복습
/**
 * queue에서 대기중인 프로세스 하나를 꺼냄
 *
 * 큐에 대기중인 프로세스 중 우선순위가 더 높은것이 있다면
 * 방금 꺼낸 프로세스를 다시 enqueue
 *
 * 없다면 방금 꺼낸 프로세스를 실행
 */
function solution(priorities, location) {
  const completedProcesses = [];
  const processes = priorities.map((priority, idx) => [
    priority,
    idx === location,
  ]);
  const sortedPriorities = priorities.sort((a, b) => a - b);

  while (processes.length > 0) {
    const currentProcess = processes.shift();

    if (currentProcess[0] < sortedPriorities[sortedPriorities.length - 1]) {
      processes.push(currentProcess);
      continue;
    } else {
      sortedPriorities.pop();
      completedProcesses.push(currentProcess);

      if (currentProcess[1]) {
        return completedProcesses.length;
      }
    }
  }

  return completedProcesses.length;
}

/**
 * 복습
 *
 * 굳이 completedProcesses 배열이 필요할까?
 * priorities 배열이 있는데 또 만들 필요가 있을까?
 *   만들지 않는다면 힙(Heap)을 구현하면 될 것 같다.
 * 굳이 한번 더 priorities 배열을 가지고 정렬을 해야할까?
 *   시간 복잡도 측면에서는 훨씬 효율적인듯
 *   splice()를 활용하면 분기마다 O(N)이 발생
 */
function solution(priorities, location) {
  const processes = priorities.map((priority, idx) => ({
    priority: priority,
    target: idx === location,
  }));
  const sortedPriorities = priorities.map((v) => v).sort((a, b) => a - b);
  let completedCount = 0;

  while (processes.length > 0) {
    const currentProcess = processes.shift();

    if (
      currentProcess.priority < sortedPriorities[sortedPriorities.length - 1]
    ) {
      processes.push(currentProcess);
      continue;
    } else {
      sortedPriorities.pop();
      completedCount += 1;

      if (currentProcess.target) return completedCount;
    }
  }

  return completedCount;
}

/**
 * 프로세스
 * https://school.programmers.co.kr/learn/courses/30/lessons/42587
 *
 * 우선순위 큐
 * 대기중인 프로세스 중 우선순위가 더 높은 프로세스가 있다면 방금 꺼낸 프로세스를 다시 큐에 넣는다.
 * dequeue -> queue 순회 -> 높은 프로세스가 있는지 검증 -> 없다면 마무리
 * -> 있다면 enqueue 하고 반복
 */
class Node {
  constructor(value, isTarget) {
    this.value = value;
    this.isTarget = isTarget;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(newValue, isTarget) {
    const newNode = new Node(newValue, isTarget);

    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size += 1;
  }

  dequeue() {
    if (this.size === 0) return null;

    const node = this.head;
    this.head = this.head.next;
    this.size -= 1;

    return node;
  }

  peek() {
    if (this.size === 0) return null;
    return this.head
  }

  hasHigherPriority(priority) {
    let current = this.head;

    while (current !== null) {
      if (current.value > priority) {
        return true;
      }

      current = current.next;
    }

    return false;
  }
}

function solution(priorities, location) {
  let answer = 0;

  const queue = new Queue();
  for (let idx = 0; idx < priorities.length; idx += 1) {
    if (idx === location) {
      queue.enqueue(priorities[idx], true);
    } else {
      queue.enqueue(priorities[idx], false);
    }
  }

  // node.value node.target

  while (queue.size > 0) {
    const node = queue.dequeue();
    if (queue.hasHigherPriority(node.value)) {
      queue.enqueue(node.value, node.isTarget)
      continue;
    }

    answer += 1;

    if (node.isTarget) {
      return answer;
    }
  }


  return answer;
}

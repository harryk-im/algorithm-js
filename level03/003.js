/**
 * 네트워크
 * https://school.programmers.co.kr/learn/courses/30/lessons/43162
 */

/**
 * 이미 인접 행렬 리스트로 그래프가 구현돼있음
 * 각 노드를 BFS를 통해 순회하며
 * 거쳐간 노드들을 체크하자.
 *
 * BFS가 한번 순회될 때 마다
 * answer++를 해주자.
 *
 * 필요한 것
 * 1. BFS 순회 함수
 * 2. 순회시에 노드를 체크할 로직
 */

function solution(n, computers) {
  let answer = 0;
  const checkList = Array(n).fill(false);

  const bfs = (node) => {
    checkList[node] = true;

    for (let idx = 0; idx < computers.length; idx += 1) {
      // 같은 노드
      if (node === idx) continue;
      // 방문한곳
      if (checkList[idx] === true) continue;
      // 갈 수 없는 곳
      if (computers[node][idx] === 0) continue;

      bfs(idx);
    }
  };

  for (let node = 0; node < computers.length; node += 1) {
    if (!checkList[node]) {
      answer += 1;
    }
    bfs(node);
  }

  return answer;
}

/**
 * 복습
 * DFS로 풀이
 */
function solution(n, computers) {
  let answer = 0;
  const visited = new Array(n).fill(false);

  const dfs = (node) => {
    visited[node] = true;

    for (let idx = 0; idx < n; idx += 1) {
      if (computers[node][idx] === 1 && !visited[idx]) {
        dfs(idx);
      }
    }
  };

  for (let node = 0; node < n; node += 1) {
    if (!visited[node]) {
      answer += 1;
      dfs(node);
    }
  }

  return answer;
}

/**
 * 이전에는 재귀 함수로 풀었다면
 * 이번에는 stack을 활용한 dfs로 풀어보자
 */

/**
 * dfs든 bfs든 상관없을 것 같다.
 * dfs로 풀자. 왜?
 * javascript에서 shift()보다는 pop()을 사용하는것이
 * 메모리 사용 측면에서 더 효율적이기 때문에!
 */

function solution(n, computers) {
  let answer = 0;
  const isVisited = Array.from(Array(n), () => false);

  const dfs = (node) => {
    if (isVisited[node] === true) return;
    answer += 1;

    const stack = [node];

    while (stack.length > 0) {
      const curNode = stack.pop();
      isVisited[node] = true;

      for (let newNode = 0; newNode < computers.length; newNode += 1) {
        if (curNode === newNode) continue;
        if (computers[curNode][newNode] === 0) continue;
        if (isVisited[newNode]) continue;

        isVisited[newNode] = true;
        stack.push(newNode);
      }
    }
  };

  for (let com = 0; com < computers.length; com += 1) {
    dfs(com);
  }

  return answer;
}

// 복습
/**
 * 클래스를 활용하여
 * BFS에 사용될 Queue를 만들어보자.
 */
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enQueue(value) {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;

      this.tail = newNode;
    }

    this.size += 1;
  }

  deQueue() {
    if (this.size === 0) return null;

    const value = this.head.value;

    this.head = this.head.next;
    this.size -= 1;

    return value;
  }

  peek() {
    if (this.size === 0) return null;

    return this.head.value;
  }
}

function solution(n, computers) {
  let networks = 0;
  const computersQueue = new Queue();
  const isVisited = Array(n).fill(false);

  // computer를 하나씩 순회
  // queue 활용 bfs를 통해 지나간 곳을 모두 체크
  // 더 이상 queue에 node가 없다면 networks += 1

  // bfs 구현
  const bfs = (node) => {
    isVisited[node] = true;

    for (let idx = 0; idx < computers.length; idx += 1) {
      if (idx === node) continue;
      if (isVisited[idx] === true) continue;
      if (computers[node][idx] === 0) continue;

      computersQueue.enQueue(idx);
    }

    while (computersQueue.size > 0) {
      const nextNode = computersQueue.deQueue();
      isVisited[nextNode] = true;

      for (let idx = 0; idx < computers.length; idx += 1) {
        if (idx === nextNode) continue;
        if (isVisited[idx] === true) continue;
        if (computers[nextNode][idx] === 0) continue;

        computersQueue.enQueue(idx);
      }
    }

    networks += 1;
  };

  // 모든 컴퓨터를 순회하며 bfs 실행
  for (let node = 0; node < computers.length; node += 1) {
    if (isVisited[node] === true) continue;

    bfs(node);
  }

  return networks;
}

// 복습
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = this.tail = newNode
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size += 1
  }

  dequeue() {
    if (this.head === null) return null;

    const value = this.head.value;

    this.head = this.head.next;
    this.size -= 1;

    return value;
  }

  peek() {
    if (this.head === null) return null;

    return this.head.value;
  }
}

function solution(n, computers) {
  const networkQueue = new Queue();
  const isVisited = new Array(n).fill(false);
  let answer = 0;

  const bfs = (node) => {
    isVisited[node] = true;

    for (let idx = 0; idx < computers.length; idx += 1) {
      if (idx === node) continue;
      if (isVisited[idx]) continue;
      if (computers[node][idx] === 0) continue;

      networkQueue.enqueue(idx);
    }

    while (networkQueue.size > 0) {
      const nextNode = networkQueue.dequeue();
      isVisited[nextNode] = true;

      for (let idx = 0; idx < computers.length; idx += 1) {
        if (idx === node) continue;
        if (isVisited[idx]) continue;
        if (computers[nextNode][idx] === 0) continue;

        networkQueue.enqueue(idx);
      }
    }

    answer += 1;
  }

  for (let node = 0; node < computers.length; node += 1) {
    if (isVisited[node]) continue;

    bfs(node);
  }

  return answer;
};

/**
 * 26.04.03
 * 아직 Queue를 구현하는것에 익숙치 않은 것 같기도.
 */
function solution(n, computers) {
  let answer = 0;
  const isVisited = Array(n).fill(false)

  for (let node = 0; node < n; node += 1) {
    if (isVisited[node]) continue;

    const queue = [node];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      isVisited[currentNode] = true;

      for (let idx = 0; idx < n; idx += 1) {
        if (idx === currentNode) continue;
        if (isVisited[idx]) continue;
        if (computers[currentNode][idx] === 0) continue;

        queue.push(idx);
      }
    }
    answer += 1
  }

  return answer;
};

class Node {
  constructor(newValue) {
    this.value = newValue;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value)

    if (!this.head) {
      this.head = this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.size += 1
  }

  dequeue() {
    if (!this.head) return null;
    const value = this.head.value;

    this.head = this.head.next
    this.size -= 1

    return value
  }

  peek() {
    return this.head ? this.head.value : null;
  }
}


function solution(n, computers) {
  let answer = 0;
  const isVisited = Array(n).fill(false)

  for (let node = 0; node < n; node += 1) {
    if (isVisited[node]) continue;

    const queue = new Queue()
    queue.enqueue(node);

    while (queue.size > 0) {
      const currentNode = queue.dequeue();
      isVisited[currentNode] = true;

      for (let idx = 0; idx < n; idx += 1) {
        if (idx === currentNode) continue;
        if (isVisited[idx]) continue;
        if (computers[currentNode][idx] === 0) continue;

        queue.enqueue(idx);
      }
    }
    answer += 1
  }

  return answer;
};


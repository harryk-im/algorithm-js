// 모음 사전

// 나의 풀이
function solution(word) {
  const alphabet = ['A', 'E', 'I', 'O', 'U'];
  const storage = ['A', 'E', 'I', 'O', 'U'];
  let count = 1;

  while (count < 5) {
    let end = storage.length;
    let start = end - 5 ** count;

    for (let i = start; i < end; i++) {
      for (let j = 0; j < alphabet.length; j++) {
        storage.push(storage[i] + alphabet[j]);
      }
    }

    count++;
  }

  storage.sort();

  return storage.indexOf(word) + 1;
}

/**
 * 모음 사전
 * https://school.programmers.co.kr/learn/courses/30/lessons/84512
 * DFS 활용
 */
function solution(word) {
  const char = ['A', 'E', 'I', 'O', 'U'];
  const dict = [];

  const dfs = (str) => {
    if (str.length === 5) return;

    for (let idx = 0; idx < char.length; idx += 1) {
      dict.push(str + char[idx]);
      dfs(str + char[idx]);
    }
  };

  dfs('');

  return dict.indexOf(word) + 1;
}

/**
 * DFS, 백트래킹 활용
 */
function solution(word) {
  const char = ['A', 'E', 'I', 'O', 'U'];
  const stack = [];

  let count = 0;
  let answer = 0;

  const dfs = () => {
    if (stack.length > 0) {
      count += 1;

      if (word.length === stack.length && stack.join('') === word) {
        answer = count;
        return;
      }
    }

    if (stack.length === 5) return;

    for (let idx = 0; idx < char.length; idx += 1) {
      if (answer !== 0) return;

      stack.push(char[idx]);
      dfs();
      stack.pop();
    }
  };

  dfs();

  return answer;
}

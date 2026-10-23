function solution(number) {
  for (let i = 0; i < number.length - 2; i += 1) {
    for (let j = i + 1; j < number.length - 1; j += 1) {
      for (let k = j + 1; k < number.length; k += 1) {
        const result = number[i] + number[j] + number[k];

        if (result === 0) answer++;
      }
    }
  }

  return answer;
}

function solution(number) {
  let result = 0;

  const combination = (current, start) => {
    if (current.length === 3) {
      result += current.reduce((acc, cur) => acc + cur, 0) === 0 ? 1 : 0;
      return;
    }

    for (let i = start; i < number.length; i++) {
      combination([...current, number[i]], i + 1);
    }
  };

  combination([], 0);

  return result;
}

solution([-2, 3, 0, 2, -5]);
solution([-3, -2, -1, 0, 1, 2, 3]);
solution([-1, 1, -1, 1]);

/**
 * 삼총사
 * https://school.programmers.co.kr/learn/courses/30/lessons/131705
 */
// 조합 풀이 (13명 있다고 하면 1716회 탐색)
// 이후에 3! 만큼 나눠줘야함
function solution(number) {
  let answer = 0;
  const visited = Array(number.length).fill(false);

  const dfs = (sum, count) => {
    if (count === 3) {
      if (sum === 0) answer += 1;

      return;
    }

    for (let idx = 0; idx < number.length; idx += 1) {
      if (visited[idx]) continue;

      visited[idx] = true;
      dfs(sum + number[idx], count + 1);
      visited[idx] = false;
    }
  };

  dfs(0, 0);

  return answer / 6;
}

// 조합 풀이 (13명 있다고 하면 286회 탐색)
function solution(number) {
  let answer = 0;
  const selected = [];

  const dfs = (startIdx, sum) => {
    if (selected.length === 3) {
      if (sum === 0) answer += 1;

      return;
    }

    for (let idx = startIdx; idx < number.length; idx += 1) {
      selected.push(number[idx]);
      dfs(idx + 1, sum + number[idx]);
      selected.pop();
    }
  };

  dfs(0, 0);

  return answer;
}

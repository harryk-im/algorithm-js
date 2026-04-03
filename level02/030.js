/**
 * 타겟 넘버
 * https://school.programmers.co.kr/learn/courses/30/lessons/43165
 */

/**
 * BFS를 쓸지 DFS를 쓸지
 * 구분하는게 관건인듯!
 */

function solution(numbers, target) {
  let answer = 0;

  const dfs = (idx, sum) => {
    if (idx === numbers.length - 1) {
      if (sum === target) {
        answer++;
      }

      return;
    }

    dfs(idx + 1, sum + numbers[idx + 1]);
    dfs(idx + 1, sum - numbers[idx + 1]);
  };

  dfs(0, numbers[0]);
  dfs(0, -numbers[0]);

  return answer;
}

/**
 * 재귀 함수
 * 지금보니 정석적인 DFS는 아닌듯
 * 트리 구조에서의 DFS를 참조해 풀이한 느낌?
 */

function solution(numbers, target) {
  let answer = 0;

  const dfs = (acc, idx) => {
    if (idx === numbers.length - 1) {
      if (acc === target) answer += 1;

      return;
    }

    dfs(acc + numbers[idx + 1], idx + 1);
    dfs(acc - numbers[idx + 1], idx + 1);
  };

  dfs(numbers[0], 0);
  dfs(-numbers[0], 0);

  return answer;
}

/**
 * 경우의 수 구하기
 * depth가 1 깊어질수록 Node는 2배로 늘어남
 *
 * 2^0 + 2^1 + 2^2 + ... + 2^n
 * 등비수열: 2^(n + 1) - 2
 *
 * 따라서 O(2^(n + 1) - 2)의 시간 복잡도를 갖게 됨
 *
 * numbers의 최대 길이는 20 이므로
 * 최대 시간 복잡도는 O(2,097,150)
 *
 * 즉, 한번 씩, 모두 순회해도 통과
 */

/**
 * numbers의 idx를 하나씩 파고들어 total을 계산
 * idx를 파고들때 -, + 두가지 경우를 계산하여 진행
 */

function solution(numbers, target) {
  let answer = 0;

  const dfs = (acc, idx) => {
    if (idx === numbers.length) {
      if (acc === target) answer += 1;
      return;
    }
    if (idx > numbers.length) {
      console.error("numbers의 index를 초과했습니다");
      return;
    }

    dfs(acc + numbers[idx], idx + 1);
    dfs(acc - numbers[idx], idx + 1);
  };

  dfs(numbers[0], 1);
  dfs(-numbers[0], 1);

  return answer;
}

// 복습
/**
 * n개의 양의 정수
 * 순서를 바꾸지 않고, 적절히 더하거나 빼서 타겟 넘버 만들기
 *
 * DFS가 조금 더 적절해보임
 * 왜? 타겟 넘버인지 판단하려면 무조건 트리 마지막 Node까지 순회해야하기 때문
 *
 * dfs에선 stack의 개념을 활용하는 것은 맞지만
 * 무조건 순수 stack 구조를 만들어야한다는건 아닌 듯 하다.
 */
function solution(numbers, target) {
  let answer = 0;

  const dfs = (acc, idx) => {
    if (idx === numbers.length - 1) {
      if (acc !== target) return;

      answer += 1;
      return;
    }

    dfs(acc + numbers[idx + 1], idx + 1);
    dfs(acc - numbers[idx + 1], idx + 1);
  };

  dfs(0, -1);

  return answer;
}

/**
 * 26.04.03
 * 오랜만에 풀이를 해보는데 여전히 재귀 함수로 한다는게 좀 어색하다.
 * 복습한 내용을 바탕으로 한다면 당연히 stack을 활용해야 하는게 아닌가 하는 생각.
 */
function solution(numbers, target) {
  let answer = 0;

  const dfs = (acc, idx) => {
    if (idx === numbers.length) {
      if (acc !== target) return;

      answer += 1;
      return;
    }

    const node = numbers[idx];

    dfs(acc + node, idx + 1)
    dfs(acc - node, idx + 1)
  }

  dfs(0, 0)

  return answer
}

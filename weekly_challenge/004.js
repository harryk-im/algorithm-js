// 피로도
// 나의 풀이
function ascend(arr) {
  arr.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }

    return a[1] - b[1];
  });

  return arr;
}

function solution(k, dungeons) {
  const dungeons = ascend(dungeons);
  let result = 0;

  for (let i = 0; i < dungeons.length; i++) {
    if (k >= dungeons[i][0]) {
      k -= dungeons[i][1];
      result++;
      console.log('if문 진입', result, k);
    }
  }

  console.log('for문 탈출', result, k);

  return result;
}

/**
 * 배열을 소모 피로도가 적은 순으로 나열해서 최대한 돌게 하려고 했으나
 * 예외가 존재하였음
 * 따라서 dungeons의 최대 길이가 8이니
 * 완전탐색을 통한 구현이 가능하다고 생각함.
 * reduce() 메서드를 이용해서 풀이해보자.
 */

/**
 * 자료구조에 대한 개별 공부가 확실히 필요해 보임.
 * 어떻게 공부하면 효율적일까? 그 방법으로
 * 창의적이면서 계산적인 기능구현이 가능할까?
 */

// 다른 풀이
// 재귀함수 & 완전 탐색 구현
function solution(k, dungeons) {
  return dungeons.reduce((result, current, idx) => {
    let count = 0;
    let state = k;
    if (current[0] <= state) {
      state -= current[1];
      count++;

      const next = Array.from(dungeons);
      next.splice(idx, 1);
      loop(next);
    }

    return result;

    function loop(dungeons) {
      dungeons.forEach((current, idx) => {
        if (current[0] <= state) {
          state -= current[1];
          count++;

          if (dungeons.length > 0) {
            const next = Array.from(dungeons);
            next.splice(idx, 1);
            loop(next);
          }

          result = count > result ? count : result;
          state += current[1];
          count--;
        }
      });
    }
  }, 0);
}

/**
 * 많이 부족함을 느낀다.
 *
 * 진짜 어떻게 공부를 해야할까 방향성 제대로 잡아야할 때가 온것 같다.
 * 무작정 기능구현 하다보면 실력이 늘겠지 하는 생각이였지만
 * 벽을 느끼는 중이다.
 *
 * 내 스스로 돌파구를 찾을 수 있길 바란다.
 */

/**
 * 사용한 매서드 & 스킬(?)
 * reduce()
 * forEach()
 * 재귀함수(loop)
 * 완전 탐색
 */
// 4년전에 쩔쩔매면서 풀었었네
// 언제쯤 취업할 수 있을까

/**
 * 피로도
 * https://school.programmers.co.kr/learn/courses/30/lessons/87946
 * DFS와 백트래킹을 활용한 풀이
 */
function solution(k, dungeons) {
  let answer = 0;
  const visited = Array(dungeons.length).fill(false);

  const canVisit = (cur) => {
    let count = 0;
    for (let idx = 0; idx < dungeons.length; idx += 1) {
      if (cur < dungeons[idx][0]) {
        count += 1;
      }
    }

    return count === dungeons.length ? false : true;
  };

  const dfs = (cur, count) => {
    if (count === dungeons.length) {
      answer = count;
      return;
    }
    if (!canVisit(cur)) {
      if (count > answer) answer = count;
      return;
    }

    for (let idx = 0; idx < dungeons.length; idx += 1) {
      if (cur < dungeons[idx][0]) continue;
      if (visited[idx]) continue;

      visited[idx] = true;
      dfs(cur - dungeons[idx][1], count + 1);
      visited[idx] = false;
    }
  };

  dfs(k, 0);

  return answer;
}

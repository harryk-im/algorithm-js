/**
 * 올바른 괄호 (스택 Stack)
 * https://school.programmers.co.kr/learn/courses/30/lessons/12909
 */

function solution(s) {
  if (s[0] === ")") return false;
  if (s.length % 2 !== 0) return false;
  if (s[s.length - 1] === "(") return false;

  let stackLength = 0;

  for (let idx = 0; idx < s.length; idx += 1) {
    if (s[idx] === "(") {
      stackLength += 1;
    } else if (stackLength === 0) {
      return false;
    } else {
      stackLength -= 1;
    }
  }

  return stackLength === 0 ? true : false;
}

// 이전 풀이
// 나의풀이
/*
  내가 생각한 구조
  00. '(', ')' 갯수 합이 홀수? -> false로 거름.
  01. let count = 0;
  02. 순차적으로 '(' 이 나오면 count++, ')'이 나오면 count--
  02-01. count가 음수가 되면? -> false 반환.
  03. 반복문 이후 count가 0이 아닐 경우 -> false 반환.
*/

// function solution(s) {
//   let count = 0;

//   if (s.length % 2 != 0) return false;

//   for (let i = 0; i < s.length; i++) {
//     if (s[i] === "(") {
//       count++;
//     } else if (s[i] === ")") {
//       count--;
//     }

//     if (count < 0) return false;
//   }

//   if (count != 0) return false;

//   return true;
// }

/**
 * 26.04.03
 * 스택을 활용한 풀이
 * 1. 피드백 대로 빠르게 구현
 * 2. 효율성에서 아쉬운 부분이 생겼음
 * 3. ealry return을 활용한 예외처리로 효율성 개선
 */
function solution(s) {
  const stack = [];
  if (s[0] === ")" && stack.length === 0) return false;
  if (s.length % 2 !== 0) return false;

  for (const item of s) {
    if (item === "(") {
      stack.push("(")
      continue;
    } else {
      const top = stack.pop()
      if (!top) return false;
    }
  }

  return stack.length === 0 ? true : false;
}

/**
 * 26.04.03
 * 스택을 활용한 풀이
 * 1. 피드백 대로 빠르게 구현
 * 2. 효율성에서 아쉬운 부분이 생겼음
 * 3. ealry return을 활용한 예외처리로 효율성 개선
 */
function solution(s) {
  // 첫 item이 ')' 이면 return false;
  if (s[0] === ")") return false;
  // 길이가 홀수이면 return false;
  if (s.length % 2 !== 0) return false;

  const stack = [];

  for (let idx = 0; idx < s.length; idx += 1) {
    // idx가 절반이 넘어갔는데 stack의 길이가 절반보다 크면 return false;
    if (idx > (s.length / 2) && stack.length > (s.length / 2)) return false;

    if (s[idx] === "(") {
      stack.push("(")
      continue;
    } else {
      const top = stack.pop()
      if (!top) return false;
    }
  }

  return stack.length === 0 ? true : false;
}

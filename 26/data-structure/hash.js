/**
 * @note
 * key와 value를 받아 hashing하여 나온 index에 값을 저장하는 선형자료구조
 * 삽입 & 삭제 & 탐색 -> O(1)
 * (삭제와 탐색은 key값을 가지고 있다면...)
 *
 * @example
 * 객체 사용
 *
 * 찍히는 로그 순서
 * 100, 369, undefined
 */

const table = {};
table["key"] = 100
table["key2"] = "hello"
console.log(table["key"])
table["key"] = 369
console.log(table["key"])
delete table["key"]
console.log(table["key"])

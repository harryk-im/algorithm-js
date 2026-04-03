/**
 * 베스트앨범
 * https://school.programmers.co.kr/learn/courses/30/lessons/42579?language=javascript
 */

/**
 * 가장 많이 재생된 노래 두 개씩 모아 베스트 앨범출시
 * 노래는 고유번호(key)로 구분, 노래를 수록하는 기준
 * 1. 속한 노래가 많이 재생된 장르를 먼저 수록
 * 2. 장르 내에서 많이 재생된 노래를 먼저 수록
 * 3. 장르 내에서 재생 횟수가 같은 노래중에서는 고유 번호가 낮은 노래 먼저 수록
 */

// 제일 많이 재생된 장르 찾기 O
// 장르 내부에서 가장 많이 재생된 노래 idx 찾기 O

function solution(genres, plays) {
  const wholePlayTable = new Map();
  const genrePlayTable = new Map();
  const genrePlayArray = [];
  const answer = [];

  // O(n) = 10,000
  let loopIdx = 0;
  for (const genre of genres) {
    if (wholePlayTable.has(genre)) {
      const prevValue = wholePlayTable.get(genre);
      wholePlayTable.set(genre, [...prevValue, [loopIdx, plays[loopIdx]]]);
    } else {
      wholePlayTable.set(genre, [[loopIdx, plays[loopIdx]]]);
    }

    if (genrePlayTable.has(genre)) {
      const prevValue = genrePlayTable.get(genre);
      genrePlayTable.set(genre, plays[loopIdx] + prevValue);
    } else {
      genrePlayTable.set(genre, plays[loopIdx]);
    }

    loopIdx += 1;
  }

  // O(n * log n) = 10,000 * 4
  for (const genre of wholePlayTable.keys()) {
    const prevHash = wholePlayTable.get(genre);
    const sortedHash = prevHash.sort((a, b) => b[1] - a[1]);

    genrePlayArray.push([genre, genrePlayTable.get(genre)]);
  }

  // O(n * log n) = 10,000 * 4
  genrePlayArray.sort((a, b) => b[1] - a[1]);

  for (const genre of genrePlayArray) {
    const wholePlay = wholePlayTable.get(genre[0]);
    if (wholePlay.length < 2) {
      answer.push(wholePlay[0][0]);
    } else {
      answer.push(wholePlay[0][0]);
      answer.push(wholePlay[1][0]);
    }
  }

  // console.dir(wholePlayTable)
  // console.dir(genrePlayTable)
  // console.log(genrePlayArray)

  return answer;
}

function solution(genres, plays) {
  const hashTable = new Map();

  genres
    .map((genre, idx) => [genre, plays[idx]])
    .forEach(([genre, play], idx) => {
      const prevData = hashTable.get(genre) || { total: 0, songs: [] };

      hashTable.set(genre, {
        total: prevData.total + play,
        songs: [...prevData.songs, { play, idx }],
      });
    });

  return [...hashTable.entries()]
    .sort((a, b) => b[1].total - a[1].total)
    .map((genre) => genre[1].songs.sort((a, b) => b.play - a.play).slice(0, 2))
    .flat()
    .map((item) => item.idx);
}

/**
 * 26.04.03
 * 장르 별 가장 많이 재생된 노래 2개 씩 모아 앨범 출시
 * 노래는 고유 번호로 구분
 * 1. 속한 노래가 많이 재생된 장르를 먼저 수록
 * 2. 장르 내에서 많이 재생된 노래를 먼저 수록
 * 3. 재생 횟수가 같다면 고유 번호가 낮은 노래를 먼저 수록
 * 해시 테이블을 만들어야?
 */

function solution(genres, plays) {
  // 해시 테이블 작성 O(n)
  const answer = []
  const musicTable = {};
  const totalArray = [];
  for (let id = 0; id < genres.length; id += 1) {
    const value = { id: id, plays: plays[id] }

    if (!musicTable[genres[id]]) {
      musicTable[genres[id]] = [value]
    } else {
      musicTable[genres[id]] = [...musicTable[genres[id]], value]
    }
  };

  // 장르별 정렬 O(nlogn)
  for (const key in musicTable) {
    musicTable[key].sort((a, b) => b.plays - a.plays)
  }

  // 장르별 토탈 계산 O(n)
  for (const key in musicTable) {
    let total = 0;

    for (const music of musicTable[key]) {
      total += music.plays
    }

    const value = { genre: key, total: total }
    totalArray.push(value)
  }

  // 장르별 토탈 정렬 O(nlogn)
  totalArray.sort((a, b) => b.total - a.total)

  // 앨범에 집어 넣기 O(n)
  for (const item of totalArray) {
    answer.push(musicTable[item.genre][0].id)
    if (musicTable[item.genre][1]) {
      answer.push(musicTable[item.genre][1].id)
    }
  }

  return answer
}

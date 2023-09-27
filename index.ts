const insertIntoArray = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
]

const minimalDistance2 = (word1, word2) => {
  const charsForBaseWord = word1.split("")
  const charsForChangingWord = word2.split("")
  const lengthDifference = charsForChangingWord.length - charsForBaseWord.length
  const characterPosition = charsForChangingWord.length - 1
  let attemptsCount = 0
  let output = []

  if (lengthDifference > 0) charsForBaseWord.unshift.apply(charsForBaseWord, Array(lengthDifference).fill(""))

  charsForBaseWord.reverse().reduce((acc, char, index) => {
    const currentIndex = characterPosition - index
    if (acc[currentIndex] != char) {
      attemptsCount += 1
      // characterPosition - index >= 0 ? acc[currentIndex] = char : acc.unshift(char) // uncomment this line for
                                                                                       // correct behavior with long
                                                                                       // and short words. See tests
      acc[currentIndex] = char // comment this file when you uncomment line 26
      output.push(acc.join(""))
    }
    return acc
  }, charsForChangingWord)

  output.unshift.apply(output, [attemptsCount, word2])
  output.forEach(line => console.log(line))
}

const minimalDistance = (word1, word2) => {
    const n = word1.length;
    const m = word2.length;
    const dp = Array(n);

    const getDp = (i, j, dp) => {
        if (i < 0 && j < 0) return 0;
        if (i < 0) return j + 1;
        if (j < 0) return i + 1;
        return dp[i][j];
    };

    for (let i = 0; i < n; i++) {
        dp[i] = Array(m);
        for (let j = 0; j < m; j++) {
            dp[i][j] = Math.min(
                getDp(i - 1, j, dp) + 1,
                getDp(i, j - 1, dp) + 1,
                getDp(i - 1, j - 1, dp) + (word1[i] === word2[j] ? 0 : 1)
            );
        }
    }

    let distance = getDp(n - 1, m - 1, dp);
    console.log(distance);
    let curI = n - 1;
    let curJ = m - 1;
    let curWord = Array.from(word2);


    console.log(curWord.join(''));
    while (distance > 0) {
        const del = getDp(curI, curJ - 1, dp);
        const insert = getDp(curI - 1, curJ, dp);
        const replace = getDp(curI - 1, curJ - 1, dp);
        if (replace < distance) {
            curWord[curJ] = word1[curI];
            curI -= 1;
            curJ -= 1;
            distance = replace;
            console.log(curWord.join(''));
        } else if (del < distance) {
            curWord[curJ] = '';
            curJ -= 1;
            distance = del;
            console.log(curWord.join(''));
        } else if (insert < distance) {
            curWord = insertIntoArray(curWord, curJ + 1, word1[curI]);
            curI -= 1;
            distance = insert;
            console.log(curWord.join(''));
        } else {
            curI -= 1;
            curJ -= 1;
        }
    }
};

(() => {
    minimalDistance2(process.argv[2], process.argv[3]);
})();

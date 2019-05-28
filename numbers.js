function convertNumber(n) {
  // since there are only a few edge cases to account for, we can include them as part of our object
  let romanToArabicDict = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let output = "";
  if (Number(n) || n === 0) {
    // arabic number
    let quotient;
    let remainder;
    let arabicNum;
    for (let romanNum in romanToArabicDict) {
      arabicNum = romanToArabicDict[romanNum];
      quotient = Math.floor(n / arabicNum);
      output += romanNum.repeat(quotient);
      remainder = n % arabicNum;
      // console.log(remainder);
      n = remainder;
    }
    return output;
  } else {
    // roman numeral
    let output = 0;
    let previousRoman;
    for (let currentRoman of n) {
      if (previousRoman) {
        let edgeCase = previousRoman + currentRoman;
        if (Object.keys(romanToArabicDict).filter(key => key.length === 2).includes(edgeCase)) {
          // if it's an edge case, subtract the arabic equivalent of the previous single roman numeral that was added before
          output -= romanToArabicDict[previousRoman];
          // add the arabic equivalent of the roman edge case
          output += romanToArabicDict[edgeCase]
        } else {
          output += romanToArabicDict[currentRoman];
        }
      } else {
        output += romanToArabicDict[currentRoman];
      }
      previousRoman = currentRoman;
    }
    return output;
  }
}

function testNumbers(numArray) {
  numArray.forEach(num => {
    console.log(`${num} -> ${convertNumber(num)}`);
    console.log();
  });
}

// test arabic to roman conversion
console.log("Arabic to Roman:");
testNumbers([380, 291, 38, 29, 9, 3]);

console.log("********************");
console.log();

// test roman to arabic conversion
console.log("Roman to Arabic:");
testNumbers(["III", "CM", "CD", "XC", "XL", "IX", "IV", "CCCLXXX", "CCXCI", "XXXVIII", "XXIX"]);

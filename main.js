// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Add your functions below:

const validateCred = (arr) => {
  // get check digit
  const checkDigit = arr[arr.length - 1];
  // every other two digits
  let evenIndexedEl = [];
  let oddIndexedEl = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 != 0) {
      evenIndexedEl.push(arr[i]);
    } else {
      oddIndexedEl.push(arr[i]);
    }
  }
  // remove the last digit as it is already stored as checkDigit
  if (arr.length % 2 === 0) {
    evenIndexedEl.pop();
  } else {
    oddIndexedEl.pop();
  }

  // Add all even indexed elements
  const sumOfEvenIndexedEl = evenIndexedEl.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  // double all odd indexed elements and then add them together
  const doubledOddIndexedEl = oddIndexedEl.map((el) => {
    el = el * 2;
    if (el >= 10) {
      el = el - 9;
    }
    return el;
  });

  const sumOfDOIE = doubledOddIndexedEl.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  // Add all numbers
  const finalValidation = checkDigit + sumOfEvenIndexedEl + sumOfDOIE;

  // If finalValidation is a number that can be divided by 10 and has a remainder of 0 returns true
  if (finalValidation % 10 === 0) {
    return true;
  }
  return false;
};

// test validateCred function
/*
  console.log(validateCred(valid1)) // Should return true
  console.log(validateCred(invalid1)) // Should return false
  */

const findInvalidCards = (cards) => {
  const invalidCards = [];
  for (let i = 0; i < cards.length; i++) {
    let currentCard = cards[i];
    if (!validateCred(currentCard)) {
      invalidCards.push(currentCard);
    }
  }
  return invalidCards;
};
// test findInvalidCards function
/*
console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5])) // Shouldn't print anything but valid3
console.log(findInvalidCards(batch)); // Test what the mystery numbers are
*/

const idInvalidCardCompanies = (invalidCards) => {
  let listOfCompanies = [];
  for (let i = 0; i < invalidCards.length; i++) {
    let firstDigit = invalidCards[i][0];
    if (firstDigit === 3) {
      listOfCompanies.push("Amex (American Express");
    } else if (firstDigit === 4) {
      listOfCompanies.push("Visa");
    } else if (firstDigit === 5) {
      listOfCompanies.push("Mastercard");
    } else if (firstDigit === 6) {
      listOfCompanies.push("Discover");
    } else {
      return "Company not found";
    }
  }
  return listOfCompanies;
};
// test idInvalidCardCompanies function
/* 
console.log(idInvalidCardCompanies([invalid1])); // Should print['visa']
console.log(idInvalidCardCompanies([invalid2])); // Should print ['mastercard']
console.log(idInvalidCardCompanies(batch)); // Find out which companies have mailed out invalid cards
*/

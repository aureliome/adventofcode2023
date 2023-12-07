/*
  To make things a little more interesting, the Elf introduces one additional rule. 
  Now, J cards are jokers - wildcards that can act like whatever card would make 
  the hand the strongest type possible.

  To balance this, J cards are now the weakest individual cards, weaker even than 2. 
  The other cards stay in the same order: A, K, Q, T, 9, 8, 7, 6, 5, 4, 3, 2, J.

  J cards can pretend to be whatever card is best for the purpose of determining hand 
  type; for example, QJJQ2 is now considered four of a kind. However, for the purpose 
  of breaking ties between two hands of the same type, J is always treated as J, not 
  the card it's pretending to be: JKKK2 is weaker than QQQQ2 because J is weaker than Q.

  Now, the above example goes very differently:

    32T3K 765
    T55J5 684
    KK677 28
    KTJJT 220
    QQQJA 483

  - 32T3K is still the only one pair; it doesn't contain any jokers, 
    so its strength doesn't increase.
  - KK677 is now the only two pair, making it the second-weakest hand.
  - T55J5, KTJJT, and QQQJA are now all four of a kind! T55J5 gets rank 3, 
    QQQJA gets rank 4, and KTJJT gets rank 5.
  
  With the new joker rule, the total winnings in this example are 5905.

  Using the new joker rule, find the rank of every hand in your set. 
  What are the new total winnings?
*/

const realInput = require("./input");
const { splitLines } = require("../utils");

const cardsValue = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1,
};

const calculateHandValue = (cardsString) => {
  const cards = cardsString.split("");
  let cardsMap = cards.reduce((acc, card) => {
    acc[card] = (acc[card] || 0) + 1;
    return acc;
  }, {});
  // console.log("old", cardsMap);

  // handle jokers
  if (cardsMap["J"]) {
    let maximum = {
      card: "",
      frequency: 0,
    };

    for (const key in cardsMap) {
      if (key !== "J") {
        if (maximum.frequency < cardsMap[key]) {
          maximum = { card: key, frequency: cardsMap[key] };
        }
      }
    }

    if (maximum.card) {
      cardsMap[maximum.card] = cardsMap[maximum.card] + cardsMap["J"];
      delete cardsMap["J"];
    }
    // console.log("new", cardsMap);
  }

  const cardsFrequency = Object.values(cardsMap);

  // check how many kinds of cards there are in the hand
  switch (cardsFrequency.length) {
    case 1:
      // five of a kind (5+0)
      // console.log(cardsString, "five of a kind");
      return 7;
    case 2:
      if (cardsFrequency[0] === 1 || cardsFrequency[0] === 4) {
        // four of a kind (1+4 or 4+1)
        // console.log(cardsString, "four of a kind");
        return 6;
      } else {
        // full house (2+3 or 3+2)
        // console.log(cardsString, "full");
        return 5;
      }
    case 3:
      if ([cardsFrequency[0], cardsFrequency[1]].includes(2)) {
        // two pair (1+2+2 or 2+1+2 or 2+2+1)
        // console.log(cardsString, "two pair");
        return 3;
      } else {
        // three of a kind (3+1+1 or 1+3+1 or 1+1+3)
        // console.log(cardsString, "three of a kind");
        return 4;
      }
    case 4:
      // one pair (1+1+1+2 or 1+1+2+1 or 1+2+1+1 or 2+1+1+1)
      // console.log(cardsString, "one pair");
      return 2;
    default:
      // high card (1+1+1+1+1)
      // console.log(cardsString, "high card");
      return 1;
  }
};

const main = (input) => {
  const hands = splitLines(input).map((hand) => {
    const [cards, bid] = hand.split(" ");
    return {
      cards,
      bid: parseInt(bid),
    };
  });

  hands.sort((a, b) => {
    const valueA = calculateHandValue(a.cards);
    const valueB = calculateHandValue(b.cards);

    if (valueA > valueB) {
      return 1;
    } else if (valueA < valueB) {
      return -1;
    } else {
      for (let i = 0; i < a.cards.length; i++) {
        // console.log(a.cards[i], cardsValue[a.cards[i]]);
        // console.log(b.cards[i], cardsValue[b.cards[i]]);
        if (cardsValue[a.cards[i]] > cardsValue[b.cards[i]]) {
          return 1;
        } else if (cardsValue[a.cards[i]] < cardsValue[b.cards[i]]) {
          return -1;
        }
      }
      // they are absolutely equal
      return 0;
    }
  });

  // console.log(hands);

  return hands.reduce((acc, hand, index) => {
    const win = hand.bid * (index + 1);
    const newAcc = acc + win;
    // console.log(
    //   `${hand.cards} => ${index + 1} * ${
    //     hand.bid
    //   } = ${win} + ${acc} = ${newAcc}`
    // );
    return newAcc;
  }, 0);
};

console.log(`The sum is ${main(realInput)}`);

module.exports = main;

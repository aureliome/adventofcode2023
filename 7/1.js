/*
  Because the journey will take a few days, she offers to teach you the game 
  of Camel Cards. Camel Cards is sort of similar to poker except it's designed 
  to be easier to play while riding a camel.

  In Camel Cards, you get a list of hands, and your goal is to order them based 
  on the strength of each hand. A hand consists of five cards labeled one 
  of A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2. The relative strength of each card 
  follows this order, where A is the highest and 2 is the lowest.

  Every hand is exactly one type. From strongest to weakest, they are:

  - Five of a kind, where all five cards have the same label: AAAAA
  - Four of a kind, where four cards have the same label and one card 
    has a different label: AA8AA
  - Full house, where three cards have the same label, and the remaining 
    two cards share a different label: 23332
  - Three of a kind, where three cards have the same label, and the 
    remaining two cards are each different from any other card in the hand: TTT98
  - Two pair, where two cards share one label, two other cards share a second label, 
    and the remaining card has a third label: 23432
  - One pair, where two cards share one label, and the other three cards have a 
    different label from the pair and each other: A23A4
  - High card, where all cards' labels are distinct: 23456

  Hands are primarily ordered based on type; for example, every full house 
  is stronger than any three of a kind.

  If two hands have the same type, a second ordering rule takes effect. Start by 
  comparing the first card in each hand. If these cards are different, the hand with 
  the stronger first card is considered stronger. If the first card in each hand have 
  the same label, however, then move on to considering the second card in each hand. 
  If they differ, the hand with the higher second card wins; otherwise, continue with 
  the third card in each hand, then the fourth, then the fifth.

  So, 33332 and 2AAAA are both four of a kind hands, but 33332 is stronger because its 
  first card is stronger. Similarly, 77888 and 77788 are both a full house, but 77888 
  is stronger because its third card is stronger (and both hands have 
    the same first and second card).

  To play Camel Cards, you are given a list of hands and their corresponding bid 
  (your puzzle input). For example:

    32T3K 765
    T55J5 684
    KK677 28
    KTJJT 220
    QQQJA 483
  
  This example shows five hands; each hand is followed by its bid amount. Each hand 
  wins an amount equal to its bid multiplied by its rank, where the weakest hand gets 
  rank 1, the second-weakest hand gets rank 2, and so on up to the strongest hand. 
  Because there are five hands in this example, the strongest hand will have rank 5 
  and its bid will be multiplied by 5.

  So, the first step is to put the hands in order of strength:

  - 32T3K is the only one pair and the other hands are all a stronger type, 
    so it gets rank 1.
  - KK677 and KTJJT are both two pair. Their first cards both have the same label, 
    but the second card of KK677 is stronger (K vs T), so KTJJT gets rank 2 and 
    KK677 gets rank 3.
  - T55J5 and QQQJA are both three of a kind. QQQJA has a stronger first card, so 
  it gets rank 5 and T55J5 gets rank 4.
  
  Now, you can determine the total winnings of this set of hands by adding up the 
  result of multiplying each hand's bid with its rank 
  (765 * 1 + 220 * 2 + 28 * 3 + 684 * 4 + 483 * 5). 
  So the total winnings in this example are 6440.

  Find the rank of every hand in your set. What are the total winnings?
*/

const realInput = require("./input");
const { splitLines } = require("../utils");

const cardsValue = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

const calculateHandValue = (cardsString) => {
  const cards = cardsString.split("");
  const cardsMap = cards.reduce((acc, card) => {
    acc[card] = (acc[card] || 0) + 1;
    return acc;
  }, {});
  const cardsFrequency = Object.values(cardsMap);

  // check how many kinds of cards there are in the hand
  switch (cardsFrequency.length) {
    case 1:
      // five of a kind (5+0)
      return 7;
    case 2:
      if (cardsFrequency[0] === 1 || cardsFrequency[1] === 4) {
        // four of a kind (1+4 or 4+1)
        return 6;
      } else {
        // full (2+3 or 3+2)
        return 5;
      }
    case 3:
      if ([cardsFrequency[0], cardsFrequency[1]].includes(2)) {
        // two pair (1+2+2 or 2+1+2 or 2+2+1)
        return 3;
      } else {
        // three of a kind (3+1+1 or 1+3+1 or 1+1+3)
        return 4;
      }
    case 4:
      // one pair (1+1+1+2 or 1+1+2+1 or 1+2+1+1 or 2+1+1+1)
      return 2;
    default:
      // high card (1+1+1+1+1)
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

    if (valueA > valueB) return 1;
    else if (valueB > valueA) return -1;
    else {
      for (let i = 0; i < a.cards.length; i++) {
        if (cardsValue[a.cards[i]] > cardsValue[b.cards[i]]) {
          return 1;
        } else if (cardsValue[a.cards[i]] < cardsValue[b.cards[i]]) {
          return -1;
        }
      }
      // they are absolutely equal
      return 1;
    }
  });

  return hands.reduce((acc, hand, index) => {
    return acc + hand.bid * (index + 1);
  }, 0);
};

// TODO: uncomment this line when you're ready to test it with real input
// console.log(`The sum is ${main(realInput)}`);

module.exports = main;

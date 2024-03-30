import Movie from '@domain/models/Movie';

let longestInterval = 0;
let fastestTwoAwardsInterval = Number.MAX_SAFE_INTEGER;
let producerWithLongestInterval;
let producerWithFastestTwoAwards: string;

const lastAwardDateByProducer = new Map();

export const findProducerWithLongestInterval = (awards: Movie[]) => {
  awards.sort((a, b) => parseInt(a.year) - parseInt(b.year));

  for (const award of awards) {
    const producer = award.producers.split(',').map((p) => p.trim());
    for (const p of producer) {
      if (!lastAwardDateByProducer.has(p)) {
        lastAwardDateByProducer.set(p, award.year);
      } else {
        const lastAwardDate = lastAwardDateByProducer.get(p);
        const interval = parseInt(award.year) - parseInt(lastAwardDate);
        if (interval > longestInterval) {
          longestInterval = interval;
          producerWithLongestInterval = p;
        }

        lastAwardDateByProducer.set(p, award.year);
      }
    }
  }

  return {
    producerWithLongestInterval,
  };
};

export const findProducerWithFastTwoAwards = (awards: Movie[]) => {
  awards.sort((a, b) => parseInt(a.year) - parseInt(b.year));

  for (const award of awards) {
    const producer = award.producers.split(',').map((p) => p.trim());
    for (const p of producer) {
      if (!lastAwardDateByProducer.has(p)) {
        lastAwardDateByProducer.set(p, award.year);
      } else {
        const lastAwardDate = lastAwardDateByProducer.get(p);
        const interval = parseInt(award.year) - parseInt(lastAwardDate);
        if (interval < fastestTwoAwardsInterval) {
          fastestTwoAwardsInterval = interval;
          producerWithFastestTwoAwards = p;
        }

        lastAwardDateByProducer.set(p, award.year);
      }
    }
  }

  return {
    producerWithFastestTwoAwards,
  };
};

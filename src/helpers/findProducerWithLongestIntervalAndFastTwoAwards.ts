import Movie from '@domain/models/Movie';

interface ProducerAwards {
  [producer: string]: string;
}

const updateInterval = (
  producer: string,
  currentYear: string,
  isWinner: boolean,
  lastAwardDateByProducer: ProducerAwards,
  intervalComparison: (
    interval: number,
    currentBestInterval: number,
  ) => boolean,
  currentBestInterval: number,
  currentBestProducer: string | undefined,
) => {
  if (!isWinner) {
    return { currentBestInterval, currentBestProducer };
  }
  const lastAwardYear = parseInt(lastAwardDateByProducer[producer]);
  const interval = parseInt(currentYear) - lastAwardYear;
  if (intervalComparison(interval, currentBestInterval)) {
    currentBestInterval = interval;
    currentBestProducer = producer;
  }
  lastAwardDateByProducer[producer] = currentYear;
  return { currentBestInterval, currentBestProducer };
};

const findProducerWithLongestInterval = (awards: Movie[]) => {
  let longestInterval = 0;
  let producerWithLongestInterval: string | undefined;
  const lastAwardDateByProducer: ProducerAwards = {};

  awards.sort(
    (awardA, awardB) => parseInt(awardA.year) - parseInt(awardB.year),
  );

  awards.forEach((award) => {
    const isWinner = award.winner === 'yes';
    const producers = award.producers
      .split(',')
      .map((producer) => producer.trim());
    producers.forEach((producer) => {
      const result = updateInterval(
        producer,
        award.year,
        isWinner,
        lastAwardDateByProducer,
        (interval, currentBest) => interval > currentBest,
        longestInterval,
        producerWithLongestInterval,
      );
      longestInterval = result.currentBestInterval;
      producerWithLongestInterval = result.currentBestProducer;
    });
  });

  return { producerWithLongestInterval };
};

const findProducerWithFastestTwoAwards = (awards: Movie[]) => {
  let fastestTwoAwardsInterval = Number.MAX_SAFE_INTEGER;
  let producerWithFastestTwoAwards: string | undefined;
  const lastAwardDateByProducer: ProducerAwards = {};

  awards.sort(
    (awardA, awardB) => parseInt(awardA.year) - parseInt(awardB.year),
  );

  awards.forEach((award) => {
    const isWinner = award.winner === 'yes';
    const producers = award.producers
      .split(',')
      .map((producer) => producer.trim());
    producers.forEach((producer) => {
      const result = updateInterval(
        producer,
        award.year,
        isWinner,
        lastAwardDateByProducer,
        (interval, currentBest) => interval < currentBest,
        fastestTwoAwardsInterval,
        producerWithFastestTwoAwards,
      );
      fastestTwoAwardsInterval = result.currentBestInterval;
      producerWithFastestTwoAwards = result.currentBestProducer;
    });
  });

  return { producerWithFastestTwoAwards };
};

export { findProducerWithLongestInterval, findProducerWithFastestTwoAwards };

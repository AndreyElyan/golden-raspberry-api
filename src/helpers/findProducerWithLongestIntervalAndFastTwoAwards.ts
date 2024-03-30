import Movie from '@domain/models/Movie';

interface ProducerAwards {
  [producer: string]: string;
}

export const updateInterval = (
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

export const processAwards = (
  awards: Movie[],
  lastAwardDateByProducer: ProducerAwards,
  intervalComparison: (
    interval: number,
    currentBestInterval: number,
  ) => boolean,
  currentBestInterval: number,
  currentBestProducer: string | undefined,
) => {
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
        intervalComparison,
        currentBestInterval,
        currentBestProducer,
      );
      currentBestInterval = result.currentBestInterval;
      currentBestProducer = result.currentBestProducer;
    });
  });
  return { currentBestInterval, currentBestProducer };
};

export const sortAwardsByYear = (awards: Movie[]) => {
  return awards.sort(
    (awardA, awardB) => parseInt(awardA.year) - parseInt(awardB.year),
  );
};

const findProducerWithLongestInterval = (awards: Movie[]) => {
  const longestInterval = 0;
  let producerWithLongestInterval: string | undefined;
  const lastAwardDateByProducer: ProducerAwards = {};

  const sortedAwards = sortAwardsByYear(awards);

  const result = processAwards(
    sortedAwards,
    lastAwardDateByProducer,
    (interval, currentBest) => interval > currentBest,
    longestInterval,
    producerWithLongestInterval,
  );

  return { producerWithLongestInterval: result.currentBestProducer };
};

const findProducerWithFastestTwoAwards = (awards: Movie[]) => {
  const fastestTwoAwardsInterval = Number.MAX_SAFE_INTEGER;
  let producerWithFastestTwoAwards: string | undefined;
  const lastAwardDateByProducer: ProducerAwards = {};

  const sortedAwards = sortAwardsByYear(awards);

  const result = processAwards(
    sortedAwards,
    lastAwardDateByProducer,
    (interval, currentBest) => interval < currentBest,
    fastestTwoAwardsInterval,
    producerWithFastestTwoAwards,
  );

  return { producerWithFastestTwoAwards: result.currentBestProducer };
};

export { findProducerWithLongestInterval, findProducerWithFastestTwoAwards };

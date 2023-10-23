import { Candidate } from 'src/model/candidate.type';

/**
 * Extracts unique rejection reasons from an array of candidate objects.
 *
 * @param {Candidate[]} candidates - An array of candidate objects.
 * @returns {string[]} - An array of unique rejection reasons.
 */
export const extractReasons = (candidates: Candidate[]): string[] => {
  const reasonsSet = new Set<string>();

  candidates.forEach((candidate) => {
    const reasons = candidate.reason.split(',').map((reason) => reason.trim());

    reasons.forEach((reason) => {
      if (reason !== '') {
        reasonsSet.add(reason);
      }
    });
  });

  return Array.from(reasonsSet);
};

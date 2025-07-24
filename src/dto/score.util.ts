// score.util.ts

// Define the full set of valid traits.
// This helps ensure both job and applicant rankings use consistent trait values.
export const allTraits = ['Adaptability', 'Empathy', 'Harmony', 'Discipline', 'Focus'];

/**
 * Computes a score based on how closely the applicant's trait ranking
 * matches the hiring manager's trait ranking.
 *
 * The score is calculated as the sum of absolute positional differences
 * for each trait in the two rankings.
 *
 * @param jobRanking - Array of trait names ranked by the hiring manager
 * @param applicantRanking - Array of trait names ranked by the applicant
 * @returns number - The total distance score (lower is better match)
 */
export function computeScore(jobRanking: string[], applicantRanking: string[]): number {
  // Ensure both rankings contain exactly the expected number of traits
  if (jobRanking.length !== allTraits.length || applicantRanking.length !== allTraits.length) {
    throw new Error('Rankings must contain exactly 5 traits.');
  }

  // Create a lookup table that maps trait → index in the job's ranking
  // Example: { "Empathy": 0, "Harmony": 1, ... }
  const jobMap = new Map<string, number>();
  jobRanking.forEach((trait, index) => jobMap.set(trait, index));

  let score = 0;

  // Loop through each trait in the applicant's ranking and compare its index
  applicantRanking.forEach((trait, index) => {
    // Get the position of the trait in the job's ranking
    const jobIndex = jobMap.get(trait);

    // If the trait is not found in the job's ranking, throw an error
    if (jobIndex === undefined) {
      throw new Error(`Unknown trait: ${trait}`);
    }

    // Add the absolute difference in index positions to the total score
    score += Math.abs(jobIndex - index);
  });

  // Return the final total score; lower score = closer match
  return score;
}

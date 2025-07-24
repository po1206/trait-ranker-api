/**
 * DTO for computing trait ranking score.
 * This class defines the shape of the JSON request body that the API accepts.
 */
export class ScoreDto {
    // Array of trait names ranked by the hiring manager (required)
    jobRanking: string[];
    // Array of trait names ranked by the applicant (required)
    applicantRanking: string[];
}
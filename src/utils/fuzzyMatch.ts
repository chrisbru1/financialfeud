/**
 * Calculate similarity between two strings using Levenshtein distance
 * Returns a value between 0 and 1, where 1 is an exact match
 */
export function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim()
  const s2 = str2.toLowerCase().trim()
  
  // Exact match
  if (s1 === s2) return 1
  
  // Check if one string contains the other
  if (s1.includes(s2) || s2.includes(s1)) {
    const longer = s1.length > s2.length ? s1 : s2
    const shorter = s1.length > s2.length ? s2 : s1
    return shorter.length / longer.length
  }
  
  // Calculate Levenshtein distance
  const distance = levenshteinDistance(s1, s2)
  const maxLength = Math.max(s1.length, s2.length)
  
  if (maxLength === 0) return 1
  
  return 1 - (distance / maxLength)
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = []
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,      // insertion
          matrix[i - 1][j] + 1      // deletion
        )
      }
    }
  }
  
  return matrix[str2.length][str1.length]
}

/**
 * Find the best matching answer from a list of answers
 * Returns the index and similarity score if above threshold
 * Made more lenient for better matching
 */
export function findBestMatch(
  input: string,
  answers: string[],
  threshold: number = 0.35
): { index: number; similarity: number } | null {
  let bestMatch: { index: number; similarity: number } | null = null
  
  answers.forEach((answer, index) => {
    const similarity = calculateSimilarity(input, answer)
    
    // Also check for partial matches (key words) - more lenient
    const words = answer.toLowerCase().split(/\s+/)
    const inputWords = input.toLowerCase().split(/\s+/)
    
    let wordMatchScore = 0
    words.forEach(word => {
      // Check for word matches (even shorter words now)
      if (word.length > 2 && inputWords.some(inputWord => 
        inputWord.includes(word) || word.includes(inputWord)
      )) {
        wordMatchScore += 0.25
      }
    })
    
    // Check if any significant word from answer appears in input
    const significantWords = words.filter(w => w.length > 3)
    if (significantWords.length > 0) {
      const matchedWords = significantWords.filter(word => 
        input.toLowerCase().includes(word)
      )
      if (matchedWords.length > 0) {
        wordMatchScore += (matchedWords.length / significantWords.length) * 0.3
      }
    }
    
    const finalSimilarity = Math.max(similarity, wordMatchScore)
    
    if (finalSimilarity >= threshold) {
      if (!bestMatch || finalSimilarity > bestMatch.similarity) {
        bestMatch = { index, similarity: finalSimilarity }
      }
    }
  })
  
  return bestMatch
}


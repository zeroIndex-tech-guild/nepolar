import natural from 'natural'

export class SummaryGeneration {
  constructor() {}

  generateSummary(content: string, numberOfSentense: number = 3) {
    const sentences = content.match(/[^.!?]+[.!?]+/g) || []

    // Tokenise and calculate importance based on word frequency
    const tokenizer = new natural.WordTokenizer()
    const wordFrequence: Record<string, number> = {}

    sentences.forEach((sentence) => {
      const words = tokenizer.tokenize(sentence)

      words.forEach((word) => {
        wordFrequence[word] = (wordFrequence[word] || 0) + 1
      })
    })

    // score sentenes based on word frequence
    const sentenceScores = sentences.map((sentence) => {
      const words = tokenizer.tokenize(sentence.toLowerCase())
      const score = words.reduce((sum, word) => sum + wordFrequence[word], 0)
      return {
        sentence,
        score,
      }
    })

    const sortedSentences = sentenceScores
      .sort((a, b) => b.score - a.score)
      .slice(0, numberOfSentense)
      .map((sentence) => sentence.sentence)

    return sortedSentences.join(' ')
  }
}

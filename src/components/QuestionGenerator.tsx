import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { grammarRules } from '@/lib/grammarData'

export function QuestionGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [status, setStatus] = useState('')

  const generateQuestions = async () => {
    setIsGenerating(true)
    setStatus('Generating 500 practice questions...')

    try {
      const rulesList = grammarRules.map(r => `${r.id}: ${r.title} - ${r.description}`).join('\n')
      
      const promptText = `Generate exactly 500 English grammar practice questions based on these rules:

${rulesList}

Requirements:
- Distribute questions evenly across all 13 grammar rules (about 38-40 questions per rule)
- Mix question types: 40% multiple-choice, 30% fill-blank, 20% error-correction, 10% sentence-construction
- Start IDs from q121 and continue sequentially to q620
- Each question must have: id, ruleId, type, question, correctAnswer, explanation
- Multiple-choice questions must include options array with 4 choices
- Make questions practical for daily English conversation
- Vary difficulty levels within each rule

Return as a JSON object with a single property "questions" containing the array of question objects.`

      setStatus('Calling AI to generate questions...')
      const result = await window.spark.llm(promptText, 'gpt-4o', true)
      const data = JSON.parse(result)
      
      setStatus(`Generated ${data.questions.length} questions! Check console.`)
      console.log('Generated Questions:', JSON.stringify(data.questions, null, 2))
      
    } catch (error) {
      setStatus(`Error: ${error}`)
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Question Generator</h2>
      <p className="mb-4 text-muted-foreground">
        This tool generates 500 additional practice questions using AI.
        The questions will be logged to the console for you to copy into grammarData.ts
      </p>
      <Button 
        onClick={generateQuestions} 
        disabled={isGenerating}
        size="lg"
        className="w-full"
      >
        {isGenerating ? 'Generating...' : 'Generate 500 Questions'}
      </Button>
      {status && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm font-mono">{status}</p>
        </div>
      )}
    </Card>
  )
}

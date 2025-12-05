import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  BookOpen, 
  Play, 
  Trophy, 
  Target, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  ArrowClockwise,
  Flame,
  House
} from '@phosphor-icons/react'
import { grammarRules, questions, type Question, type UserProgress } from '@/lib/grammarData'
import { cn } from '@/lib/utils'
import { QuestionGenerator } from '@/components/QuestionGenerator'

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'practice' | 'study' | 'progress' | 'generator'>('home')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [sessionScore, setSessionScore] = useState(0)
  const [sessionTotal, setSessionTotal] = useState(0)
  
  const [progress, setProgress] = useKV<UserProgress>('grammar-progress', {
    totalQuestions: 0,
    correctAnswers: 0,
    questionsPerRule: {},
    currentStreak: 0,
    lastPracticeDate: '',
    achievements: []
  })

  const safeProgress = progress || {
    totalQuestions: 0,
    correctAnswers: 0,
    questionsPerRule: {},
    currentStreak: 0,
    lastPracticeDate: '',
    achievements: []
  }

  const filteredQuestions = selectedCategory
    ? questions.filter(q => {
        const rule = grammarRules.find(r => r.id === q.ruleId)
        return rule?.category === selectedCategory
      })
    : questions

  const currentQuestion = filteredQuestions[currentQuestionIndex]

  useEffect(() => {
    const today = new Date().toDateString()
    if (safeProgress.lastPracticeDate !== today && safeProgress.lastPracticeDate) {
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      if (safeProgress.lastPracticeDate === yesterday) {
        setProgress({ ...safeProgress, currentStreak: safeProgress.currentStreak + 1, lastPracticeDate: today })
      } else {
        setProgress({ ...safeProgress, currentStreak: 1, lastPracticeDate: today })
      }
    } else if (!safeProgress.lastPracticeDate) {
      setProgress({ ...safeProgress, currentStreak: 1, lastPracticeDate: today })
    }
  }, [currentView])

  const handleAnswerSubmit = () => {
    if (!selectedAnswer.trim()) return

    const correct = selectedAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase()
    setIsCorrect(correct)
    setIsAnswered(true)

    if (correct) {
      setSessionScore(sessionScore + 1)
    }
    setSessionTotal(sessionTotal + 1)

    const newProgress = { ...safeProgress }
    newProgress.totalQuestions += 1
    if (correct) newProgress.correctAnswers += 1

    const ruleId = currentQuestion.ruleId
    if (!newProgress.questionsPerRule[ruleId]) {
      newProgress.questionsPerRule[ruleId] = { correct: 0, total: 0 }
    }
    newProgress.questionsPerRule[ruleId].total += 1
    if (correct) newProgress.questionsPerRule[ruleId].correct += 1

    setProgress(newProgress)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer('')
      setIsAnswered(false)
      setIsCorrect(false)
    } else {
      setCurrentQuestionIndex(0)
      setSelectedAnswer('')
      setIsAnswered(false)
      setIsCorrect(false)
    }
  }

  const handleRetry = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer('')
    setIsAnswered(false)
    setIsCorrect(false)
    setSessionScore(0)
    setSessionTotal(0)
  }

  const getAccuracyForRule = (ruleId: string) => {
    const ruleStats = safeProgress.questionsPerRule[ruleId]
    if (!ruleStats || ruleStats.total === 0) return 0
    return Math.round((ruleStats.correct / ruleStats.total) * 100)
  }

  const categories = Array.from(new Set(grammarRules.map(r => r.category)))

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Grammar Master
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-warning/10 px-3 py-1.5 rounded-full">
                <Flame weight="fill" className="text-warning" size={20} />
                <span className="text-sm font-semibold text-warning">{safeProgress.currentStreak}</span>
              </div>
              {safeProgress.totalQuestions > 0 && (
                <div className="hidden sm:flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
                  <Target weight="fill" className="text-primary" size={20} />
                  <span className="text-sm font-semibold text-primary">
                    {Math.round((safeProgress.correctAnswers / safeProgress.totalQuestions) * 100)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <Button
              variant={currentView === 'home' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('home')}
              className="gap-2"
            >
              <House size={18} />
              <span className="hidden sm:inline">Home</span>
            </Button>
            <Button
              variant={currentView === 'practice' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('practice')}
              className="gap-2"
            >
              <Play size={18} weight="fill" />
              <span className="hidden sm:inline">Practice</span>
            </Button>
            <Button
              variant={currentView === 'study' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('study')}
              className="gap-2"
            >
              <BookOpen size={18} />
              <span className="hidden sm:inline">Study Rules</span>
            </Button>
            <Button
              variant={currentView === 'progress' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('progress')}
              className="gap-2"
            >
              <Trophy size={18} weight="fill" />
              <span className="hidden sm:inline">Progress</span>
            </Button>
            <Button
              variant={currentView === 'generator' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('generator')}
              className="gap-2"
            >
              <span className="hidden sm:inline">Generator</span>
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {currentView === 'home' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Master Essential English Grammar
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Practice 13 essential grammar rules through interactive exercises. Build confidence in daily conversation with immediate feedback and progress tracking.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('practice')}>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Play size={24} weight="fill" className="text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Start Practice</h3>
                  <p className="text-muted-foreground">
                    Answer interactive questions and get instant feedback on your grammar skills.
                  </p>
                </div>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('study')}>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Study Rules</h3>
                  <p className="text-muted-foreground">
                    Review all 13 essential grammar rules with clear examples and explanations.
                  </p>
                </div>
              </Card>

              <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('progress')}>
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <Trophy size={24} weight="fill" className="text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                  <p className="text-muted-foreground">
                    View your statistics, accuracy rates, and identify areas to improve.
                  </p>
                </div>
              </Card>
            </div>

            {safeProgress.totalQuestions > 0 && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Your Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{safeProgress.totalQuestions}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success">{safeProgress.correctAnswers}</div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">
                      {Math.round((safeProgress.correctAnswers / safeProgress.totalQuestions) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-warning">{safeProgress.currentStreak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {currentView === 'practice' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Practice Session</h2>
                <p className="text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {filteredQuestions.length}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <Target size={14} />
                  {sessionTotal > 0 ? Math.round((sessionScore / sessionTotal) * 100) : 0}% Today
                </Badge>
                <Button variant="outline" size="sm" onClick={handleRetry} className="gap-1">
                  <ArrowClockwise size={16} />
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Progress value={(currentQuestionIndex / filteredQuestions.length) * 100} className="h-2" />
            </div>

            <Tabs value={selectedCategory || 'all'} onValueChange={(v) => {
              setSelectedCategory(v === 'all' ? null : v)
              setCurrentQuestionIndex(0)
              setSelectedAnswer('')
              setIsAnswered(false)
            }}>
              <TabsList className="w-full flex-wrap h-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                {categories.map(cat => (
                  <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {currentQuestion && (
              <Card className={cn(
                "p-6 space-y-6 border-l-4 transition-all",
                isAnswered && isCorrect && "border-l-success bg-success/5 bounce-in",
                isAnswered && !isCorrect && "border-l-destructive bg-destructive/5 shake"
              )}>
                <div>
                  <Badge 
                    className="mb-3"
                    style={{ 
                      backgroundColor: `color-mix(in oklch, ${grammarRules.find(r => r.id === currentQuestion.ruleId)?.color} 20%, transparent)`,
                      color: grammarRules.find(r => r.id === currentQuestion.ruleId)?.color
                    }}
                  >
                    {grammarRules.find(r => r.id === currentQuestion.ruleId)?.title}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2">
                    {currentQuestion.question}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Type: {currentQuestion.type.replace('-', ' ')}
                  </p>
                </div>

                <div className="space-y-4">
                  {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                    <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} disabled={isAnswered}>
                      <div className="space-y-2">
                        {currentQuestion.options.map((option, idx) => (
                          <div key={idx} className={cn(
                            "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer",
                            selectedAnswer === option && !isAnswered && "border-primary bg-primary/5",
                            isAnswered && option === currentQuestion.correctAnswer && "border-success bg-success/10",
                            isAnswered && selectedAnswer === option && option !== currentQuestion.correctAnswer && "border-destructive bg-destructive/10"
                          )}>
                            <RadioGroupItem value={option} id={`option-${idx}`} />
                            <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer font-medium">
                              {option}
                            </Label>
                            {isAnswered && option === currentQuestion.correctAnswer && (
                              <CheckCircle size={20} weight="fill" className="text-success" />
                            )}
                            {isAnswered && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                              <XCircle size={20} weight="fill" className="text-destructive" />
                            )}
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )}

                  {(currentQuestion.type === 'fill-blank' || currentQuestion.type === 'error-correction' || currentQuestion.type === 'sentence-construction') && (
                    <div className="space-y-2">
                      <Label htmlFor="answer-input">Your Answer:</Label>
                      <Input
                        id="answer-input"
                        value={selectedAnswer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        disabled={isAnswered}
                        placeholder="Type your answer here..."
                        className={cn(
                          "text-lg",
                          isAnswered && isCorrect && "border-success bg-success/5",
                          isAnswered && !isCorrect && "border-destructive bg-destructive/5"
                        )}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !isAnswered) {
                            handleAnswerSubmit()
                          }
                        }}
                      />
                    </div>
                  )}
                </div>

                {isAnswered && (
                  <Card className={cn(
                    "p-4 space-y-2",
                    isCorrect ? "bg-success/10 border-success" : "bg-warning/10 border-warning"
                  )}>
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle size={24} weight="fill" className="text-success flex-shrink-0 mt-0.5" />
                      ) : (
                        <Lightbulb size={24} weight="fill" className="text-warning flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-lg mb-1">
                          {isCorrect ? 'Correct! Well done!' : 'Not quite right'}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm mb-2">
                            <span className="font-medium">Correct answer:</span> {currentQuestion.correctAnswer}
                          </p>
                        )}
                        <p className="text-sm">{currentQuestion.explanation}</p>
                      </div>
                    </div>
                  </Card>
                )}

                <div className="flex gap-3">
                  {!isAnswered ? (
                    <Button 
                      onClick={handleAnswerSubmit} 
                      disabled={!selectedAnswer.trim()}
                      className="flex-1"
                      size="lg"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNextQuestion}
                      className="flex-1 gap-2"
                      size="lg"
                    >
                      Next Question
                      <ArrowRight size={18} weight="bold" />
                    </Button>
                  )}
                </div>
              </Card>
            )}
          </div>
        )}

        {currentView === 'study' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Grammar Rules Reference</h2>
              <p className="text-muted-foreground">
                Review all 13 essential English grammar rules for daily conversation.
              </p>
            </div>

            <Tabs defaultValue={categories[0]}>
              <TabsList className="w-full flex-wrap h-auto">
                {categories.map(cat => (
                  <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                ))}
              </TabsList>

              {categories.map(cat => (
                <TabsContent key={cat} value={cat} className="space-y-4 mt-6">
                  {grammarRules.filter(r => r.category === cat).map(rule => (
                    <Card 
                      key={rule.id}
                      className="p-6 border-l-4 hover:shadow-md transition-shadow"
                      style={{ borderLeftColor: rule.color }}
                    >
                      <div className="space-y-4">
                        <div>
                          <Badge 
                            className="mb-2"
                            style={{ 
                              backgroundColor: `color-mix(in oklch, ${rule.color} 20%, transparent)`,
                              color: rule.color
                            }}
                          >
                            {rule.category}
                          </Badge>
                          <h3 className="text-xl font-semibold mb-2">{rule.title}</h3>
                          <p className="text-muted-foreground">{rule.description}</p>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">Examples:</h4>
                          <ul className="space-y-2">
                            {rule.examples.map((example, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle size={18} weight="fill" className="text-success flex-shrink-0 mt-0.5" />
                                <span className="font-medium">{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {safeProgress.questionsPerRule[rule.id] && (
                          <div className="pt-4 border-t border-border">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Your Accuracy:</span>
                              <span className="font-semibold text-primary">
                                {getAccuracyForRule(rule.id)}% 
                                <span className="text-muted-foreground font-normal">
                                  {' '}({safeProgress.questionsPerRule[rule.id].correct}/{safeProgress.questionsPerRule[rule.id].total})
                                </span>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

        {currentView === 'progress' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Progress</h2>
              <p className="text-muted-foreground">
                Track your learning journey and identify areas for improvement.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{safeProgress.totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Total Questions</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-success mb-2">{safeProgress.correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-accent mb-2">
                  {safeProgress.totalQuestions > 0 ? Math.round((safeProgress.correctAnswers / safeProgress.totalQuestions) * 100) : 0}%
                </div>
                <div className="text-sm text-muted-foreground">Overall Accuracy</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Flame size={32} weight="fill" className="text-warning" />
                  <span className="text-4xl font-bold text-warning">{safeProgress.currentStreak}</span>
                </div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Performance by Grammar Rule</h3>
              <div className="space-y-4">
                {grammarRules.map(rule => {
                  const stats = safeProgress.questionsPerRule[rule.id]
                  const accuracy = getAccuracyForRule(rule.id)
                  
                  if (!stats || stats.total === 0) return null

                  return (
                    <div key={rule.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge 
                              variant="outline"
                              style={{ 
                                backgroundColor: `color-mix(in oklch, ${rule.color} 15%, transparent)`,
                                borderColor: rule.color,
                                color: rule.color
                              }}
                            >
                              {rule.category}
                            </Badge>
                            <span className="font-medium">{rule.title}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {stats.correct} correct out of {stats.total} questions
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={cn(
                            "text-2xl font-bold",
                            accuracy >= 80 ? "text-success" : accuracy >= 60 ? "text-warning" : "text-destructive"
                          )}>
                            {accuracy}%
                          </div>
                        </div>
                      </div>
                      <Progress 
                        value={accuracy} 
                        className="h-2"
                      />
                    </div>
                  )
                })}

                {Object.keys(safeProgress.questionsPerRule).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Target size={48} className="mx-auto mb-3 opacity-50" />
                    <p>Start practicing to see your performance stats!</p>
                  </div>
                )}
              </div>
            </Card>

            {Object.keys(safeProgress.questionsPerRule).length > 0 && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Areas to Improve</h3>
                <div className="space-y-3">
                  {grammarRules
                    .filter(rule => {
                      const accuracy = getAccuracyForRule(rule.id)
                      return accuracy > 0 && accuracy < 70
                    })
                    .sort((a, b) => getAccuracyForRule(a.id) - getAccuracyForRule(b.id))
                    .slice(0, 5)
                    .map(rule => (
                      <div key={rule.id} className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
                        <div>
                          <p className="font-medium">{rule.title}</p>
                          <p className="text-sm text-muted-foreground">{getAccuracyForRule(rule.id)}% accuracy</p>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSelectedCategory(rule.category)
                            setCurrentView('practice')
                          }}
                        >
                          Practice
                        </Button>
                      </div>
                    ))}
                  {grammarRules.filter(rule => {
                    const accuracy = getAccuracyForRule(rule.id)
                    return accuracy > 0 && accuracy < 70
                  }).length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                      <Trophy size={48} weight="fill" className="mx-auto mb-3 text-success" />
                      <p className="font-medium">Great job! All rules above 70% accuracy!</p>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        )}

        {currentView === 'generator' && (
          <QuestionGenerator />
        )}
      </main>
    </div>
  )
}

export default App
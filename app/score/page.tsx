"use client"

import PageBase from "@/components/layout/PageBase";
import BasicPageIntro from "@/components/ui/block/BasicPageIntro";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import CardHeader from "@/components/ui/card/CardHeader";
import TitleText from "@/components/ui/text/TitleText";
import { CALCULATE_STREAK_POINTS, CORRECT_AFTER_MISPLACED_POINTS, INSTANT_CORRECT_POINTS, INSTANT_GUESS_BONUS, POINTS_PER_STREAK_ITEM, SECOND_GUESS_BONUS, STREAK_THRESHOLD, JUST_A_GUESS_BONUS, MISPLACED_POINTS } from "@/features/score/score-constants";
import { ArrowLeft, Trophy, CheckCircle, AlertCircle, Circle, Target, Zap, TrendingUp } from "lucide-react";

const ScoringSystem = () => {
  const ScoreCard = ({ 
    icon: Icon, 
    title, 
    points, 
    description, 
    color = "blue" 
  }: {
    icon: any;
    title: string;
    points: number | string;
    description: string;
    color?: string;
  }) => (
    <div className={`bg-gradient-to-r from-${color}-50 to-${color}-100 border border-${color}-200 rounded-lg p-4`}>
      <div className="flex items-center space-x-3 mb-2">
        <div className={`bg-${color}-600 p-2 rounded-full`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <div className={`text-2xl font-bold text-${color}-600`}>+{points}</div>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );

  const ExampleRow = ({ 
    guess, 
    colors, 
    points, 
    explanation 
  }: {
    guess: string;
    colors: ('correct' | 'present' | 'absent')[];
    points: number;
    explanation: string;
  }) => (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-2">
        <div className="flex space-x-1">
          {guess.split('').map((letter, index) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded font-bold text-white ${
                colors[index] === 'correct' ? 'bg-success' :
                colors[index] === 'present' ? 'bg-warning' : 'bg-gray-400'
              }`}
            >
              {letter}
            </div>
          ))}
        </div>
        <div className="text-lg font-bold text-primary">+{points}</div>
      </div>
      <p className="text-sm text-gray-600">{explanation}</p>
    </div>
  );

  return (
    <PageBase>
      <div>
        <BasicPageIntro
          title="Scoring System"
          Icon={Trophy}
          subText="Understanding how points are calculated. Maybe you learn something. Maybe you dont."
        />

        <div className="space-y-8">
          {/* Base Points */}
          <Card>             
            <CardBody>
            <CardHeader>
                <Target className="w-6 h-6 text-blue-600" />
                <TitleText>Base Letter Points</TitleText>
            </CardHeader> 

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <ScoreCard
                  icon={CheckCircle}
                  title="Correct Position"
                  points={INSTANT_CORRECT_POINTS}
                  description="Letter is in the correct position"
                  color="green"
                />
                <ScoreCard
                  icon={AlertCircle}
                  title="Wrong Position"
                  points={MISPLACED_POINTS}
                  description="Letter is in the word but wrong position"
                  color="yellow"
                />
                <ScoreCard
                  icon={Circle}
                  title="Correct After Yellow"
                  points={CORRECT_AFTER_MISPLACED_POINTS}
                  description="Letter moves from yellow to green position"
                  color="blue"
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Example:</h4>
                <ExampleRow
                  guess="HOUSE"
                  colors={['correct', 'present', 'absent', 'correct', 'correct']}
                  points={5 + 2 + 0 + 5 + 5}
                  explanation="H(correct: +5), O(wrong position: +2), U(not in word: +0), S(correct: +5), E(correct: +5) = 17 points"
                />
              </div>
            </CardBody>
          </Card>

          {/* Speed Bonuses */}
          <Card>           
            <CardBody>
            <CardHeader>
                <Zap className="w-6 h-6 text-blue-600" />
                <TitleText>Speed Bonuses</TitleText>
            </CardHeader>  

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <ScoreCard
                  icon={Trophy}
                  title="First Guess"
                  points={INSTANT_GUESS_BONUS}
                  description="Solve the word on your first try"
                  color="purple"
                />
                <ScoreCard
                  icon={Trophy}
                  title="Second Guess"
                  points={SECOND_GUESS_BONUS}
                  description="Solve the word on your second try"
                  color="purple"
                />
                <ScoreCard
                  icon={Trophy}
                  title="Third Guess"
                  points={JUST_A_GUESS_BONUS}
                  description="Solve the word after round 2"
                  color="purple"
                />
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800 text-sm">
                  <strong>Pro tip:</strong> Speed bonuses are only awarded when you correctly guess the entire word. 
                  The faster you solve it, the bigger the bonus!
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Streak System */}
          <Card>            
            <CardBody>
            <CardHeader>
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <TitleText>Streak Bonuses</TitleText>
            </CardHeader>                  
              <div className="mb-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-orange-800 mb-2">How Streaks Work:</h4>
                  <ul className="space-y-2 text-sm text-orange-700">
                    <li>• Get letters correct in consecutive positions for the first time</li>
                    <li>• Streak starts after {STREAK_THRESHOLD} consecutive correct letters</li>
                    <li>• Earn +{POINTS_PER_STREAK_ITEM} point for each letter beyond the threshold</li>
                  </ul>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-semibold mb-3">Streak Examples:</h5>
                    <div className="space-y-2 text-sm">
                      <div>3 correct letters: +{CALCULATE_STREAK_POINTS(3)} points (no bonus yet)</div>
                      <div>4 correct letters: +{CALCULATE_STREAK_POINTS(4)} points</div>
                      <div>5 correct letters: +{CALCULATE_STREAK_POINTS(5)} points</div>
                      <div>6 correct letters: +{CALCULATE_STREAK_POINTS(6)} points</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-semibold mb-3">Streak Formula:</h5>
                    <div className="text-sm font-mono bg-white p-3 rounded border">
                      if (streak ≥ {STREAK_THRESHOLD}) {`{`}<br/>
                      &nbsp;&nbsp;bonus = (streak - {STREAK_THRESHOLD}) × {POINTS_PER_STREAK_ITEM}<br/>
                      {`}`}
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Score Calculation Example */}
          <Card> 
            <CardBody>
            <CardHeader>
                <TitleText>Scoring Example</TitleText>
            </CardHeader>                  
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Word: SPARK (solved in 2 guesses)</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium mb-2">Guess 1: SMART</h5>
                    <div className="flex space-x-1 mb-2">
                      {['S', 'M', 'A', 'R', 'T'].map((letter, index) => (
                        <div
                          key={index}
                          className={`w-10 h-10 flex items-center justify-center rounded font-bold text-white ${
                            ['S', 'A', 'R'].includes(letter) ? 'bg-green-600' : 
                            letter === 'M' ? 'bg-gray-400' : 'bg-gray-400'
                          }`}
                        >
                          {letter}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">S(+{INSTANT_CORRECT_POINTS}), M(+0), A(+{INSTANT_CORRECT_POINTS}), R(+{INSTANT_CORRECT_POINTS}), T(+0) = {3*INSTANT_CORRECT_POINTS } points</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Guess 2: SPARK ✓</h5>
                    <div className="flex space-x-1 mb-2">
                      {['S', 'P', 'A', 'R', 'K'].map((letter) => (
                        <div
                          key={letter}
                          className="w-10 h-10 flex items-center justify-center rounded font-bold text-white bg-green-600"
                        >
                          {letter}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">All correct: 2 x {INSTANT_CORRECT_POINTS} = {2*INSTANT_CORRECT_POINTS} points</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong>Base Points:</strong><br/>
                        15 + 25 = 40 pts
                      </div>
                      <div>
                        <strong>Speed Bonus:</strong><br/>
                        2nd guess = +{SECOND_GUESS_BONUS} pts
                      </div>
                      <div>
                        <strong>Final Score:</strong><br/>
                        <span className="text-2xl font-bold text-green-600">45 pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Pro Tips */}
          <Card>
            <CardBody>
            <CardHeader>
                <TitleText>💡 Tips</TitleText>
            </CardHeader>                 
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                    <strong className="text-blue-800">Speed is King</strong>
                    <p className="text-sm text-blue-700 mt-1">Solving words quickly gives massive bonuses. Sometimes it's better to make an educated guess early!</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-3">
                    <strong className="text-green-800">Build Streaks</strong>
                    <p className="text-sm text-green-700 mt-1">Focus on getting consecutive letters right to activate streak bonuses.</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-purple-50 border-l-4 border-purple-400 p-3">
                    <strong className="text-purple-800">Yellow Letters Count</strong>
                    <p className="text-sm text-purple-700 mt-1">Don't ignore yellow letters! They still give you 2 points each.</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-400 p-3">
                    <strong className="text-orange-800">Strategic Guessing</strong>
                    <p className="text-sm text-orange-700 mt-1">Use common letters early to maximize your chances of getting points.</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>        
    </PageBase>
  );
};

export default ScoringSystem;
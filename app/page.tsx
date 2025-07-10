import PageBase from "@/components/layout/PageBase";
import Button from "@/components/ui/Button";
import { APP_NAME } from "@/lib/global-constants";
import { Brain, Play, Sparkles, Trophy, Users2 } from "lucide-react";

export default function Home() {
  return (
    <PageBase>
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-bounce" />
      <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-green-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="mb-8">
          {/* Fun badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-6 border border-blue-200">
            <Sparkles className="w-4 h-4 mr-2" />
              Very fun! ... I HOPE!
            <Sparkles className="w-4 h-4 ml-2" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
            {APP_NAME}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-semibold">
            The Ultimate Word Guessing Challenge
          </p>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Guess the hidden word letter by letter using strategy and deduction. 
            Each guess reveals clues - green for correct position, yellow for wrong position, 
            gray for letters not in the word. Can you solve it in the fewest attempts?
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <div>
            <Button variant="primary">
             <Play className="w-5 h-5 mr-2" />
              Start Guessing Words
            </Button>
          </div>
            <Button variant="skeleton">
             <Trophy className="w-5 h-5 mr-2" />
              Scoring System
            </Button>
          </div>
        </div>

        {/* Fun stats section */}
        <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">20.000+</div>
            <div className="text-sm text-gray-600">Words Guessed</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-sm">
            <div className="text-2xl font-bold text-purple-600">Some</div>
            <div className="text-sm text-gray-600">Players</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-sm">
            <div className="text-2xl font-bold text-green-600">101%</div>
            <div className="text-sm text-gray-600">Fun Rate</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/20 shadow-sm">
            <div className="text-2xl font-bold text-orange-600">★★★★★</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
        </div>

        {/* Enhanced game preview */}
        <div className="mb-12 bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border-2 border-gray-100 transform hover:scale-105 transition-all duration-300">
          <div className="space-y-3">
            <div className="flex justify-center space-x-1">
              {['W', 'O', 'R', 'L', 'D'].map((letter, index) => (
                <div key={index} className={`
                  w-12 h-12 border-2 rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-500
                  ${index === 0 ? 'bg-green-100 border-green-400 text-green-800 animate-pulse' : 
                    index === 4 ? 'bg-yellow-100 border-yellow-400 text-yellow-800 animate-pulse' : 
                    'bg-gray-100 border-gray-300 text-gray-600'}
                `} style={{ animationDelay: `${index * 0.1}s` }}>
                  {letter}
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700 font-medium">
                🎯 W is perfect! D is in the word but wrong spot.
              </p>
            </div>
          </div>
        </div>
        
        {/* Enhanced feature grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Brain className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Strategic Thinking</h3>
            <p className="text-gray-600 leading-relaxed">Use clues from each guess to narrow down the hidden word with smart letter choices and logical deduction</p>
          </div>
          <div className="text-center group">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Trophy className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Score & Compete</h3>
            <p className="text-gray-600 leading-relaxed">Earn points for solving words quickly with fewer guesses. Climb leaderboards and challenge friends!</p>
          </div>
          <div className="text-center group">
            <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Users2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Play Together</h3>
            <p className="text-gray-600 leading-relaxed">Solo practice, multiplayer battles, daily challenges, and tournaments with players worldwide</p>
          </div>
        </div>

        {/* Call to action section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">Ready to Test Your Word Skills?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of players who are already addicted to the most engaging word guessing game ever created!
          </p>
        </div>
    </PageBase>
  );
}

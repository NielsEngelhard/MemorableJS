import ExampleGameShowCase from "@/components/layout/ExampleGameShowCase";
import PageBase from "@/components/layout/PageBase";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import FeatureHighlight from "@/components/ui/FeatureHighlight";
import { APP_NAME } from "@/lib/global-constants";
import { GAME_MODES_ROUTE, SCORE_EXPLANATION_ROUTE } from "@/lib/routes";
import { Brain, BrainIcon, Play, Sparkles, Trophy, Users2 } from "lucide-react";
import Link from "next/link";

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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
            {APP_NAME}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-semibold">
            Solo Practice • Multiplayer Battles • Daily Challenges
          </p>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            It’s always the right time for the right word. It really is. Really!
          </p>
        </div>    

        {/* Big Play Now Button */}
        <div className="mb-16 flex justify-center">
          <Button variant="primary" className="px-20 py-4">
            <Play className="w-6 h-6 mr-3" />
            Play Now
          </Button>
        </div>

        {/* Enhanced game preview */}
        <div className="mb-12">
          <ExampleGameShowCase />
        </div>

        {/* App capabilities section */}
        <div className="mb-12 max-w-md mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600">100.000+</div>
            <div className="text-lg text-gray-700 font-medium">Unique Words</div>
            <div className="text-sm text-gray-600">Across 12 Languages</div>
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
      </div>
    </PageBase>    
  );
}

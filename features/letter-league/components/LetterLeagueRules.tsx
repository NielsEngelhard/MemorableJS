export default function LetterLeagueRules() {
    return (
    <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-3">How to Play</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
                <h4 className="font-medium text-gray-900 mb-2">Basic Rules</h4>
                <ul className="space-y-1">
                    <li>• Guess the word letter by letter</li>
                    <li>• Green: correct letter in correct position</li>
                    <li>• Yellow: correct letter in wrong position</li>
                    <li>• Gray: letter not in the word</li>
                </ul>
            </div>
            <div>
                <h4 className="font-medium text-gray-900 mb-2">Scoring</h4>
                <ul className="space-y-1">
                <li>• Fewer attempts = higher score</li>
                <li>• Bonus points for speed</li>
                <li>• Daily challenges offer special rewards</li>
                <li>• Multiplayer wins boost your ranking</li>
                </ul>
            </div>
        </div>
    </div>
    )
}
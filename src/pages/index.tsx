import { PuzzleDetails, AdventCalendar } from '@/components'

const SNOWFLAKES = [
    '\u2744',
    '\u2745',
    '\u2746',
    '\u2744',
    '\u2745',
    '\u2746',
    '\u2744',
    '\u2745',
    '\u2746',
    '\u2744',
    '\u2745',
    '\u2746',
    '\u2744',
    '\u2745',
    '\u2746',
    '\u2744',
    '\u2745',
    '\u2746',
    '\u2744',
    '\u2745',
    '\u2746',
]
export const GITHUB_REPOSITORY_URL = 'https://github.com/cpl121/adventOfCode2024/blob/main/src/puzzles'

export default function Home() {
    const now = new Date()
    const currentDay = `${now.getDay() + 1} / ${now.getMonth() + 1} / ${now.getFullYear()}`
    const isDatePassed = Date.now() < 1735081200000 // 25/12/2024

    return (
        <main className="flex flex-col items-center justify-center space-y-16">
            <div className="snowflakes" aria-hidden="true">
                {SNOWFLAKES.map((snow, index) => (
                    <div className="snowflake" key={`snow-${index}`}>
                        {snow}
                    </div>
                ))}
            </div>
            <div className="flex text-center flex-col space-y-8">
                <h1 className="text-3xl sm:text-4xl font-bold gold">Advent Of Code Calendar 2024</h1>
                {isDatePassed ? (
                    <span className="gold text-2xl">Current Day: {currentDay}</span>
                ) : (
                    <span className="gold text-2xl">The time is over</span>
                )}
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                <AdventCalendar />
                <PuzzleDetails />
            </div>
            <span>
                <a
                    className="border rounded-md px-4 py-2"
                    href={GITHUB_REPOSITORY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Link to my solutions
                </a>
            </span>
        </main>
    )
}

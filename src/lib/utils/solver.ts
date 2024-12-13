import { puzzle1, puzzle2, puzzle3, puzzle4, puzzle5, puzzle6 } from '@/puzzles'

const solvers = {
    1: puzzle1,
    2: puzzle2,
    3: puzzle3,
    4: puzzle4,
    5: puzzle5,
    6: puzzle6,
}

export function solvePuzzle(id: number, input: string): string[] {
    const solver = solvers[id as keyof typeof solvers]
    if (!solver) {
        return [`No solver found for puzzle: ${id}`]
    }
    return solver(input)
}

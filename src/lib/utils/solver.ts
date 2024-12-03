import { puzzle1, puzzle2 } from '@/puzzles'

const solvers = {
    1: puzzle1,
    2: puzzle2,
}

export function solvePuzzle(id: number, input: string): string[] {
    const solver = solvers[id as keyof typeof solvers]
    if (!solver) {
        return [`No solver found for puzzle: ${id}`]
    }
    return solver(input)
}

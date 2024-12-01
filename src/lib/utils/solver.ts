import { puzzle1 } from '@/puzzles'

const solvers = {
    1: puzzle1,
}

export function solvePuzzle(id: number, input: string): string[] {
    const solver = solvers[id as keyof typeof solvers]
    if (!solver) {
        return [`No solver found for puzzle: ${id}`]
    }
    return solver(input)
}

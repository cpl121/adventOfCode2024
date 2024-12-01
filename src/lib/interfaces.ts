export interface Path {
    key: string
    path: string
    input: string
}

export interface PuzzleProps {
    day: string
    puzzleDataPaths: Path[]
    solutions: string[]
}

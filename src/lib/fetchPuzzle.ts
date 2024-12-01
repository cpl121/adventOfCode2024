export async function fetchPuzzle(day: number): Promise<string> {
    try {
        const response = await fetch(`/puzzles/day${day}.txt`)
        if (!response.ok) {
            throw new Error(`Error fetching puzzle at day ${day}: ${response.statusText}`)
        }
        const text = await response.text()
        return text
    } catch (error) {
        console.error('Error loading puzzle:', error)
        throw error
    }
}

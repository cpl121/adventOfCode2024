import { chunkArray } from '@/lib'

export function puzzle1(input: string): string[] {
    const DATA = chunkArray(input)
    const splittedRows = splitInTwoLists(DATA)
    const result1 = challenge1(splittedRows)
    const splittedRows2 = splitInTwoLists(DATA)
    const result2 = challenge2(splittedRows2)

    return [String(result1), String(result2)]
}

function challenge1(splittedRows: number[][]) {
    const firstRowOrdered = orderLists(splittedRows[0])
    const secondRowOrdered = orderLists(splittedRows[1])
    const result = calculateDistance(firstRowOrdered, secondRowOrdered)
    return result
}

function challenge2(splittedRows: number[][]) {
    const scoreMapped = new Map<number, number>()
    const listLength = splittedRows[0].length
    let distance = 0
    for (let index = 0; index < listLength; index++) {
        const rowNumber = splittedRows[0][index]
        let score = 0

        if (scoreMapped.has(rowNumber)) {
            score = scoreMapped.get(rowNumber) ?? 0
        } else {
            score = calculateScore(rowNumber, splittedRows[1])
            scoreMapped.set(rowNumber, score)
        }
        distance += score
    }
    return distance
}

function calculateScore(rowNumber: number, secondList: number[]): number {
    const coincidences = secondList.filter((secondRowNumber) => secondRowNumber === rowNumber).length
    return rowNumber * coincidences
}

function splitInTwoLists(data: string[]): number[][] {
    const result: number[][] = [[], []]
    for (const element of data) {
        const row = element.split(' ')
        result[0].push(Number(row[0]))
        result[1].push(Number(row[3]))
    }
    return result
}

function orderLists(data: number[]): number[] {
    return data.sort((a, b) => a - b)
}

function calculateDistance(firstRow: number[], secondRow: number[]): number {
    const length = firstRow.length
    let distance = 0
    for (let index = 0; index < length; index++) {
        distance += Math.abs(firstRow[index] - secondRow[index])
    }
    return distance
}

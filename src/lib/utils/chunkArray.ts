export const chunkArray = (data: string): string[] => {
    let index = 0
    const arrayLength = data.length
    const tempArray: string[] = []
    const tempArray2: string[][] = [[]]
    let result: string[] = []
    let count = 0

    for (index = 0; index < arrayLength; index++) {
        const myChunk = data.slice(index, index + 1)
        if (myChunk) tempArray.push(myChunk)
    }

    for (const element of tempArray) {
        if (element === '\n') {
            count++
            tempArray2.push([])
            continue
        }
        tempArray2[count].push(element)
    }

    result = tempArray2.map((item) => item.join(''))

    return result
}

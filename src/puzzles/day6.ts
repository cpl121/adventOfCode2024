import { chunkArray } from '@/lib'


enum Orders {
    Up = '^',
    Down = 'v',
    Right = '>',
    Left = '<',
}

interface Path {
    map: string[][]
    position: number[]
    order: Orders
    prevValue: string
}

const DATA_LENGTH = new Map<string, number>()
let result_2 = 0

export function puzzle6(input: string): string[] {
    const DATA = chunkArray(input).map((data) => data.split(''))
    DATA_LENGTH.set('X', DATA.length)
    DATA_LENGTH.set('Y', DATA[0].length)
    result_2 = 0
    const result1 = challenge1(DATA)
    
    const DATA_2 = chunkArray(input).map((data) => data.split(''))
    const result2 = challenge2(DATA_2)    
    return [String(result1), String(result2)]
}

function challenge1(data: string[][]): number {
    let findTheExit = false
    const position = getInitialPosition(data)
    const order = getOrder(data, position)
    if (!order) return 0
    let pathToShare: Path = {
        map: data,
        position,
        order,
        prevValue: ''
    }
    while(!findTheExit) {
        pathToShare = getStepForward(pathToShare)
        if (checkFinish(pathToShare)) findTheExit = true
    }
    const result = countResult(pathToShare.map)    
    return result
}

function challenge2(data: string[][]): number {
    let findTheExit = false
    const position = getInitialPosition(data)
    const order = getOrder(data, position)
    if (!order) return 0
    let pathToShare: Path = {
        map: data,
        position,
        order,
        prevValue: ''
    }
    console.table(pathToShare.map);
    while(!findTheExit) {
        pathToShare = getStepForward_2(pathToShare)
        if (checkFinish(pathToShare)) findTheExit = true
    }

    console.table(pathToShare.map);
    countLoops(pathToShare.map)
    console.log("result_2", result_2);
    return result_2
}

function hasLimit(position: string, value: number, isIncreasing: boolean): boolean {
    const X_LENGTH = DATA_LENGTH.get('X') ?? 0
    const Y_LENGTH = DATA_LENGTH.get('Y') ?? 0
    if (position === 'X') {
        return !(isIncreasing ? value >= X_LENGTH : value < 0)
    } else {
        return !(isIncreasing ? value >= Y_LENGTH : value < 0)
    }
}

function countResult(data: string[][]): number {
    let result = 0
    for (const rows of data) {
        const numberX = rows.filter((row) => row === 'X')
        result += numberX.length
    }
    return result + 1 // Last position
}

function countLoops(data: string[][]): number {
    let result = 0
    for (let x = 0; x < data.length; x++) {
        const rows = data[x];
        for (let y = 0; y < rows.length; y++) {
            const character = rows[y];
            if (character !== '+') continue
            checkLoop(data, x, y, [x, y], Orders.Right, [[x, y]])
        }
    }
    // const hasLoop = checkLoop(data, 1, 4, [1, 4], Orders.Right, [[1,4]])
    // console.log("hasLoop", hasLoop);
    
    return result
}

function checkLoop(data: string[][], x: number, y: number, initialPosition: number[], order: Orders, vertices: number[][]): boolean {
    switch (order) {
        case Orders.Up:
            if (!hasLimit('X', x - 1, false) || vertices[3].length === 0) return false
            // if (initialPosition[0] === 4 && initialPosition[1] === 4) {
            //     console.log("hasLoop", x, y, initialPosition, vertices);
            // }
            if (x === initialPosition[0] && y === initialPosition[1]) {
                console.log("FINISH!!", vertices);
                result_2++
                return true
            }
            if (data[x - 1][y] === '|') {
                return checkLoop(data, x - 1, y, initialPosition, Orders.Up, vertices)
            }
            if (data[x - 1][y] === '+') {
                return checkLoop(data, x - 1, y, initialPosition, Orders.Up, vertices) 
            }
            
            return false
        case Orders.Down:
            if (!hasLimit('X', x + 1, true) || vertices[2]) return false
            if (data[x + 1][y] === '|') {
                return checkLoop(data, x + 1, y, initialPosition, Orders.Down, vertices)
            }
            if (data[x + 1][y] === '+') {
                const searchOtherOrder = checkLoop(data, x + 1, y, initialPosition, Orders.Left, [vertices[0], vertices[1], [x + 1, y]])
                const mayContinue = checkLoop(data, x + 1, y, initialPosition, Orders.Down, vertices)
                return mayContinue || searchOtherOrder
            }
            return false
        case Orders.Right:
            if (!hasLimit('Y', y + 1, true) || vertices[1]) return false
            if (data[x][y + 1] === '-') {
                return checkLoop(data, x, y + 1, initialPosition, Orders.Right, vertices)
            }
            if (data[x][y + 1] === '+') {
                const searchOtherOrder = checkLoop(data, x, y + 1, initialPosition, Orders.Down, [vertices[0], [x, y + 1]])
                const mayContinue = checkLoop(data, x, y + 1, initialPosition, Orders.Right, vertices)
                return mayContinue || searchOtherOrder
            }
            return false
        case Orders.Left:
            if (!hasLimit('Y', y - 1, false) || vertices[3]) return false
            if (data[x][y - 1] === '-') {
                return checkLoop(data, x, y - 1, initialPosition, Orders.Left, vertices)
            }
            if (data[x][y - 1] === '+') {
                const searchOtherOrder = checkLoop(data, x, y - 1, initialPosition, Orders.Up, [vertices[0], vertices[1], vertices[2], [x, y - 1]])
                const mayContinue = checkLoop(data, x, y - 1, initialPosition, Orders.Left, vertices)
                return mayContinue || searchOtherOrder
            }
            return false
    }

}

function getInitialPosition(DATA: string[][]): number[] {
    let result: number[] = []
    for (let index = 0; index < DATA.length; index++) {
        const rows = DATA[index];
        const initialIndex = rows.indexOf(Orders.Up)
        if (initialIndex >= 0) result = [index, initialIndex]
    }
    return result
}

function checkFinish({ position, order}: Path): boolean {
    switch (order) {
        case Orders.Up:
            if (!hasLimit('X', position[0] - 1, false)) return true
        case Orders.Down:
            if (!hasLimit('X', position[0] + 1, true)) return true
        case Orders.Right:
            if (!hasLimit('Y', position[1] + 1, true)) return true
        case Orders.Left:
            if (!hasLimit('Y', position[1] - 1, false)) return true
    }
    return false
}

function getStepForward({ map, position, order}: Path): Path {    
    switch (order) {
        case Orders.Up:
            if (hasLimit('X', position[0] - 1, false)) {
                const nextValue = map[position[0] - 1][position[1]]
                if (nextValue === '#') {
                    order = Orders.Right
                    map[position[0]][position[1]] = order
                } else {
                    map[position[0] - 1][position[1]] = Orders.Up
                    map[position[0]][position[1]] = 'X'
                    position = [position[0] - 1, position[1]]
                }
            }
            break
        case Orders.Down:
            if (hasLimit('X', position[0] + 1, true)) {
                const nextValue = map[position[0] + 1][position[1]]
                if (nextValue === '#') {
                    order = Orders.Left
                    map[position[0]][position[1]] = order
                } else {
                    map[position[0] + 1][position[1]] = Orders.Down
                    map[position[0]][position[1]] = 'X'
                    position = [position[0] + 1, position[1]]
                }
            }
            break
        case Orders.Right:
             if (hasLimit('Y', position[1] + 1, true)) {
                const nextValue = map[position[0]][position[1] + 1]
                if (nextValue === '#') {
                    order = Orders.Down
                    map[position[0]][position[1]] = order
                } else {
                    map[position[0]][position[1] + 1] = Orders.Right
                    map[position[0]][position[1]] = 'X'
                    position = [position[0], position[1] + 1]
                }
             }
            break
        case Orders.Left:
            if (hasLimit('Y', position[1] - 1, false)) {
                const nextValue = map[position[0]][position[1] - 1]
                if (nextValue === '#') {
                    order = Orders.Up
                    map[position[0]][position[1]] = order
                } else {
                    map[position[0]][position[1] - 1] = Orders.Left
                    map[position[0]][position[1]] = 'X'
                    position = [position[0], position[1] - 1]
                }
            }
            break
    }
    return { map, position, order, prevValue: '' }
}

function getStepForward_2({ map, position, order, prevValue }: Path): Path {
    let test = '' 
    switch (order) {
        case Orders.Up:
            if (hasLimit('X', position[0] - 1, false)) {
                const nextValue = map[position[0] - 1][position[1]]
                if (nextValue === '#') {
                    order = Orders.Right
                    if (hasLimit('Y', position[1] + 1, true)) {
                        map[position[0]][position[1]] = '+'
                        map[position[0]][position[1] + 1] = order
                        position = [position[0], position[1] + 1]
                    } else {
                        map[position[0]][position[1]] = order
                    }
                } else {
                    test = map[position[0] - 1][position[1]]
                    map[position[0] - 1][position[1]] = Orders.Up
                    map[position[0]][position[1]] = prevValue === '-' ? '+' : '|'
                    position = [position[0] - 1, position[1]]
                }
            }
            break
        case Orders.Down:
            if (hasLimit('X', position[0] + 1, true)) {
                const nextValue = map[position[0] + 1][position[1]]
                if (nextValue === '#') {
                    order = Orders.Left
                    if (hasLimit('Y', position[1] - 1, false)) {
                        map[position[0]][position[1]] = '+'
                        map[position[0]][position[1] - 1] = order
                        position = [position[0], position[1] - 1]
                    } else {
                        map[position[0]][position[1]] = order
                    }
                } else {
                    test = map[position[0] + 1][position[1]]
                    map[position[0] + 1][position[1]] = Orders.Down
                    map[position[0]][position[1]] = prevValue === '-' ? '+' : '|'
                    position = [position[0] + 1, position[1]]
                }
            }
            break
        case Orders.Right:
             if (hasLimit('Y', position[1] + 1, true)) {
                const nextValue = map[position[0]][position[1] + 1]
                if (nextValue === '#') {
                    order = Orders.Down
                    if (hasLimit('X', position[0] + 1, true)) {
                        map[position[0]][position[1]] = '+'
                        map[position[0] + 1][position[1]] = order
                        position = [position[0] + 1, position[1]]
                    } else {
                        map[position[0]][position[1]] = order
                    }
                } else {
                    test = map[position[0]][position[1] + 1]
                    map[position[0]][position[1] + 1] = Orders.Right
                    map[position[0]][position[1]] = prevValue === '|' ? '+' : '-'
                    position = [position[0], position[1] + 1]
                }
             }
            break
        case Orders.Left:
            if (hasLimit('Y', position[1] - 1, false)) {
                const nextValue = map[position[0]][position[1] - 1]
                if (nextValue === '#') {
                    order = Orders.Up
                    if (hasLimit('X', position[0] - 1, false)) {
                        map[position[0]][position[1]] = '+'
                        map[position[0] - 1][position[1]] = order
                        position = [position[0] - 1, position[1]]
                    } else {
                        map[position[0]][position[1]] = order
                    }
                } else {
                    test = map[position[0]][position[1] - 1]
                    map[position[0]][position[1] - 1] = Orders.Left
                    map[position[0]][position[1]] = prevValue === '|' ? '+' : '-'
                    position = [position[0], position[1] - 1]
                }
            }
            break
    }
    prevValue = test
    return { map, position, order, prevValue }
}

function getOrder(data: string[][], position: number[]): Orders | null {
    const positionValue = data[position[0]][position[1]]
    switch (positionValue) {
        case Orders.Up:
            return Orders.Up
        case Orders.Down:
            return Orders.Down 
        case Orders.Right:
            return Orders.Right
        case Orders.Left:
            return Orders.Left
        default:
            return null
    }
}
//https://www.geeksforgeeks.org/find-the-number-of-islands-using-dfs/

function createMatrix(row, col) {
    let matrix = new Array()
    for (let i = 0; i < row; i++) {
       let entries = new Array(col).fill(0)
        matrix.push(entries)
    }
    return matrix
}

function convertBoardIntoBinary(board) {
    const boardMatrix = board.boardMatrix
    const rowLen = boardMatrix.length
    const colLen = boardMatrix[0].length
    let binaryBoard = createMatrix(rowLen,colLen)

    for(let i = 0; i < rowLen; i++) {
        const row = boardMatrix[i]
        for(let j = 0; j < colLen; j++) {
            const cell = row[j]
            if(!cell.isEmpty()) binaryBoard[i][j] = 1
        }
    }
    return binaryBoard
}

export function isBoardContinuous(board) {
    let isBoardContinuous = false
    let binaryBoard = convertBoardIntoBinary(board)
    const numIslands = countIslands(binaryBoard)
    if(numIslands == 1) isBoardContinuous = true
    return isBoardContinuous
}

// Javascript Program to count islands in boolean 2D matrix

// A utility function to do DFS for a 2D
// boolean matrix. It only considers
// the 8 neighbours as adjacent vertices
function DFS(M, i, j, ROW, COL) {
    // Base condition
    // if i less than 0 or j less than 0 or i greater than ROW-1 or j greater than COL- 
    // or if M[i][j] != 1 then we will simply return
    if (i < 0 || j < 0 || i > (ROW - 1) || j > (COL - 1) || M[i][j] != 1) return;

    if (M[i][j] == 1) {
        M[i][j] = 0;
        DFS(M, i + 1, j, ROW, COL);	 //right side traversal
        DFS(M, i - 1, j, ROW, COL);	 //left side traversal
        DFS(M, i, j + 1, ROW, COL);	 //upward side traversal
        DFS(M, i, j - 1, ROW, COL);	 //downward side traversal
        DFS(M, i + 1, j + 1, ROW, COL); //upward-right side traversal //can't skip these
        DFS(M, i - 1, j - 1, ROW, COL); //downward-left side traversal
        DFS(M, i + 1, j - 1, ROW, COL); //downward-right side traversal //can't skip these
        DFS(M, i - 1, j + 1, ROW, COL); //upward-left side traversal
    }
}

function countIslands(M) {
    let ROW = M.length;
    let COL = M[0].length;
    let count = 0;
    for (let i = 0; i < ROW; i++) {
        for (let j = 0; j < COL; j++) {
            if (M[i][j] == 1) {
                count++;
                DFS(M, i, j, ROW, COL); //traversal starts from current cell
            }
        }
    }
    return count;
}
        
export default isBoardContinuous

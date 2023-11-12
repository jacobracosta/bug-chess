//https://www.geeksforgeeks.org/find-the-number-of-islands-using-dfs/

// Javascript Program to count islands in boolean 2D matrix

// A utility function to do DFS for a 2D
// boolean matrix. It only considers
// the 8 neighbours as adjacent vertices
function DFS(M, i, j, ROW, COL) {
    // Base condition
    // if i less than 0 or j less than 0 or i greater than ROW-1 or j greater than COL- 
    // or if M[i][j] != 1 then we will simply return
    if (i < 0 || j < 0 || i > (ROW - 1) || j > (COL - 1) || M[i][j] != 1) return;

    if (M[i][j] == 1) { //call cell state isempty here
        M[i][j] = 0;
        DFS(M, i + 1, j, ROW, COL);	 //right side traversal
        DFS(M, i - 1, j, ROW, COL);	 //left side traversal
        DFS(M, i, j + 1, ROW, COL);	 //upward side traversal
        DFS(M, i, j - 1, ROW, COL);	 //downward side traversal
        //DFS(M, i + 1, j + 1, ROW, COL); //upward-right side traversal
        DFS(M, i - 1, j - 1, ROW, COL); //downward-left side traversal
        //DFS(M, i + 1, j - 1, ROW, COL); //downward-right side traversal
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

let M = [[1, 1, 0, 0, 0],
        [0, 1, 0, 0, 1],
        [1, 0, 0, 1, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1]];

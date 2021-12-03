const { max, random, round } = Math;

const randomMatrix = (dim, left, right) => {
    const matrix = [];
    for (let i = 0; i < dim; ++i) {
        matrix.push([]);
        for (let j = 0; j < dim; ++j) {
            const v1 = round(random() * (right - left) + left);
            const v2 = round(random() * (right - left) + left);
            matrix[i].push([v1, v2]);
        }
    }

    return matrix;
};

const isParetoOptimal = (matrix, row, column) => {
    for (let i = 0; i < matrix.length; ++i) {
        for (let j = 0; j < matrix[0].length; ++j) {
            if (
                (matrix[i][j][0] > matrix[row][column][0] &&
                    matrix[i][j][1] >= matrix[row][column][1]) ||
                (matrix[i][j][1] > matrix[row][column][1] &&
                    matrix[i][j][0] >= matrix[row][column][0])
            )
                return false;
        }
    }
    return true;
};

const Pareto = (matrix) => {
    const paretoMatrix = [];
    for (let i = 0; i < matrix.length; ++i) {
        for (let j = 0; j < matrix[0].length; ++j) {
            if (isParetoOptimal(matrix, i, j)) paretoMatrix.push(matrix[i][j]);
        }
    }

    return paretoMatrix;
};

const Nesh = (matrix) => {
    const result = [];
    for (let i = 0; i < matrix.length; ++i) {
        for (let j = 0; j < matrix[0].length; ++j) {
            if (
                matrix[i][j][0] >= max(...matrix.map((m) => m[j][0])) &&
                matrix[i][j][1] >=
                    max(...matrix.map((m) => m.map((row) => row[1]))[i])
            ) {
                result.push(matrix[i][j]);
            }
        }
    }

    return result;
};

const intersection = (a, b) => {
    return a.filter(([v1, v2]) => {
        return b.find(([v3, v4]) => v1 === v3 && v2 === v4);
    });
};

const m = randomMatrix(10, -99, 99);
const random_matrix_nash = Nesh(m);
const random_matrix_pareto = Pareto(m);

console.log(random_matrix_nash);
console.log(random_matrix_pareto);
console.log(intersection(random_matrix_pareto, random_matrix_nash));

// p - Перекресток
// s - Семейный спор
// d - Дилемма

export { randomMatrix, Pareto, Nesh, intersection };

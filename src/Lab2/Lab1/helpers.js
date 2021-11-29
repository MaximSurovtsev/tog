const { min, max, random, round } = Math;
const epsilon = (u, l) => min(...u) - max(...l);
// const transpose = (m) => m[0].map((_, i) => m.map((x) => x[i]));
const minmax = (m) => min(...m.map((row) => max(...row)));
const maxmin = (m) => max(...m.map((row) => min(...row)));
const sumArr = (a, b) => a.map((_, i) => a[i] + b[i]);

const nextStrategy = (row, value) => {
    const r = row.map((v, i) => ({ v, i })).filter((e) => e.v === value);
    return r[round(random() * (r.length - 1))].i;
};
const cost = (u, l) => (min(...u) + max(...l)) / 2;
const optimal = (strs, iters) => {
    return strs.map((_, i) => {
        return (strs.filter((v) => v === i).length / iters).toFixed(2);
    });
};

const algorithm = (m) => {
    const tm = transpose(m),
        mima = minmax(m),
        mami = maxmin(tm);

    if (mima === mami) {
        console.log();
        return [];
    }

    const { max, min, round, random } = Math;

    let str_a = round(random() * 2);
    let str_b = round(random() * 2);

    let strs_a = [str_a],
        strs_b = [str_b],
        uppers = [],
        lowers = [],
        winning_A = tm[str_a],
        losing_B = m[str_b];

    let E = 0.1,
        iterations = 1,
        eps = 1;

    const result = [
        [
            iterations,
            str_a + 1,
            str_b + 1,
            winning_A,
            losing_B,
            max(...winning_A).toFixed(3),
            min(...losing_B).toFixed(3),
            eps.toFixed(3)
        ]
    ];

    while (eps > E) {
        let max_value = max(...winning_A),
            min_value = min(...losing_B),
            upper = max_value / iterations,
            lower = min_value / iterations;

        uppers.push(upper);
        lowers.push(lower);

        eps = epsilon(uppers, lowers);

        str_a = nextStrategy(winning_A, max_value);
        str_b = nextStrategy(losing_B, min_value);

        strs_a.push(str_a);
        strs_b.push(str_b);

        winning_A = sumArr(winning_A, tm[str_b]);
        losing_B = sumArr(losing_B, m[str_a]);

        iterations += 1;
        if (iterations > 10000) {
            console.log("More 10000 iterations");
            break;
        }

        result.push([
            iterations,
            str_a + 1,
            str_b + 1,
            winning_A,
            losing_B,
            lower.toFixed(3),
            upper.toFixed(3),
            eps.toFixed(3)
        ]);
    }

    const V = cost(uppers, lowers).toFixed(3),
        X = optimal(strs_a, iterations).slice(0, 3).join(" "),
        Y = optimal(strs_b, iterations).slice(0, 3).join(" ");
    return [result, V, X, Y, mima, mami];
};

export {
    epsilon,
    transpose,
    minmax,
    maxmin,
    sumArr,
    nextStrategy,
    cost,
    optimal,
    algorithm
};

const a = -3,
    b = 1.5,
    c = 2.5,
    d = -4,
    e = -2.2,
    k = 3;

const H = (x, y) => a * x ** 2 + b * y ** 2 + c * x * y + d * x + e * y;

const makeTable = (n) => {
    const table = [];
    for (let i = 0; i <= n; ++i) {
        const row = [];
        for (let j = 0; j <= n; ++j) {
            row.push(H(i/n, j/n));
        }
        table.push(row);
    }
};

const transpose = (m) => m[0].map((_, i) => m.map((x) => x[i]));
const minMaxIndexes = (table, dim) => {
    const ttable = transpose(table);
    let minmax_i = 0, minmax_j = 0;
    let minmax = max(ttable[0])
    let max_value, max_value_j;

    for (let i = 0; i <= dim; ++i) {
        max_value = matrix[i][0]
        max_value_j = 0
        for (let j = 0; j <= dim; ++j) {
            if (max_value < matrix[i][j]) {
                max_value = matrix[i][j]
                max_value_j = j
            }
        }

        if (max_value <= minmax) {
            minmax = max_value
            minmax_i = i
            minmax_j = max_value_j
        }
}


// def calcMinmaxIndexes(matrix, dimension):
//     matrix = transposedMatrix(matrix)
//     minmax_i, minmax_j = 0, 0
//     minmax = max(matrix[0])
    // for i in range(dimension):
    //     max_value = matrix[i][0]
    //     max_value_j = 0
    //     for j in range(dimension):
    //         if max_value < matrix[i][j]:
    //             max_value = matrix[i][j]
    //             max_value_j = j

    //     if max_value <= minmax:
    //         minmax = max_value
    //         minmax_i = i
    //         minmax_j = max_value_j
//     return (minmax_j, minmax_i)

// def printMatrix(matrix):
//     for row in matrix:
//         for el in row:
//             print(f"{el:>6.2f}", end=" | ")
//         print()






// def calcMaxminIndexes(matrix, dimension):
//     maxmin_i, maxmin_j = 0, 0
//     maxmin = min(matrix[0])
//     for i in range(dimension):
//         min_value = matrix[i][0]
//         min_value_j = 0
//         for j in range(dimension):
//             if min_value > matrix[i][j]:
//                 min_value = matrix[i][j]
//                 min_value_j = j

//         if min_value >= maxmin:
//             maxmin = min_value
//             maxmin_i = i
//             maxmin_j = min_value_j
//     return (maxmin_i, maxmin_j)

// def calcMinmax(matrix):
//     return min(map(lambda row: max(row), matrix))

// def calcMaxmin(matrix):
//     return max(map(lambda row: min(row), matrix))

// def sumOfRows(row1, row2):
//     return list(map(lambda n1, n2: n1 + n2, row1, row2))

// def nextStrategy(row, value):
//     if row.count(value) == 1:
//         return row.index(value)

//     return choice([i for i in range(len(row)) if row[i] == value])

// def calcOptimalStrategy(strategys, iterations):
//     return list(map(lambda value: strategys.count(value) / iterations,
//                     range(len(strategys))))

// def epsilon(upper_bounds, lower_bounds, k):
//     index = len(upper_bounds) - (k + 1)
//     return min(upper_bounds[index:]) - max(lower_bounds[index:])

// def bR(matrix, dimension):
//     t_matrix = transposedMatrix(matrix)
//     minmax = calcMinmax(t_matrix)
//     maxmin = calcMaxmin(matrix)

//     strategy_A = randint(0, dimension - 1)
//     strategy_B = randint(0, dimension - 1)

//     strategys_A = [strategy_A]
//     strategys_B = [strategy_B]

//     upper_bounds = []
//     lower_bounds = []

//     winning_A = t_matrix[strategy_A]
//     losing_B = matrix[strategy_B]

//     E = 0.01
//     iterations = 1
//     eps = 1

//     while eps > E:
//         max_value = max(winning_A)
//         min_value = min(losing_B)

//         upper_bound = max_value / iterations
//         lower_bound = min_value / iterations

//         upper_bounds.append(upper_bound)
//         lower_bounds.append(lower_bound)

//         eps = epsilon(upper_bounds, lower_bounds, k)

//         strategy_A = nextStrategy(winning_A, max_value)
//         strategy_B = nextStrategy(losing_B, min_value)

//         strategys_A.append(strategy_A)
//         strategys_B.append(strategy_B)
//         winning_A = sumOfRows(winning_A, t_matrix[strategy_B])
//         losing_B = sumOfRows(losing_B, matrix[strategy_A])

//         iterations += 1
//         if iterations > 10000:
//             print("More 10000 iterations")
//             return

//     stA = calcOptimalStrategy(strategys_A, iterations)
//     stB = calcOptimalStrategy(strategys_B, iterations)

//     indexA = stA.index(max(stA))
//     indexB = stB.index(max(stB))

//     print(f"x = {indexA / dimension:<6.3f} y = {indexB / dimension:<6.3f}" +
//           f" H = {matrix[indexA][indexB]:<6.3f}")

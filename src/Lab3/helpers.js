import SimpleSimplex from "simple-simplex";

const { min, max, random, round } = Math;
const solver = new SimpleSimplex({
    objective: {
        a: 70,
        b: 210,
        c: 140
    },
    constraints: [
        {
            namedVector: { a: 1, b: 1, c: 1 },
            constraint: "<=",
            constant: 100
        },
        {
            namedVector: { a: 5, b: 4, c: 4 },
            constraint: "<=",
            constant: 480
        },
        {
            namedVector: { a: 40, b: 20, c: 30 },
            constraint: "<=",
            constant: 3200
        }
    ],
    optimizationType: "max"
});

const result = solver.solve({
    methodName: "simplex"
});

console.log({
    solution: result.solution,
    isOptimal: result.details.isOptimal
});

const t = `6 18 5,17 13 15,9 13 19`
    .split(",")
    .map((row) => row.split(" ").map((e) => +e));

const transpose = (m) => m[0].map((_, i) => m.map((x) => x[i]));
const randomValue = (bound) => round(random() * bound);

const tt = transpose(t);

const bR = (table, n) => {
    const strategy = randomValue(n - 1);
    console.log(`Начальная стратегия: ${strategy + 1}`);

    const x = Array.from("0".repeat(n)).map((e) => +e);
    x[strategy] = 1;
    let c = table[strategy],
        alpha = [1, 1],
        iteration = 0;

    while (alpha.indexOf(0) === -1) {
        iteration += 1
        console.log(`Итерация ${iteration}`);
    }
};

// def braunRobinson(matrix, n):
//     # случайная стратегия
//     strategy = randint(0, n-1)

//     print(f"Начальная стратегия: {strategy + 1}")

//     # Начальные значения для векторов x и c
//     x = np.zeros(n)
//     x[strategy] = 1
//     c = matrix[strategy]

//     alpha = np.ones(2)

// iteration = 0

// while alpha[0] != 0 and alpha[1] != 0:
//     iteration += 1
//     print(f"Итерация {iteration}")

//     lowwer_bound = c.min()
//     J = np.where(lowwer_bound == c)[1]
//     print(f"Нижняя граница: {lowwer_bound:.3f}")

//     # Подматрица со столбцами из J
//     A = matrix[:, J]
//     print("A")
//     print(A)

//     # Найти оптимальное решение для A_i
//     if 1 in A.shape:
//         x_stroke = np.zeros(matrix.shape[1])
//         x_stroke[A.argmax()] = 1
//     else:
//         simplex_solver = simplex(A)
//         x_stroke = simplex_solver.x / simplex_solver.fun

//     # Вычисляем с
//     c_stroke = np.zeros((1, matrix.shape[0]))

//     for index in range(len(x_stroke)):
//         c_stroke += x_stroke[index] * matrix[index]

//     print(f"~x = {x_stroke}")
//     print(f"~c = {c_stroke}")

//     # Решаем подыгру с матрицей (2 х n)
//     game = np.matrix([np.array(c).flatten(),
//                       np.array(c_stroke).flatten()])

//     simplex_solver = simplex(game)
//     alpha = simplex_solver.x / simplex_solver.fun

//     print(f"alpha = {alpha}")

//     # новые значения для x и c
//     x = alpha[0] * x + alpha[1] * x_stroke
//     c = alpha[0] * c + alpha[1] * c_stroke

//     print(f"x = {x}")
//     print(f"c = {c}")

//     print()

// print(f"Оптимальная стратегия игрока X: {x}")
// print(f"Цена игры: {lowwer_bound}")

// const epsilon = (u, l, k) => {
//     const index = u.length - (k + 1);
//     return min(...u.slice(index)) - max(...l.slice(index));
// };

// // const minmax = (m) => min(...m.map((row) => max(...row)));
// // const maxmin = (m) => max(...m.map((row) => min(...row)));
// const sumArr = (a, b) => a.map((_, i) => a[i] + b[i]);

// const nextStrategy = (row, value) => {
//     const r = row.map((v, i) => ({ v, i })).filter((e) => e.v === value);
//     return r[round(random() * (r.length - 1))].i;
// };

// const optimal = (strs, iters) => {
//     return strs.map((_, i) => {
//         return strs.filter((v) => v === i).length / iters;
//     });
// };

// const a = -10,
//     b = 40 / 3,
//     c = 40,
//     d = -16,
//     e = -32,
//     k = 3;

// const H = (x, y) => a * x ** 2 + b * y ** 2 + c * x * y + d * x + e * y;

// const makeTable = (n) => {
//     const table = [];
//     for (let i = 0; i <= n; ++i) {
//         const row = [];
//         for (let j = 0; j <= n; ++j) {
//             row.push(parseFloat(H(i / n, j / n).toFixed(3)));
//         }
//         table.push(row);
//     }

//     return table;
// };

// const minMaxIndexes = (table, dim) => {
//     const ttable = transpose(table);
//     let minmax_i = 0,
//         minmax_j = 0;
//     let minmax = max(...ttable[0]);
//     let max_value, max_value_j;

//     for (let i = 0; i < dim; ++i) {
//         max_value = ttable[i][0];
//         max_value_j = 0;
//         for (let j = 0; j < dim; ++j) {
//             if (max_value < ttable[i][j]) {
//                 max_value = ttable[i][j];
//                 max_value_j = j;
//             }
//         }

//         if (max_value <= minmax) {
//             minmax = max_value;
//             minmax_i = i;
//             minmax_j = max_value_j;
//         }
//     }
//     return [minmax_i, minmax_j];
// };

// const maxMinIndexes = (table, dim) => {
//     let maxmin_i = 0,
//         maxmin_j = 0;
//     let maxmin = min(...table[0]);
//     let min_value, min_value_j;

//     for (let i = 0; i < dim; ++i) {
//         min_value = table[i][0];
//         min_value_j = 0;
//         for (let j = 0; j < dim; ++j) {
//             if (min_value > table[i][j]) {
//                 min_value = table[i][j];
//                 min_value_j = j;
//             }
//         }

//         if (min_value >= maxmin) {
//             maxmin = min_value;
//             maxmin_i = i;
//             maxmin_j = min_value_j;
//         }
//     }

//     console.log("[maxmin_j, maxmin_i];", [maxmin_j, maxmin_i]);
//     return [maxmin_j, maxmin_i];
// };

// const bR = (table, dim) => {
//     const ttable = transpose(table);

//     let str_a = round(random() * 2);
//     let str_b = round(random() * 2);

//     let strs_a = [str_a],
//         strs_b = [str_b],
//         uppers = [],
//         lowers = [],
//         winning_A = ttable[str_a],
//         losing_B = table[str_b];

//     let E = 0.1,
//         iterations = 1,
//         eps = 1;

//     while (eps > E) {
//         let max_value = max(...winning_A),
//             min_value = min(...losing_B),
//             upper = max_value / iterations,
//             lower = min_value / iterations;

//         uppers.push(upper);
//         lowers.push(lower);

//         eps = epsilon(uppers, lowers, k);

//         str_a = nextStrategy(winning_A, max_value);
//         str_b = nextStrategy(losing_B, min_value);

//         strs_a.push(str_a);
//         strs_b.push(str_b);

//         winning_A = sumArr(winning_A, ttable[str_b]);
//         losing_B = sumArr(losing_B, table[str_a]);

//         iterations += 1;
//         if (iterations > 10000) {
//             console.log("More 10000 iterations");
//             break;
//         }
//     }

//     const stA = optimal(strs_a, iterations);
//     const stB = optimal(strs_b, iterations);

//     const iA = stA.indexOf(max(...stA));
//     const iB = stB.indexOf(max(...stB));

//     return `x = ${(iA / dim).toFixed(3)}, y = ${(iB / dim).toFixed(3)}, H = ${
//         table[iA][iB]
//     }`;
// };

// const algorithm = () => {
//     const result = [];

//     for (let i = 2; i < 11; ++i) {
//         const t = makeTable(i);

//         const [minmax_i, minmax_j] = minMaxIndexes(t, i + 1);
//         const [maxmin_i, maxmin_j] = maxMinIndexes(t, i + 1);

//         if (minmax_i === maxmin_i && minmax_j === maxmin_j) {
//             result.push({
//                 hasPoint: true,
//                 t,
//                 text: `n = ${i}, x = ${(minmax_i / i).toFixed(3)}, y = ${(
//                     minmax_j / i
//                 ).toFixed(3)}, H = ${t[minmax_i][minmax_j]}`
//             });
//         } else {
//             result.push({
//                 hasPoint: false,
//                 t,
//                 text: bR(t, i + 1)
//             });
//         }
//     }

//     return result;
// };

// export { algorithm };

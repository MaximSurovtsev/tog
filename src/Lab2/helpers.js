const { min, max, random, round } = Math;
const epsilon = (u, l, k) => {
    const index = u.length - (k + 1);
    return min(...u.slice(index)) - max(...l.slice(index));
};

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

// const algorithm = (m) => {
//     const tm = transpose(m),
//         mima = minmax(m),
//         mami = maxmin(tm);

//     if (mima === mami) {
//         console.log();
//         return [];
//     }

//     const { max, min, round, random } = Math;

//     let str_a = round(random() * 2);
//     let str_b = round(random() * 2);

//     let strs_a = [str_a],
//         strs_b = [str_b],
//         uppers = [],
//         lowers = [],
//         winning_A = tm[str_a],
//         losing_B = m[str_b];

//     let E = 0.1,
//         iterations = 1,
//         eps = 1;

//     const result = [
//         [
//             iterations,
//             str_a + 1,
//             str_b + 1,
//             winning_A,
//             losing_B,
//             max(...winning_A).toFixed(3),
//             min(...losing_B).toFixed(3),
//             eps.toFixed(3)
//         ]
//     ];

//     while (eps > E) {
//         let max_value = max(...winning_A),
//             min_value = min(...losing_B),
//             upper = max_value / iterations,
//             lower = min_value / iterations;

//         uppers.push(upper);
//         lowers.push(lower);

//         eps = epsilon(uppers, lowers);

//         str_a = nextStrategy(winning_A, max_value);
//         str_b = nextStrategy(losing_B, min_value);

//         strs_a.push(str_a);
//         strs_b.push(str_b);

//         winning_A = sumArr(winning_A, tm[str_b]);
//         losing_B = sumArr(losing_B, m[str_a]);

//         iterations += 1;
//         if (iterations > 10000) {
//             console.log("More 10000 iterations");
//             break;
//         }

//         result.push([
//             iterations,
//             str_a + 1,
//             str_b + 1,
//             winning_A,
//             losing_B,
//             lower.toFixed(3),
//             upper.toFixed(3),
//             eps.toFixed(3)
//         ]);
//     }

//     const V = cost(uppers, lowers).toFixed(3),
//         X = optimal(strs_a, iterations).slice(0, 3).join(" "),
//         Y = optimal(strs_b, iterations).slice(0, 3).join(" ");
//     return [result, V, X, Y, mima, mami];
// };

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
            row.push(H(i / n, j / n));
        }
        table.push(row);
    }

    return table;
};

const transpose = (m) => m[0].map((_, i) => m.map((x) => x[i]));
const minMaxIndexes = (table, dim) => {
    const ttable = transpose(table);
    let minmax_i = 0,
        minmax_j = 0;
    let minmax = max(...ttable[0]);
    let max_value, max_value_j;

    for (let i = 0; i <= dim - 1; ++i) {
        max_value = ttable[i][0];
        max_value_j = 0;
        for (let j = 0; j <= dim; ++j) {
            if (max_value < ttable[i][j]) {
                max_value = ttable[i][j];
                max_value_j = j;
            }
        }

        if (max_value <= minmax) {
            minmax = max_value;
            minmax_i = i;
            minmax_j = max_value_j;
            console.log(minmax)
        }
    }
    return [minmax_i, minmax_j];
};

const maxMinIndexes = (table, dim) => {
    let maxmin_i = 0,
        maxmin_j = 0;
    let maxmin = min(...table[0]);
    let min_value, min_value_j;

    for (let i = 0; i <= dim - 1; ++i) {
        min_value = table[i][0];
        min_value_j = 0;
        for (let j = 0; j <= dim; ++j) {
            if (min_value > table[i][j]) {
                min_value = table[i][j];
                min_value_j = j;
            }
        }

        if (min_value >= maxmin) {
            maxmin = min_value;
            maxmin_i = i;
            maxmin_j = min_value_j;
        }
    }
    return [maxmin_j, maxmin_i];
};

const randomValue = (bound) => round(random() * bound);

const bR = (table, dim) => {
    const ttable = transpose(table);
    const mima = minmax(ttable);
    const mami = maxmin(table);

    let str_a = round(random() * 2);
    let str_b = round(random() * 2);

    let strs_a = [str_a],
        strs_b = [str_b],
        uppers = [],
        lowers = [],
        winning_A = ttable[str_a],
        losing_B = table[str_b];

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

        eps = epsilon(uppers, lowers, k);

        str_a = nextStrategy(winning_A, max_value);
        str_b = nextStrategy(losing_B, min_value);

        strs_a.push(str_a);
        strs_b.push(str_b);

        winning_A = sumArr(winning_A, ttable[str_b]);
        losing_B = sumArr(losing_B, table[str_a]);

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

const algorithm = () => {
    for (let i = 2; i < 11; ++i) {
        const t = makeTable(i);
        console.log(t)
        const [minmax_i, minmax_j] = minMaxIndexes(t, i + 1);
        const [maxmin_i, maxmin_j] = maxMinIndexes(t, i + 1);

        if (minmax_i === maxmin_i && minmax_j === maxmin_j) {
            console.log("Есть седловая точка");
            console.log(
                `x = ${minmax_i / i} y = ${minmax_j / i} H = ${
                    t[minmax_i][minmax_j]
                }`
            );
        } else {
            // console.log(bR(t, i + 1))
        }
    }
};

// def main():
//     for n in range(2, 11):
//         print(f"n = {n}")

//         C = createMatrix(n)
//         printMatrix(C)

//         minmax = calcMinmaxIndexes(C, n+1)
//         maxmin = calcMaxminIndexes(C, n+1)

//         if minmax == maxmin:
//             print("Есть седловая точка")
//             i, j = minmax
//             print(f"x = {i / n:<6.3f} y = {j / n:<6.3f} H = {C[i][j]:<6.3f}")
//         else:
//             print(bR(C, n+1))
//         print()

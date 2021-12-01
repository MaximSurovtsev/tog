const { min, max, random, round } = Math;

const epsilon = (u, l, k) => {
    const index = u.length - (k + 1);
    return min(...u.slice(index)) - max(...l.slice(index));
};

// const minmax = (m) => min(...m.map((row) => max(...row)));
// const maxmin = (m) => max(...m.map((row) => min(...row)));
const sumArr = (a, b) => a.map((_, i) => a[i] + b[i]);

const nextStrategy = (row, value) => {
    const r = row.map((v, i) => ({ v, i })).filter((e) => e.v === value);
    return r[round(random() * (r.length - 1))].i;
};

const optimal = (strs, iters) => {
    return strs.map((_, i) => {
        return (strs.filter((v) => v === i).length / iters);
    });
};

const a = -10,
    b = 40 / 3,
    c = 40,
    d = -16,
    e = -32,
    k = 3;

const H = (x, y) => a * x ** 2 + b * y ** 2 + c * x * y + d * x + e * y;

const makeTable = (n) => {
    const table = [];
    for (let i = 0; i <= n; ++i) {
        const row = [];
        for (let j = 0; j <= n; ++j) {
            row.push(parseFloat(H(i / n, j / n).toFixed(3)));
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

    for (let i = 0; i < dim; ++i) {
        max_value = ttable[i][0];
        max_value_j = 0;
        for (let j = 0; j < dim; ++j) {
            if (max_value < ttable[i][j]) {
                max_value = ttable[i][j];
                max_value_j = j;
            }
        }

        if (max_value <= minmax) {
            minmax = max_value;
            minmax_i = i;
            minmax_j = max_value_j;
        }
    }
    return [minmax_i, minmax_j];
};

const maxMinIndexes = (table, dim) => {
    let maxmin_i = 0,
        maxmin_j = 0;
    let maxmin = min(...table[0]);
    let min_value, min_value_j;

    for (let i = 0; i < dim; ++i) {
        min_value = table[i][0];
        min_value_j = 0;
        for (let j = 0; j < dim; ++j) {
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

    console.log("[maxmin_j, maxmin_i];", [maxmin_j, maxmin_i]);
    return [maxmin_j, maxmin_i];
};

const randomValue = (bound) => round(random() * bound);

const bR = (table, dim) => {
    const ttable = transpose(table);

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
    }

    const stA = optimal(strs_a, iterations);
    const stB = optimal(strs_b, iterations);

    const iA = stA.indexOf(max(...stA));
    const iB = stB.indexOf(max(...stB));

    return `x = ${(iA / dim).toFixed(3)}, y = ${(iB / dim).toFixed(3)}, H = ${
        table[iA][iB]
    }`;
};

const algorithm = () => {
    const result = [];

    for (let i = 2; i < 11; ++i) {
        const t = makeTable(i);

        const [minmax_i, minmax_j] = minMaxIndexes(t, i + 1);
        const [maxmin_i, maxmin_j] = maxMinIndexes(t, i + 1);

        if (minmax_i === maxmin_i && minmax_j === maxmin_j) {
            result.push({
                hasPoint: true,
                t,
                text: `n = ${i}, x = ${(minmax_i / i).toFixed(3)}, y = ${(
                    minmax_j / i
                ).toFixed(3)}, H = ${t[minmax_i][minmax_j]}`
            });
        } else {
            result.push({
                hasPoint: false,
                t,
                text: bR(t, i + 1)
            });
        }
    }

    return result;
};

export {
    algorithm
};

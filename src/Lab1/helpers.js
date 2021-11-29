const { min, max, random, round } = Math;
const epsilon = (u, l) => min(...u) - max(...l);
const transpose = (m) => m[0].map((_, i) => m.map((x) => x[i]));
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

    const result = [[
        iterations,
        str_a + 1,
        str_b + 1,
        winning_A,
        losing_B,
        max(...winning_A).toFixed(3),
        min(...losing_B).toFixed(3),
        eps.toFixed(3)
    ]];

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

import SimpleSimplex from "simple-simplex";

const { min, max, random, round } = Math;

const t = `11 10 15,16 5 13,15 20 10`
    .split(",")
    .map((row) => row.split(" ").map((e) => +e));

const transpose = (m) => m[0].map((_, i) => m.map((x) => x[i]));

const solver = (matrix) => {
    const d = "abcde";
    const c = Array.from("1".repeat(matrix.length)).reduce((acc, e, i) => {
        acc[d[i]] = +e;
        return acc;
    }, {});

    console.log(matrix);
    const tt = transpose(matrix).map((row) => row.map((e) => e * 1));
    // const tt = matrix;
    const A = tt.map((e, i) => ({
        namedVector: e.reduce((acc, ee, i) => {
            acc[d[i]] = ee;
            return acc;
        }, {}),
        constraint: "<=",
        constant: 1
    }));

    console.log(c);
    console.log(A);

    const solver = new SimpleSimplex({
        objective: c,
        constraints: A,
        optimizationType: "max"
    });

    const result = solver.solve({
        methodName: "simplex"
    });
    console.log(result);
    return result;
};

const randomValue = (bound) => round(random() * bound);

const tt = transpose(t);

export const bR = (table, n) => {
    const strategy = randomValue(n - 1);
    console.log(`Начальная стратегия: ${strategy + 1}`);

    let x = Array.from("0".repeat(n)).map((e) => +e);
    x[strategy] = 1;
    let c = table[strategy],
        alpha = [1, 1],
        iteration = 0;

    while (alpha.indexOf(0) === -1) {
        iteration += 1;
        console.log(`Итерация ${iteration}`);
        const lb = min(...c);
        const J = c.indexOf(lb);
        const A = [table.map((row) => row[J])];
        console.log("🚀 ~ file: helpers.js ~ line 64 ~ bR ~ A", A);

        const shape = [A.length, A[0].length];

        let x_stroke, simplex_solver;
        if (shape.includes(1)) {
            console.log(A, shape, "shaaaape");
            x_stroke = Array.from("0".repeat(shape[1])).map((e) => +e);
            const maxIndex = A[0].indexOf(max(...A[0]));
            x_stroke[maxIndex] = 1;
        } else {
            const { solution } = solver(A);
            simplex_solver = solution.coefficients;
            const { optimum } = solution;
            x_stroke = Object.keys(simplex_solver).map(
                (k) => simplex_solver[k] / optimum
            );
        }
        console.log(x_stroke);
        const c_stroke = Array.from("0".repeat(tt[0].length)).map((e) => +e);

        for (let i = 0; i < x_stroke.length; i++) {
            for (let j = 0; j < x_stroke.length; j++) {
                c_stroke[i] += x_stroke[j] * t[j][i];
            }
        }

        console.log(`~x = ${x_stroke}`);
        console.log(`~c = ${c_stroke}`);

        const game = [c, c_stroke];
        const { solution } = solver(game);
        simplex_solver = solution.coefficients;
        const { optimum } = solution;
        alpha = Object.keys(simplex_solver).map(
            (k) => simplex_solver[k] / optimum
        );
        // alpha = simplex_solver.x / simplex_solver.fun;

        console.log(`alpha = ${alpha}`);

        for (let i = 0; i < x_stroke.length; i++) {
            x = alpha[0] * x[i] + alpha[1] * x_stroke[i];
            c = alpha[0] * c[i] + alpha[1] * c_stroke[i];
        }

        console.log(`x = ${x}`);
        console.log(`c = ${c}`);

        console.log("-".repeat(30));
    }
};

bR(t, 3);

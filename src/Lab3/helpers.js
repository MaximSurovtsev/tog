import YASMIJ from "./yasmij";
const { min, max, random, round } = Math;


const t = `6 18 5,17 13 15,9 13 19`
    .split(",")
    .map((row) => row.split(" ").map((e) => +e));

const transpose = (m) => m[0].map((_, i) => m.map((x) => x[i]));

const solver = (matrix) => {
    const constraints = matrix.map(
        (row) => row.map((e, i) => `${e}x${i + 1}`).join(" + ") + " <= 1"
    );
    const objective = matrix[0].map((_, i) => `x${i + 1}`).join(" + ");
    console.log('constraints', constraints)
    const input = {
        type: "maximize",
        objective,
        constraints
    };

    const { result } = YASMIJ.solve(input);

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

        const shape = [A.length, A[0].length];

        let x_stroke, simplex_solver;
        if (shape.includes(1)) {
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

        console.log('x_stroke', x_stroke);
        const c_stroke = Array.from("0".repeat(tt[0].length)).map((e) => +e);

        for (let i = 0; i < x_stroke.length; i++) {
            for (let j = 0; j < x_stroke.length; j++) {
                c_stroke[i] += x_stroke[j] * t[j][i];
            }
        }

        console.log(`~x = ${x_stroke}`);
        console.log(`~c = ${c_stroke}`);

        const game = [c, c_stroke];

        console.log('c:', c);

        const { x1, x2, x3, z }  = solver(game);
        console.log('x1, x2, x3, z ', x1, x2, x3, z)
        const xxx = [x1, x2, x3];
        const iii = xxx.findIndex(e => e === 0);
        xxx.splice(iii, 1)

        alpha = xxx.map(x => x / z);
        console.log('alpha: ', alpha)
        for (let i = 0; i < x_stroke.length; i++) {
            x[i] += alpha[0] * x[i] + alpha[1] * x_stroke[i];
            c[i] += alpha[0] * c[i] + alpha[1] * c_stroke[i];
        }

        console.log(`x = ${x}`);
        console.log(`c = ${c}`);

        console.log("-".repeat(30));
        console.log("-".repeat(30));
        console.log("-".repeat(30));
        console.log("-".repeat(30));

        if (iteration > 30) break;
    }
};

bR(t, 3);

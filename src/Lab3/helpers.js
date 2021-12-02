import YASMIJ from "./yasmij";
const { min, max, random, round } = Math;

const t = [
    [11, 10, 15],
    [16, 13, 5],
    [15, 20, 10]
];

const transpose = (m) => m[0].map((_, i) => m.map((x) => x[i]));

const solver = (matrix) => {
    const constraints = matrix.map(
        (row) => row.map((e, i) => `${e}x${i + 1}`).join(" + ") + " <= 1"
    );
    const objective = matrix[0].map((_, i) => `x${i + 1}`).join(" + ");
    console.log("constraints", constraints);
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
    let c = [...table[strategy]],
        alpha = [1, 1],
        iteration = 0,
        J = [];

    while (alpha.indexOf(0) === -1) {
        iteration += 1;
        console.log(`Итерация ${iteration}`);
        const lb = min(...c);
        J.push(c.indexOf(lb));
        J = [...new Set(J)];
        const A = J.map((j) => table.map((row) => row[j]));
        console.log("A", A, "J", J, table);
        const shape = [A.length, A[0].length];

        let x_stroke;
        if (shape.includes(1)) {
            x_stroke = Array.from("0".repeat(shape[1])).map((e) => +e);
            const maxIndex = A[0].indexOf(max(...A[0]));
            x_stroke[maxIndex] = 1;
        } else {
            const AA = transpose(A);
            console.log("AA", AA);
            const { x1, x2, x3, z } = solver(AA);
            const xxx = [x1, x2, x3 ? x3 : 0];
            x_stroke = xxx.map((e) => e / z);
            console.log("x_stroke", x_stroke);
        }

        const c_stroke = Array.from("0".repeat(tt[0].length)).map((e) => +e);

        for (let i = 0; i < x_stroke.length; i++) {
            for (let j = 0; j < x_stroke.length; j++) {
                c_stroke[i] += x_stroke[j] * t[j][i];
            }
        }

        console.log(`~x = ${x_stroke}`);
        console.log(`~c = ${c_stroke}`);

        const game = [c, c_stroke];

        const { x1, x2, x3, z } = solver(game);
        console.log("x1, x2, x3, z ", x1, x2, x3, z);
        const xxx = [x1, x2, x3];
        const iii = xxx.findIndex((e) => e === 0);
        xxx.splice(iii, 1);

        alpha = xxx.map((x) => x / z);
        console.log("alpha: ", alpha);

        console.log("x =", x);
        for (let i = 0; i < x_stroke.length; i++) {
            x[i] = alpha[0] * x[i] + alpha[1] * x_stroke[i];
            c[i] = alpha[0] * c[i] + alpha[1] * c_stroke[i];
        }

        console.log(`x = ${x}`);
        console.log(`c = ${c}`);

        console.log("-".repeat(30));
        console.log("-".repeat(30));
        console.log("-".repeat(30));
        console.log("-".repeat(30));

        if (iteration > 30) break;

        console.log('lb', lb);
    }






    
};

bR(t, 3);

// const { x1, x2, x3, z } = solver([
//     [9, 13, 19],
//     [17, 13, 15]
// ]);

// console.log(x1, x2, x3, z)
// console.log(x1/z, x2/z, x3/z);

// let alpha = [0.80113636, 0.19886364];
// let x = [0.55555556, 0, 0.44444444];
// let c = [12.77777778, 14.44444444, 12.77777778];
// let x_stroke = [0.42857143, 0.57142857, 0];
// let c_stroke = [13.85714286, 7.14285714, 13.85714286];

// for (let i = 0; i < x_stroke.length; i++) {
//     x[i] = alpha[0] * x[i] + alpha[1] * x_stroke[i];
//     c[i] = alpha[0] * c[i] + alpha[1] * c_stroke[i];
// }

// console.log(`x = ${x}`);
// console.log(`c = ${c}`);

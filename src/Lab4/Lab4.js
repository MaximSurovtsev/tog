import React from "react";
import clsx from "clsx";
import "../style.css";
import { randomMatrix, Pareto, Nesh, intersection } from "./helpers";

export const Lab4 = () => {
    const p = [
        [
            [1, 1],
            [1, 2]
        ],
        [
            [2, 1],
            [0, 0]
        ]
    ];
    const s = [
        [
            [4, 1],
            [0, 0]
        ],
        [
            [0, 0],
            [1, 4]
        ]
    ];

    const d = [
        [
            [-5, -5],
            [0, -10]
        ],
        [
            [-10, 0],
            [-1, -1]
        ]
    ];

    const p1 = Pareto(p);
    const p2 = Nesh(p);
    const p1p2 = intersection(p1, p2);

    const s1 = Pareto(s);
    const s2 = Nesh(s);
    const s1s2 = intersection(s1, s2);

    const d1 = Pareto(d);
    const d2 = Nesh(d);
    const d1d2 = intersection(d1, d2);

    return (
        <div className="lab2-box">
            <div className="inner">
                <h1 className="title">
                    Неантагонистические игры. Критерии выбора оптимальных
                    стратегий в бескоалиционных играх нескольких игроков
                </h1>

                <code>
                    [
                     <br />   
                     &nbsp;&nbsp;&nbsp;&nbsp;1
                     <br />   
                    ]
                </code>

                {/* <div className="table-min">
                    <div className="title-min bold">Исходная матрица:</div>
                    <div className="box">
                        {data.M.map((row, j) => (
                            <div
                                key={`row-${j}-input`}
                                className={clsx("row-min", j % 2 && "grey")}
                            >
                                {row.map((e, i) => (
                                    <div
                                        key={`row-${j}-item-${i}-input`}
                                        className={clsx("item-min")}
                                    >
                                        {e}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div> */}

             
            </div>
        </div>
    );
};

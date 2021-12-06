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

    const drawSmallMatrix = (title, _table) => {
        return (
            title +
            " = " +
            "[<br>" +
            _table
                .map((row, j) => `${"&nbsp;".repeat(4)}[ ${row.join(" ")} ]`)
                .join("<br />") +
            `<br>${"&nbsp;".repeat(0)}]`
        );
    };

    const drawMatrix = (title, _table) =>
        `${title} = [<br> ${_table
            .map((table, i) => {
                return (
                    "&nbsp;".repeat(8) +
                    "[<br>" +
                    table
                        .map(
                            (row, j) =>
                                `${"&nbsp;".repeat(12)}[ ${row.join(" ")} ]`
                        )
                        .join("<br />") +
                    `<br>${"&nbsp;".repeat(8)}]`
                );
            })
            .join("<br/>")} <br>${"&nbsp;".repeat(4)}]`;

    return (
        <div className="lab2-box">
            <div className="inner">
                <h1 className="title">
                    Неантагонистические игры. Критерии выбора оптимальных
                    стратегий в бескоалиционных играх нескольких игроков
                </h1>
                <div className="code-title">Исходные данные</div>
                <div className="code-text">Задача "перекресток" (p), задача "дилемма" (d), задача "спор" (s),</div>
                <div className="code-box">
                    <div
                        className="code"
                        dangerouslySetInnerHTML={{ __html: drawMatrix("p", p) }}
                    ></div>
                    <div
                        className="code"
                        dangerouslySetInnerHTML={{ __html: drawMatrix("s", s) }}
                    ></div>
                    <div
                        className="code"
                        dangerouslySetInnerHTML={{ __html: drawMatrix("d", d) }}
                    ></div>
                </div>

                <div className="code-title">Решение для задачи "перекресток"</div>

                <div className="code-box">
                    <div
                        className="code"
                        dangerouslySetInnerHTML={{
                            __html: drawSmallMatrix("pareto", p1)
                        }}
                    ></div>
                    <div
                        className="code"
                        dangerouslySetInnerHTML={{
                            __html: drawSmallMatrix("nash", p2)
                        }}
                    ></div>
                    <div
                        className="code"
                        dangerouslySetInnerHTML={{
                            __html: drawSmallMatrix("intersection", p1p2)
                        }}
                    ></div>
                </div>
                <div className="code-title">Решение для задачи "дилемма"</div>

                <div className="code-box">
                    <div
                        className="code"
                        dangerouslySetInnerHTML={{
                            __html: drawSmallMatrix("pareto", d1)
                        }}
                    ></div>
                    <div
                        className="code"
                        dangerouslySetInnerHTML={{
                            __html: drawSmallMatrix("nash", d2)
                        }}
                    ></div>
                    <div
                        className="code"
                        dangerouslySetInnerHTML={{
                            __html: drawSmallMatrix("intersection", d1d2)
                        }}
                    ></div>
                </div>
                <div className="code-title">Решение для задачи "спор"</div>

                <div className="code-box">
                    <div
                        className="code"
                        dangerouslySetInnerHTML={{
                            __html: drawSmallMatrix("pareto", s1)
                        }}
                    ></div>
                    <div
                        className="code"
                        dangerouslySetInnerHTML={{
                            __html: drawSmallMatrix("nash", s2)
                        }}
                    ></div>
                    <div
                        className="code"
                        dangerouslySetInnerHTML={{
                            __html: drawSmallMatrix("intersection", s1s2)
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

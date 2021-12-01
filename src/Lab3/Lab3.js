import React, { useState, useRef, useEffect } from "react";
import { algorithm } from "./helpers";
import clsx from "clsx";
import "../style.css";

export const Lab3 = () => {
    
    // const [state, setState] = useState({
    //     a: -3,
    //     b: 1.5,
    //     c: 2.5,
    //     d: -4,
    //     e: -2.2,
    //     k: 3
    // });

    // const _ = useRef(algorithm());
    // const [render, setRender] = useState(false);

    // useEffect(() => {
    //     _.current = algorithm();
    //     setRender(!render);
    // }, [state]);

    // const result = _.current;

    return (
        <div className="lab1-box">
            <h1 className="title">
                Аналитический и численный (Брауна — Робинсон) методы решения
                непрерывной выпукло-вогнутой антагонистической игры в смешанных
                стратегиях
            </h1>

            {/* {result?.map((obj, j) => {
                const { t, hasPoint, text } = obj;

                return (
                    <div key={`t-${j}`} className="table-min">
                        <div className="title-min">{text}</div>
                        {hasPoint && (
                            <div className="title-min">Есть седловая точка</div>
                        )}
                        <div className="box">
                            {t?.map((row, i) => (
                                <div
                                    key={`row-${j}-item-${i}`}
                                    className={clsx("row-min", i % 2 && "grey")}
                                >
                                    {row.map((el, k) => (
                                        <div
                                            className={clsx(
                                                "item-min",
                                                i < 3 && "small"
                                            )}
                                        >
                                            {el}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })} */}
        </div>
    );
};

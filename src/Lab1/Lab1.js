import React, { useState, useRef, useEffect } from "react";
import { algorithm } from "./helpers";
import clsx from "clsx";
import "../style.css";

export const Lab1 = () => {
    const [state, setState] = useState([
        [11, 10, 15],
        [16, 5, 13],
        [15, 20, 10]
    ]);

    const area = useRef(null);
    const _ = useRef(algorithm(state));
    const [render, setRender] = useState(false);

    useEffect(() => {
        _.current = algorithm(state);
        setRender(!render);
    }, [state]);

    useEffect(() => {
        area.current.value = state.map((e) => e.join(" ")).join("\n");
    }, []);

    const [result, V, X, Y, mima, mami] = _.current;
    const headKeys = ["k", "A", "B", "win str", "los str", "low", "up", "eps"];

    const handleClick = () => {
        const value = area.current.value.split("\n");
        if (value.length !== 3) {
            alert("Неправильно ввод!");
            return;
        }

        const rows = value.map((row) => row.split(" "));
        rows.forEach((row) => {
            if (row.length !== 3) {
                alert("Неправильно ввод!");
                return;
            }

            row.forEach((el) => {
                if (!+el) {
                    alert("Неправильно ввод!");
                    return;
                }
            });
        });

        setState(rows.map((row) => row.map((el) => +el)));
    };

    return (
        <div className="lab1-box">
            <h1 className="title">
                Аналитический и численный (Брауна — Робинсон) методы решения
                антагонистической игры в смешанных стратегиях
            </h1>

            <textarea
                ref={area}
                className="area"
                rows="5"
                columns="5"
            ></textarea>

            <button onClick={handleClick} className="btn">
                Посчитать
            </button>

            <div className="text">{`Цена игры между ${Math.min(
                mima,
                mami
            )} и ${Math.max(mima, mami)}`}</div>

            <div className="text">Приближенные смешанные стратегии:</div>
            <div className="text">V = {V}</div>
            <div className="text">X = [{X}]</div>
            <div className="text">Y = [{Y}]</div>
            <div className="__table-box">
                <div className="__table">
                    <div className="head-row">
                        {headKeys?.map((key, i) => (
                            <div
                                key={`head-row-${i}`}
                                className={clsx("item", i < 3 && "small")}
                            >
                                {key}
                            </div>
                        ))}
                    </div>

                    {result?.map((items, j) => (
                        <div
                            key={`row-${j}`}
                            className={clsx("row", j % 2 && "grey")}
                        >
                            {items?.map((item, i) => (
                                <div
                                    key={`row-${j}-item-${i}`}
                                    className={clsx("item", i < 3 && "small")}
                                >
                                    {item instanceof Array
                                        ? item.map((e, k) => (
                                              <span
                                                  key={`span-${e}-item-${j}-${k}`}
                                              >
                                                  {e}
                                              </span>
                                          ))
                                        : item}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

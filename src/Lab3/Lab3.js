import React from "react";
import clsx from "clsx";
import "../style.css";
import { data } from "./api.js";

export const Lab3 = () => {
    console.log(data);

    return (
        <div className="lab2-box">
            <div className="inner">
                <h1 className="title">Монотонный итеративный алгоритм</h1>

                <div className="table-min">
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
                </div>

                <div className="title-min bold">{data.startStrategy}</div>
                <div className="title-min bold">
                    Оптимальная стратегия игрока X: [
                    {data.optimal.map((e) => e.toFixed(3)).join(" ")}]
                </div>
                <div className="title-min bold">
                    Цена игры: {data.cost.toFixed(3)}
                </div>
            </div>

            <div className="flex-box">
                {data.data?.map((obj, j) => {
                    const { lowerBound, A, J, iteration, alpha, x, c } = obj;
                    const _c = obj["c`"];
                    const _x = obj["x`"];

                    return (
                        <div key={`t-${j}`} className="table-min offset">
                            <div className="title-min bold">
                                Итерация: {iteration}
                            </div>
                            <div className="title-min">
                                Нижняя граница: {lowerBound.toFixed(3)}
                            </div>
                            <div className="title-min">J = [{J.join(" ")}]</div>
                            <div className="title-min">
                                ~с = [{_c.map((e) => e.toFixed(3)).join(" ")}]
                            </div>
                            <div className="title-min">
                                ~x = [{_x.map((e) => e.toFixed(3)).join(" ")}]
                            </div>
                            <div className="title-min">
                                x = [{x.map((e) => e.toFixed(3)).join(" ")}]
                            </div>
                            <div className="title-min">
                                c = [{c[0].map((e) => e.toFixed(3)).join(" ")}]
                            </div>
                            <div className="title-min">
                                alpha = [
                                {alpha.map((e) => e.toFixed(3)).join(" ")}]
                            </div>
                            <div className="">
                                <div className="title-min bold">A:</div>
                                <div className="box">
                                    {A.map((row, i) => (
                                        <div
                                            key={`row-${j}-item-${i}-A`}
                                            className={clsx(
                                                "row-min",
                                                i % 2 === 0 && "grey"
                                            )}
                                        >
                                            {row.map((e, k) => (
                                                <div
                                                    className={clsx("item-min")}
                                                >
                                                    {e}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

import numpy as np
from random import randint
from scipy.optimize import linprog
import json 


data = {}


M = np.matrix(
    [[ 11, 10,  15],
    [16, 13, 5],
    [ 15, 20, 10]]
)

data['M'] = M.tolist()


def solver(M):
    m, n = M.shape
    c = np.ones(m)
    A_ub = -1 * M.T
    b_ub = -1 * np.ones(n)
    return linprog(c, A_ub=A_ub, b_ub=b_ub, method="simplex")

def braunRobinson(matrix, n):
    # случайная стратегия
    strategy = randint(0, n-1)
    
    print(f"Начальная стратегия: {strategy + 1}")
    data['data'] = []
    data['startStrategy'] = f"Начальная стратегия: {strategy + 1}"
    # Начальные значения для векторов x и c
    x = np.zeros(n)
    x[strategy] = 1
    c = matrix[strategy]
    
    alpha = np.ones(2)
    
    iteration = 0
    
    while alpha[0] != 0 and alpha[1] != 0:

        dataItem = {}

        iteration += 1
        lower_bound = c.min()
        J = np.where(lower_bound == c)[1]
        A = matrix[:, J]
        print(lower_bound)
        dataItem['lowerBound'] = float(lower_bound)
        dataItem['A'] = A.tolist()
        dataItem['J'] = J.tolist()
        dataItem['iteration'] = iteration

        if 1 in A.shape:
            x_stroke = np.zeros(matrix.shape[1])
            x_stroke[A.argmax()] = 1
        else: 
            simplex_solver = solver(A)
            x_stroke = simplex_solver.x / simplex_solver.fun

        c_stroke = np.zeros((1, matrix.shape[0]))
        for index in range(len(x_stroke)):
            c_stroke += x_stroke[index] * matrix[index]

        dataItem['x`'] = x_stroke.tolist()
        dataItem['c`'] = c_stroke.flatten().tolist()
        
        game = np.matrix([np.array(c).flatten(), 
                          np.array(c_stroke).flatten()])

        simplex_solver = solver(game)
        alpha = simplex_solver.x / simplex_solver.fun

        dataItem['alpha'] = alpha.tolist()

        x = alpha[0] * x + alpha[1] * x_stroke
        c = alpha[0] * c + alpha[1] * c_stroke

        dataItem['x'] = x.tolist()
        dataItem['c'] = c.flatten().tolist()
        data['data'].append(dataItem)
        
    data['optimal'] = x.tolist()
    data['cost'] = float(lower_bound)

braunRobinson(M, 3)

with open('./api.json', 'w') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)
import numpy as np

def linear_regression(features, outcome, learning_rate=0.005, iterations=1000):
    X = np.array(features)
    y = np.array(outcome).reshape(-1, 1)



    # Standardize X (Z-score normalization)
    X_mean = X.mean(axis=0)
    X_std = X.std(axis=0) 
    X_scaled = (X - X_mean) / X_std

    print(f"Max wins {y.max()}")
    print(f"Min wins {y.min()}")


    print(f"X normal {X}")
    print(f"X scaled {X_scaled}")
    print(f"X transposed {X.T}")
    # Initialize parameters
    theta = np.zeros((X.shape[1], 1))
    b = 0
    num_entries = len(y)

    for i in range(iterations):
        y_pred = calculate_y(X_scaled, theta, b)
        error = y - y_pred
        loss = calculate_mse(num_entries, error)

        # Compute gradients
        theta_gradient = calculate_theta_gradient(X_scaled, error, num_entries)
        b_gradient = calculate_b_gradient(error, num_entries)

        # Update parameters
        theta -= learning_rate * (theta_gradient + 0.1 * theta)
        b -= learning_rate * b_gradient

        if i % 100 == 0:
            print(f"Loss is {loss}")
            print(f"Theta is {theta}")
            print(f"B is {b}")

       
    print("\nFinal Theta (weights):", theta.flatten())
    print("Final Bias:", b)
    print("\nPredicted Y in Original Scale:")
    print(f"Y predicted {y_pred[:15]}")
    
    print(f"Y actual {y[:15]}")


    y_pred = np.round(np.clip(y_pred, 0, None))

    return y_pred, y, theta, b

def calculate_y(X, theta, b):
    return np.dot(X, theta) + b

def calculate_mse(N, error):
    return np.mean(error ** 2)

def calculate_theta_gradient(X, error, N):
    return (-2 / N) * np.dot(X.T, error)

def calculate_b_gradient(error, N):
    
    return (-2 / N) * np.sum(error)

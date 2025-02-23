import numpy as np

def linear_regression(features, outcome, learning_rate=0.001, iterations=2000):
    # Convert to NumPy arrays
    X = np.array(features)
    y = np.array(outcome).reshape(-1, 1)

    # Normalize features (X)
    X_mean = X.mean(axis=0)
    X_std = X.std(axis=0) + 1e-8  # Avoid division by zero
    X_norm = np.clip((X - X_mean) / X_std, -3, 3)  # Clip outliers

    # Normalize outcome (Y)
    y_mean = y.mean()
    y_std = y.std()
    y_norm = (y - y_mean) / y_std  # Standardized Y

    # Initialize theta and bias
    theta = np.zeros((X.shape[1], 1))
    b = 0   
    num_entries = len(y_norm)

    for i in range(iterations):
        y_pred = calculate_y(X_norm, theta, b)  # Predict using normalized X
        error = y_norm - y_pred  # Use normalized Y for error
        loss = calculate_mse(num_entries, error)

        theta_gradient = calculate_theta_gradient(X_norm, error, num_entries)
        theta -= learning_rate * theta_gradient

        b_gradient = calculate_b_gradient(error, num_entries)
        b -= learning_rate * b_gradient

        if i % 100 == 0:
            print(f"Iteration {i}: Loss = {loss:.4f}, b = {b:.4f}, theta = {theta.T}")

    # Convert theta and b back to original scale
    theta_actual = theta * (y_std / X_std.reshape(-1, 1))
    b_actual = (b * y_std) + y_mean  # Convert b back
    y_pred_actual = (y_pred * y_std) + y_mean  # Convert predictions back

    print("\nFinal theta:")
    print(theta_actual.T)
    print("\nFinal b:", b_actual)
    print("\nSample Predicted Y:")
    print(y_pred_actual[:5])  # First 5 predictions
    print("\nActual Y:")
    print(y[:5])  # First 5 actual values

    return theta_actual, b_actual

def calculate_y(X, theta, b):
    return np.dot(X, theta) + b  # No need for y_min/y_max

def calculate_mse(N, error):
    return np.mean(error ** 2)  # Use mean instead of sum

def calculate_theta_gradient(X, error, N):
    return (-2 / N) * np.dot(X.T, error)

def calculate_b_gradient(error, N):
    return (-2 / N) * np.sum(error)

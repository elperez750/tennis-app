import numpy as np

def linear_regression(features, outcome, learning_rate=0.01, iterations=1000):
    theta = np.zeros((features.shape[1], 1))
    b = 0

 
    # Convert DataFrames to NumPy arrays
    X = np.array(features)
    y = np.array(outcome).flatten()
    print(len(theta))
    num_entries = len(y)


    print(f"Theta {theta}")
    print(X)
    y_pred = calculate_y(X, theta, b)
    

    error = (y - y_pred) 
    print(f"error length {len(error)}")

    print(f"error {error}")

    loss = calculate_mse(num_entries, error)

    for i in range(len(theta)):
        theta_gradient = calculate_theta_gradient(X[:, i], error, num_entries)
        theta[i][0] -= (learning_rate * theta_gradient)


    b_gradient = calculate_b_gradient(error, num_entries)
    b -= (learning_rate * b_gradient)

    print(f"b after gradient descent {b}")



    return b



def calculate_y(X, theta, b):
    return np.dot(X, theta) + b


def calculate_mse(N, error):
    error_squared = error ** 2
    return np.sum(error_squared) * 1/N


def calculate_theta_gradient(feature, error, N):
    feature_flat = feature.flatten()
    error_flat = error[0].flatten()

    print(f"length of feature flat {len(feature_flat)}")

    print(f"Length for error flat {len(error_flat)}")
    print(error_flat)
    print(feature_flat)

    dot_product = np.dot(feature_flat, error_flat)
    print(f"dot product {dot_product}")
    theta_gradient = (-2/N) * dot_product
    print(f"Theta gradient {theta_gradient}")
    return theta_gradient  
    

    
def calculate_b_gradient(error, N):
    error_flat = error[0].flatten()
    return (-2/N) * np.sum(error_flat)
    

    
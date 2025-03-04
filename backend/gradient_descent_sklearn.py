from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import numpy as np



def linear_regression_sklearn(features, outcome):
    lm = LinearRegression()
    print(f"Features head: {features.head()}")
    print(f" Outcome head: {outcome.head()}")


    X = np.array(features)
    y = np.array(outcome).reshape(-1, 1)


    print(f"X shape: {X.shape}")
    print(f"Y shape: {y.shape}")


    x_train, x_test, y_train, y_test = train_test_split(X, y, train_size=0.8, test_size=0.2, random_state = 6)


    print(f"X train shape: {x_train.shape}")
    print(f"X test shape: {x_test.shape}")
    print(f"Y train shape: {y_train.shape}")
    print(f"Y test shape: {y_test.shape}")
    


    lm.fit(x_train, y_train)

    y_predict = lm.predict(x_test)

    bias = lm.intercept_
    theta = lm.coef_
    print(f"Coefficients {lm.coef_}")

    print(f"Training score: {lm.score(x_train, y_train)}" )

    training_score = lm.score(x_train, y_train)
    testing_score = lm.score(x_test, y_test)

    print(f"Testing score: {lm.score(x_test, y_test)}")
    print(f"Y predicted {y_predict}")
    print(f"Y actual {y}")

    print(f"Bias {bias}")
    print(f"Theta: {theta}")


    return  y_predict, y, bias, theta, training_score, testing_score

    




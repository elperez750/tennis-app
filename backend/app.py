from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
#from gradient_descent_manual import linear_regression
from gradient_descent_sklearn import linear_regression_sklearn
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)

df = pd.read_csv('./tennis_stats.csv')


@app.route('/')
def home():
    print(df.head())
    return jsonify({"message": "Flask Backend Connected!"})



@app.route('/api/data', methods=['GET'])
def get_data():
    features = request.args.getlist('features[]')
    outcome = request.args.get('outcome')

    features_df = df[[f for f in features]]
    output_df = df[[outcome]]
    
   
    
    #y_pred, y, theta, b = linear_regression(features_df, output_df)
    y_pred, y, b, theta, training_score, testing_score = linear_regression_sklearn(features_df, output_df)


    training_score_rounded = math.floor(training_score * 100) / 100
    testing_score_rounded = math.floor(testing_score * 100) / 100


    all_y_values = []

    theta_flatten = theta.flatten().tolist()
    b_flatten = b.flatten().tolist()[0]

    for i in range(len(y_pred)):
        all_y_values.append(
            {
                "Y predicted":y_pred.flatten().tolist()[i],
                "Y actual": y.flatten().tolist()[i]
             
             }
        )

    
    
    return jsonify({"data": all_y_values, "theta": theta_flatten, "bias": b_flatten, "trainingScore": training_score_rounded, "testingScore": testing_score_rounded})



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

    
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from gradient_descent import linear_regression
from flask_cors import CORS


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
    
   
    
    
    y_pred, y, theta, b = linear_regression(features_df, output_df)

    all_y_values = []

    theta_flatten = theta.flatten().tolist()

    for i in range(len(y_pred)):
        all_y_values.append(
            {
                "Y predicted":y_pred.flatten().tolist()[i],
                "Y actual": y.flatten().tolist()[i]
             
             }
        )

    

    return jsonify({"data": all_y_values, "theta": theta_flatten, "bias": b})

    



if __name__ == "__main__":
    app.run(debug=True)

    
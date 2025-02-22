from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from gradient_descent import linear_regression


app = Flask(__name__)


df = pd.read_csv('./tennis_stats.csv')


@app.route('/')
def home():
    print(df.head())
    return jsonify({"message": "Flask Backend Connected!"})



@app.route('/api/data', methods=['GET'])
def get_data():
    print(request.args)
    features = request.args.getlist('features[]')
    outcome = request.args.get('outcome')
    print(features, outcome)

    features_df = df[[f for f in features]]
    output_df = df[[outcome]]
    
   
    
    print(linear_regression(features_df, output_df))

    return jsonify({"data": "Data fetched successfully!"})



if __name__ == "__main__":
    app.run(debug=True)

    
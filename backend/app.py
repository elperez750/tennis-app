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
    
   
    
    
    y_pred, y = linear_regression(features_df, output_df)
    returned_dict = {"Y predicted": y_pred.flatten().tolist(), "Y actual": y.flatten().tolist()}
    

    return jsonify(returned_dict)

    



if __name__ == "__main__":
    app.run(debug=True)

    
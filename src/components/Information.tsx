import React from 'react';

type InformationPropsType = {
  theta: number[];
  bias: number;
  features: string[];
  trainingScore: number;
  testingScore: number;
}

const Information: React.FC<InformationPropsType> = ({ 
  theta, 
  bias, 
  features, 
  trainingScore, 
  testingScore
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Model Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coefficients */}
        <div className="bg-gray-50 rounded-md p-4">
          <h3 className="text-gray-700 font-semibold mb-2">Coefficients</h3>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{feature}:</span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                  {theta[index]?.toFixed(4) || 'N/A'}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center border-t border-gray-200 pt-2 mt-2">
              <span className="text-gray-600 font-semibold">Bias (Intercept):</span>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                {bias.toFixed(4)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Model Performance */}
        <div className="bg-gray-50 rounded-md p-4">
          <h3 className="text-gray-700 font-semibold mb-2">Model Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Training Score (R²):</span>
                <span className="font-mono">{(trainingScore * 100).toFixed(2)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${Math.max(0, Math.min(100, trainingScore * 100))}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Testing Score (R²):</span>
                <span className="font-mono">{(testingScore * 100).toFixed(2)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${Math.max(0, Math.min(100, testingScore * 100))}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Equation */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-gray-700 font-semibold mb-2">Model Equation</h3>
        <div className="font-mono text-sm bg-gray-100 p-3 rounded overflow-x-auto">
          y = {' '}
          {features.map((feature, index) => (
            <span key={index}>
              {index > 0 && theta[index] >= 0 && '+ '}
              {index > 0 && theta[index] < 0 && '- '}
              {Math.abs(theta[index]).toFixed(4)} × {feature}{' '}
            </span>
          ))}
          {bias >= 0 ? '+ ' : '- '}
          {Math.abs(bias).toFixed(4)}
        </div>
      </div>
    </div>
  );
};

export default Information;
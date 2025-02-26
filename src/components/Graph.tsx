import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend
} from "recharts";

// Define the type for data points
type DataPoint = {
  "Y actual": number;
  "Y predicted": number;
};

type GraphProps = {
  data: DataPoint[]
  theta: number[]
  bias: number;
}

const Graph: React.FC<GraphProps> = ({ data, theta, bias }) => {
  // Debug

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }


  const xMin = Math.min(...data.map(d => d["Y actual"]))
  const xMax = Math.max(...data.map(d => d["Y actual"]))

 
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        
        <XAxis 
          type="number" 
          dataKey="Y actual" 
          name="Actual Value" 
          domain={['auto', 'auto']}
          label={{ value: 'Actual Value', position: 'insideBottom', offset: -5 }}
        />
        

        <YAxis 
          type="number" 
          dataKey="Y predicted" 
          name="Predicted Value" 
          domain={['auto', 'auto']}
          label={{ value: 'Predicted Value', angle: -90, position: 'insideLeft' }}
        />
        
        {/* Perfect prediction line (45-degree line) */}
        <ReferenceLine 
          stroke="red" 
          strokeDasharray="3 3" 
          segment={[
            { x: 'dataMin', y: 'dataMin' },
            { x: 'dataMax', y: 'dataMax' }
          ]}
        />
        
        <Tooltip 
          formatter={(value: number) => new Intl.NumberFormat().format(value)}
          labelFormatter={(label) => `Value: ${new Intl.NumberFormat().format(label)}`}
        />
        
        <Legend />
        
        <Scatter 
          name="Data Points" 
          data={data} 
          fill="#8884d8"
          shape="circle"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Graph;
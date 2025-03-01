import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Define the type for data points
type DataPoint = {
  "Y actual": number;
  "Y predicted": number;
};

type GraphProps = {
  data: DataPoint[];
 
};

const Graph: React.FC<GraphProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

 

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          type="number"
          dataKey="Y actual"
          name="Y actual"
          domain={["auto", "auto"]}
          label={{ value: "Actual Value", position: "insideBottom", offset: -5 }}
        />

        <YAxis
          type="number"
          dataKey="Y predicted"
          name="Y predicted"
          domain={["auto", "auto"]}
          label={{ value: "Predicted Value", angle: -90, position: "insideLeft" }}
        />

        <Tooltip
          cursor={{strokeDasharray: "3 3"}}
          formatter={(value: number) => new Intl.NumberFormat().format(value)}
          labelFormatter={(label) => `Value: ${new Intl.NumberFormat().format(label)}`}
        />

        <Legend />

        {/* Scatter plot for data points */}
        <Scatter name="Data Points" data={data} fill="#8884d8" shape="circle" />

        {/* Regression line */}
        
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Graph;

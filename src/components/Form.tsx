import { useState, useEffect } from "react";
import axios from "axios";
import Graph from "./Graph"; 

// This is the correct type for your data points
type DataPoint = {
  "Y actual": number;
  "Y predicted": number;
};


// Your data is an array of these points, not an object with a data property

const outcomes = ["Wins", "Losses", "Winnings", "Ranking"];
const features = [
  "Aces",
  "DoubleFaults",
  "FirstServe",
  "FirstServePointsWon",
  "SecondServePointsWon",
  "BreakPointsFaced",
  "BreakPointsSaved",
  "ServiceGamesPlayed",
  "ServiceGamesWon",
  "TotalServicePointsWon",
  "FirstServeReturnPointsWon",
  "SecondServeReturnPointsWon",
  "BreakPointsOpportunities",
  "BreakPointsConverted",
  "ReturnGamesPlayed",
  "ReturnGamesWon",
  "ReturnPointsWon",
  "TotalPointsWon",
];

const Form = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedOutcome, setSelectedOutcome] = useState<string>("");
  const [allOutcomeValues, setAllOutcomeValues] = useState<DataPoint[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [theta, setTheta] = useState<number[]>([])
  const [bias, setBias] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleChangeFeature = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    console.log("Checkbox value:", value);
    console.log("Checkbox checked:", checked);

    if (checked) {
      setSelectedFeatures((prev: string[]) => [...prev, value]);
    } else {
      setSelectedFeatures((prev: string[]) =>
        prev.filter((feature: string) => feature !== value)
      );
    }
  };

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    
    if (selectedFeatures.length === 0 || !selectedOutcome) {
      setError("Please select at least one feature and one outcome");
      return;
    }
    
    setIsLoading(true);
    setError(null);

    console.log("Form submitted");
    console.log("Selected Features:", selectedFeatures);
    console.log("Selected Outcome:", selectedOutcome);
    
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/data", {
        params: {
          features: selectedFeatures,
          outcome: selectedOutcome,
        }
      });

     

      
      const result = response.data
      
      // Store the array directly - this matches your backend response format
      setAllOutcomeValues(result.data || []);
      setTheta(result.theta || [])
      setBias(result.bias)


    } catch(error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");

    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeOutcome = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    console.log("Radio button value:", value);
    setSelectedOutcome(value);
  };

  useEffect(() => {
    if (allOutcomeValues) {
      console.log(allOutcomeValues.length)
    }
  }, [allOutcomeValues]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-lg mt-10 mb-10">
      <h1 className="text-3xl font-bold text-center text-green-700">
        Tennis Player Outcome Prediction
      </h1>

      <h2 className="text-2xl font-semibold text-green-700">
        Select Features
      </h2>
      <form className="space-y-4">
        <div>
          <div className="grid grid-flow-row grid-cols-3 mb-4">
            {features.map((feature) => (
              <label
                key={feature}
                className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  name="features"
                  value={feature}
                  onChange={handleChangeFeature}
                  checked={selectedFeatures.includes(feature)}
                  className="w-4 h-4 text-green-800 rounded border-gray-300 focus:ring-green-800"
                />
                <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                  {feature}
                </span>
              </label>
            ))}
          </div>

          <h2 className="text-2xl font-semibold text-green-700">
            Select Outcome you want to predict
          </h2>
          <div className="grid grid-flow-row grid-cols-2 mb-4">
            {outcomes.map((outcome) => (
              <label
                key={outcome}
                className="flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="outcomes"
                  value={outcome}
                  onChange={handleChangeOutcome}
                  checked={selectedOutcome === outcome}
                  className="w-4 h-4 text-green-800 rounded border-gray-300 focus:ring-green-800"
                />
                <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                  {outcome}
                </span>
              </label>
            ))}
          </div>
        </div>
       
        <button 
          onClick={handleSubmit}
          disabled={isLoading} 
          className="inline-flex items-center justify-start px-4 py-2 text-md font-medium text-white bg-green-600 border border-transparent rounded-xl shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {isLoading ? 'Loading...' : 'Predict Outcome'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div style={{ height: "500px", width: "100%" }}>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p>Loading data...</p>
          </div>
        ) : allOutcomeValues && allOutcomeValues.length > 0 ? (
          <Graph data={allOutcomeValues} theta={theta} bias={bias} />
        ) : null}
      </div>
    </div>
  );
};

export default Form;
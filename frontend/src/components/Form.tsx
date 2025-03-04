import { useState } from "react";
import axios from "axios";
import Graph from "./Graph";
import Information from "./Information";

// This is the correct type for your data points
type DataPoint = {
  "Y actual": number;
  "Y predicted": number;
};

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
  const [usedFeatures, setUsedFeatures] = useState<string[]>([]);
  const [selectedOutcome, setSelectedOutcome] = useState<string>("");
  const [usedOutcome, setUsedOutcome] = useState<string>("");
  const [allOutcomeValues, setAllOutcomeValues] = useState<DataPoint[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [theta, setTheta] = useState<number[]>([]);
  const [bias, setBias] = useState<number>(0);
  const [trainingScore, setTrainingScore] = useState<number>(0)
  const [testingScore, setTestingScore] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleChangeFeature = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedFeatures((prev: string[]) => [...prev, value]);
    } else {
      setSelectedFeatures((prev: string[]) =>
        prev.filter((feature: string) => feature !== value)
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedFeatures.length === 0 || !selectedOutcome) {
      setError("Please select at least one feature and one outcome");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://127.0.0.1:5000/api/data", {
        params: {
          features: selectedFeatures,
          outcome: selectedOutcome,
        },
      });

      const result = response.data;

      // Store the results
      setAllOutcomeValues(result.data || []);
      setTheta(result.theta || []);
      setBias(result.bias);
      setTestingScore(result.testingScore);
      setTrainingScore(result.trainingScore);
      
      // Save the features and outcome used for this prediction
      setUsedFeatures([...selectedFeatures]);
      setUsedOutcome(selectedOutcome);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
      handleReset()
     
    }
  };

  const handleChangeOutcome = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedOutcome(value);
  };

  const handleReset = () => {
    setSelectedFeatures([]);
    setSelectedOutcome("");
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-lg ">
      <h1 className="text-3xl font-bold text-center text-green-700">
        Tennis Player Outcome Prediction
      </h1>

      <div className="flex flex-col">


    
      <div className="w-full gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-green-700">Select Features</h2>
          <form className="space-y-4">
            <div>


              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
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
                    <span className="ml-3 text-gray-700 group-hover:text-gray-900 text-sm">
                      {feature}
                    </span>
                  </label>
                ))}
              </div>

              <h2 className="text-2xl font-semibold text-green-700 mt-6">
                Select Outcome to Predict
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
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
                    <span className="ml-3 text-gray-700 group-hover:text-gray-900 text-sm">
                      {outcome}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="inline-flex items-center justify-center px-6 py-2 text-md font-medium text-white bg-green-600 border border-transparent rounded-xl shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Predict Outcome"}
              </button>
              
              <button
                onClick={handleReset}
                type="button"
                disabled={isLoading}
                className="inline-flex items-center justify-center px-6 py-2 text-md font-medium text-green-700 bg-white border border-green-600 rounded-xl shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
              >
                Reset Form
              </button>
            </div>
          </form>
          </div>

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-gray-600">Analyzing data...</p>
            </div>
          </div>
        ) : allOutcomeValues && allOutcomeValues.length > 0 ? (
          <div className="space-y-6 mt-10">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700 mb-2">Prediction Results</h3>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Outcome:</span> {usedOutcome}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Features:</span> {usedFeatures.join(", ")}
              </p>
            </div>
            
            <div className="h-64 w-full">
              <Graph 
                data={allOutcomeValues} 
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Select features and an outcome to see prediction results</p>
          </div>
        )}
      </div>

      {allOutcomeValues && allOutcomeValues.length > 0 && (
        <div className="mt-8">
          <Information 
            theta={theta} 
            bias={bias} 
            features={usedFeatures} 
            trainingScore={trainingScore} 
            testingScore={testingScore}
          />
        </div>
      )}
    </div>
  );
};

export default Form;
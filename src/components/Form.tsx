import { useState, useEffect } from "react";
import axios from "axios";
import Graph from "./Graph"; 




type DataResponse = {
    data: string;
}

type RegressionResponse = {
  
  'Y actual': number[]
  'Y predicted': number[]
  
}


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
  const [yValues, setYValues] = useState<RegressionResponse>()
  const [yPredictedValues, setYPredictedValues] = useState<RegressionResponse>()

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

    console.log("Form submitted");
    console.log("Selected Features:", selectedFeatures);
    console.log("Selected Outcome:", selectedOutcome);
    try{



      await axios.get("http://127.0.0.1:5000/api/data", {
          params: {
              features: selectedFeatures,
              outcome: selectedOutcome,
          }
      })
      .then((response: DataResponse) => {
          const yValues = response.data
          setYValues(yValues['Y actual'])
          setYPredictedValues(yValues['Y predicted'])
          console.log("Response:", response.data);
          
      })
    }
    catch(error){
      console.log("Error fetching data:", error)
    }


   

    
    console.log("Selected Features:", selectedFeatures);
    console.log("Selected Outcome:", selectedOutcome);
  }



  const handleChangeOutcome = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    console.log("Radio button value:", value);
    setSelectedOutcome(value);
  };

  useEffect(() => {
    console.log("Selected Features Updated:", selectedFeatures);
  }, [selectedFeatures]);

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
       
        <button onClick={handleSubmit} 
        className="inline-flex items-center justify-start px-4 py-2 text-md font-medium text-white bg-green-600 border border-transparent rounded-xl shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Predict Outcome</button>

      </form>


      {yValues && yPredictedValues && <Graph />
      }

    </div>



  );
};

export default Form;

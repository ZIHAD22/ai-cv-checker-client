import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Doughnut } from "react-chartjs-2";

const CVAnalysisResults = ({ analysisData, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse" />
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse delay-150" />
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse delay-300" />
        </div>
        <p className="text-center text-gray-400 mt-2">Analyzing your CV...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-900 border border-red-700 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-200">Error</h3>
            <p className="text-sm text-red-200 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysisData) return null;

  // Chart data and options for doughnut chart
  const createDoughnutData = () => {
    // Use percentage from analysisData or default to 0
    const matchScore = analysisData.percentage || 0;
    
    return {
      labels: ["Match Score", "Mismatch"],
      datasets: [
        {
          data: [matchScore, 100 - matchScore],
          backgroundColor: ["#36A2EB", "#FF6384"],
          hoverBackgroundColor: ["#36A2EB", "#FF6384"],
          borderWidth: 0,
          cutout: '70%', // This creates the doughnut effect
        },
      ],
    };
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips on hover
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  const { percentage, missing_skills, potential_questions } = analysisData;
  return (
    <div className="mt-6 space-y-4 max-h-[600px] overflow-y-scroll">
      {/* Overall Match Score */}
      <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Match Score</h2>
          <div className="relative w-48 h-48">
            <Doughnut data={createDoughnutData()} options={chartOptions} />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span 
                className={`text-3xl font-bold ${
                  percentage >= 70
                    ? "text-green-400"
                    : percentage >= 50
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {percentage}%
              </span>
              <span className="text-sm text-gray-400">Match</span>
            </div>
          </div>
        </div>
      </div>

      {/* Missing Skills */}
      <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">
          Missing Skills
        </h2>
        <div className="space-y-2">
          {/* {missing_skills?.map((skill, index) => ( */}
          <div className="flex items-center space-x-2 text-red-400">
            <XCircle className="h-4 w-4" />
            <span>{missing_skills}</span>
          </div>
          {/* ))} */}
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">
          Recommended Questions
        </h2>
        <ul className="space-y-2 text-gray-300">
          {potential_questions?.map((recommendation, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-indigo-400 mt-1">•</span>
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CVAnalysisResults;
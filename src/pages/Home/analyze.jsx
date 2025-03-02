import axios from "../../api/api";
import CVAnalysisResults from "../../component/home/analyzeReport";
import { Upload, X } from "lucide-react";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const CVAnalyzerForm = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file only");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("analyze_file", selectedFile);
    formData.append("analyze_job_description", jobDescription);
    setIsLoading(true);

    try {
      const { data } = await axios.post("/analyze-resume", formData);
      setAnalysisData(data);
      localStorage.setItem("cv-analyzer-usage", "true");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to analyze CV");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
    setJobDescription("");
    setSelectedFile(null);
    setError("");
  };
  console.log(analysisData);
  if (isLoading) {
    return (
      <div className="w-[40vw] flex justify-center items-center">
        <Loader className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  if (analysisData) {
    return (
      <div className="relative w-full max-w-2xl mx-auto">
        <button
          onClick={handleReset}
          className="absolute -top-4 -right-4 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-150"
          aria-label="Close analysis"
        >
          <X className="w-5 h-5 text-gray-300" />
        </button>
        <CVAnalysisResults
          analysisData={analysisData}
          isLoading={isLoading}
          error={error}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto overflow-y-scroll">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-gray-100">
          CV-Job Match Analyzer
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Upload your CV and provide the job description to analyze how well
          your profile matches the requirements.
        </p>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Description Input */}
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="jobDescription"
            >
              Job Description
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full min-h-[90px] p-3 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-700 text-gray-100 placeholder-gray-500"
              placeholder="Paste the job description here..."
              required
            />
          </div>

          {/* File Upload Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Upload CV (PDF)
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="cv-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-gray-700 hover:border-gray-500 transition-colors duration-150"
              >
                <div className="flex flex-col items-center justify-center pt-2 pb-3">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF files only</p>
                </div>
                <input
                  id="cv-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
              </label>
            </div>

            {/* File Selection and Error Messages */}
            {selectedFile && (
              <p className="text-sm text-gray-400">
                Selected file: {selectedFile.name}
              </p>
            )}
            {error && (
              <div className="p-4 mt-2 text-sm text-red-400 bg-red-900 rounded-lg border border-red-700">
                {error}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Footer with Submit Button */}
      <div className="px-6 py-4 border-t border-gray-700">
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          disabled={!jobDescription || !selectedFile}
        >
          Analyze CV
        </button>
      </div>
    </div>
  );
};

export default CVAnalyzerForm;

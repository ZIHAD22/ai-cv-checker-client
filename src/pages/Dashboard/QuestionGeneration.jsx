import { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";

const QuestionGeneration = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [questionFiles, setQuestionFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(5);

  const handleFileChange = (event) => {
    setQuestionFiles(event.target.files);
  };

  const handleGenerate = async () => {
    localStorage.removeItem("generatedQuestions");
    setLoading(true);
    setMessage("");
    setResults([]);

    if (!jobDescription || questionFiles.length === 0) {
      setMessage("Please add a job description and select at least one CV.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("job_description", jobDescription);

    for (let i = 0; i < questionFiles.length; i++) {
      formData.append("question_files", questionFiles[i]);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/generate-questions",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(response);

      if (response.data.files) {
        setResults(response.data.files);
        setMessage("Questions generated successfully!");
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      setMessage("Failed to generate questions.");
    }

    setLoading(false);
  };

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col p-6 w-full mx-auto text-white">
      <h2 className="text-2xl font-semibold mb-4">
        Generate Interview Questions
      </h2>

      {/* File Upload */}
      <div className="space-y-2 my-5">
        <label className="block text-sm font-medium text-gray-300">
          Upload CVs (PDF only)
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="cv-upload"
            className="flex flex-col items-center justify-center w-full h-25 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-gray-700 hover:border-gray-500 transition-colors duration-150"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-2 mb-2 text-gray-400" />
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">Pdf files only</p>
            </div>
            <input
              id="cv-upload"
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileChange}
              className="file-input file-input-bordered file-input-primary w-1/2 mb-4 hidden"
            />
          </label>
        </div>
        {/* Show selected files */}
        {questionFiles && questionFiles.length > 0 && (
          <div className="my-4">
            <p className="text-sm text-gray-400">Selected Files:</p>
            <ul className="list-disc pl-6 text-sm text-gray-300">
              {Array.from(questionFiles)
                .slice(0, 3)
                .map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              {questionFiles.length > 3 && (
                <li className="text-gray-400 font-semibold">
                  +{questionFiles.length - 3} more
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Job Description */}
      <div className="space-y-2 my-5">
        <label className="block text-sm font-medium text-gray-300">
          Job Description
        </label>
        <textarea
          className="textarea textarea-bordered w-full text-white h-[300px] bg-[#141414]"
          rows="4"
          placeholder="Enter job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>
      </div>

      <button
        className="btn bg-gradient-to-r from-[#4D2A69] to-[#8640A8] w-1/3 mb-4 mx-auto"
        onClick={handleGenerate}
        disabled={isLoading}
      >
        <Upload size={16} />
        {isLoading ? "Generating..." : "Generate Questions"}
      </button>

      {message && <p className="mt-4 text-sm text-gray-300">{message}</p>}

      {/* Results Table with Pagination */}
      {results.length > 0 && (
        <div className="mt-6 mb-50">
          <h3 className="text-lg font-semibold">Generated Questions</h3>

          {/* Pagination Size Selector */}
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Results Per Page:
              <select
                value={resultsPerPage}
                onChange={(e) => {
                  setResultsPerPage(parseInt(e.target.value));
                  setCurrentPage(1); // Reset to first page
                }}
                className="select select-bordered select-primary p-2 bg-gray-800 text-white"
              >
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </label>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full border-collapse border border-gray-600">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="border border-gray-600 px-4 py-2">#</th>
                  <th className="border border-gray-600 px-4 py-2">
                    Candidate Name
                  </th>
                  <th className="border border-gray-600 px-4 py-2">
                    Download DOCX
                  </th>
                  <th className="border border-gray-600 px-4 py-2">
                    Download PDF
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentResults.map((file, index) => (
                  <tr key={index} className="text-gray-300">
                    <td className="border border-gray-600 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {file.docx.replace("_questions.docx", "")}
                    </td>
                    <td className="border border-gray-600 px-4 py-2 text-center">
                      <a
                        href={`http://127.0.0.1:5000/download-file/${file.docx}`}
                        className="text-blue-400 hover:underline"
                      >
                        Download DOCX
                      </a>
                    </td>
                    <td className="border border-gray-600 px-4 py-2 text-center">
                      <a
                        href={`http://127.0.0.1:5000/download-file/${file.pdf}`}
                        className="text-blue-400 hover:underline"
                      >
                        Download PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`btn mx-1 ${
                    currentPage === number ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {number}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionGeneration;

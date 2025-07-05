import { useState } from "react";
import axios from "../../api/api";
import Loading from "../../component/Loading";
import loader from "../../assets/loading.gif";
import { Upload } from "lucide-react";

const CvSorter = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [cvFiles, setCvFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [matchFilter, setMatchFilter] = useState("");
  const [resultsPerPage, setResultsPerPage] = useState(5);

  const handleFileChange = (event) => {
    setCvFiles(event.target.files);
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!jobDescription || cvFiles.length === 0) {
      setMessage("Please add a job description and select at least one CV.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("job_description", jobDescription);

    for (let i = 0; i < cvFiles.length; i++) {
      formData.append("cv_files", cvFiles[i]);
    }

    try {
      const response = await axios.post("/cv-sort", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data) {
        const sortedResults = Object.entries(response.data)
          .sort((a, b) => b[1].match - a[1].match)
          .map(([fileName, data]) => ({ fileName, ...data }));

        setResults(sortedResults);
        setFilteredResults(sortedResults);
        setLoading(false);
        setMessage("CVs Analysis successfully!");
      }
    } catch (error) {
      console.error("Error uploading CVs:", error);
      setMessage("Failed to upload CVs.");
      setLoading(false);
    }
  };

  const handleFilterApply = () => {
    if (
      matchFilter === "" ||
      isNaN(matchFilter) ||
      parseInt(matchFilter) <= 0
    ) {
      setFilteredResults(results);
    } else {
      const topN = parseInt(matchFilter, 10);
      const filtered = results.slice(0, topN);
      setFilteredResults(filtered);
    }
    setCurrentPage(1); // Reset to first page
  };

  const handleClearFilter = () => {
    setMatchFilter("");
    setFilteredResults(results);
    setCurrentPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleFilterApply();
    }
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <Loading loader={loader} />;
  }

  return (
    <div className="flex flex-col p-6 shadow-md w-full mx-auto text-[#ffffff]">
      <h2 className="text-2xl font-semibold mb-4">Upload CVs for Sorting</h2>

      <div className="space-y-2 my-5">
        <label className="block text-sm font-medium text-gray-300">
          Upload Pdf File
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
              type="file"
              id="cv-upload"
              multiple
              accept=".pdf"
              onChange={handleFileChange}
              className="file-input file-input-bordered file-input-primary w-1/2 mb-4 hidden"
            />
          </label>
        </div>
        {/* Show selected files */}
        {cvFiles && cvFiles.length > 0 && (
          <div className="my-4">
            <p className="text-sm text-gray-400">Selected Files:</p>
            <ul className="list-disc pl-6 text-sm text-gray-300">
              {Array.from(cvFiles)
                .slice(0, 3)
                .map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              {cvFiles.length > 3 && (
                <li className="text-gray-400 font-semibold">
                  +{cvFiles.length - 3} more
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="textarea textarea-bordered w-full mb-4 py-4 h-[300px] mt-2 bg-[#070C10] border-2 border-dashed"
        />
      </div>

      <button
        onClick={handleUpload}
        className="btn bg-gradient-to-r from-[#4D2A69] to-[#8640A8] w-1/3 mb-4 mx-auto"
      >
        Analyze CVs
      </button>

      {message && (
        <div className="alert alert-info w-full">
          <span>{message}</span>
        </div>
      )}

      {results.length > 0 && (
        <div className="overflow-x-auto w-full mt-6 mb-50">
          <div className="flex mb-4">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Results Per Page:
                <select
                  value={resultsPerPage}
                  onChange={(e) => setResultsPerPage(parseInt(e.target.value))}
                  className="select select-bordered select-primary p-2 bg-gray-800 text-white"
                >
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </label>
            </div>
            <div className="flex flex-col mx-2">
              <label className="text-sm font-medium text-gray-300">
                Filter :
              </label>
              <input
                type="number"
                placeholder="Enter Match %"
                value={matchFilter}
                onChange={(e) => setMatchFilter(e.target.value)}
                onKeyDown={handleKeyDown}
                className="input input-bordered input-primary p-2 w-24 bg-gray-800 text-white"
              />
            </div>
            <button
              onClick={handleFilterApply}
              className="btn btn-primary ml-2 mt-5"
            >
              Apply Filter
            </button>
            <button
              onClick={handleClearFilter}
              className="btn btn-secondary ml-2 mt-5"
            >
              Clear Filter
            </button>
          </div>

          {filteredResults.length === 0 ? (
            <div className="text-center text-red-500 font-semibold">
              No Match Found
            </div>
          ) : (
            <>
              <table className="table w-full table-auto">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Match Percentage</th>
                    <th>Download Link</th>
                  </tr>
                </thead>
                <tbody>
                  {currentResults.map(({ fileName, match, download_link }) => (
                    <tr key={fileName}>
                      <td>{fileName}</td>
                      <td>{match}%</td>
                      <td>
                        <a
                          href={`http://127.0.0.1:5000/${download_link}`}
                          className="text-blue-500"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`btn mx-1 ${
                        currentPage === number
                          ? "btn bg-green-700"
                          : "btn bg-white text-black"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CvSorter;

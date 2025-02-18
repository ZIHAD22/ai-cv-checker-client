import { useState } from "react";
import axios from "axios";
import Loading from "../../component/Loading";
import loader from "../../assets/loading.gif";

const CvSorter = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [cvFiles, setCvFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  console.log(results, "res");

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

    // Append multiple files to FormData
    for (let i = 0; i < cvFiles.length; i++) {
      formData.append("cv_files", cvFiles[i]);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/cv-sort",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResults(response.data); // Set the results from the server
      // response
      if (response.data) {
        setLoading(false);
      }
      setMessage("CVs Analysis successfully!");
    } catch (error) {
      console.error("Error uploading CVs:", error);
      setMessage("Failed to upload CVs.");
    }
  };

  if (isLoading) {
    return <Loading loader={loader} />;
  }

  return (
    <div className="flex flex-col  p-6  shadow-md w-full mx-auto text-[#ffffff]">
      <h2 className="text-2xl font-semibold mb-4">Upload CVs for Sorting</h2>

      {/* Job Description Input */}
      <textarea
        placeholder="Enter job description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="textarea textarea-bordered w-full mb-4 text-lg py-4 h-32"
      />

      {/* CV Files Input */}
      <input
        type="file"
        multiple
        accept=".pdf"
        onChange={handleFileChange}
        className="file-input file-input-bordered file-input-primary w-full mb-4"
      />

      {/* Upload Button */}
      <button onClick={handleUpload} className="btn btn-secondary w-1/6 mb-4">
        Analysis Cvs
      </button>

      {/* Message */}
      {message && (
        <div className="alert alert-info w-full">
          <span>{message}</span>
        </div>
      )}

      {/* Results Table */}
      {results.length !== 0 && (
        <div className="overflow-x-auto w-full mt-6">
          <table className="table w-full table-auto">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Match Percentage</th>
                <th>Download Link</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(results).map(
                ([fileName, { match, download_link }]) => (
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
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CvSorter;

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
      const response = await axios.post(
        "/cv-sort",
        formData,
        {
          withCredentials:true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }

      );

      if (response.data) {
        // Convert object to array, sort by "match" in descending order, and convert back to object
        const sortedResults = Object.fromEntries(
          Object.entries(response.data).sort((a, b) => b[1].match - a[1].match)
        );

        setResults(sortedResults); // Store sorted results
        setLoading(false);
        setMessage("CVs Analysis successfully!");
      }
    } catch (error) {
      console.error("Error uploading CVs:", error);
      setMessage("Failed to upload CVs.");
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading loader={loader} />;
  }

  return (
    <div className="flex flex-col  p-6  shadow-md w-full mx-auto text-[#ffffff]">
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
              {Array.from(cvFiles).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Job Description Input */}

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="textarea textarea-bordered w-full mb-4 py-4 h-[300px] mt-2"
        />
      </div>

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

import { useState } from "react";
import axios from "axios";
import loader from "../../assets/export-data.gif";
import Loading from "../../component/Loading";

const ExtractData = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  // Extract data from files and trigger download
  const ExtractDataHandler = async () => {
    setLoading(true);
    console.log("ExtractDataHandler() triggered!"); // Debugging log

    if (!selectedFiles || selectedFiles.length === 0) {
      setMessage("❌ Please upload at least one PDF file.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("extract_files", selectedFiles[i]);
    }

    try {
      // Set a message indicating the process has started
      setMessage("⏳ Extracting text... Please wait.");

      // Sending form data using axios
      const response = await axios.post(
        "http://127.0.0.1:5000/extract-text",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // To handle binary response (like file download)
        }
      );

      // Check if the response was successful
      if (response.status === 200) {
        console.log("✅ Extracted data received!");

        // Create a download link
        const url = window.URL.createObjectURL(response.data);
        const a = document.createElement("a");
        a.href = url;
        a.download = "candidates_data.xlsx"; // The file will be downloaded as 'candidates_data.xlsx'
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setLoading(false);

        // Set success message
        setMessage("✅ Text extracted successfully! Downloading...");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setMessage("❌ An error occurred while extracting text.");
    }
  };

  if (isLoading) {
    return <Loading loader={loader} />;
  }

  return (
    <div className="p-6 shadow-md w-full">
      <h2 className="text-2xl font-semibold text-[#ffff] mb-4">
        Upload CVs for Data Extraction
      </h2>

      {/* CV Files Input */}
      <div>
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileChange}
          className="file-input file-input-bordered file-input-primary w-1/2 mb-4"
        />
      </div>

      <div>
        {/* Upload Button */}
        <button
          onClick={ExtractDataHandler}
          className="btn btn-secondary mb-4 text-lg w-1/5"
        >
          Extract Data and Download
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="alert alert-info w-full mb-4">
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default ExtractData;

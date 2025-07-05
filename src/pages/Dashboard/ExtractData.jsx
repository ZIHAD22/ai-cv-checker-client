import { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import { Loader } from "lucide-react";

const ExtractData = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  console.log(selectedFiles);

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
    return (
      <div className="flex h-[100vh] justify-center items-center">
        <div>
          <div>Extracting Text...</div>
          <div className="flex items-center justify-center mt-5">
            <Loader className="animate-spin w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-semibold text-[#ffff] mb-4">
        Upload CVs for Data Extraction
      </h2>

      {/* CV Files Input */}
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
        {selectedFiles && selectedFiles.length > 0 && (
          <div className="my-4">
            <p className="text-sm text-gray-400">Selected Files:</p>
            <ul className="list-disc pl-6 text-sm text-gray-300">
              {Array.from(selectedFiles).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center">
        {/* Upload Button */}
        <button
          onClick={ExtractDataHandler}
          className="btn bg-gradient-to-r from-[#4D2A69] to-[#8640A8] w-1/3 mb-4 mx-auto"
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

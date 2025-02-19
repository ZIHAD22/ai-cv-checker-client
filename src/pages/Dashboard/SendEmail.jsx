import { useState } from "react";
import axios from "axios";
import Loading from "../../component/Loading";
import loader from "../../assets/sendEmail.gif";
import { Upload } from "lucide-react";

const SendEmail = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleFileChange = (event) => {
    setExcelFile(event.target.files[0]);
  };

  const handleSendEmails = async () => {
    setLoading(true);
    if (!subject || !body || !excelFile) {
      setMessage("Please provide all required fields.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("body", body);
    formData.append("excel_file", excelFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/send-email",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResults(response.data.status);
      setMessage("Emails sent successfully!");
    } catch (error) {
      console.error("Error sending emails:", error);
      setMessage("Failed to send emails.");
    }
    setLoading(false);
  };

  if (isLoading) {
    return <Loading loader={loader} />;
  }

  return (
    <div className="flex flex-col p-6 pb-0 shadow-md w-full mx-auto text-[#ffffff]">
      <h2 className="text-2xl font-semibold mb-4">Send Emails</h2>
      {/* file upload */}
      <div className="space-y-2 my-5">
        <label className="block text-sm font-medium text-gray-300">
          Upload Excel File
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
              <p className="text-xs text-gray-500">Excel files only</p>
            </div>
            <input
              id="cv-upload"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="file-input file-input-bordered file-input-primary w-1/2 mb-4 hidden"
              required
            />
          </label>
        </div>
        {excelFile && (
          <p className="text-sm text-red-400">
            Selected file: {excelFile.name}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Email Subject
        </label>
        <input
          type="text"
          placeholder="Enter email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="input input-bordered w-full mb-4 mt-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Email Body
        </label>
        <textarea
          placeholder="Enter email body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="textarea textarea-bordered w-full mb-4 h-[400px] mt-2"
        />
      </div>

      <button
        onClick={handleSendEmails}
        className="btn btn-secondary w-1/6 mb-4"
      >
        Send Emails
      </button>

      {message && (
        <div className="alert alert-info w-full">
          <span>{message}</span>
        </div>
      )}

      {results.length !== 0 && (
        <div className="overflow-x-auto w-full mt-6">
          <table className="table w-full table-auto">
            <thead>
              <tr>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SendEmail;

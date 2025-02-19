import { useState } from 'react';
import { Upload } from 'lucide-react';

const CVAnalyzerForm = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file only');
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Description:', jobDescription);
    console.log('Selected File:', selectedFile);
  };

  return (
      <div className="w-full max-w-2xl mx-auto ">
        {/* Header */}
        <div className="p-6 border-b ">
          <h1 className="text-2xl font-bold text-gray-100">CV-Job Match Analyzer</h1>
          <p className="mt-2 text-sm text-gray-400">
            Upload your CV and provide the job description to analyze how well your profile matches the requirements.
          </p>
        </div>
        
        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Job Description Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300" htmlFor="jobDescription">
                Job Description
              </label>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full min-h-[150px] p-3 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-700 text-gray-100 placeholder-gray-500"
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
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
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
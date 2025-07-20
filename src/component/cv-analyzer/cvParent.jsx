import  { useState } from 'react';
import CVAnalyzer from './cvAnalyzer';

const ParentComponent = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (file) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('cv', file);
      
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5000/api/analyze-cv', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze CV');
      }
      
      const data = await response.json();
      setAnalysisData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CVAnalyzer
      onAnalyze={handleAnalyze}
      analysisData={analysisData}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default ParentComponent;
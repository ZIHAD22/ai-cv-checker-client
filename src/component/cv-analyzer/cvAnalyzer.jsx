import React, { useState, useRef, useCallback } from 'react';
import { 
  AlertCircle, 
  Download, 
  Upload, 
  FileText, 
  Trash2, 
  CheckCircle,
  Info,
  BarChart3,
  Brain,
  MessageSquare,
  Target,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';
import axios from 'axios';

const CVAnalyzer = () => {
  const [cvFiles, setCvFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    missingSkills: false,
    questions: false,
    recommendations: false
  });
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);
  const [selectedCV, setSelectedCV] = useState(null);
  const fileInputRef = useRef(null);

  const scansUsed = 25;
  const totalScans = 30;
  const scansRemaining = totalScans - scansUsed;

  // Custom SVG Icons
  const ChevronDownIcon = ({ className = "w-5 h-5" }) => (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  // Loading progress simulation
  const simulateLoading = () => {
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90; // Keep at 90% until actual response
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return interval;
  };

  // File validation
  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf'];
    
    if (!allowedTypes.includes(file.type)) {
      return 'Only PDF files are allowed';
    }
    
    if (file.size > maxSize) {
      return 'File size must be less than 10MB';
    }
    
    return null;
  };

  const handleFileUpload = useCallback((files) => {
    const newFiles = [];
    const errors = [];

    Array.from(files).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        newFiles.push({
          id: Date.now() + Math.random(),
          name: file.name,
          file: file,
          size: file.size,
          isDefault: cvFiles.length === 0 && newFiles.length === 0
        });
      }
    });

    if (errors.length > 0) {
      setError(errors.join(', '));
      setTimeout(() => setError(null), 5000);
    }

    if (newFiles.length > 0) {
      setCvFiles(prev => [...prev, ...newFiles]);
      // Auto-select the first uploaded file as default
      if (cvFiles.length === 0) {
        setSelectedCV(newFiles[0]);
      }
    }
  }, [cvFiles.length]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
    e.target.value = '';
  }, [handleFileUpload]);

  const setAsDefault = useCallback((file) => {
    setCvFiles(prev => prev.map(f => ({
      ...f,
      isDefault: f.id === file.id
    })));
    setSelectedCV(file);
  }, []);

  const deleteFile = useCallback((id) => {
    setCvFiles(prev => prev.filter(file => file.id !== id));
    if (selectedCV?.id === id) {
      const remaining = cvFiles.filter(file => file.id !== id);
      setSelectedCV(remaining.length > 0 ? remaining[0] : null);
    }
  }, [selectedCV, cvFiles]);

  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const analyzeCV = async () => {
    if (!jobDescription.trim()) {
      setError('Please provide a job description to analyze your CV against');
      return;
    }

    if (!selectedCV) {
      setError('Please upload and select a CV file to analyze');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    
    const loadingInterval = simulateLoading();

    try {
      const formData = new FormData();
      formData.append('analyze_job_description', jobDescription.trim());
      formData.append('analyze_file', selectedCV.file);

      const response = await axios.post('/analyze-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 seconds for analysis
      });

      if (response.data) {
        setLoadingProgress(100);
        setTimeout(() => {
          setAnalysisResult({
            ...response.data,
            fileName: selectedCV.name,
            analyzedAt: new Date().toISOString()
          });
          
          // Auto-expand sections after successful analysis
          setExpandedSections({
            overview: true,
            missingSkills: true,
            questions: false,
            recommendations: false
          });
        }, 500);
      } else {
        setError('No analysis results received. Please try again.');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      clearInterval(loadingInterval);
      
      let errorMessage = 'Failed to analyze CV. Please try again.';
      
      if (err.response?.status === 413) {
        errorMessage = 'File size too large. Please upload a smaller file.';
      } else if (err.response?.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Analysis timeout. Please try again with a smaller file.';
      } else if (!err.response) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      setError(errorMessage);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setLoadingProgress(0);
      }, 500);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-green-500 to-green-400';
    if (score >= 60) return 'from-yellow-500 to-yellow-400';
    if (score >= 40) return 'from-orange-500 to-orange-400';
    return 'from-red-500 to-red-400';
  };

  const getPerformanceMessage = (score) => {
    if (score >= 90) return { message: "Excellent match! Your CV is perfectly aligned.", icon: Award, color: "text-green-400" };
    if (score >= 80) return { message: "Great match! Minor improvements could help.", icon: TrendingUp, color: "text-green-400" };
    if (score >= 60) return { message: "Good potential with room for enhancement.", icon: Target, color: "text-yellow-400" };
    if (score >= 40) return { message: "Moderate match. Consider significant improvements.", icon: Info, color: "text-orange-400" };
    return { message: "Low match. Major improvements needed.", icon: AlertCircle, color: "text-red-400" };
  };

  const displayScore = analysisResult?.percentage || 0;
  const performance = getPerformanceMessage(displayScore);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Analyze your CV for weaknesses
              </h1>
              <p className="text-gray-400 text-lg">
                Get AI-powered insights and detailed feedback on your CV performance
              </p>
            </div>
          </div>
          
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Job Description */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-400" />
                Job Description
              </h2>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to analyze your CV against specific requirements..."
                className="w-full h-36 p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                maxLength={5000}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {jobDescription.length}/5000 characters
                </span>
                {jobDescription.trim() && (
                  <span className="text-xs text-green-400 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Ready to analyze
                  </span>
                )}
              </div>
            </div>

            {/* My CVs Section */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-purple-400" />
                My CVs
              </h2>
              
              {/* CV Files List */}
              {cvFiles.length > 0 && (
                <div className="space-y-3 mb-6">
                  {cvFiles.map((file) => (
                    <div 
                      key={file.id} 
                      className={`bg-gray-700 rounded-lg p-4 border transition-all cursor-pointer ${
                        selectedCV?.id === file.id 
                          ? 'border-purple-500 bg-purple-500/10' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => setAsDefault(file)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="text-white font-medium truncate max-w-[200px]">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                          {selectedCV?.id === file.id && (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                                Selected
                              </span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFile(file.id);
                          }}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                          title="Delete file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                  isDragOver 
                    ? 'border-purple-400 bg-purple-500/10 scale-105' 
                    : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-300 mb-2">
                  Drop your PDF file here, or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supports single PDF file up to 10MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Scan Button */}
            <button
              onClick={analyzeCV}
              disabled={isLoading || !selectedCV || !jobDescription.trim()}
              className={`w-full font-semibold py-4 rounded-xl transition-all text-lg ${
                isLoading || !selectedCV || !jobDescription.trim()
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Analyzing CV with AI...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Analyze CV with AI
                </div>
              )}
            </button>
          </div>

          {/* Right Column - Fixed height container */}
          <div className="min-h-[600px]">
            <div className="space-y-6 h-full">
              {/* Error State */}
              {error && (
                <div className="p-4 bg-red-900/50 border border-red-700 rounded-xl backdrop-blur-sm">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-red-200">Analysis Error</h3>
                      <p className="text-sm text-red-200 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-gray-700"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={`${(loadingProgress / 100) * 251.2} 251.2`}
                          className="text-purple-500"
                          strokeLinecap="round"
                          style={{ 
                            transition: 'stroke-dasharray 0.3s ease-out'
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-purple-400">
                          {Math.round(loadingProgress)}%
                        </span>
                        <span className="text-sm text-gray-400">Analyzing</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Brain className="w-5 h-5 text-purple-400 mr-2 animate-pulse" />
                      <p className="text-purple-400 font-medium">AI Analysis in Progress</p>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Analyzing your CV against job requirements...
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${loadingProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* CV Score Half Circle - Rotated Anti-clockwise 90 degrees */}
              {!isLoading && (
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-40 h-24 relative">
                        <svg className="w-40 h-40 absolute -top-[50px]" viewBox="0 0 100 100" >
                          {/* Background half circle - horizontal bottom half */}
                          <path
                            d="M 15,50 A 35,35 0 0,1 85,50"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-700"
                          />
                          {/* Progress half circle - horizontal bottom half */}
                          <path
                            d="M 15,50 A 35,35 0 0,1 85,50"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={`${(displayScore / 100) * 109.9} 109.9`}
                            className="text-purple-500"
                            strokeLinecap="round"
                            style={{ 
                              filter: 'drop-shadow(0 0 6px rgba(168, 85, 247, 0.4))',
                              transition: 'all 0.8s ease-out'
                            }}
                          />
                        </svg>
                        <div className="flex flex-col items-center justify-end pb-2 mt-9">
                          <span className={`text-4xl font-bold ${getScoreColor(displayScore)} transition-colors `}>
                            {displayScore}%
                          </span>
                          <span className="text-sm text-gray-400 mt-1">CV Score</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Message */}
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <performance.icon className={`w-5 h-5 mr-2 ${performance.color}`} />
                      <p className={`font-medium ${performance.color}`}>
                        {performance.message}
                      </p>
                    </div>
                    {analysisResult && (
                      <div className="flex items-center justify-center text-xs text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        Analyzed: {new Date(analysisResult.analyzedAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Analysis Results - Only show when not loading */}
              {analysisResult && !isLoading && (
                <div className="space-y-4">
                  {/* Overview */}
                  <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <button
                      onClick={() => toggleSection('overview')}
                      className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${getScoreGradient(displayScore)}`}>
                          <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Analysis Overview</h3>
                          <p className="text-sm text-gray-400">CV: {analysisResult.fileName}</p>
                        </div>
                      </div>
                      <ChevronDownIcon 
                        className={`w-5 h-5 transition-transform ${
                          expandedSections.overview ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {expandedSections.overview && (
                      <div className="px-6 pb-6 bg-gray-700/30 transition-all duration-300">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-700 rounded-lg">
                            <p className="text-sm text-gray-400">Match Percentage</p>
                            <p className={`text-2xl font-bold ${getScoreColor(analysisResult.percentage)}`}>
                              {analysisResult.percentage}%
                            </p>
                          </div>
                          <div className="p-4 bg-gray-700 rounded-lg">
                            <p className="text-sm text-gray-400">Potential Questions</p>
                            <p className="text-2xl font-bold text-blue-400">
                              {analysisResult.potential_questions?.length || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Missing Skills */}
                  <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <button
                      onClick={() => toggleSection('missingSkills')}
                      className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-red-500/20">
                          <Target className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Missing Skills & Keywords</h3>
                          <p className="text-sm text-gray-400">Areas for improvement</p>
                        </div>
                      </div>
                      <ChevronDownIcon 
                        className={`w-5 h-5 transition-transform ${
                          expandedSections.missingSkills ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {expandedSections.missingSkills && (
                      <div className="px-6 pb-6 bg-gray-700/30 transition-all duration-300">
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <p className="text-red-200 leading-relaxed">
                            {analysisResult.missing_skills}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Potential Questions */}
                  <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <button
                      onClick={() => toggleSection('questions')}
                      className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-blue-500/20">
                          <MessageSquare className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Potential Interview Questions</h3>
                          <p className="text-sm text-gray-400">
                            {analysisResult.potential_questions?.length || 0} questions generated
                          </p>
                        </div>
                      </div>
                      <ChevronDownIcon 
                        className={`w-5 h-5 transition-transform ${
                          expandedSections.questions ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {expandedSections.questions && (
                      <div className="px-6 pb-6 bg-gray-700/30 transition-all duration-300">
                        <div className="space-y-3">
                          {analysisResult.potential_questions?.map((question, index) => (
                            <div key={index} className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                              <div className="flex items-start space-x-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
                                  {index + 1}
                                </span>
                                <p className="text-blue-200 leading-relaxed">
                                  {question.replace(/^\d+\.\s*/, '')}
                                </p>
                              </div>
                            </div>
                          )) || (
                            <p className="text-gray-400 text-center py-4">No questions available</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Default state - Only show when not loading and no results */}
              {!analysisResult && !isLoading && !error && (
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
                  <Brain className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg mb-2">AI-Powered CV Analysis</p>
                  <p className="text-gray-500 text-sm">
                    Upload your CV and provide a job description to get detailed AI analysis including:
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-400">
                    <div className="flex items-center justify-center">
                      <Target className="w-4 h-4 mr-2 text-purple-400" />
                      Match percentage scoring
                    </div>
                    <div className="flex items-center justify-center">
                      <Info className="w-4 h-4 mr-2 text-purple-400" />
                      Missing skills identification
                    </div>
                    <div className="flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 mr-2 text-purple-400" />
                      Interview questions preparation
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVAnalyzer;
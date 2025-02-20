const HasUsed = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg border border-gray-700 flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-100 mb-4">
          Feature Limit Reached
        </h2>
        <p className="text-gray-400 mb-6">
          You've reached the limit for free CV analysis. Sign up to continue
          using this feature.
        </p>
      </div>
    </div>
  );
};

export default HasUsed;

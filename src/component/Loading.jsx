// eslint-disable-next-line react/prop-types
const Loading = ({ loader }) => {
  return (
    <div className="max-h-screen flex justify-center items-center h-screen">
      <img src={loader} alt="" />
    </div>
  );
};

export default Loading;

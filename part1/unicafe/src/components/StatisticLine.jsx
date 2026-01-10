const StatisticLine = ({ text, value }) => {
  return (
    <>
      <div>
        {text === "positive" ? `${text} ${value} %` : `${text} ${value}`}
      </div>
    </>
  );
};

export default StatisticLine;

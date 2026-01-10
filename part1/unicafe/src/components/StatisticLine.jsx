const StatisticLine = ({ text, value }) => {
  return (
    <>
      {text === "positive" ? (
        <tr>
          <td>{text}</td><td>{value} %</td>
        </tr>
      ) : (
        <tr>
          <td>{text}</td><td>{value}</td>
        </tr>
      )}
    </>
  );
};

export default StatisticLine;

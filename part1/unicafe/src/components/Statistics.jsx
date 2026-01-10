const Statistics = ({data}) => {
  const { good, neutral, bad } = data;
//   console.log(good, neutral, bad);
  return (
    <>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {good + neutral + bad}</div>
      <div>average {(good - bad) / (good + neutral + bad)}</div>
      <div>positive {(good / (good + neutral + bad)) * 100 || 0} %</div>
    </>
  );
};

export default Statistics;

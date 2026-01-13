import Part from "./Part";

const Content = ({ parts }) => {
  const sum = parts.reduce((acc, part) => {
    console.log(acc, part.exercises);
    return acc + part.exercises;
  }, 0);
  return (
    <>
      {parts.map((part) => (
        <Part part={part} />
      ))}
      <strong>Total of {sum} exercises</strong>
    </>
  );
};
export default Content;

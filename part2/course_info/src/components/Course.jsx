import Content from "./Content";
import Header from "./Header";

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header courseName={course.name} />
          <Content parts={course.parts} />
        </div>
      ))}
    </div>
  );
};
export default Course;

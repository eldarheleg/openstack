import Part from "./Part"

const Content = ( {parts} ) => {
    const sum = parts.reduce((acc, part) => acc + part.exercises, 0);
    return (
        <div>
            {parts.map(part =>
                <Part part={part} />
            )}
            <p>Total of {sum} exercises</p>
        </div>
    )
}   
export default Content
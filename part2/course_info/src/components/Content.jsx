import Part from "./Part"

const Content = ( {parts} ) => {
    console.log(parts)
    return (
        <div>
            {parts.map(part =>
                <Part part={part} />
            )}
        </div>
    )
}   
export default Content
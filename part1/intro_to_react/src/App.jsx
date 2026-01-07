const App = () => {
  const now = new Date()
  const a = 112
  const b = 12
  console.log(a+b)
  return (
    <div>
      <p>Hello world, it is {now.toDateString()}</p>
    </div>
  )
}

export default App
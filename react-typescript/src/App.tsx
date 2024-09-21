import { useState } from "react"
import Counter from "./components/Counter"
import Heading from "./components/Heading"
import { Section } from "./components/Section"
import './index.css'

function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <Heading title="This is header" />
      <Section>This is the section component</Section>
      <Counter setCount={setCount}>The count is: {count}</Counter>
    </>
  )
}

export default App

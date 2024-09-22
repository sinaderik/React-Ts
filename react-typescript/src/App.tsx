import {useState } from "react"
import Counter from "./components/Counter"
import Heading from "./components/Heading"
import { Section } from "./components/Section"
import './index.css'
import List from "./components/List"

function App() {
  const [count, setCount] = useState<number>(0)
  
  function renderItem(item: string): JSX.Element {
    return (
      <span className="gold">{item}</span>
    )
  }
  
  return (
    <>
      <Heading title="This is header" />
      <Section>This is the section component</Section>
      <Counter setCount={setCount}>The count is: {count}</Counter>
      <List items={['coffee','tea']} render={renderItem}/>
    </>
  )
}

export default App

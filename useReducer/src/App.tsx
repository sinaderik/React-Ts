import Counter from "./Counter"
import './index.css'

const App = () => {
  return (
    <>
    <Counter>{(n:number)=><>Counter: {n}</>}</Counter>
    </>
  )
}

export default App
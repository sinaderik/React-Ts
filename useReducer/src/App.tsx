import { CounterProvider, initialState } from "./context/CounterContext"
import Counter from "./Counter"
import './index.css'

const App = () => {
  return (
    <CounterProvider count={initialState.count} text={initialState.text}>
      <>
        <Counter>{(n: number) => <>Counter: {n}</>}</Counter>
      </>
    </CounterProvider>
  )
}

export default App
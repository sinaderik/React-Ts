import { ReactNode } from "react"
import { useCounter, useCounterText } from "./context/CounterContext"


type Children = {
    children: (n: number) => ReactNode
}


const Counter = ({ children }: Children) => {
    // const [count, setCount] = useState<number>(0)
    const { count, increment, decrement } = useCounter()
    const { text, handleTextInput } = useCounterText()
    return (
        <>
            <h1>{children(count)}</h1>
            <div>
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
            </div>
            <input onChange={handleTextInput} value={text} type="text" />
        </>
    )
}

export default Counter
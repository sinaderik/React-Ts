import { ChangeEvent, ReactNode, useReducer } from "react"


type Children = {
    children: (n: number) => ReactNode
}


const Counter = ({ children }: Children) => {
    // const [count, setCount] = useState<number>(0)
   
    return (
        <>
            <h1>{children(state.count)}</h1>
            <div>
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
            </div>
            <input onChange={handleTextInput} value={state.text} type="text" />
        </>
    )
}

export default Counter
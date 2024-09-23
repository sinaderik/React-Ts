import { ChangeEvent, ReactNode, useReducer } from "react"


const enum REDUCER_ACTION_TYPE {
    INCREMENT,
    DECREMENT,
    NEW_INPUT,
}
type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    payload?: string
}
type Children = {
    children: (n: number) => ReactNode
}
const initialState = { count: 0, text: '' }

const reducer = (state: typeof initialState, action: ReducerAction): typeof initialState => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.INCREMENT:
            return { ...state, count: state.count + 1 }
        case REDUCER_ACTION_TYPE.DECREMENT:
            return { ...state, count: state.count - 1 }
        case REDUCER_ACTION_TYPE.NEW_INPUT:
            // here we're saying if its undefined put an empty string
            return { ...state, text: action.payload ?? '' }
        default:
            return { ...state }
    }
}

const Counter = ({ children }: Children) => {
    // const [count, setCount] = useState<number>(0)
    const [state, dispatch] = useReducer(reducer, initialState)

    const increment = () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT })
    const decrement = () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT })
    const handleTextInput = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault()
        dispatch({
            type: REDUCER_ACTION_TYPE.NEW_INPUT,
            payload: event.target.value,
        })
    }
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
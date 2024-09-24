import { ChangeEvent, createContext, ReactElement, useReducer } from "react";

const enum REDUCER_ACTION_TYPE {
    INCREMENT,
    DECREMENT,
    NEW_INPUT,
}
type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    payload?: string
}
type StateType = {
    count: number,
    text: string
}

const initialState: StateType = { count: 0, text: '' }

const reducer = (state: StateType, action: ReducerAction): StateType => {
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

const useCounterContex = (initialState: StateType) => {
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

    return { state, increment, decrement, handleTextInput }
}
type UseCounterContextType = ReturnType<typeof useCounterContex>
const initialContextState: UseCounterContextType = {
    state: initialState,
    increment: () => { },
    decrement: () => { },
    handleTextInput: (event: ChangeEvent<HTMLInputElement>) => { }
}
type CounterChildrenType = {
    children?: ReactElement | undefined
}
export const counterContext = createContext<UseCounterContextType>(initialContextState)

export const counterProvider = ({ children, ...initialState }:CounterChildrenType & StateType):ReactElement=>{
    return(
        <counterContext.Provider value={useCounterContex(initialState)}>
            {children}
        </counterContext.Provider>
    )
}
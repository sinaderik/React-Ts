import { ChangeEvent, createContext, ReactElement, useCallback, useContext, useReducer } from "react";

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

export const initialState: StateType = { count: 0, text: '' }

const reducer = (state: StateType, action: ReducerAction): StateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.INCREMENT:
            return { ...state, count: state.count + 1 }
        case REDUCER_ACTION_TYPE.DECREMENT:
            return { ...state, count: state.count - 1 }
        case REDUCER_ACTION_TYPE.NEW_INPUT:
            // here we're saying if its undefined put an empty string.
            return { ...state, text: action.payload ?? '' }
        default:
            return { ...state }
    }
}

const useCounterContex = (initialState: StateType) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const increment = useCallback(() => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT }), [])
    const decrement = useCallback(() => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT }), [])

    const handleTextInput = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault()
        dispatch({
            type: REDUCER_ACTION_TYPE.NEW_INPUT,
            payload: event.target.value,
        })
    }, [])

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
export const CounterContext = createContext<UseCounterContextType>(initialContextState)

export const CounterProvider = ({ children, ...initialState }: CounterChildrenType & StateType): ReactElement => {
    return (
        <CounterContext.Provider value={useCounterContex(initialState)}>
            {children}
        </CounterContext.Provider>
    )
}

type UseCounterHookType = {
    count: number,
    increment: () => void,
    decrement: () => void,
}
type UseCounterTextHookType = {
    text: string,
    handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void
}
export const useCounter = (): UseCounterHookType => {
    const { state: { count }, increment, decrement } = useContext(CounterContext)
    return { count, increment, decrement }
}
export const useCounterText = (): UseCounterTextHookType => {
    const { state: { text }, handleTextInput } = useContext(CounterContext)
    return { text, handleTextInput }
}
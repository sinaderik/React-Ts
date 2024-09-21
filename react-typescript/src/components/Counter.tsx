import { ReactNode } from "react"

type Counter = {
    setCount: React.Dispatch<React.SetStateAction<number>>,
    children: ReactNode
}

const Counter = ({ setCount, children }: Counter): JSX.Element => {
    return (
        <>
            <h1>{children}</h1>
            <button onClick={() => setCount((prev => prev + 1))}>+</button>
            <button onClick={() => setCount((prev => prev - 1))}>-</button>
        </>
    )
}

export default Counter
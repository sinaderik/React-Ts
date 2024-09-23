import { ReactNode, useState } from "react"

type Children = {
    children: (n: number) => ReactNode
}

const Counter = ({ children }: Children) => {
    const [count, setCount] = useState<number>(0)
    return (
        <>
            <h1>{children(count)}</h1>
            <div>
                <button onClick={() => setCount(prev => prev + 1)}>+</button>
                <button onClick={() => setCount(prev => prev - 1)}>-</button>
            </div>
        </>
    )
}

export default Counter
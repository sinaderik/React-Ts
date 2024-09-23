import { KeyboardEvent, MouseEvent, useCallback, useEffect, useMemo, useState } from "react"
interface Users {
  id: number,
  username: string
}
type Fibonacci = (n: number) => number

const App = () => {
  const [count, setCount] = useState<number>(0)
  const [users, setUsers] = useState<Users[] | null>(null)

  useEffect(() => {
    console.log('mount')
    console.log('users: ', users)

    return () => console.log('unmount')
  }, [users])

  const fibonacci: Fibonacci = (n) => {
    if (n < 2) return n
    return fibonacci(n - 1) + fibonacci(n - 2)
  }

  const countPlusTwo = useCallback((e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>): void => {
    setCount(previous => previous + 2)
  }, [])

  const fibonacciNumber = 39
  const result: number = useMemo<number>(() => fibonacci(fibonacciNumber), [fibonacciNumber])
  
  return (
    <>
      <h1>{count}</h1>
      <button onClick={countPlusTwo}>+ 2</button>
      <h2>Fibonacci result: {result}</h2>
    </>
  )
}

export default App
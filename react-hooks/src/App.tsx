import { KeyboardEvent, MouseEvent, useCallback, useEffect, useState } from "react"
interface Users {
  id: number,
  username: string
}
const App = () => {
  const [count, setCount] = useState<number>(0)
  const [users, setUsers] = useState<Users[] | null>(null)

  useEffect(() => {
    console.log('mount')
    console.log('users: ', users)

    return () => console.log('unmount')
  }, [users])

  const countPlusTwo = useCallback((e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>): void => {
    setCount(previous => previous + 2)
  }, [])

  return (
    <>
      <h1>{count}</h1>
      <button onClick={countPlusTwo}>+ 2</button>
    </>
  )
}

export default App
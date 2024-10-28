import { useState } from 'react'
import { Button } from '~/components/ui/button';

export default function Home() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  const onClickHandler = () => {
    increment()
  }

  return (
    <>
      <h1>Hello React inertia</h1>
      <Button onClick={onClickHandler}>
      Increment Count
      </Button>
      <span>{count}</span>
    </>
  )
}

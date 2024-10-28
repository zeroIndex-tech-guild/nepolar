import { Head } from '@inertiajs/react'
import { useState } from 'react'

export default function Home(props) {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount(prevCount => prevCount + 1);
  }

  console.log({ props })

  return (
    <>
      <h1>Hello React inertia</h1>
      <button onClick={onClick} className='text-3xl bg-red-100'>Click me {count}</button>
    </>
  )
}

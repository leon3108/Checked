import { useEffect, useState } from 'react';
import Form from './form'
import Image from 'next/image'

export default function LargeContent() {
  const [windowSize, setWindow] = useState<{ width: number | undefined, height: number | undefined }>({ width: undefined, height: undefined });
  useEffect(() => {
    setWindow({ width: window.innerWidth, height: window.innerHeight });
  }, [])

  if (windowSize.width! < 1024) {
    return <div className="flex flex-col items-center">
      <Image className='animate-tinyBounce' src="/todos.png" width="500" height="100" alt="todos" />
      <div className='h-8'></div>
      <Form />
    </div>
  } else {
    return <div className='flex justify-around'>
      <Image className='animate-tinyBounce' src="/todos.png" width="700" height="700" alt="todos" />
      <Form />
    </div>
  }

}
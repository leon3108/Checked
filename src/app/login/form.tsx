import Button from '@/components/button'
import Input from '@/components/input'
import { useToasterContext } from '@/context/toasterTextContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Form() {
  const [email, setEmail] = useState('')
  const [isLogIn, setIsLogIn] = useState(true)
  const [password, setPassword] = useState('')
  const [isEmailError, setIsEmailError] = useState(false)
  const [isPasswordError, setIsPasswordError] = useState(false)
  const [waitResForm, setWaitResForm] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [, setToasterText] = useToasterContext()

  const SignIn = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log('sign in')
    if (error === null) {
      router.push('/')
    } else {
      console.log('error', error)
      setToasterText('ERROR : ' + error.message)
    }
  }

  const SignUp = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: 'https://checkd.online/' },
    })
    if (!error) {
      setToasterText('Please check your email to confirm your account')
    } else {
      console.log('error', error)
      setToasterText('ERROR : ' + error.message)
    }
  }

  const SubmitForm = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (email === '' && password === '') {
      setIsEmailError(true)
      setIsPasswordError(true)
      return
    }
    if (email === '') {
      setIsEmailError(true)
      return
    }
    if (password === '') {
      setIsPasswordError(true)
      return
    }
    setWaitResForm(true)
    if (isLogIn) {
      await SignIn({ email, password })
    } else {
      await SignUp({ email, password })
    }
    setWaitResForm(false)
  }

  return (
    <div
      className="w-80 h-70 lg:w-96 flex flex-col items-center 
  bg-gray-200 rounded-xl mb-4"
    >
      <div className="flex w-full h-12 items-center border-b border-gray-500">
        <span
          onClick={() => setIsLogIn(true)}
          className={`cursor-pointer w-6/12 h-full flex 
      items-center justify-center border-r	border-gray-500 rounded-tl-xl
      ${isLogIn ? 'bg-gray-700' : ''}`}
        >
          <p>Log In</p>
        </span>
        <span
          onClick={() => setIsLogIn(false)}
          className={`cursor-pointer w-6/12 h-full flex 
      items-center justify-center border-l border-gray-500 rounded-tr-xl
      ${isLogIn ? '' : 'bg-gray-700'}`}
        >
          <p>Sign Up</p>
        </span>
      </div>
      <div className="flex flex-col w-60 justify-around items-center">
        <form className="flex flex-col items-center pt-2">
          <Input
            type="email"
            htmlFor="email"
            label="Email"
            isError={isEmailError}
            placeholder="johndoe@gmail.com"
            onchange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <Input
            type="password"
            htmlFor="password"
            label="Password"
            isError={isPasswordError}
            placeholder="*******"
            onchange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <div className="flex justify-around my-4">
            <Button
              type="submit"
              text={isLogIn ? 'Log in' : 'Create an account'}
              className={isLogIn ? '' : 'w-44'}
              onClick={(e) => SubmitForm(e)}
              step={waitResForm ? 'loading' : ''}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

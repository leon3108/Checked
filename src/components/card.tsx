import { LeftContent } from '@/app/leftContent'
import { RightContent } from '@/app/rightContent'
import '@/components/card.css'
import { Star } from '@/components/star'
import { useToasterContext } from '@/context/toasterTextContext'
import { useTodosToDeleteContext } from '@/context/todoToDeleteContext'
import { Todo } from '@/dto/todos.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

export default function Card({
  todo,
  id,
  tab,
}: {
  todo: Todo
  id: number
  tab: string
}) {
  const [is_finished, setIs_finished] = useState(todo.is_finished)
  const [is_favorite, setIs_favorite] = useState(todo.is_favorite)
  const [is_deleted, setIs_deleted] = useState(todo.is_deleted)
  const supabase = createClientComponentClient()
  const [todosToDelete, setTodosToDelete] = useTodosToDeleteContext()
  const [, setToasterText] = useToasterContext()

  const handleTodoState = async () => {
    const { data, error } = await supabase
      .from('todo')
      .update({
        is_finished: !is_finished,
      })
      .eq('id', todo.id)
    if (error) {
      setToasterText({ message: error.message, type: 'ERROR' })
      return console.log(error)
    }
    setIs_finished(!is_finished)
  }

  const addTodoInTrash = async () => {
    setIs_deleted(true)
    const { data, error } = await supabase
      .from('todo')
      .update({ is_deleted: true })
      .eq('id', todo.id)
    if (error) {
      setToasterText({ message: error.message, type: 'ERROR' })
      return console.log(error)
    }
  }

  const addTodoInFavorite = async () => {
    const { data, error } = await supabase
      .from('todo')
      .update({
        is_favorite: !is_favorite,
      })
      .eq('id', todo.id)
    if (error) {
      setToasterText({ message: error.message, type: 'ERROR' })
      return console.log('error ', error)
    }
    setIs_favorite(!is_favorite)
  }

  const addTodoToDelete = () => {
    if (!todosToDelete.includes(todo))
      setTodosToDelete([...todosToDelete, todo])
  }

  const restoreTodo = async () => {
    const { data, error } = await supabase
      .from('todo')
      .update({
        is_deleted: false,
      })
      .eq('id', todo.id)
    if (error) {
      setToasterText({ message: error.message, type: 'ERROR' })
      return console.log(error)
    }
    setIs_deleted(false)
    setTodosToDelete(todosToDelete.filter((e) => e.id !== todo.id))
  }

  if (tab == 'listFavorite' && !is_favorite) return <></>
  if (tab == 'listAll' && is_deleted) return <></>
  if (tab == 'listChecked' && !is_finished) return <></>
  if (tab == 'listUnchecked' && is_finished) return <></>
  if (tab == 'listDeleted' && !is_deleted) return <></>
  return (
    <article
      id={`card-${id}`}
      onClick={addTodoToDelete}
      className={` 
  m-6 flex animate-wiggle flex-col rounded-3xl border-4 border-solid border-gray-200 p-6 
  transition-all duration-500 ease-in hover:scale-y-110 hover:pl-4
  ${is_finished ? 'background-gradient-left-to-right border-green' : ''} 
  ${is_favorite ? `border-star-yellow` : ``} 
  ${is_deleted ? `border-red` : ``}
`}
    >
      <div className="flex flex-row-reverse">
        <RightContent
          handleDeleteTodo={addTodoInTrash}
          restoreTodo={restoreTodo}
          handleTodoState={handleTodoState}
          id={id}
          is_deleted={is_deleted}
          is_finished={is_finished}
        />
        <Star
          handleTodoFavorite={addTodoInFavorite}
          id={id}
          is_favorite={is_favorite}
        />
        <LeftContent todo={todo} />
      </div>
    </article>
  )
}

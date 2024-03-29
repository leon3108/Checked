import Button from '@/components/button'
import TodosToDelete from '@/components/todosToDelete'
import { useToasterContext } from '@/context/toasterTextContext'
import { useTodosToDeleteContext } from '@/context/todoToDeleteContext'
import { useTodosContext } from '@/context/todosContext'
import { Todo } from '@/dto/todos.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function DeleteBar() {
  const supabase = createClientComponentClient()
  const [todosToDelete, setTodosToDelete] = useTodosToDeleteContext()
  const [todos, setTodos] = useTodosContext()
  const [, setToasterText] = useToasterContext()

  const deleteTodoTags = async (todo: Todo) => {
    let { data, error } = await supabase
      .from('todo_tag')
      .delete()
      .eq('todo_id', todo.id)
    if (error) {
      setToasterText('ERROR : ' + error.message)
      return console.log(error)
    }
  }

  const deleteTodo = async (todo_id: number) => {
    const { data, error } = await supabase
      .from('todo')
      .delete()
      .eq('id', todo_id)
    if (error) {
      setToasterText('ERROR : ' + error.message)
      return console.log(error)
    }
  }

  const removeTodo = async () => {
    let newTodos = todos
    for (const todo of todosToDelete) {
      await deleteTodoTags(todo)
      await deleteTodo(todo.id).then(() => {
        newTodos = newTodos.filter((e) => e.id !== todo.id)
        setTodos(newTodos)
      })
    }
    setTodosToDelete([])
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex">
        {todosToDelete.map((e, i) => (
          <TodosToDelete key={i} name={e.title} />
        ))}
      </div>
      <div></div>
      {todosToDelete.length > 0 && (
        <Button text="Delete" onClick={removeTodo} type="button" />
      )}
    </div>
  )
}

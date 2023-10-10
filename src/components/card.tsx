import { useContext, useState } from "react";
import "@/components/card.css"
import { LeftContent } from "@/components/leftContent";
import { RightContent } from "@/components/rightContent";
import { Star } from "@/components/star";
import { TodosToDeleteContext } from "@/context/todoToDeleteContext";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getModalContext } from '@/context/modalTextContext';
import { Todo } from "@/dto/todos.types";

export default function Card({ todo, id, tab }: {
  todo: Todo;
  id: number;
  tab: string;
}) {
  const [is_finished, setIs_finished] = useState(todo.is_finished);
  const [is_favorite, setIs_favorite] = useState(todo.is_favorite);
  const [is_deleted, setIs_deleted] = useState(todo.is_deleted);
  const supabase = createClientComponentClient();

  const context = useContext(TodosToDeleteContext);
  if (!context) {
    console.error("context is null");
    return <></>
  }
  const [todosToDeleteContext, setTodosToDeleteContext] = context;
  const [, setModalText] = getModalContext();

  const handleTodoState = async () => {
    const { data, error } = await supabase.from('todo').update({
      is_finished: !is_finished
    }).eq('id', todo.id);
    if (error) {
      setModalText("ERROR : " + error.message);
      return console.log(error);
    }
    setIs_finished(!is_finished);
  }

  const addTodoInTrash = async () => {
    setIs_deleted(true);
    const { data, error } = await supabase.from('todo')
      .update({ is_deleted: true }).eq('id', todo.id);
    if (error) {
      setModalText("ERROR : " + error.message);
      return console.log(error);
    }
    // la ligne update quand on delete la todo
    // il faudrait mettre d'abord une anim pour montrer qu'on delete
    // puis seulement quand l'anim est finit on delete
    // setTodos(todos.filter((e, i) => i != id));
  }

  const addTodoInFavorite = async () => {
    const { data, error } = await supabase.from('todo').update({
      is_favorite: !is_favorite
    }).eq('id', todo.id);
    if (error) {
      setModalText("ERROR : " + error.message);
      return console.log("error ", error);
    }
    setIs_favorite(!is_favorite);
  }

  const addTodoToDelete = () => {
    if (!todosToDeleteContext.includes(todo))
      setTodosToDeleteContext([...todosToDeleteContext, todo]);
  }

  const restoreTodo = async () => {
    const { data, error } = await supabase.from('todo').update({
      is_deleted: false
    }).eq('id', todo.id);
    if (error) {
      setModalText("ERROR : " + error.message);
      return console.log(error);
    }
    setIs_deleted(false);
  }

  if (tab == "listFavorite" && !is_favorite) return (<></>);
  if (tab == "listAll" && is_deleted) return (<></>);
  if (tab == "listChecked" && !is_finished) return (<></>);
  if (tab == "listUnchecked" && is_finished) return (<></>);
  if (tab == "listDeleted" && !is_deleted) return (<></>);
  return <article id={`card-${id}`} onClick={addTodoToDelete} className={` 
  rounded-3xl p-6 m-6 border-gray-200 border-solid border-4 flex flex-col hover:pl-4 
  transition-all ease-in duration-500 animate-wiggle hover:scale-y-110
  ${is_finished ? "background-gradient-left-to-right border-green" : ""} 
  ${is_favorite ? `border-star-yellow` : ``} 
  ${is_deleted ? `border-red` : ``}
`}>
    <div className="flex flex-row-reverse">
      <RightContent handleDeleteTodo={addTodoInTrash}
        restoreTodo={restoreTodo}
        handleTodoState={handleTodoState} id={id}
        is_deleted={is_deleted} is_finished={is_finished} />
      <Star handleTodoFavorite={addTodoInFavorite} id={id} is_favorite={is_favorite} />
      <LeftContent
        todo={todo}
      />
    </div>
  </article>

}
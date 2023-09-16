import { CardProps } from "./card.props";
import { useContext, useState } from "react";
import "./card.css"
import { LeftContent } from "./leftContent";
import { RightCard } from "./rightCard";
import { Star } from "./star";
import { supabase } from "@/SupabaseClient";
import { TodosToDeleteContext } from "@/context/todoToDeleteContext";

export default function Card(props: CardProps) {
  const [isFinished, setIsFinished] = useState(props.todo.isFinished);
  const [isFavorite, setIsFavorite] = useState(props.todo.isFavorite);
  const [isDeleted, setIsDeleted] = useState(props.todo.isDeleted);

  const context = useContext(TodosToDeleteContext);
  if (!context) {
    console.error("context is null");
    return <></>
  }
  const [todosToDeleteContext, setTodosToDeleteContext] = context;

  const handleTodoState = async () => {
    const { data, error } = await supabase.from('todo').update({
      isFinished: !isFinished
    }).eq('id', props.todo.id);
    if (error) return console.log(error);
    setIsFinished(!isFinished);
  }

  const addTodoInTrash = async () => {
    setIsDeleted(true);
    const { data, error } = await supabase.from('todo')
      .update({ isDeleted: true }).eq('id', props.todo.id);
    if (error) return console.log(error);

    // la ligne update quand on delete la todo
    // il faudrait mettre d'abord une anim pour montrer qu'on delete
    // puis seulement quand l'anim est finit on delete
    // setTodos(todos.filter((e, i) => i != props.id));
  }

  const addTodoInFavorite = async () => {
    const { data, error } = await supabase.from('todo').update({
      isFavorite: true
    }).eq('id', props.todo.id);
    setIsFavorite(!isFavorite);
  }

  const addTodoToDelete = () => {
    if (!todosToDeleteContext.includes(props.todo))
      setTodosToDeleteContext([...todosToDeleteContext, props.todo]);
  }

  if (props.tab == "listFavorite" && !isFavorite) return (<></>);
  if (props.tab == "listChecked" && !isFinished) return (<></>);
  if (props.tab == "listUnchecked" && isFinished) return (<></>);
  if (props.tab == "listDeleted" && !isDeleted) return (<></>);
  return <div id={`card-${props.id}`} onClick={addTodoToDelete} className={` 
  rounded-3xl p-6 m-6 border-[#D9D9D9] border-solid border-4 flex flex-col hover:pl-4 
  transition-all ease-in duration-500 animate-wiggle hover:scale-y-110
  ${isFinished ? "background-gradient-left-to-right border-[#22c55e]" : ""} 
  ${isFavorite ? `border-[#FFC700]` : ``} 
  ${isDeleted ? `background-gradient-left-to-right-deleted` : ``} 
  `}>
    <div className="flex flex-row-reverse">
      <RightCard handleDeleteTodo={addTodoInTrash}
        handleTodoState={handleTodoState} id={props.id}
        isDeleted={isDeleted} isFinished={isFinished} />
      <Star handleTodoFavorite={addTodoInFavorite} id={props.id} isFavorite={isFavorite} />
      <LeftContent
        todo={props.todo}
      />
    </div>
  </div>

}
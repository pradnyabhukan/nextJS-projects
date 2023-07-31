import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import Link from "next/link";



function getTodos() {
  return prisma.todo.findMany()
}



export default async function Home() {

  const todos = await getTodos()
  // await prisma.todo.create({ data: {title:"test", complete:false}})
  return (<>
    <div className="home-page">
      <header className="header">
        <h1 className="heading"> TODOs </h1>
        
      </header>
      <ul className="tasks">
        {todos.map(todo => (
          <TodoItem  key={todo.id } {...todo}/>
        ))}
      </ul>
      <Link className="new-button" href="/new"> Create New Task </Link>
    </div>
    
  </>)
}
 
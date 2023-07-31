import { prisma } from "@/db";
import { redirect } from "next/navigation"
import Link from "next/link";

async function createTodo(data : FormData) {
    "use server"
    const title = data.get("title")?.valueOf()
    if(typeof title !== "string" || title.length === 0){
        throw new Error("Invalid Title!");
        
    }

    await prisma.todo.create(
        {data: {title, complete:false}}
    )
    
    redirect("/")
}

export default function Page() {
    return (<>
        <div className="new">
            <header className="">
                <h1 className="heading"> Creat a new Task </h1>  
            </header>

            <form action={createTodo}> 
                <input className="input-box"
                    type="text"
                    name="title"
                />
                <div className="buttons-div">
                    <Link href=".." className="custom-button" >Cancel</Link>
                    <button type="submit" className="custom-button" >Create</button>
                </div>
            </form>
        </div>
      </>)
}

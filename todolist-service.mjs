export class TodolistService{
    todoList = [
        "Programmer", "Novin", "Imut"
    ];

    getJsonTodoList(){
        return JSON.stringify({
            code: 200,
            status: "success",
            data: this.todoList.map(
                (value, index) => {
                    return {
                        id: index+1,
                        todo: value
                    }
                }
            )
        }
        )
    }

    getTodoList(req, res){

        res.write(this.getJsonTodoList())
        res.end()
    }

    createTodo(req, res){
        req.addListener("data", (data) => {
            const body = JSON.parse(data.toString())
            this.todoList.push(body.todo)

            res.write(this.getJsonTodoList())
            res.end()
        })
    }

    updateTodo(req, res){
        req.addListener("data", (data) => {
            const body = JSON.parse(data.toString())
            if(this.todoList[body.id]){
                this.todoList[body.id] = body.todo
            }

            res.write(this.getJsonTodoList())
            res.end()
        })
    }

    deleteTodo(req, res){
        req.addListener("data", (data) => {
            const body = JSON.parse(data.toString())
            if(this.todoList[body.id]){
                this.todoList.splice(body.id, 1)
            }

            res.write(this.getJsonTodoList())
            res.end()
        })
    }
}
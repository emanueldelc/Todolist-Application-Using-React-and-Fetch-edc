// fetchTodos, deleteTaskAPI, createUser, deleteAllTasksinAPI, addTaskToAPI
const API_URL= "https://playground.4geeks.com/todo"
const user = "Manny";

export const fetchTodos = (setTodos) => {
    fetch(`${API_URL}/users/${user}`)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("failed to fetch to list. status:", resp.status);
            }
            return resp.json();
        })
        .then((data) => {
            if (data && Array.isArray(data.todos)) {
                setTodos(data.todos)
            } else {
                console.error("fetch data is not an array or data does not exist", data.todos);
                setTodos([])
            }
        })
        .catch((error) => {
            console.error("there's been a problem with your fetch operation", error)
        })
}

export const createUser = () => {
    fetch(`${API_URL}/users/${user}`, {
        method: "POST", 
        body: JSON.stringify([]),
        headers:{"Content-Type": "application/json"}
    })
        .then((resp) => {
            if (resp.ok) {
                alert("user, Manny, has been created successfully in API. You can now save tasks")
            }
            return resp.json();
        })
        
        .catch((error) => {
            console.error("error creating User and API", error)
        })
}
export const deleteAllTasksinAPI = async (setTodos) => {
    try {
        const resp = await fetch(`${API_URL}/users/${user}`, {
            method: "DELETE", 
            headers:{"Content-Type": "application/json"}
        })
        if (!resp.ok) {
            throw new Error("failed to delete User and tasks", resp.status);
        }
        setTodos([])
        alert("User and tasks have been deleted. Please add user to add tasks")
    } catch (error) {
        console.error("error deleting User and tasks from API", error)
    }
}
export const addTaskToAPI = async (thisToDo, setTodos) => {
    try {
        const resp = await fetch(`${API_URL}/todos/${user}`, {
            method: "DELETE", 
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({thisToDo})
        })
        if (!resp.ok) {
            throw new Error("failed to add task", resp.status);
        }
        console.log("new todo added to API", thisToDo)
        fetchTodos(setTodos);
    } catch (error) {
        console.error("error adding task to API", error)
    }
}
export const deleteTaskAPI = async (todoId, setTodos) => {
    try {
        const resp = await fetch(`${API_URL}/todos/${todoId}`, {
            method: "DELETE", 
            headers:{"Content-Type": "application/json"},
        })
        if (!resp.ok) {
            throw new Error("failed to delete task", resp.status);
        }
        console.log("todo deleted successfuly from API")
        fetchTodos(setTodos);
    } catch (error) {
        console.error("error deleting task from API", error)
    }
}

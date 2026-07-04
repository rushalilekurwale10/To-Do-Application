let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.className = "task";

        if(task.completed){
            span.classList.add("completed");
        }

        span.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = () => {
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

}

function addTask(){

    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if(text === ""){
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text:text,
        completed:false
    });

    saveTasks();
    renderTasks();

    input.value="";
}

renderTasks();
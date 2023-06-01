{

    const tasks = [];

    const removeTask = (index) =>{
        tasks.splice(index, 1)
        render();
    }

    const toggleDone = (index) =>{
        tasks[index].done = !tasks[index].done
        render();
    }

    const render = () =>{
        let htmlString = "";
        for (const task of tasks) {
            htmlString +=`
            <li class="taskList__task">
            <button class="js-done">${task.done ? "✔" : ""} </button>
            <span class="${task.done ? "taskList__task--lineTrough" : ""}"> ${task.content}</span>
            <button class="js-remove">🗑</button>
            </li>
            `; 
        }
        document.querySelector(".js-tasks").innerHTML=htmlString;

        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton,index)=>{
            toggleDoneButton.addEventListener('click',()=>{
                toggleDone(index);
            })
        })

        const removeTaskButtons = document.querySelectorAll(".js-remove");
        removeTaskButtons.forEach((removeTaskButton,index)=>{
            removeTaskButton.addEventListener('click',()=>{
                removeTask(index)
                })
            })
    
    };

    const deleteAllTasks = () =>{
        tasks.splice(0, tasks.length)
        render();
    }

    const addNewTask = (event) =>{
        event.preventDefault();
        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskText=newTaskInput.value.trim();
        tasks.push({content:newTaskText, done:false,});
        newTaskInput.focus();
        newTaskInput.value="";
        render();
    };

    const init = () =>{
        const deleteAllTasksButton = document.querySelector(".js-deleteAll");
        const form = document.querySelector(".js-form");

        deleteAllTasksButton.addEventListener('click',deleteAllTasks);
        form.addEventListener("submit", addNewTask);
        render();
    }

    init();
}
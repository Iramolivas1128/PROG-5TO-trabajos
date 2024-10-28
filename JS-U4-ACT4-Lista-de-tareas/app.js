const input = document.querySelector('.form-control');
const boton = document.querySelector('#add-task-btn');
const listaTareas = document.getElementById('task-list');


document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    loadDeletedTasks();
});


boton.addEventListener('click', addTask);
input.addEventListener('keydown', (e) =>{
    if(e.key ==='Enter'){
        addTask();
    }
})



function addTask() {
    if (input.value.trim()) {
        const nuevaTarea = document.createElement('li');
        nuevaTarea.className = "list-group-item d-flex justify-content-between align-items-center";
        nuevaTarea.textContent = input.value;

    
        const completarTarea = document.createElement("i");
        completarTarea.className = "bi bi-check-circle text-success complete-icon"; 
        completarTarea.style.cursor = "pointer";

      
        const borrarTarea = document.createElement("button");
        borrarTarea.className = "btn btn-danger delete-btn ms-2";
        borrarTarea.textContent = "Eliminar";

    
        const iconContainer = document.createElement("div");
        iconContainer.className = "d-flex align-items-center";
        iconContainer.appendChild(completarTarea);
        iconContainer.appendChild(borrarTarea);

        nuevaTarea.appendChild(iconContainer);

   
        completarTarea.addEventListener("click", () => {
            nuevaTarea.classList.toggle("completed");
            if (nuevaTarea.classList.contains("completed")) {
                completarTarea.classList.remove("bi-check-circle");
                completarTarea.classList.add("bi-check-circle-fill");
            } else {
                completarTarea.classList.remove("bi-check-circle-fill");
                completarTarea.classList.add("bi-check-circle");
            }
            saveTasks();
        });

     
        borrarTarea.addEventListener("click", (e) => {
            e.stopPropagation();
            addToDeletedTasks(nuevaTarea.textContent.replace("Eliminar", "").trim(), nuevaTarea.classList.contains("completed"));
            nuevaTarea.remove();
            saveTasks();
        });

        listaTareas.appendChild(nuevaTarea);
        input.value = "";
        saveTasks();
    } else {
        alert('Favor de ingresar una tarea');
    }
}


function saveTasks() {
    const tasks = Array.from(listaTareas.children).map(li => ({
        text: li.firstChild.textContent.trim(),
        completed: li.classList.contains("completed")
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const nuevaTarea = document.createElement('li');
        nuevaTarea.className = "list-group-item d-flex justify-content-between align-items-center";
        nuevaTarea.textContent = task.text;

        if (task.completed) {
            nuevaTarea.classList.add("completed");
        }

        const completarTarea = document.createElement("i");
        completarTarea.className = task.completed ? "bi bi-check-circle-fill text-success complete-icon" : "bi bi-check-circle text-success complete-icon";
        completarTarea.style.cursor = "pointer";

        const borrarTarea = document.createElement("button");
        borrarTarea.className = "btn btn-danger delete-btn ms-2";
        borrarTarea.textContent = "Eliminar";

        const iconContainer = document.createElement("div");
        iconContainer.className = "d-flex align-items-center";
        iconContainer.appendChild(completarTarea);
        iconContainer.appendChild(borrarTarea);

        nuevaTarea.appendChild(iconContainer);

        completarTarea.addEventListener("click", () => {
            nuevaTarea.classList.toggle("completed");
            completarTarea.classList.toggle("bi-check-circle-fill");
            completarTarea.classList.toggle("bi-check-circle");
            saveTasks();
        });

        borrarTarea.addEventListener("click", (e) => {
            e.stopPropagation();
            addToDeletedTasks(nuevaTarea.textContent.replace("Eliminar", "").trim(), nuevaTarea.classList.contains("completed"));
            nuevaTarea.remove();
            saveTasks();
        });

        listaTareas.appendChild(nuevaTarea);
    });
}


function addToDeletedTasks(text, completed) {
    const deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
    deletedTasks.push({ text, completed });
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
}


function loadDeletedTasks() {
    const deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
    console.log("Historial de tareas eliminadas:", deletedTasks);
}

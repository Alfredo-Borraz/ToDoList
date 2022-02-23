
document.addEventListener('DOMContentLoaded', ()=>{
    let button = document.getElementById("send");
let buttonDelate = document.getElementById("delate");
let nombre = document.getElementById("name");
let tarea = document.getElementById("task");
let descripcion = document.getElementById("description");

const task = {
    name: nombre.value,
    task: tarea.value,
    description: descripcion.value
}


button.addEventListener("click", function (e) {
    e.preventDefault()
    console.log("task", task);
    fetch('http://localhost:3000/api/tareas', {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            "Content-type": "application/json",

        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        clearForm();
    })
    .catch(err => {
        console.error("Error==>", err);
    })
});

const fetchTareas = () => {
    fetch("http://localhost:3000/api/tareas")
        .then(response => {
            /*         console.log(response); */
            if (!response.ok) {
                console.error("error");
            }
            return response.json(); ///====> data 
        })
        .then(data => {
            console.log(data);
            data.forEach(tarea => {
                printTasks(tarea);
            });
        }).catch((err)=>{
            console.error("Err====>",err);
        })
}
fetchTareas();


const printTasks = (tarea) => {
    const containerCards = document.querySelector('.card-respons');
    containerCards.innerHTML += `
        <div class="col-6 mb-4">
        <div class="card caja">
        <div class="card-header" style="text-align: center;">
            ToDo
        </div>
        <div class="card-body">
        <h5 class="card-title">${tarea.task}</h5>
        <p class="card-text">Autor: ${tarea.name}</p>
        <p class="card-text">Descripción: ${tarea.description}</p>
        <button class="btn btn-primary">Editar</button>
        <button class="btn btn-danger">Eliminar</button>
        </div>
    </div>
        </div>
    `
}

const clearForm = () => {
    document.getElementById("form").reset();
}
});



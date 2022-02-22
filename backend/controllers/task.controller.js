const Task = require("../models/task.model.js");

exports.create = (req, res)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

    const task = new Task({
        name: req.body.name,
        task: req.body.task,
        description: req.body.description,
        /* date: req.body.date */
    });
    /* console.log("TASK==>", task); */
    Task.create(task, (err, data) => {
        /* console.log("+++", req); */
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            })
        }
        else res.send(data);
    });
};

exports.findAll = (req, res)=>{
    /* const nombre = req.query.nombre; */
    Task.getAll((err,data) => {
        if (err) {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving"
            });
        }
        else res.send(data);
    });
};

exports.updateTask = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empaty"
        });
    }
    console.log(req.body);

    Task.update(
        req.params.id,
        new Task(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(400).send({
                        message: `Tarea no encontrado con el id ${req.params.id}`
                    });
                }else{
                    res.status(500).send({
                        message: "Error al actualizar la Tarea" + req.params.id
                    });
                }
            }else{
                res.send(data);
            }
        }
    );
}

exports.deleteTask = (req, res) => {
    Task.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.estatus(404).send({
                    message: `Not found Task with id ${req.params.id}`
                });
            }else{
                res.status(500).send({
                    message: "No se pudo eliminar con el id" + req.params.id
                });
            }
        }else{
            res.send({message: `la Tarea se eliminó con exito`});
        }
    });
}

exports.deleteAll = (req, res) => {
    Task.deleteAll((err, data) => {
        if (err) {
            res.estatus(500).send({
                message:
                    err.message || "Se produjo un error al eliminar todas las tareas."
            });
        }
        else{
            res.send({message: "Se eliminaron todas las tareas satisfactoriamente"});
        }
    })
} 
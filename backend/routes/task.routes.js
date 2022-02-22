module.exports = app =>{
    const Task = require("../controllers/task.controller.js");
    var router = require("express").Router();

    router.post("/", Task.create);

    router.get("/",Task.findAll);

    router.put("/:id", Task.updateTask);

    router.delete("/:id",Task.deleteTask);

    router.delete("/", Task.deleteAll);
    
    app.use('/api/tareas', router);
}
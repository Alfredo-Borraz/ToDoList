const sql = require("../BD.js");

const Task = function(task) {
    this.name = task.name;
    this.task = task.task;
    this.description = task.description;
    /* this.date = task.date; */
}

Task.create = (newTask, result)=>{
    console.log(result);
    /* console.log("NewTask====>", newTask); */
    sql.query("INSERT INTO Task SET ?", newTask, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created new Task",{id: res.insertId, ...newTask});
        result(null,{id: res.insertId, ...newTask});
    });
};

Task.getAll = (result) =>{
    let query = "SELECT * FROM Task";
    sql.query(query,(err, res)=>{
        /* console.log("^***", res); */
        if (err) {
            console.log("error",err);
            result(err, null);
            return;
        }
        console.log("Task: ",res);
        //return res;
        result(null,res);
    });
};

Task.update = (id, task, result) => {
    sql.query(
        "UPDATE Task SET name = ?,task = ? ,description = ? WHERE idTask = ?",
        [task.name, task.task, task.description, id],
        (err, res) => {
            if (err) {
                console.log("error", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({kind: "not_found"}, null);
                return;
            }
            console.log("update Task: ",{id:id, ...task});
            result(null, {id:id, ...task})
        }
    );
}

Task.delete = (id, result) => {
    sql.query("DELETE FROM Task WHERE idTask = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({kind: "not found"}, null);
            return;
        }
        console.log("Task eliminada", id);
        result(null, res);
    });
};

Task.deleteAll = result => {
    sql.query("DELETE FROM Task", (err, res) => {
        if (err) {
            console.log("error1: ", err);
            result(null, err);
        }
        console.log(`deleted ${res.affectedRows} Tareas`);
        result(null, res);
    });
}

module.exports = Task;
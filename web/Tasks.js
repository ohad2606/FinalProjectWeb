let itemFromStorage;
let taskToEdit;
let taskToDelete;
let status;
let sec;
let newDiv;
let chk;
let txt;
let edit;
let del;
let row = 1;
const currentUser = parent.document.getElementById("lblName").innerText;
const size = 1024*1024*4;
const db = openDatabase("taskMngDB", "1.0", "taskManager", size, ()=>{
    console.log("DB created");
});

parent.document.getElementById("lblHello").innerHTML = "Hello  ";

db.transaction((tx)=> {
    tx.executeSql("SELECT * FROM tasksTable WHERE user=(?) AND status = 'in process'",[currentUser], (tx, result)=>{
        for (let i = 0; i < result.rows.length; i++) {
            itemFromStorage = result.rows.item(i);
            sec = 1;
            createTasksList();
        }
    });
    tx.executeSql("SELECT * FROM tasksTable WHERE user=(?) AND status = 'completed'",[currentUser], (tx, result)=>{
        for (let i = 0; i < result.rows.length; i++) {
            itemFromStorage = result.rows.item(i);
            sec = 2;
            createTasksList();
        }
    })
});


function addTask() {
    const taskToSave = document.getElementById("txtInput").value;
    status = "in process";
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS 'tasksTable'('user','tasks','status')");
        tx.executeSql("INSERT INTO TasksTable VALUES (?,?,?)", [currentUser, taskToSave, status]);
    });
    location.reload();
}


function taskDone(rowNo) {
    taskToEdit = document.getElementById(rowNo).innerText;
    db.transaction((tx)=>{
        tx.executeSql("UPDATE tasksTable SET status = 'completed' WHERE user = (?) AND tasks = (?)" , [currentUser, taskToEdit]);
    });
    location.reload();
}

function editTask(rowNo) {
    taskToEdit = document.getElementById(rowNo).innerText;
    let editedTask = window.prompt("Edit your task",taskToEdit);
    if(editedTask == null || editedTask == ""){
        editedTask = taskToEdit;
    }else{
        db.transaction((tx)=>{
            tx.executeSql("UPDATE tasksTable SET tasks = (?) WHERE user = (?) AND tasks = (?)" , [editedTask, currentUser, taskToEdit]);
        });
        location.reload();
    }
}

function deleteTask(rowNo){
    taskToDelete = document.getElementById(rowNo).innerText;
    db.transaction((tx)=>{
        tx.executeSql("DELETE FROM tasksTable WHERE user = (?) AND tasks = (?)" , [currentUser, taskToDelete]);
    })
    location.reload();
}

function deleteAll() {
    db.transaction((tx)=>{
        tx.executeSql("DROP TABLE IF EXISTS tasksTable");
    })
}


function logofBtn() {
    parent.document.getElementById("frame").src = "Signin.html";
    parent.document.getElementById("lblName").innerText = "";
    document.cookie = "userName=";
    document.cookie = "pass=";
    parent.document.getElementById("lblHello").innerHTML = "";
}


function createTasksList() {
    newDiv = document.createElement("div");
    newDiv.setAttribute("id", "newDiv");
    chk = document.createElement("input");
    chk.setAttribute("id", "chkDone");
    chk.setAttribute("type", "checkbox");
    chk.setAttribute("onclick","taskDone('"+row+"')");
    txt = document.createElement("span");
    txt.setAttribute("id", row);
    let aaa = itemFromStorage.tasks;
    let bbb = aaa;
    edit = document.createElement("button");
    edit.innerText = "edit";
    edit.setAttribute("id", "editTask");
    edit.setAttribute("onclick", "editTask('"+row+"')");
    del = document.createElement("button");
    del.innerText = "x";
    del.setAttribute("id", "delTask");
    del.setAttribute("onclick", "deleteTask('"+row+"')");
    row++;
    newDiv.appendChild(chk);
    newDiv.appendChild(txt);
    switch (sec) {
        case 1:
            newDiv.appendChild(edit);
            document.getElementById("sec1").appendChild(newDiv);
            break;
        case 2:
            bbb = aaa.strike();
            document.getElementById("sec2").appendChild(newDiv);
            break;
    }
    txt.innerHTML = bbb;
    newDiv.appendChild(del);
}
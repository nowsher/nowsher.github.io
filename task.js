function onLoad() {
    document.getElementById("taskList").value = getTaskList();
}

function addTask() {
    // Enter your code here to make Tip Calculator work

    const taskValue = document.getElementById("task").value;
    if (taskValue == null || taskValue == "") {
        return;
    }
    const taskListValue = document.getElementById("taskList").value;
    const tmpTaskListValue = taskListValue + ((taskListValue != "") ? "\r\n" : "") + taskValue;
    document.getElementById("taskList").value = tmpTaskListValue;

    localStorage.setItem(localStorage.length, taskValue);
    document.getElementById("task").value = "";
}

function clearTasks() {
    localStorage.clear();
    document.getElementById("taskList").value = "";
}

function getTaskList() {
    let list = "";
    for (let index = 0; index < localStorage.length; index++) {
        let itemValue = localStorage.getItem(index);
        if (itemValue != null || itemValue != "") {
            list += ((list != "") ? "\r\n" : "") + itemValue;
        }
    }
    return list;
}

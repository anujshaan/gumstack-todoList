let addTaskInput = document.getElementById('addTaskInput');
let addTaskBtn = document.getElementById('addTaskBtn');

//Show Task
const showTask= () =>{
    let webTask = localStorage.getItem('localTask');
    if(webTask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webTask);
    }
    let html='';
    let addedTaskList = document.getElementById("addedTaskList");
    taskObj.forEach((item, index)=>{
        if(item.completeStatus == true){
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
        }
        else{
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }
        html +=`
            <tr>
                <th scope="row">${index+1}</th>
                ${taskCompleteValue}
                <td><button type="button" onclick="editTask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
                <td><button type="button" onclick="deleteItem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
            </tr>
        `;
    });
    addedTaskList.innerHTML = html;
}
showTask();


//Add task
addTaskBtn.addEventListener('click', ()=>{
    inputTaskValue = addTaskInput.value;
    if(inputTaskValue.trim() != 0){
        let webTask = localStorage.getItem('localTask');
        if(webTask == null){
            taskObj = []
        }
        else{
            taskObj = JSON.parse(webTask);
        }
        taskObj.push({'task_name':inputTaskValue, 'completeStatus':false});
        localStorage.setItem('localTask', JSON.stringify(taskObj))
        addTaskInput.value='';
    }
    showTask();
})

//Edit task
const editTask = (index) =>{
    let saveIndex = document.getElementById('saveIndex');
    let addTaskBtn = document.getElementById('addTaskBtn');
    let saveTaskBtn = document.getElementById('saveTaskBtn');

    saveIndex.value = index;
    let webTask = localStorage.getItem('localTask')
    let taskObj = JSON.parse(webTask);

    addTaskInput.value = taskObj[index]['task_name'];
    addTaskBtn.style.display = "none";
    saveTaskBtn.style.display = "block";
}


//save edited task
let saveTaskBtn = document.getElementById('saveTaskBtn');
saveTaskBtn.addEventListener('click', () =>{
    let addTaskBtn = document.getElementById('addTaskBtn');
    let webTask = localStorage.getItem('localTask')
    let taskObj = JSON.parse(webTask);
    let saveIndex = document.getElementById('saveIndex').value;

    for(keys in taskObj[saveIndex]){
        if(keys == 'task_name'){
            taskObj[saveIndex].task_name = addTaskInput.value;
        }
    }
    saveTaskBtn.style.display = "none";
    addTaskBtn.style.display = "block";
    localStorage.setItem('localTask', JSON.stringify(taskObj));
    addTaskInput.value='';
    showTask();
})


//delete task
const deleteItem = (index) =>{
    let webTask = localStorage.getItem('localTask');
    let taskObj = JSON.parse(webTask);
    taskObj.splice(index, 1);
    localStorage.setItem('localTask', JSON.stringify(taskObj))
    showTask();
}

//Delete all task
let deleteAllBtn = document.getElementById('deleteAllBtn');
deleteAllBtn.addEventListener('click',()=>{
    let addTaskBtn = document.getElementById('addTaskBtn');
    let webTask = localStorage.getItem('localTask');
    let saveTaskBtn = document.getElementById('saveTaskBtn');
    let taskObj = JSON.parse(webTask);
    if(webTask == null){
        taskObj=[];
    }
    else{
        taskObj=JSON.parse(webTask);
        taskObj=[];
    }
    saveTaskBtn.style.display="none";
    addTaskBtn.style.display="block";
    localStorage.setItem('localTask', JSON.stringify(taskObj));
    showTask();
})
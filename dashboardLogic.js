let id = 0;
let activeTasks = [];
let closedTasks = [];
let deletedTasks = [];
let dashboard = document.getElementsByTagName('body')[0];
let editedTask;

(function(){
    if(localStorage.getItem("activeTasks") !== null){
        let activeTasks = JSON.parse(localStorage.getItem("activeTasks"));
        drawDashboard(activeTasks, document.getElementById('home'));
    }
    else{
        localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
        drawDashboard(activeTasks, document.getElementById('home'));
    }
    if(localStorage.getItem("closedTasks") !== null){
        let closedTasks = JSON.parse(localStorage.getItem("closedTasks"));
        drawDashboard(closedTasks, document.getElementById('profile'));
    }
    else{
        localStorage.setItem("closedTasks", JSON.stringify(closedTasks));
        drawDashboard(closedTasks, document.getElementById('profile'));
    }
    if(localStorage.getItem("deletedTasks") !== null){
        let deletedTasks = JSON.parse(localStorage.getItem("deletedTasks"));
        drawDashboard(deletedTasks, document.getElementById('contact'));
    }
    else{
        localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
        drawDashboard(deletedTasks, document.getElementById('contact'));
    }
    if(localStorage.getItem("id") !== null){
        id = +JSON.parse(localStorage.getItem("id"));
    }
    else{
        localStorage.setItem("id", JSON.stringify(id));
    }
})()

function addTask(){
    let name = document.querySelector('[name = task-name]').value.trim();
    let priority = document.querySelector('select').value;
    let description = document.querySelector('[name = task-description]').value.trim();
    validateForm(document.querySelector('[name = task-name]'), document.querySelector('[name = task-name]').value);
    if(validateForm(document.querySelector('[name = task-name]'), document.querySelector('[name = task-name]').value) == false){
        return;
    }
    if(validateForm(document.querySelector('[name = task-name]'), document.querySelector('[name = task-name]').value) == true){
        let newTask = {};
        newTask.name = name;
        newTask.priority = priority;
        newTask.description = description;
        let id = +JSON.parse(localStorage.getItem("id"));
        newTask.id = id;
        id++;
        localStorage.setItem("id", JSON.stringify(id));
        let tasks = JSON.parse(localStorage.getItem('activeTasks'));
        tasks.push(newTask);
        localStorage.setItem("activeTasks", JSON.stringify(tasks));
        drawDashboard(tasks.slice(tasks.length - 1, tasks.length), document.getElementById('home'))
        closeWindow();
    }
}

function closeTask(task){
    task.remove();
    let tasks = JSON.parse(localStorage.getItem("activeTasks"));
    let element = tasks.find(elem => elem.id == task.id);
    tasks.splice(tasks.indexOf(element), 1);
    localStorage.setItem("activeTasks", JSON.stringify(tasks));
    element.prevLocation = 1;
    let closedTasks = JSON.parse(localStorage.getItem('closedTasks'));
    closedTasks.push(element);
    localStorage.setItem("closedTasks", JSON.stringify(closedTasks));
    drawDashboard(closedTasks.slice(closedTasks.length - 1, closedTasks.length), document.getElementById('profile'))
}

function editTask(task){
    let newName = document.querySelector('[name = task-name]').value.trim();
    let newDescription = document.querySelector('[name = task-description]').value.trim();
    let newPriority = document.querySelector('select').value;
    validateForm(document.querySelector('[name = task-name]'), document.querySelector('[name = task-name]').value);
    if(validateForm(document.querySelector('[name = task-name]'), document.querySelector('[name = task-name]').value) == false){
        return;
    }
    if(validateForm(document.querySelector('[name = task-name]'), document.querySelector('[name = task-name]').value) == true){
        let tasks = JSON.parse(localStorage.getItem("activeTasks"));
        let element = tasks.find(elem => elem.id == task.id);
        element.name = newName;
        element.priority = newPriority;
        element.description = newDescription;
        localStorage.setItem("activeTasks", JSON.stringify(tasks));
        closeWindow();
        deleteTable('active-table-body');
        drawDashboard(JSON.parse(localStorage.getItem("activeTasks")), document.getElementById('home'));
    }
}

function deleteTask(task, location){
    if(location == document.getElementById('home')){
        task.remove();
        let tasks = JSON.parse(localStorage.getItem("activeTasks"));
        let element = tasks.find(elem => elem.id == task.id);
        tasks.splice(tasks.indexOf(element), 1);
        localStorage.setItem("activeTasks", JSON.stringify(tasks));
        element.prevLocation = 1;
        let deletedTasks = JSON.parse(localStorage.getItem('deletedTasks'));
        deletedTasks.push(element);
        localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
        drawDashboard(deletedTasks.slice(deletedTasks.length - 1, deletedTasks.length), document.getElementById('contact'))
    }
    if(location == document.getElementById('profile')){
        task.remove();
        let tasks = JSON.parse(localStorage.getItem("closedTasks"));
        let element = tasks.find(elem => elem.id == task.id);
        tasks.splice(tasks.indexOf(element), 1);
        localStorage.setItem("closedTasks", JSON.stringify(tasks));
        element.prevLocation = 2;
        let deletedTasks = JSON.parse(localStorage.getItem('deletedTasks'));
        deletedTasks.push(element);
        localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
        drawDashboard(deletedTasks.slice(deletedTasks.length - 1, deletedTasks.length), document.getElementById('contact'))
    }
}

function restoreTask(task, location){
    if(location == document.getElementById('contact')){
        task.remove();
        let tasks = JSON.parse(localStorage.getItem("deletedTasks"));
        let restoredTask = tasks.find(elem => elem.id == task.id);
        tasks.splice(tasks.indexOf(restoredTask), 1);
        localStorage.setItem("deletedTasks", JSON.stringify(tasks));
        if(restoredTask.prevLocation == 1){
            let activeTasks = JSON.parse(localStorage.getItem('activeTasks'));
            activeTasks.push(restoredTask);
            localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
            drawDashboard(activeTasks.slice(activeTasks.length - 1, activeTasks.length), document.getElementById('home'));
        }
        if(restoredTask.prevLocation == 2){
            restoredTask.prevLocation = 1;
            let closedTasks = JSON.parse(localStorage.getItem('closedTasks'));
            closedTasks.push(restoredTask);
            localStorage.setItem("closedTasks", JSON.stringify(closedTasks));
            drawDashboard(closedTasks.slice(closedTasks.length - 1, closedTasks.length), document.getElementById('profile'));
        }}
    if(location == document.getElementById('profile')){
        task.remove();
        let tasks = JSON.parse(localStorage.getItem("closedTasks"));
        let restoredTask = tasks.find(elem => elem.id == task.id);
        tasks.splice(tasks.indexOf(restoredTask), 1);
        localStorage.setItem("closedTasks", JSON.stringify(tasks));
        if(restoredTask.prevLocation == 1){
            let activeTasks = JSON.parse(localStorage.getItem('activeTasks'));
            activeTasks.push(restoredTask);
            localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
            drawDashboard(activeTasks.slice(activeTasks.length - 1, activeTasks.length), document.getElementById('home'));
        }
    }
}

function sortByPriority(array){
    array.sort((a, b) => +a.priority > +b.priority ? 1 : -1);
    localStorage.setItem('activeTasks', JSON.stringify(array));
    let selector = 'active-table-body'
    deleteTable(selector);
    drawDashboard(array, document.getElementById('home'))
}

function sortByName(array){
    array.sort((a, b) => a.name > b.name ? -1 : 1);
    localStorage.setItem('activeTasks', JSON.stringify(array));
    let selector = 'active-table-body'
    deleteTable(selector);
    drawDashboard(array, document.getElementById('home'))
}

function deleteTable(selector){
    document.querySelector(`.${selector}`).innerHTML = ''
}

function validateForm(element, value){
    if(value == '' || value == undefined){
        element.classList.remove('valid-input');
        element.classList.add('invalid-input');
        return false;
    }
    else {
        element.classList.remove('invalid-input');
        element.classList.add('valid-input');
        return true;
    }
}

function closeWindow(){
    document.querySelector('.ok').classList.remove('edit');
    document.querySelector('[name = task-name]').classList.add('valid-input');
    document.querySelector('[name = task-name]').classList.remove('invalid-input');
    document.querySelector('[name = task-name]').value = '';
    document.querySelector('[name = task-description]').value = '';
    document.querySelector('select').value = 1;
    hideWindow();
}

function showWindow(){
    document.querySelector('.modal').style.display = 'block';
}

function showEditWindow(task){
    let tasks = JSON.parse(localStorage.getItem("activeTasks"));
    let element = tasks.find(elem => elem.id == task.id);
    document.querySelector('.modal').style.display = 'block';
    document.querySelector('[name = task-name]').value = `${element.name}`;
    document.querySelector('[name = task-description]').value = `${element.description}`;
    document.querySelector('select').value = element.priority;
    document.querySelector('.ok').classList.add('edit');
}

function hideWindow(){
    document.querySelector('.modal').style.display = 'none';
}

function drawDashboard(tasks, location){
    if(location == document.getElementById('home')){
        for(let task of tasks){
            let newRow = document.createElement('tr');
            newRow.id = task.id;
            newRow.innerHTML = `<td>${task.name}</td><td class = 'description'><button class = 'description-button description-active-button'>?</button></td><td class = 'priority-cell'>${task.priority}</td><td class = 'button-cell'><button class = "closeButton customButton">Закрыть</button></td><td class = 'button-cell'><button class = "deleteActiveButton customButton">Удалить</button></td><td class = 'button-cell'><button class = "editButton customButton">Изменить</button></td>`
            document.querySelector('.active-table-body').prepend(newRow);
        }
    }
    if(location == document.getElementById('profile')){
        for(let task of tasks){
            let newRow = document.createElement('tr');
            newRow.id = task.id;
            newRow.innerHTML = `<td>${task.name}</td><td class = 'description'><button class = 'description-button description-closed-button'>?</button></td><td class = 'priority-cell'>${task.priority}</td><td class = 'button-cell'></td><td class = 'button-cell'><button class = "deleteClosedButton customButton">Удалить</button></td><td class = 'button-cell restore-closed-cell'><button class = "restoreClosedButton customButton">Сделать активным</button></td>`
            document.querySelector('.closed-table-body').prepend(newRow);
        }
    }
    if(location == document.getElementById('contact')){
        for(let task of tasks){
            let newRow = document.createElement('tr');
            newRow.id = task.id;
            newRow.innerHTML = `<td>${task.name}</td><td class = 'description'><button class = 'description-button description-deleted-button'>?</button></td><td class = 'priority-cell'>${task.priority}</td><td class = 'button-cell'></td><td class = 'button-cell'></td><td class = 'button-cell'><button class = "restoreDeletedButton customButton">Восстановить</button></td>`
            document.querySelector('.deleted-table-body').prepend(newRow);
        }
    }
}

{
    document.querySelector('.add').addEventListener('click', showWindow);
    dashboard.addEventListener('click', function(event){
        if(event.target.className == 'closeButton customButton') {
            let task = event.target.closest('tr');
            closeTask(task);
        }
        if(event.target.className == 'deleteActiveButton customButton') {
            let task = event.target.closest('tr');
            deleteTask(task, document.getElementById('home'));
        }
        if(event.target.className == 'deleteClosedButton customButton') {
            let task = event.target.closest('tr');
            deleteTask(task, document.getElementById('profile'));
        }
        if(event.target.className == 'restoreDeletedButton customButton') {
            let task = event.target.closest('tr');
            restoreTask(task, document.getElementById('contact'));
        }
        if(event.target.className == 'editButton customButton'){
            editedTask = event.target.closest('tr');
            showEditWindow(editedTask);
        }
        if(event.target.className == 'restoreClosedButton customButton'){
            let task = event.target.closest('tr');
            restoreTask(task, document.getElementById('profile'));
        }
        if(event.target.className == 'sort-by-priority customButton'){
            sortByPriority(JSON.parse(localStorage.getItem('activeTasks')))
        }
        if(event.target.className == 'sort-by-name customButton'){
            sortByName(JSON.parse(localStorage.getItem('activeTasks')))
        }
        if(event.target == document.querySelector('.close-button') || event.target == document.querySelectorAll('.close-button')[1] || event.target == document.querySelector('.modal')){
            closeWindow();
        }
        if(event.target.className == 'btn ok')
        {
            addTask();
        }
        if(event.target.className == 'btn ok edit')
        {
            editTask(editedTask);
        }
    })
    dashboard.addEventListener('mouseover', function(event){
        if(event.target.classList.contains('description-active-button')){
            let row = event.target.closest('tr');
            let button = event.target;
            showDescription(row, button, 'active');
        }
        if(event.target.classList.contains('description-closed-button')){
            let row = event.target.closest('tr');
            let button = event.target;
            showDescription(row, button, 'closed');
        }
        if(event.target.classList.contains('description-deleted-button')){
            let row = event.target.closest('tr');
            let button = event.target;
            showDescription(row, button, 'deleted');
        }
    })
    dashboard.addEventListener('mouseout', function(event){
        if(event.target.classList.contains('description-button')){
            removeDescription();
        }
    })
}









function showDescription(row, button, location){
    if(location == 'active'){
        let tasks = JSON.parse(localStorage.getItem("activeTasks"));
        let element = tasks.find(elem => elem.id == row.id);
        if(element.description == ''){
            return;
        }
        let descriptionBlock = document.createElement('div');
        descriptionBlock.className = 'description-block';
        descriptionBlock.textContent = element.description;
        document.body.append(descriptionBlock);



        let coords = button.getBoundingClientRect();

        let left = coords.left + (button.offsetWidth - descriptionBlock.offsetWidth) / 2;
        if (left < 0) left = 0;

        let top = coords.top - descriptionBlock.offsetHeight - 5;
        if (top < 0) {
            top = coords.top + button.offsetHeight + 5;
        }

        descriptionBlock.style.left = left + 'px';
        descriptionBlock.style.top = top + 'px';
    }
    if(location == 'closed'){
        let tasks = JSON.parse(localStorage.getItem("closedTasks"));
        let element = tasks.find(elem => elem.id == row.id);
        if(element.description == ''){
            return;
        }
        let descriptionBlock = document.createElement('div');
        descriptionBlock.className = 'description-block';
        descriptionBlock.textContent = element.description;
        document.body.append(descriptionBlock);



        let coords = button.getBoundingClientRect();

        let left = coords.left + (button.offsetWidth - descriptionBlock.offsetWidth) / 2;
        if (left < 0) left = 0;

        let top = coords.top - descriptionBlock.offsetHeight - 5;
        if (top < 0) {
            top = coords.top + button.offsetHeight + 5;
        }

        descriptionBlock.style.left = left + 'px';
        descriptionBlock.style.top = top + 'px';
    }
    if(location == 'deleted'){
        let tasks = JSON.parse(localStorage.getItem("deletedTasks"));
        let element = tasks.find(elem => elem.id == row.id);
        if(element.description == ''){
            return;
        }
        let descriptionBlock = document.createElement('div');
        descriptionBlock.className = 'description-block';
        descriptionBlock.textContent = element.description;
        document.body.append(descriptionBlock);



        let coords = button.getBoundingClientRect();

        let left = coords.left + (button.offsetWidth - descriptionBlock.offsetWidth) / 2;
        if (left < 0) left = 0;

        let top = coords.top - descriptionBlock.offsetHeight - 5;
        if (top < 0) {
            top = coords.top + button.offsetHeight + 5;
        }

        descriptionBlock.style.left = left + 'px';
        descriptionBlock.style.top = top + 'px';
    }
}

function removeDescription(){
    document.querySelector('.description-block').remove();
}
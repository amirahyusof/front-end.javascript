const inputBox = document.getElementById("input-box");
const addList = document.getElementById("submit-btn")
const taskList = document.querySelector(".list");



function addTask(){
    const list = inputBox.value.trim();

    if(list === ""){
        taskList.innerHTML = 'Please enter a task';
        
    } else {
        const currentList = document.createElement("li");
        currentList.classList.add("check");

        const noneCheck = document.createElement("div");
        noneCheck.classList.add("none-check");
        noneCheck.innerHTML=`
        <i class="fa-solid fa-thumbtack" style="color: black;"></i>
        <span>${list}</span>
        `;

        const doneCheck = document.createElement("div");
        doneCheck.classList.add("done-check");
        doneCheck.innerHTML=`
        <i class="far fa-circle-check" style="color: #fff;"></i>
        <i class="far fa-trash-can"  style="color: #fff;"></i>
        `;
        
        doneCheck.querySelector(".fa-circle-check").addEventListener("click", ()=>{
            const taskDone = noneCheck.querySelector("span");
            taskDone.classList.toggle("completed");

            if(taskDone.classList.contains("completed")){
                taskDone.style.textDecoration = "line-through";
                taskDone.style.color = "black";
            } else {
                taskDone.style.textDecoration = "none";
            }
        });

        doneCheck.querySelector(".fa-trash-can").addEventListener("click", ()=>{
            currentList.remove();
        });

        currentList.appendChild(noneCheck)
        currentList.appendChild(doneCheck);
        taskList.appendChild(currentList);

        console.log("List", list);
        inputBox.value = "";
    }
};


//handle task submission
addList.addEventListener("click", ()=>{
    addTask();
});

//handle enter key press in the input field
inputBox.addEventListener("keyup", (event)=> {
    if(event.key === "Enter"){
        addTask();
    }
});



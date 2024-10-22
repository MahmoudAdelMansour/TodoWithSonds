class toDo {
    constructor(){
        this.init();
    }

    init(){
        this.initEle();
        this.checkData();  // Check data when initializing
        this.showData();   // Show data when initializing
        this.displayToDo();
        this.displayDelet();
    }

    initEle(){
        this.form = document.querySelector("form");
        this.ul = document.querySelector("ul");
        this.title = document.querySelector("#title");
        this.btn = document.querySelector("#btn");
    }

    checkData(){
        if (localStorage.task != null){
            this.dataArr = JSON.parse(localStorage.task);
        } else {
            this.dataArr = [];
        }
    }

    createData(){
        this.newToDo = {
            title: this.title.value
        }
        this.dataArr.push(this.newToDo);
        localStorage.setItem("task", JSON.stringify(this.dataArr));
        this.title.value = ""; // clear value of title
    }

    showData(){
        let content = "";
        this.dataArr.forEach((task, index) => {
            content += `
                <li>
                    <div class="task">${task.title}</div>
                    <button class="del-btn" id="delBtn${index}">Delete</button>
                </li>
            `;
        });
        this.ul.innerHTML = content;
    }

    displayToDo(){
        this.btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.title.value != "") {
                this.createData();
                this.showData();
            } else {
                alert("Oops! Enter Your Task, Please.");
            }
        });
    }

    deleteTask(index){
        // delete task from array
        this.dataArr.splice(index, 1);
        localStorage.setItem("task", JSON.stringify(this.dataArr));
        this.showData();
    }

    displayDelet(){
        this.ul.addEventListener("click", (e) => {
            if (e.target.id.startsWith('delBtn')) {
                let index = e.target.id.replace('delBtn', '');
                this.deleteTask(index);
            }
        });
    }
}

let toDoApp = new toDo();

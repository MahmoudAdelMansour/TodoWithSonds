class toDo {
    constructor(){
        this.init();
    }
    init(){
        this.initEle();
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
        this.dataArr;
        if( localStorage.task != null){
            this.dataArr = JSON.parse(localStorage.task);
        }else {
            this.dataArr = [];
        }
    }
    createData(){
        this.newToDo = {
            title : this.title.value
        }
        this.dataArr.push(this.newToDo);
        // console.log(` ي رب تلووووج ${this.dataArr}`);
        localStorage.setItem("task" , JSON.stringify(this.dataArr));
        // clear value of title
        this.title.value = ""
    }
    showData(){
        let content = "";
        this.dataArr.forEach((task  , index) => {
            content += `
                <li>
                <div class="task">${task.title}</div>
                <button class="del-btn" id="delBtn${index}">Delete</button>
                </li>
            `
        })
        this.ul.innerHTML = content;
    }

    displayToDo(){
        this.btn.addEventListener(("click") , (e) => {
            e.preventDefault();
            if(this.title.value != ""){
                this.checkData();
                this.createData();
                this.showData();
            }else{
                alert("Oops! Enter Your Task , Please.")
            }
        })
    }

    deleteTask(index){
        // delet task from array
        this.dataArr.splice(index , 1);
        localStorage.setItem("task" , JSON.stringify(this.dataArr));

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




// Seleção de elementos
const tarefaForm = document.querySelector('.tarefa-form');
const tarefaInput = document.querySelector('#tarefa-input');
const tarefaList = document.querySelector('#tarefa-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn= document.querySelector('#cancel-button');
const toolbar = document.querySelector("#toolbar");
const filterForm = document.querySelector("#filter");
const filterInput = document.querySelector("#filter-select");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");

let oldinputvalue;
//Funções
const saveTarefa = (text)=>{
    //Criando DIV de tarefa
    const tarefa = document.createElement("div");
    tarefa.classList.add("tarefa");
    //Texto da tarefa
    const tarefaTitle = document.createElement("h3");
    tarefaTitle.innerText=text;

    //Adicionando texto a DIV de tarefa
    tarefa.appendChild(tarefaTitle);

    //Criando botões de finalizar, editar e excluir
    const finishBtn = document.createElement("button");
    finishBtn.classList.add("finish-tarefa");
    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-tarefa");
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-tarefa");
    
    //Adicionando ícone aos botões
    finishBtn.innerHTML= '<i class="fa-solid fa-check"></i>';
    editBtn.innerHTML='<i class="fa-solid fa-pen"></i>';
    removeBtn.innerHTML='<i class="fa-solid fa-xmark"></i>';
    
    //Adicionando botões à DIV de tarefa
    tarefa.appendChild(finishBtn);
    tarefa.appendChild(editBtn);
    tarefa.appendChild(removeBtn);

    //Adicionando tarefa na lista
    tarefaList.appendChild(tarefa);
    
    //Limpando campo
    tarefaInput.value = "";
}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    tarefaForm.classList.toggle("hide");
    filterForm.classList.toggle("hide");
    toolbar.classList.toggle("hide");
    tarefaList.classList.toggle("hide");
}

const updateTarefa = (text)=>{
    const tarefas = document.querySelectorAll(".tarefa");
    tarefas.forEach((tarefa)=>{
        let tarefaTitle = tarefa.querySelector("h3");
        if(tarefaTitle.innerText === oldinputvalue){
            tarefaTitle.innerText = text;
        }
    })
}


const filterTarefa = (text)=>{
    const tarefas = document.querySelectorAll(".tarefa");
    tarefas.forEach((tarefa)=>{
        tarefa.classList.add("hide")
        if(text=="todos"){
            tarefa.classList.remove("hide");
        }
        if(text=="feitas"){
            if(tarefa.classList.contains("done")){
                tarefa.classList.remove("hide")
            }
        }
        if(text=="a fazer"){
            if(!tarefa.classList.contains("done")){
                tarefa.classList.remove("hide");
            }
        }
    })
}


//Eventos
//Evento de adicionar nova tarefa
tarefaForm.addEventListener("submit",(e) =>{
    e.preventDefault()
    
    const inputValue = tarefaInput.value 
    if(inputValue){
        saveTarefa(inputValue);
        filterTarefa(filterInput.value);
    }
})

//Eventos dos botões de cada tarefa
document.addEventListener("click", (e)=>{
    //define o elemento que foi clicado
    const targetEl = e.target;
    const parentDiv = targetEl.closest("div");
    let tarefaTitle;
    if(parentDiv && parentDiv.querySelector("h3")){
        tarefaTitle = parentDiv.querySelector("h3").innerText

    }
    //Se o botão clicado for o de concluir, tarefa adicionará classe de concluir
    if(targetEl.classList.contains("finish-tarefa") || targetEl.classList.contains("fa-check")){
        parentDiv.classList.toggle("done");
    }
    //Se o botão clicado for o de excluir, tarefa será excluída
    if(targetEl.classList.contains("remove-tarefa") || targetEl.classList.contains("fa-xmark")){
        parentDiv.remove();
    }
    if(targetEl.classList.contains("edit-tarefa") || targetEl.classList.contains("fa-pen")){
    toggleForms();
    editInput.value=tarefaTitle;
    oldinputvalue = tarefaTitle;
    }
})

cancelEditBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    toggleForms();
})

editForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const edtiInputValue = editInput.value;
    if(edtiInputValue){
        updateTarefa(edtiInputValue)
    }
    toggleForms()
})

//Evento de filtro
 filterInput.addEventListener("click", (e)=>{
    e.preventDefault();
    filterTarefa(filterInput.value);
})

//Evento de pesquisar
searchInput.addEventListener("input", (e)=>{
    let inputText = e.target.value.toLowerCase();
    const tarefas = document.querySelectorAll(".tarefa");

    if(!inputText==""){
    tarefas.forEach((tarefa)=>{
        tarefa.classList.add("hide");
        let tarefaTitle = tarefa.querySelector("h3").innerText.toLowerCase();
        let titleLength = "";
        for(var i = 0; i<inputText.length;i++){
            titleLength = titleLength + tarefaTitle[i];
        }
        if(titleLength==inputText){
            tarefa.classList.remove("hide")
        } 
    })
    
    }else{filterTarefa(filterInput.value);}
    }
);

eraseBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    searchInput.value="";
    filterTarefa(filterInput.value);
})



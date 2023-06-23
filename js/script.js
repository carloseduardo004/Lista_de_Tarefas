// Seleção de elementos
const tarefaForm = document.querySelector('.tarefa-form');
const tarefaInput = document.querySelector('#tarefa-input');
const tarefaList = document.querySelector('#tarefa-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn= document.querySelector('#erase-button');
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
    }

//Eventos
tarefaForm.addEventListener("submit",(e) =>{
    e.preventDefault()
    
    const inputValue = tarefaInput.value 
    if(inputValue){
        saveTarefa(inputValue)
    }
})
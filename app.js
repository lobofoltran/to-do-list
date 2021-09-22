const listaTarefas = [];
const localStorage = window.localStorage;

// let tarefa1 = {
//     descricao: "Estudar para a prova de banco de dados",
//     status: "aberto",
//     prioridade: "prioridade-alta"
// };

// let tarefa2 = {
//     descricao: "Estudar para a prova de algoritmos",
//     status: "fechado",
//     prioridade: "prioridade-baixa"
// };

// listaTarefas.push(tarefa1);
// listaTarefas.push(tarefa2);

lerTarefasLocalStorage();

function fabricaTarefas() {
    let textoDaTarefa = document.getElementById('descricaoTarefa').value;
    let prioridadeSelecionada = document.getElementById('prioridadeTarefa').value;
    let tarefa = {
        descricao: textoDaTarefa,
        status: "aberto",
        prioridade: prioridadeSelecionada
    };
    listaTarefas.push(tarefa);
    gravaTarefasLocalStorage();
    limpaCadastrotarefa();
    renderLista();
}

function renderLista() {
    let divLista = document.getElementById('divLista');
    let template = '';
    for (let i = 0; i < listaTarefas.length; i++) {
        // console.log(`Tarefa n° ${i}`);
        let tarefaConcluida = 'checked';
        let classeTarefaConcluida = 'tarefaConcluida';
        if (listaTarefas[i].status == 'aberto') {
            tarefaConcluida = '';
            classeTarefaConcluida = '';
        }
         template += `<div class="tarefa ${listaTarefas[i].prioridade}">
                 <p class="descTarefa ${classeTarefaConcluida}"> ${listaTarefas[i].descricao}  </p>
                 <button class="btn btn-danger" onclick="excluirTarefa(${i})" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                 <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                 <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                 </svg></button>
                <input onclick="tarefaConcluida(${i})" type="checkbox" name="" id="" ${tarefaConcluida}>
                </div>`;
    }
    divLista.innerHTML = template;
}

function excluirTarefa(indiceTarefa) {
    if (confirm("Deseja remover a tarefa ?")) {
        listaTarefas.splice(indiceTarefa, 1);
        gravaTarefasLocalStorage();
        renderLista();
    }
}

function tarefaConcluida(indiceTarefa) {
    // console.log("Indice rebecido: " + indiceTarefa)
    if (listaTarefas[indiceTarefa].status == 'aberto') {
        listaTarefas[indiceTarefa].status = 'fechado';
    } else {
        listaTarefas[indiceTarefa].status = 'aberto';
    }
    gravaTarefasLocalStorage();
    renderLista();
}

function lerTarefasLocalStorage() {
    let listaTarefasLocalStorage = localStorage.getItem('listaTarefas');
    listaTarefasLocalStorage = JSON.parse(listaTarefasLocalStorage);    
    if (listaTarefasLocalStorage !== null) {
        for (let i = 0; i < listaTarefasLocalStorage.length; i++) {
            listaTarefas.push(listaTarefasLocalStorage[i]);
        }
    }
    renderLista();
}

function gravaTarefasLocalStorage() {
    localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas));
}

function limpaCadastrotarefa() {
    document.getElementById('descricaoTarefa').value  = '';
    document.getElementById('prioridadeTarefa').value = 'prioridade-media'; 
}

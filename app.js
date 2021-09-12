/*function validaTamanhoTexto() {
    let descricao = documento.getElementById('descricaoTarefa')
    if (descricao.value.length < 3) {
        document.getElementById('erroDescricao').style.display = 'block'
        alert("Erro!")
    } else {
        console.log(descricao.value.length);
        document.getElementById('erroDescricao').style.display = 'none'
    }
}*/

const listaTarefas = [];
const guardar = [];

// const '' = { "descricao": descricao, "status": "aberto", "prioridade": prioridade };
// window.localStorage.setItem('guardar', JSON.stringify(guardar));

renderLista();

function fabricaTarefas() {
    let descricao = document.getElementById('descricaoTarefa').value;
    let prioridade = document.getElementById('prioridadeTarefa').value;
    let tarefa = {
        descricao: descricao,
        status: "aberto",
        prioridade: prioridade
    }
    listaTarefas.push(tarefa);
    renderLista();
}

function renderLista() {
    let divLista = document.getElementById('divLista');
    let template = '';
    for (let i = 0; i < listaTarefas.length; i++) {
        let tarefaConcluida = 'checked';
        let classeTarefaConcluida = 'tarefaConcluida';
        if (listaTarefas[i].status == 'aberto') {
            tarefaConcluida = '';
            classeTarefaConcluida = '';
        }
        template += `<div id="tarefa ${listaTarefas[i].prioridade}" class="tarefa ${listaTarefas[i].prioridade}">
            <p class="descTarefa ${classeTarefaConcluida}"> ${listaTarefas[i].descricao} </p>
            <button onclick="excluirTarefa(${i})" type="button" class="btn btn-danger">Excluir</button>
            <input type="checkbox" onclick="concluirTarefa(${i})" name="" id="" ${tarefaConcluida}>
            </div>`;
    }
    divLista.innerHTML = template;
}

function excluirTarefa(indiceTarefa) {
    if (confirm("Deseja remover a tarefa?")) {
        listaTarefas.splice(indiceTarefa, 1)
        // window.localStorage.removeItem(indiceTarefa);
        renderLista();
    }
}

function concluirTarefa(indiceTarefa) {
    if (listaTarefas[indiceTarefa].status == 'aberto') {
        listaTarefas[indiceTarefa].status = 'fechado';
    } else {
        listaTarefas[indiceTarefa].status = 'aberto';
    }
    renderLista();
}

function armazenarDados(indiceTarefa) {
    var guardarDados = { "descricao": listaTarefas[indiceTarefa].descricao, "status": listaTarefas[indiceTarefa].status, "prioridade": listaTarefas[indiceTarefa].prioridade };
    window.localStorage.setItem('guardarDados', JSON.stringify(guardarDados));
}

armazenarDados();

// var guardarDados = { "descricao": listaTarefas[indiceTarefa].descricao, "status": listaTarefas[indiceTarefa].status, "prioridade": listaTarefas[indiceTarefa].prioridade };
// var guardarDados = { "descricao": descricao, "status": "aberto", "prioridade": prioridade };
// window.localStorage.setItem('guardar', JSON.stringify(guardar));
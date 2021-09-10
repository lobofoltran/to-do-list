function validaTamanhoTexto() {
    let descricao = documento.getElementById('descricaoTarefa')
    if (descricao.value.length < 3) {
        document.getElementById('erroDescricao').style.display = 'block'
        alert("Erro!")
    } else {
        console.log(descricao.value.length);
        document.getElementById('erroDescricao').style.display = 'none'
    }
}

const listaTarefas = [];

function fabricaTarefas() {
    let descricao = document.getElementById('descricaoTarefa').value;
    let prioridade = document.getElementById('prioridadeTarefa').value;
    let tarefa = {
        descricao: descricao,
        status: "aberto",
        prioridade: prioridade
    };
    listaTarefas.push(tarefa);
    renderLista();
}

function renderLista() {
    let divLista = document.getElementById('divLista');
    let template = '';
    for (let i = 0; i < listaTarefas.length; i++) {
        template += `<div id="listaTarefas $[i]" class="tarefa ${listaTarefas[i].prioridade}"><center>
                <p class="descTarefa"> ${listaTarefas[i].descricao}  </p>
                <button onclick="excluirTarefa()" type="button" class="btn btn-danger">Excluir</button>
                <input type="checkbox" name="" id="checkboxTarefas $[i]" onclick="marcarTarefa()"></center>
                </div>`;
    }
    divLista.innerHTML = template;
}

function excluirTarefa() {
    var elemento = document.getElementById('listaTarefas $[i]');
    elemento.parentNode.removeChild(elemento);
}

function marcarTarefa() {
var TacharElemento = document.getElementById('listaTarefas $[i]');
TacharElemento.parentNode.textContent(String)
}

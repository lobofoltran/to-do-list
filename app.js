// Cria a constante de Lista de Tarefas, com tamanho em array (infinito).
const listaTarefas = [];
// Cria a contante do local Storage.
const localStorage = window.localStorage;

// Função que vai até a descrição da tarefa e a prioridade, e as cria.
function fabricaTarefas() {
    let textoDaTarefa = document.getElementById('descricaoTarefa').value;
    let prioridadeSelecionada = document.getElementById('prioridadeTarefa').value;
    // Validador de selecione, se estiver em selecione, abre o alert e retorna falso. Não executa o restante.
    if (prioridadeSelecionada = "selecione") {
        alert('Selecione uma prioridade!')
        return false;
    }
    let tarefa = {
        descricao: textoDaTarefa,
        status: "aberto",
        prioridade: prioridadeSelecionada
    };
    // Em seguida, chama a constante e dá um push (tarefa criada) e chama as funções de LocalStorage, limpar o nomeTarefa no navegador e a função de renderizar a tarefa.
    listaTarefas.push(tarefa);
    gravaTarefasLocalStorage();
    limpaCadastroTarefa();
    renderLista();
}

// Função que cria a tarefa na tela. Cria duas variáveis, uma com base no id do divLista e outra vazia. Cria um loop, basicamente: separa cada um de cada qual. Dentro do loop, cria duas variáveis,
// uma para a tarefaConcluída e outra para atribuir o checked e outra para atribuir o CSS no texto que estiver 'checked'. Cria um if, se o status da listaTarefas[numero do loop] for == aberto,
// deixa como 'nulo' ambos.
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
        // Abaixo cria o template, variável criada no começo. E no fim, nomeia o template como innerHTML do divLista.
        template += `<div class="tarefa ${listaTarefas[i].prioridade}">
                <p class="descTarefa ${classeTarefaConcluida}">${listaTarefas[i].descricao}</p>
                <button class="botaoExcluir" onclick="excluirTarefa(${i})" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg></button>
                <input onclick="tarefaConcluida(${i})" type="checkbox" name="" id="" ${tarefaConcluida}>
                </div>`;
    }
    divLista.innerHTML = template;
}

// Função que é do botão do template, primeiramente cria um confirm que retorna um bool falso ou verdadeiro, se for verdadeiro executa o if. O if cria um splice, que separará por array.
// E chama as funções de localStorage e a renderização da lista.
function excluirTarefa(indiceTarefa) {
    if (confirm("Deseja remover a tarefa?")) {
        listaTarefas.splice(indiceTarefa, 1);
        gravaTarefasLocalStorage();
        renderLista();
    }
}

// Função para o checkbox, se for clicado e estiver aberto, fecha. Vice-versa. Chama as funções.
function tarefaConcluida(indiceTarefa) {
    if (listaTarefas[indiceTarefa].status == 'aberto') {
        listaTarefas[indiceTarefa].status = 'fechado';
    } else {
        listaTarefas[indiceTarefa].status = 'aberto';
    }
    gravaTarefasLocalStorage();
    renderLista();
}

// Função que grava a tarefa no Local Storage, cria um setItem no local Storage, com nome de listaTarefas e converte a array listaTarefas para JSON.
function gravaTarefasLocalStorage() {
    localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas));
}

// Função para limpar o que está digitado e selecionado na divAdd.
function limpaCadastroTarefa() {
    document.getElementById('descricaoTarefa').value = '';
    document.getElementById('prioridadeTarefa').value = '';
}

// Função para ler o Local Storage, cria uma variável que tem um getItem do localStorage, em seguida nomeia para um JSON.parse, que converte JSON para string.
// Chama um if, se for nulo, não passa. Se não for nulo, executa um loop, pegando com base no tamanho da array, acrescenta mais um. Em seguida, faz um push da listaTarefas para cada um.
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

// Chamada da função de ler o Local Storage ao abrir a página.
lerTarefasLocalStorage();

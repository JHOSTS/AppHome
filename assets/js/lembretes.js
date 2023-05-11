
let inputNovoLembrete = document.querySelector('#txtlembrete');
let btoadicionarlembrete = document.querySelector('#btoadicionarlembrete');
let listalembrete = document.querySelector('#listalembrete');
let btoFecharJanelaEdicao = document.querySelector('#btoFecharJanelaEdicao');
let btoAtualizarTarefa = document.querySelector('#btoAtualizarTarefa');
let janelaEdicaoLembrete = document.querySelector('#janelaEdicaoLembrete');
let inputLembreteNomeEdicao = document.querySelector('#inputLembreteNomeEdicao');
let lembreteEdicao = document.querySelector('#lembreteEdicao');

inputNovoLembrete.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
        let lembrete = {
            nome: inputNovoLembrete.value,
            id: gerarId(), 
        }
        adicionarLembrete(lembrete);
    }
});

btoadicionarlembrete.addEventListener('click', (e) => {
        let lembrete = {
        nome: inputNovoLembrete.value,
        id: gerarId(), 
    }
    adicionarLembrete(lembrete);
});

function gerarId() {
    return Math.floor(Math.random() *3000);
}

btoAtualizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();
    let idLembrete = lembreteEdicao.innerText.replace('#', '');
    let li = document.getElementById(''+ idLembrete + '');


    let lembrete = {
        nome: inputLembreteNomeEdicao.value,
        id: idLembrete
    }

    let lembreteAtual = document.getElementById(''+idLembrete+'');

    if(lembreteAtual){
        let lembreteAtual = document.getElementById('' + idLembrete + '');
        let li = criarTagLi(lembrete);
        listalembrete.replaceChild(li, lembreteAtual);
        alternarJanelaEdicao();
    }
});

function adicionarLembrete(lembrete) {
    let li = criarTagLi(lembrete);
    listalembrete.appendChild(li);
    inputNovoLembrete.value = '';
}

function criarTagLi(lembrete) {

    let li = document.createElement('li');
    li.id = lembrete.id;
    let span = document.createElement('span');

    span.classList.add('textolembrete');
    span.innerHTML = lembrete.nome;

    let div = document.createElement('div');

    let btoEditar = document.createElement('button');
    btoEditar.classList.add('btoEditar');
    btoEditar.setAttribute('class', 'btnacao');
    btoEditar.setAttribute('onclick', 'editar('+lembrete.id+')');
    btoEditar.innerHTML = '<i class="fa fa-pencil"/>';
    
    let btoApagar = document.createElement('button');
    btoApagar.classList.add('btoApagar');
    btoApagar.setAttribute('class', 'btnacao');
    btoApagar.setAttribute('onclick', 'excluir('+lembrete.id+')');
    btoApagar.innerHTML = '<i class="fa fa-trash"/>';

    div.appendChild(btoEditar);
    div.appendChild(btoApagar);

    li.setAttribute('class', 'li');
    li.appendChild(span);
    li.appendChild(div);

    return li;
}

btoFecharJanelaEdicao.addEventListener('click', (e) => {
    alternarJanelaEdicao();
});

function editar(idLembrete) {
    let li = document.getElementById(''+ idLembrete + '');
    if(li){
        inputLembreteNomeEdicao.value = li.innerText;
        lembreteEdicao.innerText = '#'+idLembrete;
        alternarJanelaEdicao();
    }
    else
    {
        alert('Objeto HTML não encontrado');
    }
}

function excluir(idLembrete) {
    let confirmacao = window.confirm('Deseja excluir?');
    if(confirmacao){
        let li = document.getElementById(''+ idLembrete + '');
        if(li){
            listalembrete.removeChild(li);
        }
        else 
        {
            alert('Objeto HTML não encontrado');
        }
    }
}

function alternarJanelaEdicao() {
    janelaEdicaoLembrete.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}
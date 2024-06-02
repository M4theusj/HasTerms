const traducoes = {
    Software: "Programa",
    Hardware: "Equipamento",
    Bug: "Erro",
    Database: "Banco de dados",
    Algorithm: "Algoritmo",
    Interface: "Interface",
    Library: "Biblioteca",
    Function: "Função",
    Variable: "Variável",
    Loop: "Laço",
    Array: "Vetor",
    Class: "Classe",
    Object: "Objeto",
    Exception: "Exceção",
    Debug: "Depurar",
    Syntax: "Sintaxe",
    Script: "Roteiro",
    Query: "Consulta",
    Branch: "Ramificação",
    Repository: "Repositório",
    Encryption: "Criptografia",
    Backup: "Cópia de Segurança",
    Cloud: "Nuvem",
    Service: "Serviço",
    Framework: "Estrutura",
    Compiler: "Compilador"
};

let contador = 0;
let geradas = 1;
let palavras = [];
let iniciado = false;
let corretas = [];
let erradas = [];
let nome = false;

let currentTranslation = '';

let NomeUsuario = '';

function confirmUsername() {
    const usernameInput = document.getElementById('username-input').value;
    if (usernameInput) {
        nome = true;
        NomeUsuario = usernameInput;
        document.getElementById('info-modal').style.display = 'none';
        GerarPalavra();
    } else {
        alert('Por favor, insira seu nome de usuário.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('info-modal')) {
        document.getElementById('info-modal').style.display = 'flex';
    } else {
        displayResults();
    }
});

function ConfirmarPalavra() {
    if (!iniciado) {
        iniciado = true;
        intervalo = setInterval(atualizarContador, 1000);
        document.getElementById("infoimg").style.display = "none";
        atualizarContador();
    }
    const palavra = document.getElementById('WordInput').value.toLowerCase();
    if (palavra === currentTranslation) {
        corretas.push(currentTranslation);
        contador++;
    } else {
        erradas.push(currentTranslation);
    }
    document.getElementById('WordInput').value = '';
    document.getElementById('CorrectCounter').textContent = contador;
    if (geradas < 10) {
        geradas++;
        GerarPalavra();
    } else if (geradas === 10) {
        saveResultsAndRedirect();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && nome === true) {
        ConfirmarPalavra();
    }
});

function GerarPalavra() {
    const keys = Object.keys(traducoes);
    let term;

    do {
        const randomIndex = Math.floor(Math.random() * keys.length);
        term = keys[randomIndex];
    } while (palavras.includes(term.toLowerCase()));

    const translation = traducoes[term];

    const display = document.getElementById('WordDisplay');
    display.textContent = term;

    currentTranslation = translation.toLowerCase();
    palavras.push(term.toLowerCase());
}

let tempoRestante = 50;

const contadorElemento = document.getElementById('contador');

function atualizarContador() {
    contadorElemento.textContent = tempoRestante;

    if (tempoRestante == 0) {
        clearInterval(intervalo);
        saveResultsAndRedirect();
    } else {
        tempoRestante--;
    }
}

function saveResultsAndRedirect() {
    localStorage.setItem('NomeUsuario', NomeUsuario);
    localStorage.setItem('corretas', JSON.stringify(corretas));
    localStorage.setItem('erradas', JSON.stringify(erradas));
    window.location.href = 'results.html';
}

function displayResults() {
    const NomeUsuario = localStorage.getItem('NomeUsuario');
    const corretas = JSON.parse(localStorage.getItem('corretas')) || [];
    const erradas = JSON.parse(localStorage.getItem('erradas')) || [];

    const titleElement = document.getElementById('ResultTitle');
    const subtitleElement = document.getElementById('ResultSubtitle');

    if (corretas.length == 10) {
        titleElement.textContent = `Parabéns ${NomeUsuario}`;
        subtitleElement.textContent = 'Você acertou todos os termos!';
    } else
    if (corretas.length > erradas.length) {
        titleElement.textContent = `Parabéns ${NomeUsuario}`;
        subtitleElement.textContent = 'Você acertou uma boa quantia de traduções!';
    } else {
        titleElement.textContent = `Uh oh, ${NomeUsuario}...`;
        subtitleElement.textContent = 'Que pena, parece que você errou muitos termos!';
    }

    document.getElementById('AcertosCount').textContent = corretas.length;
    document.getElementById('ErrosCount').textContent = erradas.length;

    const acertosList = document.getElementById('AcertosList');
    const errosList = document.getElementById('ErrosList');

    corretas.forEach(term => {
        const li = document.createElement('li');
        li.textContent = term;
        acertosList.appendChild(li);
    });

    erradas.forEach(term => {
        const li = document.createElement('li');
        li.textContent = term;
        errosList.appendChild(li);
    });
}

function InfoModal() {
    const modal = document.getElementById('info-modal-terms');
    modal.style.display = 'flex';
    modal.querySelector('.modal-content').style.animation = 'zoomIn 0.3s ease forwards';
}

function closeInfoModal() {
    const modal = document.getElementById('info-modal-terms');
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'zoomOut 0.3s ease forwards';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

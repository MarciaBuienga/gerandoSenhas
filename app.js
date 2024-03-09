const lenInput = document.querySelector('#size');
const infoSize = document.querySelector('label[for="size"]');

infoSize.innerHTML = lenInput.value;

lenInput.addEventListener("change", () =>{
    infoSize.innerHTML = lenInput.value;
});

function obterRequisitosChar(){
    const maiuscula = document.querySelector('#maiuscula').checked;
    const minuscula = document.querySelector('#minuscula').checked;
    const numero = document.querySelector('#numero').checked;
    const char_especial = document.querySelector('#char_especial').checked;

    const requisitosChar = [];

    if(maiuscula){
        requisitosChar.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

    if(minuscula){
        requisitosChar.push('abcdefghijklmnopqrstuvwxyz');
    }

    if(numero){
        requisitosChar.push('0123456789');
    }

    if(char_especial){
        requisitosChar.push('!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`');
    }

    return requisitosChar;
}


function alertaMensagem(){
    alert('Tamanho inválido. Selecione um número entre [4 e 70]');
}

function tamanhoPassword(){

    const size = document.querySelector('#size').value;

   if(isNaN(size) || (size < 4 || size > 70)){
        alertaMensagem();
        return;
    }
    
    return size;
}

function randomRequisitosTipos(requisitosChar){
    const randomIndex = Math.floor(Math.random() * requisitosChar.length);
    
    return requisitosChar[randomIndex][Math.floor(Math.random() * requisitosChar[randomIndex].length)]
}

function gerarPassword(size, requisitosChar){
    let passwordGerada = '';

    while(passwordGerada.length < size){
        passwordGerada += randomRequisitosTipos(requisitosChar);
    }
    return passwordGerada;
}

/*
function message(text, status = 'success'){
    Toastify({
        text: text,
        duration: 2500,
        style: {
            background: status === 'success' ? '#f5c525' : '#dc2626',
            boxShadow: 'none'
        }
    }).showToast();
}*/

function mostrarMensagem(){
    alert("Selecione um requisito para gerar a password!");
}

document.querySelector('#gerar_senha').addEventListener('click', function(){

//    alert("ENTROU");
    const size = tamanhoPassword();
    const requisitosChar = obterRequisitosChar();

    if (!size) {
        return;
    }
    
    // If no character type is selected, display an error message and return
    if (!requisitosChar.length) {
        mostrarMensagem();
        return;
    }

    const passwordGerada = gerarPassword(size, requisitosChar);

    document.querySelector('#password_container').classList.add('show');
    document.querySelector('#password').textContent = passwordGerada;
    
});

document.querySelector('#copy').addEventListener('click', function () {
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    message('Senha copiada com sucesso!', '#f5c525');
});

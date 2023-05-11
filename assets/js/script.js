const mode = document.getElementById('mode_icon');
const loginButton = document.getElementById('login_button');

mode.addEventListener('click', () => {
    const form = document.getElementById('login_form');

    if(mode.classList.contains('fa-moon')){
        mode.classList.remove('fa-moon');
        mode.classList.add('fa-sun');

        form.classList.add('dark');
        return;
    }
    
        mode.classList.remove('fa-sun');
        mode.classList.add('fa-moon');
        form.classList.remove('dark');
});

loginButton.addEventListener('click', () => {
    var senha = document.getElementById('senha').value;
    var nome = document.getElementById('name').value;

    if(senha == '123' && nome.toUpperCase() == 'jho'.toUpperCase()){
        //alert('usuário correto');
            window.location.href = "/home.html";
    }
    else {
        alert('usuário incorreto');
        return;
    }
});
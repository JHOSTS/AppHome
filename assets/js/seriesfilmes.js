require('dotenv').config();


    const frmPesquisa = document.querySelector("form");
    const apiKey = process.env.apiKeyFilmes;

    frmPesquisa.onsubmit = (ev) => {
        ev.preventDefault();

        const pesquisa = ev.target.pesquisa.value;

        if(pesquisa == "") {
            alert("Preencha o título do filme");
            return;
        }
        fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
            .then(result => result.json())
            .then(json => carregaLista(json));
    }

    const carregaLista = (json) => {
        const lista = document.querySelector("div.listafilme");
        const paginacao = document.querySelector("div.paginacao");
        lista.innerHTML = "";

        if(json.Response.ToString == "False"){
            alert("Nenhum filme encontrado!");
            return;
        }

        json.Search.forEach(element => {

            let item = document.createElement("div");
            item.classList.add("item");

            item.innerHTML = `<img src="${element.Poster}"/><h2>${element.Title}</h2>`;

            lista.appendChild(item);

        });
        let page = document.createElement("div");
        let maxCont = 3;
        for (var cont = 1; cont <= maxCont; cont++) {
            
            page.classList.add("page");
            page.innerHTML = `<button onclick="mudaPaginaLista('${pesquisa.value}', ${cont})">${cont}</a>`;
            // page.onclick = (ev) => {
            //     ev.preventDefault();
                
            //     fetch(`https://www.omdbapi.com/?s=${pesquisa.value}&page=${cont}&apikey=${apiKey}`)
            //     .then(result => result.json())
            //     .then(json => carregaLista(json));
            // }
            paginacao.innerHTML = "";
            paginacao.appendChild(page);
            }
        }

        function mudaPaginaLista (pesquisa, pagina){
            fetch(`https://www.omdbapi.com/?s=${pesquisa}&page=${pagina}&apikey=${apiKey}`)
            .then(result => result.json())
            .then(json => carregaLista(json));
        }
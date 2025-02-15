document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('campoBusca');
    const tabela = document.getElementById('tabelaDados');

    campoBusca.addEventListener('input', () => {
        const filtro = campoBusca.value.toLowerCase();
        const linhas = tabela.getElementsByTagName('tr');

        for (let i = 1; i < linhas.length; i++) {
            let linha = linhas[i];
            let textoLinha = linha.textContent.toLowerCase();

            if (textoLinha.includes(filtro)) {
                linha.style.display = '';
            } else {
                linha.style.display = 'none';
            }
        }
    });
});

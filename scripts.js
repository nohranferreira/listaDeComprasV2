window.indexEdicao = -1;

document.addEventListener('DOMContentLoaded', () => {
  const botao = document.querySelector('#btnSalvar');
  const joinha = document.querySelector('img');

  botao.addEventListener('click', (e) => {
    e.preventDefault();
    salvarDados();
  });

  carregarDadosTabela();
});

function salvarDados() {
  const form = document.querySelector('form');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const produto = document.getElementById('Produto').value;
  const quantidade = document.getElementById('Quantidade').value;
  const setor = document.querySelector('select').value;
  let precoUnit = parseFloat(
    document.getElementById('PrecoUnit').value.replace(',', '.')
  );
  if (isNaN(precoUnit)) {
    precoUnit = 0;
  }
  const precoTotal = (precoUnit * parseFloat(quantidade))
    .toFixed(2)
    .replace('.', ',');

  let dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario')) || [];
  if (!Array.isArray(dadosSalvos)) {
    dadosSalvos = [];
  }

  if (window.indexEdicao >= 0) {
    dadosSalvos[window.indexEdicao] = {
      produto,
      quantidade,
      setor,
      precoUnit: precoUnit.toFixed(2),
      precoTotal
    };
    window.indexEdicao = -1;
  } else {
    dadosSalvos.push({ produto, quantidade, setor, precoUnit: precoUnit.toFixed(2), precoTotal });
  }

  localStorage.setItem('dadosFormulario', JSON.stringify(dadosSalvos));
  carregarDadosTabela();

  // Atualiza o gráfico sempre que os dados são salvos
  if (typeof gerarGraficoRankingTela === 'function') {
    gerarGraficoRankingTela();
  }

  form.reset();

}
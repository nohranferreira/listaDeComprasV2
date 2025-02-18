document.addEventListener('DOMContentLoaded', () => {
  carregarDadosTabela();
});

function carregarDadosTabela() {
  const exibirDados = document.querySelector('.exibir-dados');
  // Rótulo onde o total será exibido:
  const rotuloTotal = document.getElementById('valorTotal');

  let dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario')) || [];
  if (!Array.isArray(dadosSalvos)) {
    dadosSalvos = [];
  }

  // Se não houver dados, avisa e zera o valor total
  if (dadosSalvos.length === 0) {
    if (exibirDados) {
      exibirDados.innerHTML = '<p>Nenhum dado salvo.</p>';
    }
    if (rotuloTotal) {
      rotuloTotal.textContent = 'Total: R$ 0,00';
    }
    return;
  }

  // Calcula o total geral da coluna precoTotal
  let totalGeral = 0;
  dadosSalvos.forEach(dado => {
    // Converte a string "xx,xx" em número
    const valor = parseFloat(dado.precoTotal.replace(',', '.'));
    if (!isNaN(valor)) {
      totalGeral += valor;
    }
  });

  // Monta a tabela
  let tabelaHTML = `
    <table id="tabelaDados" border="1">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Qtd.</th>
          <th>Setor</th>
          <th>Preço U.</th>
          <th>Preço T.</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  `;

  dadosSalvos.forEach((dado, index) => {
    tabelaHTML += `
      <tr>
        <td>${dado.produto}</td>
        <td>${dado.quantidade}</td>
        <td>${dado.setor}</td>
        <td>R$ ${dado.precoUnit}</td>
        <td>R$ ${dado.precoTotal}</td>
        <td>
          <button class="editar-btn" data-index="${index}">✏️</button>
          <button class="remover-btn" data-index="${index}">🗑️</button>
        </td>
      </tr>
    `;
  });

  tabelaHTML += `
      </tbody>
    </table>
  `;

  if (exibirDados) {
    exibirDados.innerHTML = tabelaHTML;
  }

  // Exibe o total formatado em R$ no rótulo
  if (rotuloTotal) {
    rotuloTotal.textContent = `💵 Total: R$ ${totalGeral.toFixed(2).replace('.', ',')} 💵`;
  }

  // Botões de edição e remoção
  document.querySelectorAll('.editar-btn').forEach((botao) => {
    botao.addEventListener('click', function () {
      editarDado(this.closest('tr'));
    });
  });

  document.querySelectorAll('.remover-btn').forEach((botao) => {
    botao.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'), 10);
      removerDado(index);
    });
  });
}

function editarDado(linha) {
  const index = parseInt(
    linha.querySelector('.editar-btn').getAttribute('data-index'),
    10
  );
  let dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario')) || [];

  if (isNaN(index) || index < 0 || index >= dadosSalvos.length) {
    return;
  }

  document.getElementById('Produto').value = dadosSalvos[index].produto;
  document.getElementById('Quantidade').value = dadosSalvos[index].quantidade;
  document.querySelector('select').value = dadosSalvos[index].setor;
  document.getElementById('PrecoUnit').value = dadosSalvos[index].precoUnit;
  window.indexEdicao = index;
}

function removerDado(index) {
  let dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario')) || [];
  if (isNaN(index) || index < 0 || index >= dadosSalvos.length) {
    return;
  }
  dadosSalvos.splice(index, 1);
  localStorage.setItem('dadosFormulario', JSON.stringify(dadosSalvos));
  carregarDadosTabela();
}

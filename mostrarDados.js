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



// document.addEventListener('DOMContentLoaded', () => {
//   carregarDadosTabela();
// });

// function carregarDadosTabela() {
//   const exibirDados = document.querySelector('.exibir-dados');

//   if (!exibirDados) {
//     console.error("Elemento .exibir-dados não encontrado.");
//     return;
//   }

//   let dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario')) || [];
//   if (!Array.isArray(dadosSalvos)) {
//     console.warn("Dados no localStorage não são um array. Resetando...");
//     dadosSalvos = [];
//   }

//   if (dadosSalvos.length === 0) {
//     exibirDados.innerHTML = '<p>Nenhum dado salvo.</p>';
//     return;
//   }

//   let tabelaHTML = `
//     <table border="1">
//       <thead>
//         <tr>
//           <th>Produto</th>
//           <th>Quantidade</th>
//           <th>Setor</th>
//           <th>Preço Unit.</th>
//           <th>Preço Total</th>
//           <th></th>
//         </tr>
//       </thead>
//       <tbody>
//   `;

//   dadosSalvos.forEach((dado, index) => {
//     tabelaHTML += `
//       <tr>
//         <td>${dado.produto}</td>
//         <td>${dado.quantidade}</td>
//         <td>${dado.setor}</td>
//         <td>R$ ${dado.precoUnit}</td>
//         <td>R$ ${dado.precoTotal}</td>
//         <td>
//           <button class="editar-btn" data-index="${index}">✏️</button>
//         </td>
//       </tr>
//     `;
//   });

//   tabelaHTML += `
//       </tbody>
//     </table>
//   `;
//   exibirDados.innerHTML = tabelaHTML;

//   document.querySelectorAll('.editar-btn').forEach(botao => {
//     botao.addEventListener('click', function () {
//       editarDado(this.closest('tr'));
//     });
//   });
// }

// function editarDado(linha) {
//   const index = parseInt(linha.querySelector('.editar-btn').getAttribute('data-index'), 10);
//   let dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario')) || [];

//   if (isNaN(index) || index < 0 || index >= dadosSalvos.length) {
//     console.error("Índice inválido.");
//     return;
//   }

//   document.getElementById('Produto').value = dadosSalvos[index].produto;
//   document.getElementById('Quantidade').value = dadosSalvos[index].quantidade;
//   document.querySelector('select').value = dadosSalvos[index].setor;
//   document.getElementById('PrecoUnit').value = dadosSalvos[index].precoUnit;
//   indexEdicao = index;
// }

// document.addEventListener('DOMContentLoaded', () => {
//     carregarDadosTabela();
// });

// function carregarDadosTabela() {
//     const exibirDados = document.querySelector('.exibir-dados');
    
//     if (!exibirDados) {
//         console.error("Elemento .exibir-dados não encontrado.");
//         return;
//     }

//     let dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario')) || [];

//     // Verifica se é um objeto em vez de um array
//     if (!Array.isArray(dadosSalvos)) {
//         console.warn("Dados no localStorage não são um array. Resetando...");
//         dadosSalvos = [];
//     }

//     if (dadosSalvos.length === 0) {
//         exibirDados.innerHTML = '<p>Nenhum dado salvo.</p>';
//         return;
//     }

//     let tabelaHTML = `
//         <table border="1">
//             <thead>
//                 <tr>
//                     <th>Produto</th>
//                     <th>Quantidade</th>
//                     <th>Setor</th>
//                     <th>Preço Unit.</th>
//                     <th>Preço</th>
//                     <th></th>
//                 </tr>
//             </thead>
//             <tbody>
//     `;

//     dadosSalvos.forEach((dado) => {
//         tabelaHTML += `
//             <tr>
//                 <td contenteditable="false">${dado.produto}</td>
//                 <td contenteditable="false">${dado.quantidade}</td>
//                 <td contenteditable="false">${dado.setor}</td>
//                 <td contenteditable="false">R$ ${dado.precoUnit}</td>
//                 <td contenteditable="false">R$ ${dado.precoTotal}</td>
//                 <td>
//                     <button class="editar-btn" data-index="${dado.index}">✏️</button>
//                 </td>
//             </tr>
//         `;
//     });

//     tabelaHTML += `</tbody></table>`;
//     exibirDados.innerHTML = tabelaHTML;
    
//     // Adiciona eventos aos botões de edição
//     document.querySelectorAll('.editar-btn').forEach(botao => {
//         botao.addEventListener('click', function () {
//             editarDado(this.closest('tr')); // Obtém o <tr> correto ao clicar no botão
//         });
//     });
// }

// // Função para editar um item da tabela
// function editarDado(linha) {
//     if (!(linha instanceof HTMLElement)) {
//         console.error("Erro: O elemento passado não é uma linha de tabela válida.");
//         return;
//     }

//     let dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario')) || [];
    
//     // Garante que o índice seja um número válido
//     const index = parseInt(linha.dataset.index, 10);
    
//     if (isNaN(index) || index < 0 || index >= dadosSalvos.length) {
//         console.error("Erro: Índice inválido.");

//         return;
//     }

//     let celulas = linha.querySelectorAll('td');
//     let botao = linha.querySelector('.editar-btn');

//     if (botao.innerText === "✏️") {
//         // Ativa a edição
//         for (let i = 0; i < celulas.length - 1; i++) {
//             celulas[i].contentEditable = "true";
//             celulas[i].style.backgroundColor = "#f0f0f0";
//         }
//         botao.innerText = "💾";
//     } else {
//         // Salva as alterações
//         dadosSalvos[index].produto = celulas[0].innerText;
//         dadosSalvos[index].quantidade = celulas[1].innerText;
//         dadosSalvos[index].setor = celulas[2].innerText;
//         dadosSalvos[index].precoUnit = parseFloat(celulas[3].innerText.replace("R$ ", "").replace(',', '.')).toFixed(2);
//         dadosSalvos[index].precoTotal = (parseFloat(dadosSalvos[index].precoUnit) * parseFloat(dadosSalvos[index].quantidade)).toFixed(2).replace('.', ',');

        // Atualiza o LocalStorage
//         localStorage.setItem('dadosFormulario', JSON.stringify(dadosSalvos));

//         // Atualiza a tabela para refletir as mudanças
//         carregarDadosTabela();

//         // Reseta o formulário
//         document.querySelector("form").reset(); // Substitua "idDoFormulario" pelo ID real do formulário
//     }
// }
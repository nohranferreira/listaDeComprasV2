window.indexEdicao = -1;

document.addEventListener('DOMContentLoaded', () => {
  const botao = document.querySelector('.button');
  const joinha = document.querySelector('img');

  botao.addEventListener('click', (e) => {
    e.preventDefault();
    salvarDados();
  });

  carregarDadosTabela();
});

function salvarDados() {
  const form = document.querySelector('form');
  // Verifica se o formulário é válido
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const produto = document.getElementById('Produto').value;
  const quantidade = document.getElementById('Quantidade').value;
  const setor = document.querySelector('select').value;

  // Converte vírgula em ponto
  let precoUnit = parseFloat(
    document.getElementById('PrecoUnit').value.replace(',', '.')
  );
  
  // Se o campo estiver vazio ou for inválido, define como 0
  if (isNaN(precoUnit)) {
    precoUnit = 0;
  }

  // Calcula o preço total, usando 0 se preço unitário estiver vazio
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
      precoUnit: precoUnit.toFixed(2), // Armazena em formato decimal
      precoTotal
    };
    window.indexEdicao = -1;
  } else {
    dadosSalvos.push({
      produto,
      quantidade,
      setor,
      precoUnit: precoUnit.toFixed(2),
      precoTotal
    });
  }

  localStorage.setItem('dadosFormulario', JSON.stringify(dadosSalvos));
  carregarDadosTabela();
  form.reset();

//   // Exibe a imagem do joinha por 2s e faz fade-out de 1s
//   const joinha = document.querySelector('img');
//   joinha.style.display = 'block';
//   joinha.style.opacity = 1;
//   setTimeout(() => {
//     joinha.classList.add('fade-out');
//     setTimeout(() => {
//       joinha.style.display = 'none';
//       joinha.classList.remove('fade-out');
//     }, 1000);
//   }, 2000);
}



// let indexEdicao = -1; // Variável global para controlar o modo de edição

// document.addEventListener("DOMContentLoaded", () => {
//   const botao = document.querySelector(".button");
//   const joinha = document.querySelector("img");

//   botao.addEventListener("click", (e) => {
//     e.preventDefault();
//     salvarDados();
//   });

//   carregarDadosTabela();
// });

// function salvarDados() {
//   const produto = document.getElementById("Produto").value;
//   const quantidade = document.getElementById("Quantidade").value;
//   const setor = document.querySelector("select").value;
//   const precoUnit = parseFloat(
//     document.getElementById("PrecoUnit").value.replace(",", ".")
//   ).toFixed(2);
//   const precoTotal = (parseFloat(precoUnit) * parseFloat(quantidade))
//     .toFixed(2)
//     .replace(".", ",");

//   let dadosSalvos = JSON.parse(localStorage.getItem("dadosFormulario")) || [];
//   if (!Array.isArray(dadosSalvos)) {
//     dadosSalvos = [];
//   }

//   if (window.indexEdicao !== undefined && window.indexEdicao >= 0) {
//     // Atualiza o registro existente
//     dadosSalvos[window.indexEdicao] = {
//       produto,
//       quantidade,
//       setor,
//       precoUnit,
//       precoTotal,
//     };
//     window.indexEdicao = -1;
//   } else {
//     // Adiciona um novo registro
//     dadosSalvos.push({ produto, quantidade, setor, precoUnit, precoTotal });
//   }

//   localStorage.setItem("dadosFormulario", JSON.stringify(dadosSalvos));
//   carregarDadosTabela();
//   document.querySelector("form").reset();

//   // Exibe a imagem do joinha por 2s e faz fade-out de 1s
//   const joinha = document.querySelector("img");
//   joinha.style.display = "block";
//   joinha.style.opacity = 1;
//   setTimeout(() => {
//     joinha.classList.add("fade-out");
//     setTimeout(() => {
//       joinha.style.display = "none";
//       joinha.classList.remove("fade-out");
//     }, 1000);
//   }, 2000);
// }

// let indexEdicao = -1;

// document.addEventListener('DOMContentLoaded', () => {
//     const formulario = document.querySelector('.formulario');
//     const botao = document.querySelector('.button');
//     const botaoNovoFormulario = document.querySelector('.openButton');
//     const joinha = document.querySelector('img');

//     botao.addEventListener('click', (e) => {
//         e.preventDefault();
//         salvarDados();
//     });

//     carregarDadosTabela();
// });

// function salvarDados() {
//     const produto = document.getElementById('Produto').value;
//     const quantidade = document.getElementById('Quantidade').value;
//     const setor = document.querySelector('select').value;
//     const precoUnit = parseFloat(document.getElementById('PrecoUnit').value.replace(',', '.')).toFixed(2);
//     const precoTotal = (precoUnit * quantidade).toFixed(2).replace('.', ',');

//     let dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario')) || [];

//     // Garante que seja um array
//     if (!Array.isArray(dadosSalvos)) {
//         dadosSalvos = [];
//     }

//     // Adiciona os novos dados
//     dadosSalvos.push({ produto, quantidade, setor, precoUnit, precoTotal });

//     // Salva novamente no LocalStorage
//     localStorage.setItem('dadosFormulario', JSON.stringify(dadosSalvos));

//     // Atualiza a tabela na tela
//     carregarDadosTabela();

//     // Exibe a imagem do "joinha" por 2s e faz fade-out de 1s
//     const joinha = document.querySelector('img');
//     joinha.style.display = 'block';
//     joinha.style.opacity = 1;

//     setTimeout(() => {
//         joinha.classList.add('fade-out');

//         setTimeout(() => {
//             joinha.style.display = 'none';
//             joinha.classList.remove('fade-out');
//         }, 1000);
//     }, 2000);
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const formulario = document.querySelector('.formulario');
//     const botao = document.querySelector('.button');
//     const botaoNovoFormulario = document.querySelector('.openButton');
//     const joinha = document.querySelector('img');

//     botaoNovoFormulario.addEventListener('click', () => {
//         botaoNovoFormulario.style.display = 'none';
//         formulario.style.display = 'block';
//         botao.style.display = 'block';
//         joinha.style.display = 'none'
//     })

//     botao.addEventListener('click', (e) => {
//         e.preventDefault();

//         const nome = document.getElementById('nome').value;
//         const profissao = document.getElementById('profissao').value;
//         const documento = document.querySelector('select').value;
//         const numeroDocumento = document.getElementById('numeroDocumento').value;

//         const dadosFormulario = {
//             nome,
//             profissao,
//             documento,
//             numeroDocumento
//         };

//         localStorage.setItem('dadosFormulario', JSON.stringify(dadosFormulario));

//         formulario.style.display = 'none';
//         botao.style.display = 'none';
//         botaoNovoFormulario.style.display = 'block'
//         joinha.style.display = 'block';
//         joinha.style.opacity = 1;

//         setTimeout(() => {
//             joinha.classList.add('fade-out');

//             setTimeout(() => {
//                 joinha.style.display = 'none';
//                 joinha.classList.remove('fade-out');
//             }, 1000);
//         }, 2000);

//         console.table( dadosFormulario);
//     });
// })

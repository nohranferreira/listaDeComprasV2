function compartilharDados() {
  let dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario')) || [];

  if (!Array.isArray(dadosSalvos) || dadosSalvos.length === 0) {
    alert("Nenhum dado disponível para compartilhar.");
    return;
  }

  let textoCompartilhamento = `📋 *Dados da Tabela* 📋\n\n`;

  // Variável para somar o total
  let totalGeral = 0;

  dadosSalvos.forEach((dado) => {
    textoCompartilhamento += `👤 Produto: ${dado.produto}\n`;
    textoCompartilhamento += `💼 Qtd.: ${dado.quantidade}\n`;
    textoCompartilhamento += `🔢 Preço Unit.: ${dado.precoUnit}\n`;
    textoCompartilhamento += `🔢 Preço Total: ${dado.precoTotal}\n`;
    textoCompartilhamento += `----------------------\n`;

    // Converte "xx,xx" em número e acumula
    const valor = parseFloat(dado.precoTotal.replace(',', '.'));
    if (!isNaN(valor)) {
      totalGeral += valor;
    }
  });

  // Formata o total final
  let totalFormatado = totalGeral.toFixed(2).replace('.', ',');
  textoCompartilhamento += `\n📊 *Valor Total:* R$ ${totalFormatado}\n`;

  // Opções de compartilhamento
  const opcoes = `
    <button onclick="compartilharWhatsApp('${encodeURIComponent(textoCompartilhamento)}')" class="iconWhatsapp">
      <i class="fa fa-whatsapp icon-whatsapp"></i>
    </button>
  `;

  document.querySelector('.compartilhar-container').innerHTML = opcoes;
}

function compartilharWhatsApp(texto) {
  const url = `https://api.whatsapp.com/send?text=${texto}`;
  window.open(url, '_blank');
}

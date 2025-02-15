function compartilharDados() {
    let dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario')) || [];

    if (!Array.isArray(dadosSalvos) || dadosSalvos.length === 0) {
        alert("Nenhum dado disponível para compartilhar.");
        return;
    }

    let textoCompartilhamento = `📋 *Lista de Compras* 📋\n\n`;

    dadosSalvos.forEach((dado, index) => {
        //textoCompartilhamento += `🔹 *Registro ${index + 1}*\n`;
        textoCompartilhamento += `🛒 Produto: ${dado.produto}\n`;
        textoCompartilhamento += `🔢 Qtd.: ${dado.quantidade}\n`;
        //textoCompartilhamento += `📄 Setor: ${dado.setor}\n`;
        textoCompartilhamento += `🔢 Preço Unit.: R$ ${dado.precoUnit}\n`;
        textoCompartilhamento += `🔢 Preço Total: R$ ${dado.precoTotal}\n`;
        textoCompartilhamento += `----------------------\n`;
    });

    // Criar opções de compartilhamento
    const opcoes = `
        <button onclick="compartilharWhatsApp('${encodeURIComponent(textoCompartilhamento)}')" class="iconWhatsapp"><i class="fa fa-whatsapp icon-whatsapp"></i></button>

    `;

    document.querySelector('.compartilhar-container').innerHTML = opcoes;
}

function compartilharWhatsApp(texto) {
    const url = `https://api.whatsapp.com/send?text=${texto}`;
    window.open(url, '_blank');
}

function copiarParaClipboard(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        alert("Texto copiado para a área de transferência!");
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  gerarGraficoRankingTela();
});

function gerarGraficoRankingTela() {
  // Obtém os dados salvos no localStorage
  let dadosSalvos = JSON.parse(localStorage.getItem('dadosFormulario')) || [];
  if (!Array.isArray(dadosSalvos) || dadosSalvos.length === 0) {
    alert("Nenhum dado salvo para gerar o gráfico.");
    return;
  }

  // Agrupa os valores totais por setor
  const totaisPorSetor = {};
  dadosSalvos.forEach(item => {
    let preco = parseFloat(item.precoTotal.replace(',', '.'));
    if (isNaN(preco)) preco = 0;
    if (totaisPorSetor[item.setor]) {
      totaisPorSetor[item.setor] += preco;
    } else {
      totaisPorSetor[item.setor] = preco;
    }
  });

  // Cria um array de objetos e ordena do maior para o menor valor
  const ranking = Object.keys(totaisPorSetor)
    .map(setor => ({ setor, total: totaisPorSetor[setor] }))
    .sort((a, b) => b.total - a.total);

  // Separa os setores e os valores
  const setores = ranking.map(item => item.setor);
  const totais = ranking.map(item => parseFloat(item.total.toFixed(2)));

  // Seleciona ou cria o canvas para o gráfico
  let canvas = document.getElementById('graficoRankingTela');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'graficoRankingTela';
    // Insere o canvas onde desejar, aqui será adicionado ao final do body
    document.body.appendChild(canvas);
  }

  // Registra o plugin de data labels (caso ainda não esteja registrado)
  if (typeof ChartDataLabels !== 'undefined') {
    Chart.register(ChartDataLabels);
  }

  // Se já existir um gráfico, destrói-o para atualizar
  if (window.chartRankingTela) {
    window.chartRankingTela.destroy();
  }

  // Cria o gráfico de barras horizontal
  window.chartRankingTela = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: setores,
      datasets: [{
        label: 'Custo Total (R$)',
        data: totais,
        backgroundColor: '#2c2f40',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            display: false // Oculta as referências de valor na régua
          }
        }
      },
      plugins: {
        datalabels: {
          // A função align define a posição do rótulo com base no tamanho da barra
          align: function(context) {
            let value = context.dataset.data[context.dataIndex];
            let pixelLength = context.chart.scales.x.getPixelForValue(value) - context.chart.scales.x.getPixelForValue(0);
            return pixelLength < 90 ? 'start' +'10px' : 'end';
          },
          // A função color alterna a cor do rótulo conforme sua posição
          color: function(context) {
            let value = context.dataset.data[context.dataIndex];
            let pixelLength = context.chart.scales.x.getPixelForValue(value) - context.chart.scales.x.getPixelForValue(0);
            return pixelLength < 10 ? 'black' : 'white';
          },
          formatter: function(value) {
            return 'R$ ' + value.toFixed(2).replace('.', ',');
          },
          font: {
            weight: 'bold'
          }
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Ranking de Setores por Custo'
        }
      }
    }
  });
}

const escala = 500 / 200; // Escala para o plano cartesiano (-100 a 100)

function criarPonto(x, y) {
    const mapa = document.getElementById('mapa');
    const ponto = document.createElement('div');
    ponto.className = 'ponto';

    // Converte as coordenadas para posições relativas
    const posX = (x + 100) * escala; 
    const posY = (100 - y) * escala; 

    ponto.style.left = `${posX}px`;
    ponto.style.top = `${posY}px`;
    mapa.appendChild(ponto);
    return ponto;
}

function moverPonto(xInicial, yInicial, xFinal, yFinal) {
    const ponto = criarPonto(xInicial, yInicial); // Cria o ponto na posição inicial

    let xAtual = xInicial;
    let yAtual = yInicial;

    const passo = 1; // Passo do movimento (quanto ele se desloca a cada iteração)
    const intervalo = 20; // Intervalo entre os movimentos, em milissegundos

    const mover = setInterval(() => {
        // Verifica se o ponto chegou ao destino
        if (Math.abs(xAtual - xFinal) < 1 && Math.abs(yAtual - yFinal) < 1) {
            clearInterval(mover); // Para o movimento
            return;
        }

        // Atualiza as coordenadas, movendo gradualmente
        xAtual += (xFinal - xAtual) * 0.1; // Movimento suave no eixo X
        yAtual += (yFinal - yAtual) * 0.1; // Movimento suave no eixo Y

        // Converte as novas coordenadas para posições relativas
        const posX = (xAtual + 100) * escala;
        const posY = (100 - yAtual) * escala;

        ponto.style.left = `${posX}px`;
        ponto.style.top = `${posY}px`;
    }, intervalo);
}
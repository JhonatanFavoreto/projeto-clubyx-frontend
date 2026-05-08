import api from '../api';

export const getHomeConteudo = async () => {
    try {
        // Faz o GET no endpoint
        const resposta = await api.get('/conteudo-home');

        /* DICA: Se o backend retornar as imagens apenas com o nome do arquivo (ex: "capa.jpg"),
           você pode tratar a URL aqui ou direto no componente.
        */
        return resposta.data;
    } catch (error) {
        // Log detalhado para ajudar no desenvolvimento
        console.error('Erro ao buscar conteúdo da Home no backend:', error);

        // Lançamos o erro para que o catch do componente Home.js possa capturá-lo
        throw error;
    }
};

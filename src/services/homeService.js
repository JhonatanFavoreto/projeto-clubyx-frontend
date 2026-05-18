import { request } from './fetchClient';

export function getHomeConteudo() {
    return request('/conteudo-home');
}

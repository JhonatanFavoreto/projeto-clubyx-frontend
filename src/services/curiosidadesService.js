import { request } from './fetchClient';

export function getCuriosidadesConteudo() {
    return request('/conteudo');
}
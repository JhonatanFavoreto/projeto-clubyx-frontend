const BASE_URL = 'https://projeto-clubyx.onrender.com';
const API_KEY = 'Clubyx_dev';

export async function request(path, options = {}) {
    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            API_KEY,
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Erro ${response.status} ao buscar ${path}`);
    }

    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
        return response.json();
    }

    return response.text();
}

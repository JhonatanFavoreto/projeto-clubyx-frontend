import '../styles/LoadingBook.css';

export default function LoadingBook({
    title = 'Carregando conteudo',
    message = 'Estamos abrindo o livro para você.',
}) {
    return (
        <section className="loading-book" aria-live="polite" aria-busy="true">
            <img
                className="loading-book-image"
                src="https://images.vexels.com/media/users/3/205489/isolated/preview/e20758fdfdeef5425f48e71e6d74c777-livro-aberto-da-escola-vermelho-plana.png"
                alt=""
                aria-hidden="true"
            />

            <div className="loading-book-text">
                <h2>{title}</h2>
                <p>{message}</p>
            </div>
        </section>
    );
}

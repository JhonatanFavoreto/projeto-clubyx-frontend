{
    /* O uso do ?. (Optional Chaining) garante que se 'cards'
   estiver vazio por um milissegundo, o React não trave o site.
*/
}
<div className="cards-grid">
    {conteudo.cards?.map((card) => (
        <div className="card" key={card.id}>
            {/* Se o backend mandar uma URL de ícone ou foto para o card: */}
            {card.imagemUrl && <img src={card.imagemUrl} alt={card.titulo} className="card-icon" />}

            <h3>{card.titulo}</h3>
            <p>{card.texto}</p>

            {/* Exemplo de botão dinâmico por card */}
            {card.link && (
                <a href={card.link} className="card-link">
                    Saiba mais
                </a>
            )}
        </div>
    ))}
</div>;

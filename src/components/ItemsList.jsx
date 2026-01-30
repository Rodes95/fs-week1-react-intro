export default function ItemsList({ items }) { // Obtains the items data
    if(!items.length) return <p>No items yet.</p>;

    return (
        <ul>
            {items.map((it) => ( // Renders a li per existing item
                // React needs an unique key for lists
                <li key={it.id}>
                    <strong>{it.title}</strong>
                    {it.description ? ` - ${it.description}` : ""}
                </li> 
            ))}
        </ul>
    );
}
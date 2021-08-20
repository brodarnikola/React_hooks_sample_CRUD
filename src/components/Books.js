import { useCurrency } from "../context/CurrencyContext";

const Books = ({ list }) => {
    return (
        <ul>
            {list.map((item) => (
                <Book key={item.id} item={item} />
            ))}
        </ul>
    );
};


const Book = ({ item }) => {  
    const { value } = useCurrency();

    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: value.code,
    }).format(item.price * value.conversionRate);

    return (
        <li>
            {item.title} - {price}
        </li>
    );
};

export default Books
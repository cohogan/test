export function formatPrice(price) {
    // add commas between thousands
    price = price.toFixed(2)
    price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${price}`;
}
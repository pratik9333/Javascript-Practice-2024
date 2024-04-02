const apiUrl = "https://dummyjson.com/products";

const listItemContainer = document.querySelector(".container-list-items");

let skip = 0;

const callback = (entries,observer) => {
    const [entry] = entries;
    if(entry.isIntersecting){
        skip+=30;
        fetchProducts();
        observer.unobserve(entry.target);
    }
}

const listObserver = new IntersectionObserver(callback, {root: null, threshold: 1});

const fetchProducts = async function(){
    const res = await fetch(apiUrl+"?skip="+skip);
    const data = await res.json();
    createAndDisplayElements(data.products);
}

const createAndDisplayElements = function(products){
    products.forEach((product, index, array) => {
        const liEl = document.createElement("li");
        liEl.textContent = product.description;
        listItemContainer.append(liEl)
        if(index == array.length - 1) {
            listObserver.observe(liEl);
        }
    })
}

fetchProducts();


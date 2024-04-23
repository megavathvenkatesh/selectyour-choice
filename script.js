document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    function displayProducts(category) {
        productsContainer.innerHTML = '';
        fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
            .then(response => response.json())
            .then(data => {
                const selectedCategory = data.categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());
                if (!selectedCategory) {
                    console.error('Category not found:', category);
                    return;
                }
                const productGrid = document.createElement('div');
                productGrid.classList.add('product-grid');
                selectedCategory.category_products.forEach(product => {
                    const productCard = createProductCard(product);
                    productGrid.appendChild(productCard);
                });
                productsContainer.appendChild(productGrid);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    function createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.title;

        const newOfferTag = document.createElement('div');
        newOfferTag.classList.add('new-offer-tag');
        newOfferTag.textContent = 'New Offer';
        productCard.appendChild(newOfferTag);

        const productTitle = document.createElement('p');
        productTitle.classList.add('product-title');
        productTitle.textContent = `${product.title} - myntra`;
        const originalPrice = parseFloat(product.compare_at_price);
        const discountedPrice = originalPrice * 0.5;

        const productPrice = document.createElement('p');
        const discountOffer = document.createElement('span');
        discountOffer.textContent = '50% Offer';
        discountOffer.classList.add('discount-offer');
        const originalPriceElem = document.createElement('span');
        
        originalPriceElem.textContent = `$${originalPrice.toFixed(2)}`;
        originalPriceElem.style.textDecoration = 'line-through';

        productPrice.appendChild(discountOffer);
        productPrice.appendChild(originalPriceElem);
        productPrice.innerHTML += `<br>Price: <strong>$${discountedPrice.toFixed(2)}</strong>`;

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.classList.add('add-to-cart-btn');

        productCard.appendChild(productImage);
        productCard.appendChild(productTitle);
        productCard.appendChild(productPrice);
        productCard.appendChild(addToCartButton);

        return productCard;
    }

    document.getElementById('men-btn').addEventListener('click', function() {
        displayProducts('Men');
    });
    document.getElementById('women-btn').addEventListener('click', function() {
        displayProducts('Women');
    });

    document.getElementById('kids-btn').addEventListener('click', function() {
        displayProducts('Kids');
    });
    displayProducts('Men');
});


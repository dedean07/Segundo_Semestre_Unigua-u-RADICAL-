// Navegação para outras páginas
// windows.location.href = "Page1.html";
// windows.location.href = "Page2.html";
// windows.location.href = "Page3.html";

// Funcionalidades do Carrinho
let cartItems = {
    item1: {
        name: "Camisas personalizadas",
        price: 45.00,
        quantity: 5,
        image: "6.png"
    },
    item2: {
        name: "Tapete",
        price: 40.00,
        quantity: 1,
        image: "7.png"
    }
};

// Função para alternar o sidebar do carrinho
function toggleCartSidebar() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Função para atualizar quantidade de itens
function updateQuantity(itemId, change) {
    if (cartItems[itemId]) {
        cartItems[itemId].quantity += change;
        
        // Não permitir quantidade menor que 1
        if (cartItems[itemId].quantity < 1) {
            cartItems[itemId].quantity = 1;
        }
        
        // Atualizar o display da quantidade
        document.getElementById(`qty-${itemId}`).textContent = cartItems[itemId].quantity;
        
        // Atualizar subtotal
        updateSubtotal();
    }
}

// Função para remover item do carrinho
function removeItem(itemId) {
    if (cartItems[itemId]) {
        delete cartItems[itemId];
        
        // Remover o elemento do DOM
        const cartItem = document.querySelector(`[data-item-id="${itemId}"]`) || 
                        document.getElementById(`qty-${itemId}`).closest('.cart-item');
        cartItem.remove();
        
        // Atualizar subtotal
        updateSubtotal();
    }
}

// Função para calcular e atualizar o subtotal
function updateSubtotal() {
    let total = 0;
    
    for (let itemId in cartItems) {
        total += cartItems[itemId].price * cartItems[itemId].quantity;
    }
    
    document.getElementById('subtotal').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Função para adicionar item ao carrinho (para uso futuro)
function addToCart(itemId, name, price, image) {
    if (cartItems[itemId]) {
        cartItems[itemId].quantity++;
    } else {
        cartItems[itemId] = {
            name: name,
            price: price,
            quantity: parseInt(document.getElementById("imputQuantidade").value),
            image: image
        };
    }
    
    updateCartDisplay();
    updateSubtotal();
}

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
    const cartContent = document.querySelector('.cart-content');
    cartContent.innerHTML = '';
    
    for (let itemId in cartItems) {
        const item = cartItems[itemId];
        const cartItemHTML = `
            <div class="cart-item" data-item-id="${itemId}">
                <img src="${item.image}" alt="Produto" class="product-image">
                <div class="product-details">
                    <h4>${item.name}</h4>
                    <p class="product-price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity('${itemId}', -1)">-</button>
                        <span class="quantity" id="qty-${itemId}">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity('${itemId}', +1)">+</button>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg"  onclick="removeItem('${itemId}')" fill="currentColor" class="bi remove-item bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </div>
        `;
        cartContent.innerHTML += cartItemHTML;
    }
}

// Fechar sidebar quando clicar fora dele
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('cartSidebar');
    const carrinho = document.getElementById('carrinho');
    
    if (!sidebar.contains(event.target) && !carrinho.contains(event.target) && sidebar.classList.contains('open')) {
        toggleCartSidebar();
    }
});

// Inicializar o carrinho quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    updateSubtotal();
});

// Funções para o sistema de filtros
function clearFilters() {
    // Limpa todos os checkboxes e radio buttons
    const checkboxes = document.querySelectorAll('.filter-menu input[type="checkbox"]');
    const radios = document.querySelectorAll('.filter-menu input[type="radio"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    radios.forEach(radio => {
        radio.checked = false;
    });
    
    console.log('Filtros limpos!');
}

function applyFilters() {
    // Coleta todos os filtros selecionados
    const selectedFilters = {
        categoria: [],
        preco: [],
        tamanho: [],
        ordenar: null
    };
    
    // Coleta categorias selecionadas
    const categoriaInputs = document.querySelectorAll('input[name="categoria"]:checked');
    categoriaInputs.forEach(input => {
        selectedFilters.categoria.push(input.value);
    });
    
    // Coleta preços selecionados
    const precoInputs = document.querySelectorAll('input[name="preco"]:checked');
    precoInputs.forEach(input => {
        selectedFilters.preco.push(input.value);
    });
    
    // Coleta tamanhos selecionados
    const tamanhoInputs = document.querySelectorAll('input[name="tamanho"]:checked');
    tamanhoInputs.forEach(input => {
        selectedFilters.tamanho.push(input.value);
    });
    
    // Coleta ordenação selecionada
    const ordenarInput = document.querySelector('input[name="ordenar"]:checked');
    if (ordenarInput) {
        selectedFilters.ordenar = ordenarInput.value;
    }
    
    // Aqui você pode implementar a lógica de filtrar os produtos
    console.log('Filtros aplicados:', selectedFilters);
    
    // Fecha o menu após aplicar
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.classList.remove('show');
        }
    }
    
    // Exemplo de como usar os filtros (você pode expandir isso)
    filterProducts(selectedFilters);
}

function filterProducts(filters) {
    // Esta é uma função de exemplo - você pode implementar a lógica real aqui
    console.log('Filtrando produtos com:', filters);
    
    // Exemplo de feedback visual
    let message = 'Filtros aplicados!\n\n';
    
    if (filters.categoria.length > 0) {
        message += `Categorias: ${filters.categoria.join(', ')}\n`;
    }
    if (filters.preco.length > 0) {
        message += `Preços: ${filters.preco.join(', ')}\n`;
    }
    if (filters.tamanho.length > 0) {
        message += `Tamanhos: ${filters.tamanho.join(', ')}\n`;
    }
    if (filters.ordenar) {
        message += `Ordenar por: ${filters.ordenar}\n`;
    }
    
    if (filters.categoria.length > 0 || filters.preco.length > 0 || filters.tamanho.length > 0 || filters.ordenar) {
        alert(message);
    } else {
        alert('Nenhum filtro selecionado!');
    }
}

// Previne que o menu feche ao clicar dentro dele
document.addEventListener('DOMContentLoaded', function() {
    updateSubtotal();
    
    // Adiciona event listener para o menu de filtros
    const filterMenu = document.querySelector('.filter-menu');
    if (filterMenu) {
        filterMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

/*Botão ver todos*/ 
function verTodosBotao(){
    window.location.href = "Page1.html"
}

const botaoVerTodos = document.getElementById("verTodos");

botaoVerTodos.addEventListener("click", verTodosBotao);
/*Fim do botão ver todos*/


/*Botões de produto mais vendidos*/ 
function botoesMaisVendidos (){
    window.location.href = "Page3.html"
}

const botaoMaisVendidosProduto = document.querySelectorAll(".itemMaisVendidos");

if (botaoMaisVendidosProduto.length > 0) {
    botaoMaisVendidosProduto.forEach(div => {
        div.addEventListener("click", botoesMaisVendidos);
    });
}
/*Fim dos botões mais vendidos*/ 
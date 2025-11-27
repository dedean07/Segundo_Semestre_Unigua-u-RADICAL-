const produtos = document.querySelectorAll(".divProduto");

function redirecionaProdutos(){
        window.location.href = "Page3.html"
}

if(produtos.length > 0){
    produtos.forEach(div => {
        div.addEventListener("click", redirecionaProdutos);
    });
}
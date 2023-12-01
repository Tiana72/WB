const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link');

    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list');
        goodsContainer.innerHTML = "";
        goods.forEach(good => {
            const goodBlock = document.createElement('div');
            goodBlock.classList.add('col-lg-3');
            goodBlock.classList.add('col-sm-6');
            goodBlock.innerHTML = `
                <div class="goods-card">
                    <span class="label">New</span>
                    <img src="img/image-119.jpg" alt="image: Hoodie" class="goods-image">
                    <h3 class="goods-title">Embroidered Hoodie</h3>
                    <p class="goods-description">Yellow/Lilac/Fuchsia/Orange</p>
                    <button class="button goods-card-btn add-to-cart" data-id="007">
                        <span class="button-price">$89</span>
                    </button>
                </div>
            `
            console.log(good);
        }) 
    }

    const getData = (value, category) => {
        fetch('/db/db.json')
            .then((res) => res.json())
            .then((data) => {
                const array = category ? data.filter((item) => item[category] === value) : data;
                localStorage.setItem('goods', JSON.stringify(array));

                if (window.location.pathname !== "/goods.html") {
                    window.location.href = '/goods.html'
                } else {
                    renderGoods(array)
                }
            })
    }

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const linkValue = link.textContent;
            const category = link.dataset.field;
            getData(linkValue, category);
        })
    })
    if (localStorage.getItem('goods') && window.location.pathname === "/goods.html") {
        renderGoods(JSON.parse(localStorage.getItem('goods')))
    } else {
        
    }

}

getGoods();





/* localStorage.setItem('goods', JSON.stringify([1, 2, 3, 4, 5]))

    const goods = JSON.parse(localStorage.getItem('goods'))

    console.log(goods);
    console.log(localStorage);
    localStorage.removeItem('goods');
    console.log(localStorage); */
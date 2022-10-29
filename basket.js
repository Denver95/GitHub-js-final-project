'use strict'


let basketCountEl = document.querySelector('.cartIconWrap span');
let basketTotalValueEl = document.querySelector('.basketTotalValue');
let basketTotalEl = document.querySelector('.basketTotal');
let basketEl = document.querySelector('.basket');

//№1
//Делаем так чтоб корзина открвалась.  
document.querySelector('.cartIconWrap').addEventListener('click', () => {
	basketEl.classList.toggle('hidden');
});

// №2
// Создаем пустой обьект в котором в дальнейшем будет храниться значения id name price
const basket = {};

//№3
// находим родительский див карточек и вешаем на него обработчик события. При клики на кнопку у нас сначало происходи проверка.
document.querySelector('.featuredItems').addEventListener('click', event => {
	if (!event.target.closest('.addToCart')) {
		return;
	}

	//№4
	// После проверки мы при клике получаем данные  Data-atributes
	const featuredItem = event.target.closest('.featuredItem');
	// Closest он провереят все до родительского тега. В нашем слуачии до тего FeaturedItem. если мы нажнем на дочерний элемент, то он проверит все до родителя.
	const id = +featuredItem.dataset.id;
	const name = featuredItem.dataset.name;
	const price = +featuredItem.dataset.price;

	//№5
	// Записываем функцию в которую будем передавать данные значения.
	addToCart(id, name, price);
});

//№5
// Создаем функцию которая будет в обьекте basket создавать обьекты для хранения информации переданные выше.
function addToCart(id, name, price) {
	// в basket передаем значения и провереяем существует ли в нашем basket такой id.
	if (!(id in basket)) {
		basket[id] = { id, name, price, count: 0, };
	}

	//№6
	//Если существует то добовляем единицу count (он указывает сколько раз был куплен товар)
	basket[id].count++;

	//№7
	// Теперь мы сделаем, чтоб в корзине сверху значек показывал, сколько товаров там лежит
	basketCountEl.textContent = getTotalBasketCount().toString(); // Будет приходить число, а мы будем превращать в строку

	//№8
	//Создаем функцию в которой бдуем считать общую цену и оставим 2 значения после запятой.
	basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);

	//№9
	// Создаем функцию в которой бдуем добовлять текст в корзину для отображения Цены и Названия Товара.
	renderProductInBasket(id);

}


//№7
//Создадим отдельную функцию, в которой мы будем вычеслять в каждом обьекте чему равен count.
// Функция будет считать сколько товаров куплено и будем ложить эти значения выше.
function getTotalBasketCount() {
	// Мы возрвщаем значение. Получаем все значения от Object.values потом перебераем массив с помощью метода reduce () Можно и через цикл
	return Object.values(basket).reduce((acc, product) => acc + product.count, 0);

	// const productArr = Object.values(basket);
	// let count = 0;
	// for (const product of productArr) {
	// 	count += product.count;
	// }
	// return count;
}

//№8
//Создадим отдельную функцию, в которой мы будем вычеслять в каждом обьекте чему равен Price.
function getTotalBasketPrice() {
	return Object.values(basket)
		.reduce((acc, product) => acc + product.count * product.price, 0);
	// перебираем масив находим в нем count  и price и умнажаем друг на друга
}


//№9
// Создаем функцию в которой бдуем добовлять текст в корзину для отображения Цены и Названия Товара.
function renderProductInBasket(id) {
	//№12
	//У нас при покупке товара дублируются строки.
	//Сделаем так, чтоб мы нажимали много раз, но было все записано в одну строку.
	//Для этого нужно проверить есть ли такой продукт, был ли он вставлен

	const basketRowEl = basketEl
		.querySelector(`.basketRow[data-productId = "${id}"]`);
	if (!basketRowEl) {
		renderNewProductInBasket(id);
		return;
	}
	basketRowEl.querySelector('.productCount').textContent = basket[id].count;
	basketRowEl.querySelector('.productTotalRow')
		.textContent = basket[id].count * basket[id].price;
}


//№10
//Запишем разметку которую будем вставлять.
//Render - отобрази
function renderNewProductInBasket(productId) {

	const productRow = `
		<div class="basketRow" data-productId="${productId}" >
			<div> ${basket[productId].name}</div>
			<div>
 				<span class="productCount">${basket[productId].count}</span> шт.
			</div>
			<div>${basket[productId].price}</div>
			<div>
 				<span class = "productTotalRow"> ${(basket[productId].price * basket[productId].count)}</span>
			</div>
		</div>
		`;

	//№11
	//теперь нам надо вставить эту разметку  перед basketTotal
	//Находим basketTotal
	basketTotalEl.insertAdjacentHTML('beforebegin', productRow);
};








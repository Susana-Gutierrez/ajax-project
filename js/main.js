/* global data */
/* exported data */

const typeOfProduct = ['Blush', 'Eyebrow', 'Eyeliner', 'Eyeshadow', 'Foundation', 'Lip liner', 'Lipstick', 'Mascara'];

const $typeOfProduct = document.querySelector('#product-type');
const $searchButton = document.querySelector('.search-button');
const $modalSearch = document.querySelector('.modal-search');
const $modalSearchButton = document.querySelector('.modal-search-button');
const $overlay = document.querySelector('.overlay');
const $text = document.querySelector('.text');
const $viewProducts = document.querySelector('.view-products');
const $back = document.querySelector('.back');
const $backButton = document.querySelector('.back-button');
const $productTypeTitle = document.querySelector('.product-type-title');
const $viewProductsRow = document.querySelector('.view-products-row');

function newOptiontypeOfProductDOM(number) {
  const elementOption = document.createElement('option');
  elementOption.value = typeOfProduct[number];
  elementOption.textContent = typeOfProduct[number];
  document.querySelector('#product-type').appendChild(elementOption);
}

function handleClickSearchButton(events) {
  $typeOfProduct.value = 'product-type';
  $modalSearch.className = 'modal-search';
  $overlay.className = 'overlay';
}

$searchButton.addEventListener('click', handleClickSearchButton);

function listProducts(picture, brand, name, price) {

  var elementDiv = document.createElement('div');
  elementDiv.setAttribute('class', 'product-container');
  var elementDiv2 = document.createElement('div');
  elementDiv2.setAttribute('class', 'product-img');
  var elementImg = document.createElement('img');
  elementImg.setAttribute = ('class', 'picture-product');
  elementImg.src = picture;
  elementImg.addEventListener('error', function (event) {
    this.onerror = null;
    elementImg.src = 'images/imagenoavailable.jpg';
  });

  var elementDiv3 = document.createElement('div');
  elementDiv3.setAttribute('class', 'product-detail');
  var elementH4Brand = document.createElement('h4');
  elementH4Brand.textContent = brand;
  var elementH4Name = document.createElement('h4');
  elementH4Name.textContent = name;
  var elementH4Price = document.createElement('h4');
  elementH4Price.textContent = price;

  elementDiv.appendChild(elementDiv2);
  elementDiv2.appendChild(elementImg);
  elementDiv.appendChild(elementDiv3);
  elementDiv3.appendChild(elementH4Brand);
  elementDiv3.appendChild(elementH4Name);
  elementDiv3.appendChild(elementH4Price);
  $viewProductsRow.appendChild(elementDiv);

}

function handleClickModalSearchButton(events) {
  $modalSearch.className = 'hidden';
  $overlay.className = 'hidden';
  $backButton.className = 'back-button';

  if ($typeOfProduct.value !== 'product-type') {

    $viewProductsRow.innerHTML = '';
    $text.className = 'hidden';
    $viewProducts.className = 'view-products';
    $productTypeTitle.textContent = $typeOfProduct.value;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://makeup-api.herokuapp.com/api/v1/products.json?product_type=' + $typeOfProduct.value);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      for (var product in xhr.response) {
        var pictureOfProduct = xhr.response[product].image_link;
        var brandOfProduct = xhr.response[product].brand;
        var nameOfProduct = xhr.response[product].name;
        var priceOfProduct = '';
        if (xhr.response[product].price_sign != null) {
          priceOfProduct = xhr.response[product].price_sign + xhr.response[product].price;
        } else {
          priceOfProduct = xhr.response[product].price;
        }

        listProducts(pictureOfProduct, brandOfProduct, nameOfProduct, priceOfProduct);
      }
    });
    xhr.send();
  }
}

$modalSearchButton.addEventListener('click', handleClickModalSearchButton);

function handleClickBackButton(event) {
  $text.className = 'text';
  $viewProducts.className = 'hidden';
  $backButton.className = 'hidden';
}

$back.addEventListener('click', handleClickBackButton);

function handleDOMContentLoaded(event) {
  for (let i = 0; i < typeOfProduct.length; i++) {
    newOptiontypeOfProductDOM(i);
  }
}

window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

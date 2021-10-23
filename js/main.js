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
const $vegan = document.querySelector('#vegan');
const $glutenFree = document.querySelector('#glutenfree');
const $hypoallergenic = document.querySelector('#hypoallergenic');
const $organic = document.querySelector('#organic');
const $notalc = document.querySelector('#notalc');
const $natural = document.querySelector('#natural');
const $titletags = document.querySelector('.title-tags');
var xhr = new XMLHttpRequest();
var url;

var tags = [];

function newOptiontypeOfProductDOM(number) {
  const elementOption = document.createElement('option');
  elementOption.value = typeOfProduct[number];
  elementOption.textContent = typeOfProduct[number];
  document.querySelector('#product-type').appendChild(elementOption);
}

function handleClickSearchButton(events) {
  $modalSearch.className = 'modal-search';
  $overlay.className = 'overlay';
}

$searchButton.addEventListener('click', handleClickSearchButton);

function listProducts(picture, brand, name, price) {

  const elementDiv = document.createElement('div');
  elementDiv.setAttribute('class', 'product-container');
  const elementDiv2 = document.createElement('div');
  elementDiv2.setAttribute('class', 'product-img');
  const elementImg = document.createElement('img');
  elementImg.setAttribute = ('class', 'picture-product');
  elementImg.src = picture;
  elementImg.addEventListener('error', function (event) {
    this.onerror = null;
    elementImg.src = 'images/imagenoavailable.jpg';
  });

  const elementDiv3 = document.createElement('div');
  elementDiv3.setAttribute('class', 'product-detail');
  const elementH4Brand = document.createElement('h4');
  elementH4Brand.textContent = brand;
  const elementH4Name = document.createElement('h4');
  elementH4Name.textContent = name;
  const elementH4Price = document.createElement('h4');
  elementH4Price.textContent = price;

  elementDiv.appendChild(elementDiv2);
  elementDiv2.appendChild(elementImg);
  elementDiv.appendChild(elementDiv3);
  elementDiv3.appendChild(elementH4Brand);
  elementDiv3.appendChild(elementH4Name);
  elementDiv3.appendChild(elementH4Price);
  $viewProductsRow.appendChild(elementDiv);

}

function checkingCheckboxes() {

  if ($vegan.checked) {
    tags.push('vegan');
  }
  if ($glutenFree.checked) {
    tags.push('gluten+free');
  }
  if ($hypoallergenic.checked) {
    tags.push('hypoallergenic');
  }
  if ($organic.checked) {
    tags.push('organic');
  }
  if ($notalc.checked) {
    tags.push('no+talc');
  }
  if ($natural.checked) {
    tags.push('natural');
  }
}

function handleLoad(event) {
  let priceOfProduct = '';
  for (const product in xhr.response) {
    const idOfProduct = xhr.response[product].id;
    const pictureOfProduct = xhr.response[product].image_link;
    const brandOfProduct = xhr.response[product].brand;
    const nameOfProduct = xhr.response[product].name;
    const tagList = xhr.response[product].tag_list;
    if (xhr.response[product].price_sign != null) {
      priceOfProduct = xhr.response[product].price_sign + xhr.response[product].price;
    } else {
      priceOfProduct = xhr.response[product].price;
    }

    var objectProduct = {
      id: idOfProduct,
      picture: pictureOfProduct,
      brand: brandOfProduct,
      name: nameOfProduct,
      price: priceOfProduct,
      tag: tagList
    };

    data.entries.push(objectProduct);

    listProducts(pictureOfProduct, brandOfProduct, nameOfProduct, priceOfProduct);
  }
}

function ajax(link) {
  xhr.open('GET', link);
  xhr.responseType = 'json';
  xhr.addEventListener('load', handleLoad);
  xhr.send();
}

function addTitletags() {

  for (let i = 0; i < tags.length; i++) {
    let tag = '';
    for (let x = 0; x < tags[i].length; x++) {
      if (tags[i][x] === '+') {
        tag = tag + ' ';
      } else {
        tag = tag + tags[i][x];
      }
    }

    if (i === 0) {
      $titletags.textContent = $titletags.textContent + ' ' + tag;
    } else if (i === tags.length - 1) {
      $titletags.textContent = $titletags.textContent + ' & ' + tag + '.';
    } else {
      $titletags.textContent = $titletags.textContent + ', ' + tag;
    }
  }
}

function handleClickModalSearchButton(events) {
  tags = [];
  data.entries = [];
  $modalSearch.className = 'hidden';
  $overlay.className = 'hidden';
  $backButton.className = 'back-button';

  checkingCheckboxes();

  if (($typeOfProduct.value !== 'product-type') || (tags.length > 0)) {
    $viewProductsRow.innerHTML = '';
    $text.className = 'hidden';
    $viewProducts.className = 'view-products';
  } else {
    if ($text.className === 'text') {
      $backButton.className = 'back-button hidden';
    }
  }

  if ($typeOfProduct.value !== 'product-type') {
    $productTypeTitle.textContent = $typeOfProduct.value;
    if (tags.length > 0) {
      $titletags.textContent = '   - tags: ';
      addTitletags();

      for (let i = 0; i < tags.length; i++) {
        url = 'http://makeup-api.herokuapp.com/api/v1/products.json?product_type=' + $typeOfProduct.value + '&product_tags=' + tags[i];
        ajax(url);
      }
    } else {
      $titletags.textContent = '';
      url = 'http://makeup-api.herokuapp.com/api/v1/products.json?product_type=' + $typeOfProduct.value;
      ajax(url);
    }
  } else {
    $productTypeTitle.textContent = '';
    $titletags.textContent = 'Tags: ';
    addTitletags();
    if (tags.length > 0) {
      for (let i = 0; i < tags.length; i++) {
        url = 'http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=' + tags[i];
        ajax(url);
      }
    }
  }
}

$modalSearchButton.addEventListener('click', handleClickModalSearchButton);

function handleClickBackButton(event) {
  $text.className = 'text';
  $viewProducts.className = 'hidden';
  $backButton.className = 'hidden';
  $typeOfProduct.value = 'product-type';
  $vegan.checked = false;
  $glutenFree.checked = false;
  $hypoallergenic.checked = false;
  $organic.checked = false;
  $notalc.checked = false;
  $natural.checked = false;

}

$back.addEventListener('click', handleClickBackButton);

function handleDOMContentLoaded(event) {
  for (let i = 0; i < typeOfProduct.length; i++) {
    newOptiontypeOfProductDOM(i);
  }
}

window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

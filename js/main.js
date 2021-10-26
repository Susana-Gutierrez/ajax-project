/* global data */
/* exported data */

const typeOfProduct = ['Blush', 'Eyebrow', 'Eyeliner', 'Eyeshadow', 'Foundation', 'Lip liner', 'Lipstick', 'Mascara'];
const tagsOptions = ['Vegan', 'Gluten Free', 'Hypoallergenic', 'Organic', 'No Talc', 'Natural'];
const $typeOfProduct = document.querySelector('#product-type');
const $searchButton = document.querySelector('.search-button');
const $modalSearch = document.querySelector('.modal-search');
const $modalSearchButton = document.querySelector('.modal-search-button');
const $overlay = document.querySelector('.overlay');
const $text = document.querySelector('.text');
const $viewProducts = document.querySelector('.view-products');
const $back = document.querySelector('.back');
const $productTypeTitle = document.querySelector('.product-type-title');
const $viewProductsRow = document.querySelector('.view-products-row');
const $vegan = document.querySelector('#vegan');
const $glutenFree = document.querySelector('#glutenfree');
const $hypoallergenic = document.querySelector('#hypoallergenic');
const $organic = document.querySelector('#organic');
const $notalc = document.querySelector('#notalc');
const $natural = document.querySelector('#natural');
const $titletags = document.querySelector('.title-tags');
const $viewSingleProduct = document.querySelector('.view-single-product');
const $buyNow = document.querySelector('.buy-now');
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

function listProducts(id, picture, brand, name, price) {
  const elementDiv = document.createElement('div');
  elementDiv.setAttribute('class', 'product-container');
  const elementDiv2 = document.createElement('div');
  elementDiv2.setAttribute('class', 'product-img');
  const elementImg = document.createElement('img');
  elementImg.setAttribute('class', 'picture-product');
  elementImg.setAttribute('product-id', id);
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

function singleProductDetails(objectProduct) {
  const elementDiv = document.createElement('div');
  elementDiv.setAttribute('class', 'single-product');
  const elementDiv13 = document.createElement('div');
  elementDiv13.setAttribute('class', 'single-product-title');
  elementDiv13.textContent = objectProduct.name;
  const elementDiv2 = document.createElement('div');
  elementDiv2.setAttribute('class', 'single-product');
  const elementDiv3 = document.createElement('div');
  elementDiv3.setAttribute('class', 'single-product-img');
  const elementImg = document.createElement('img');
  elementImg.src = objectProduct.picture;
  elementImg.addEventListener('error', function (event) {
    this.onerror = null;
    elementImg.src = 'images/imagenoavailable.jpg';
  });
  const elementDiv4 = document.createElement('div');
  elementDiv4.setAttribute('class', 'single-product');
  elementDiv4.textContent = objectProduct.brand;
  const elementDiv5 = document.createElement('div');
  elementDiv5.setAttribute('class', 'single-product');
  elementDiv5.textContent = objectProduct.price;
  const elementHr = document.createElement('hr');
  elementHr.setAttribute('class', 'line');
  const elementDiv6 = document.createElement('div');
  elementDiv6.setAttribute('class', 'single-product');
  const elementDiv7 = document.createElement('div');
  elementDiv7.setAttribute('class', 'shades-container');
  const elementDiv8 = document.createElement('div');
  elementDiv8.setAttribute('class', 'shade-title');
  elementDiv8.textContent = 'Shade: ';
  const elementHr2 = document.createElement('hr');
  elementHr2.setAttribute('class', 'line');
  const elementDiv10 = document.createElement('div');
  elementDiv10.setAttribute('class', 'single-product');
  const elementDiv15 = document.createElement('div');
  elementDiv15.setAttribute('class', 'single-product-description');
  elementDiv15.textContent = 'Description: ' + objectProduct.description;
  const elementDiv11 = document.createElement('div');
  elementDiv11.setAttribute('class', 'single-product');
  const elementDiv16 = document.createElement('div');
  elementDiv16.setAttribute('class', 'single-product-tags');
  elementDiv16.textContent = 'Tags: ';
  const elementHr3 = document.createElement('hr');
  elementHr3.setAttribute('class', 'line');

  $viewSingleProduct.appendChild(elementDiv);
  elementDiv.appendChild(elementDiv13);
  $viewSingleProduct.appendChild(elementDiv2);
  elementDiv2.appendChild(elementDiv3);
  elementDiv3.appendChild(elementImg);
  $viewSingleProduct.appendChild(elementDiv4);
  $viewSingleProduct.appendChild(elementDiv5);
  $viewSingleProduct.appendChild(elementHr);
  $viewSingleProduct.appendChild(elementDiv6);
  elementDiv6.appendChild(elementDiv7);
  elementDiv7.appendChild(elementDiv8);
  $viewSingleProduct.appendChild(elementHr2);
  $viewSingleProduct.appendChild(elementDiv10);
  elementDiv10.appendChild(elementDiv15);
  $viewSingleProduct.appendChild(elementDiv11);
  elementDiv11.appendChild(elementDiv16);
  $viewSingleProduct.appendChild(elementHr3);

  for (let i = 0; i < objectProduct.shades.length; i++) {
    const elementDiv14 = document.createElement('div');
    elementDiv14.setAttribute('class', 'shade-color-name');
    const elementDiv9 = document.createElement('div');
    elementDiv9.setAttribute('class', 'shade');
    elementDiv9.style.backgroundColor = objectProduct.shades[i].hex_value;
    const elementDiv12 = document.createElement('div');
    elementDiv12.setAttribute('class', 'shade-name');
    elementDiv12.textContent = objectProduct.shades[i].colour_name;
    elementDiv7.appendChild(elementDiv14);
    elementDiv14.appendChild(elementDiv9);
    elementDiv14.appendChild(elementDiv12);
  }

  for (let x = 0; x < objectProduct.tag.length; x++) {
    for (let y = 0; y < tagsOptions.length; y++) {
      if (objectProduct.tag[x] === tagsOptions[y]) {
        elementDiv16.textContent = elementDiv16.textContent + ' *' + objectProduct.tag[x];
      }
    }
  }
}

function checkingCheckboxes() {

  if ($vegan.checked) {
    tags.push('Vegan');
  }
  if ($glutenFree.checked) {
    tags.push('Gluten+Free');
  }
  if ($hypoallergenic.checked) {
    tags.push('Hypoallergenic');
  }
  if ($organic.checked) {
    tags.push('Organic');
  }
  if ($notalc.checked) {
    tags.push('No+Talc');
  }
  if ($natural.checked) {
    tags.push('Natural');
  }
}

function ajax(link) {
  var isThereAnEntry = false;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', link);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    let priceOfProduct = '';
    for (const product in xhr.response) {
      const idOfProduct = xhr.response[product].id;
      const pictureOfProduct = xhr.response[product].image_link;
      const brandOfProduct = xhr.response[product].brand;
      const nameOfProduct = xhr.response[product].name;
      const tagList = xhr.response[product].tag_list;
      const shades = xhr.response[product].product_colors;
      const description = xhr.response[product].description;
      const productLink = xhr.response[product].product_link;

      if (xhr.response[product].price_sign != null) {
        priceOfProduct = xhr.response[product].price_sign + xhr.response[product].price;
      } else {
        priceOfProduct = xhr.response[product].price;
      }

      var objectProduct = {
        id: idOfProduct,
        name: nameOfProduct,
        picture: pictureOfProduct,
        brand: brandOfProduct,
        price: priceOfProduct,
        shades: shades,
        description: description,
        tag: tagList,
        link: productLink
      };

      for (let i = 0; i < data.entries.length; i++) {
        if (data.entries[i].id === idOfProduct) {
          isThereAnEntry = true;
          break;
        }
      }

      if (isThereAnEntry === false) {
        data.entries.push(objectProduct);
        listProducts(idOfProduct, pictureOfProduct, brandOfProduct, nameOfProduct, priceOfProduct);
      }
    }
  });
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
  data.view = '';
  $modalSearch.className = 'hidden';
  $overlay.className = 'hidden';
  $back.className = 'back';
  $buyNow.className = 'hidden';

  checkingCheckboxes();

  if (($typeOfProduct.value !== 'product-type') || (tags.length > 0)) {
    $viewProductsRow.innerHTML = '';
    $text.className = 'hidden';
    $viewSingleProduct.className = 'hidden';
    $viewSingleProduct.innerHTML = '';
    $viewProducts.className = 'view-products';
  } else {
    if ($text.className === 'text') {
      $back.className = 'back hidden';
    }
  }

  if (($typeOfProduct.value !== 'product-type') && (tags.length > 0)) {
    $productTypeTitle.textContent = $typeOfProduct.value;
    $titletags.textContent = '   - tags: ';
    addTitletags();
    for (let i = 0; i < tags.length; i++) {
      url = 'http://makeup-api.herokuapp.com/api/v1/products.json?product_type=' + $typeOfProduct.value + '&product_tags=' + tags[i];
      ajax(url);
    }
  }

  if (($typeOfProduct.value !== 'product-type') && (tags.length <= 0)) {
    $productTypeTitle.textContent = $typeOfProduct.value;
    $titletags.textContent = '';
    url = 'http://makeup-api.herokuapp.com/api/v1/products.json?product_type=' + $typeOfProduct.value;
    ajax(url);

  }

  if (($typeOfProduct.value === 'product-type') && (tags.length > 0)) {
    $productTypeTitle.textContent = '';
    $titletags.textContent = 'Tags: ';
    addTitletags();
    for (let i = 0; i < tags.length; i++) {
      url = 'http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=' + tags[i];
      ajax(url);
    }
  }
}

$modalSearchButton.addEventListener('click', handleClickModalSearchButton);

function handleClickBackButton(event) {

  if (data.view === 'view-single-product') {
    $viewSingleProduct.className = 'hidden';
    $viewSingleProduct.innerHTML = '';
    $viewProducts.className = 'view-products';
    $buyNow.className = 'hidden';
    data.view = '';
  } else {
    $text.className = 'text';
    $viewProducts.className = 'hidden';
    $back.className = 'hidden';
    $typeOfProduct.value = 'product-type';
    $vegan.checked = false;
    $glutenFree.checked = false;
    $hypoallergenic.checked = false;
    $organic.checked = false;
    $notalc.checked = false;
    $natural.checked = false;
  }
}

$back.addEventListener('click', handleClickBackButton);

function handleClickviewProductsRow(event) {
  if (event.target.tagName === 'IMG') {

    const idProduct = event.target.getAttribute('product-id');

    $viewProducts.className = 'hidden';
    $viewSingleProduct.className = 'view-single-product';
    data.view = 'view-single-product';
    $buyNow.className = 'buy-now';

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].id === parseInt(idProduct)) {

        var objectProduct = {
          id: data.entries[i].id,
          name: data.entries[i].name,
          picture: data.entries[i].picture,
          brand: data.entries[i].brand,
          price: data.entries[i].price,
          shades: data.entries[i].shades,
          description: data.entries[i].description,
          tag: data.entries[i].tag
        };
        data.url = data.entries[i].link;
      }
    }

    singleProductDetails(objectProduct);

  }
}

$viewProductsRow.addEventListener('click', handleClickviewProductsRow);

function handleBuyNowClick(event) {
  window.open(data.url);
  data.url = '';
}

$buyNow.addEventListener('click', handleBuyNowClick);

function handleDOMContentLoaded(event) {
  for (let i = 0; i < typeOfProduct.length; i++) {
    newOptiontypeOfProductDOM(i);
  }
}

window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

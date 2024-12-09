// --------------------CALLINGS---------------------------------

// selects the html element with the classname "bi-person" and stores it in variable name "profileDropdown"
let profileIcon = document.querySelector(".bi-person");

// selects the html element with the classname "bi-person" and stores it in variable name "profileDropdown"
let profileDropdown = document.querySelector(".profile-dropdown");

// selects the html element with the classname "categories" and stores it in variable "categories"
let categories = document.querySelector(".categories");

// selects the html element with the classname "bi-caret-down-fill" and stores it in variable "dropdownIcon"
let dropdownIcon = document.querySelector(".bi-caret-down-fill");

// selects the html element with the classname "main-option" and stores it in variable "mainOption"
let mainOption = document.querySelector(".main-option");

// selects the html element with the classname ".categories p" and stores it in variable "allOptions"
let allOptions = [...document.querySelectorAll(".categories p")];

// selects the HTMl element with the classname "products" div that will carry all the prtoducts
let productsContainer = document.querySelector(".products");

// Selects the search input and stored it in search variable
let search = document.querySelector(".search");

let loading = document.querySelector(".loading");

//=========== GLOBAL=====================
let globalProducts = null;

//---------------------------WORKING ----------------------------------
//Adds a click event listener to the profileIcon to toggle the profile dropdown
profileIcon.addEventListener("click", () => {
  // Toggles the "akin" class on the profile-dropdown to show or hide it.
  profileDropdown.classList.toggle("akin");
});

// Adds a click event listener to the dropdown icon to toggle the categories dropdown
dropdownIcon.addEventListener("click", () => {
  // Toggles the "akin" class on the categories dropdown
  categories.classList.toggle("akin");
  // Toggles the "akin" class on the dropdown icon by 180degree
  dropdownIcon.classList.toggle("akin");
});

// Loop through each category option in the array of allOptions
allOptions.forEach((eachOption) => [
  //adds a click event listener to each category option
  eachOption.addEventListener("click", () => {
    // logs the clicked category text/content to the concole
    console.log(eachOption.textContent);
    //updates the displayed category in "mainOption" to match the clicked category
    mainOption.textContent = eachOption.textContent;
    //removes the "akin" classname from the categories dropdown to hide it
    categories.classList.remove("akin");

    // If the clicked category is "All", update the UI with all products
    if (eachOption.textContent === "All") {
      updateUI(globalProducts);
    } else {
      // Filters products to match the selected category
      let filteredProducts = globalProducts.filter((singleProduct) => {
        return singleProduct.category === eachOption.textContent.toLowerCase();
      });
      // Updates the UI with the filtered products
      updateUI(filteredProducts);
    }
  }),
]);

// defines an asynchronous function to fetch product data from an API
let fetchProducts = async () => {
  // Fetches data from the API and awaits the response
  let getAPI = await fetch("https://fakestoreapi.com/products");

  // Converts the fetched data to JSON format and stores it in "allProducts"
  let allProducts = await getAPI.json();

  globalProducts = allProducts;
  // logs the fectched products  to the console.
  console.log(allProducts);

  updateUI(allProducts);

  loading.classList.add("d-none");
};

setTimeout(() => {
  //Invokes the function
  fetchProducts();
}, 3000);

// -------------------------------------
function updateUI(array) {
  let modifiedProducts = array.map((eachProduct) => {
    return `<div class="product border w-100 p-4 rounded-3">
    <div class="d-flex justify-content-center"><img src="${
      eachProduct.image
    }" alt="" width="250" height="250" /></div>
    <p class="fs-4">${eachProduct.title.slice(0, 15)}...</p>
    <p>${eachProduct.description.slice(0, 50)}...</p>
    <p class="fs-5">N${eachProduct.price}</p>
    <button class="rounded-2 fw-bold py-2 px-4 bg-warning-subtle w-100">Add to cart</button>
    </div>`;
  });
  productsContainer.innerHTML = modifiedProducts.join(" ");
}

//-------------------------
// Implements search functionality for
search.addEventListener("input", () => {
  let input = search.value.toLowerCase();
  console.log(input);

  let searchedProducts = globalProducts.filter((product) => {
    return product.title.toLowerCase().includes(input);
  });

  updateUI(searchedProducts); // Updates UI with search results
});

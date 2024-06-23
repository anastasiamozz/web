function toggleNav() {
    var element = document.getElementById("curtain-nav");
    if (element.style.width === "0px") {
        element.style.width = "200px";
    } else {
        element.style.width = "0px";
    }
}

// Select the div with the class "hamburger-menu"
var hamburgerMenu = document.querySelector(".hamburger-menu");

// Add an event listener to the div with the hamburger-menu class
hamburgerMenu.addEventListener("click", toggleNav());

function loadRSS() {
    //Use CORS API website as proxy
    let proxy = "https://cors-anywhere.herokuapp.com/";

    //Declare the URL where we fetch RSS file
    let url = "https://www.nasa.gov/rss/dyn/educationnews.rss";
    //NASA RSS: https://www.nasa.gov/content/nasa-rss-feeds
    //     NASA education news: https://www.nasa.gov/rss/dyn/educationnews.rss
    //CNN RSS: https://edition.cnn.com/services/rss/
    //    CNN RSS top stories: http://rss.cnn.com/rss/edition.rss
    //BBC RSS: http://feeds.bbci.co.uk/news/rss.xml

    //Create an XMLHttpRequest Object to request XML file (data) through HTTP protocol
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", proxy + url, true);
    xhttp.send();

    //Process RSS file when it has been loaded successfully
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Load XML file as "XML" format and parse/process it by calling function parseRSS()
            let rss = this.responseXML;
            parseRSS(rss);
        }
    };
}

function parseRSS(rss) {
    //Load all "items" inside the RSS document, each item is a news
    let items = rss.getElementsByTagName("item");
    let rssContent = ""; //varible "rssContent" is used to store rss content in HTML format

    //Loop through all "items" (news) and extract child node content: "title", "link", "description" and "pubdate"
    for (let i = 0; i < items.length; i++) {
        let nodes = items[i].children;
        //Extract "title", "link", "description" and "pubdate" of each "node"
        let title, pubdate, description, link;
        for (let j = 0; j < nodes.length; j++) {
            if (nodes[j].tagName == "title") {
                title = nodes[j].childNodes[0].nodeValue;
            } else if (nodes[j].tagName == "link") {
                link = nodes[j].childNodes[0].nodeValue;
            } else if (nodes[j].tagName == "description") {
                description = nodes[j].childNodes[0].nodeValue;
            } else if (nodes[j].tagName == "pubDate") {
                pubdate = nodes[j].childNodes[0].nodeValue;
            }
        }

        //Format the extracted information above in HTML format and append it to the "rssContent" variable
        //each item (news) is wrapped inside a <div>
        rssContent += `<div class="col-12 col-md-6">
                        <div style="background-color: #f3f1f1; margin: 1em; padding: 0.5em;" class="border border-black">																
                          <h3 class="text-center fw-bold">${title}</h3>
                          <p>${description}</p>
                          <p style="font-style: italic;" class="text-primary">${pubdate}</p>
                        </div>
                      </div>`;
    }

    //Display the "rssContent" on the webpage
    document.getElementById("rssFeed").innerHTML = rssContent;
}

if (window.location.href.indexOf("js-demo.html") > -1) {
    // JS DENO 1

    //Manual slideshow
    let slideIndex = 1;

    function showSlide(index) {
        const slides = document.querySelectorAll(".slide");

        if (index < 1) {
            slideIndex = slides.length;
        } else if (index > slides.length) {
            slideIndex = 1;
        }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex - 1].style.display = "block";
    }

    function prevSlide() {
        showSlide((slideIndex -= 1));
    }

    function nextSlide() {
        showSlide((slideIndex += 1));
    }

    showSlide(slideIndex);

    //Automatic slideshow
    let autoSlideIndex = 0;
    showAutoSlides();

    function showAutoSlides() {
        let i;
        let slides = document.getElementsByClassName("auto-slide");

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = "block";

        setTimeout(showAutoSlides, 2000); // Change image every 2 seconds
    }

    // JS DEMO 2

    // Array to store comments
    const commentsArray = [
        {
            name: "User 1",
            comment: "This is a great product!",
        },
        {
            name: "User 2",
            comment: "I love the features of this iPad.",
        },
    ];

    // Function to display comments
    function displayComments() {
        const commentsSection = document.getElementById("commentsSection");
        commentsSection.innerHTML = ""; // Clear existing content

        commentsArray.forEach((comment) => {
            const commentDiv = document.createElement("div");
            commentDiv.innerHTML = `
      <div class="border p-2 mt-2">
        <strong>${comment.name}</strong>: ${comment.comment}
      </div>
    `;
            commentsSection.appendChild(commentDiv);
        });
    }

    // Function to add a new comment
    function addComment() {
        const nameInput = document.getElementById("commentName");
        const textInput = document.getElementById("commentText");

        const newComment = {
            name: nameInput.value,
            comment: textInput.value,
        };

        commentsArray.push(newComment); // Add the new comment to the array
        displayComments(); // Update the displayed comments
        nameInput.value = ""; // Clear the input fields
        textInput.value = "";
    }

    // Initial display of comments
    displayComments();

    // JS DEMO 3

    const itemsArray = [
        {
            title: "Samsung Galaxy Tab A8",
            price: "$488.99",
            imageUrl:
                "https://www.pbtech.com/imgprod/T/A/TABSAM20006411__2.jpg?h=3262266850",
        },
        {
            title: "Nokia T20",
            price: "$299.00",
            imageUrl:
                "https://www.pbtech.com/imgprod/T/A/TABNOK102011__1.jpg?h=560724130",
        },
        {
            title: "Lenovo P11 Plus",
            price: "$479.00",
            imageUrl:
                "https://www.pbtech.com/imgprod/T/A/TABLEN1612821__1.jpg?h=4180395155",
        },
    ];

    const itemSelect = document.getElementById("itemSelect");
    const itemInfo = document.getElementById("itemInfo");
    const itemTitleInput = document.getElementById("itemTitle");
    const itemPriceInput = document.getElementById("itemPrice");
    const itemImageUrlInput = document.getElementById("itemImageUrl");

    function populateSelect() {
        itemsArray.forEach((item, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = item.title;
            itemSelect.appendChild(option);
        });

        itemSelect.addEventListener("change", () => {
            displayItemInfo(itemSelect.value);
        });
    }

    function displayItemInfo(index) {
        const selectedItem = itemsArray[index];
        itemInfo.innerHTML = `
    <h6 class="p-2 fw-bold">${selectedItem.title}</h6>
    <p class="p-2">Price: ${selectedItem.price}</p>
    <img src="${selectedItem.imageUrl}" class="img-fluid p-2 itemImage" alt="${selectedItem.title}" />
    
    `;
    }

    function addItemToList() {
        const newItem = {
            title: itemTitleInput.value,
            price: itemPriceInput.value,
            imageUrl: itemImageUrlInput.value,
        };

        itemsArray.push(newItem);
        itemSelect.innerHTML = ""; // Clear the select element
        populateSelect(); // Repopulate the select element
        itemTitleInput.value = "";
        itemPriceInput.value = "";
        itemImageUrlInput.value = "";
    }

    // Initial setup
    populateSelect();
    displayItemInfo(0); // Display the first item's information

    // JS DEMO 4

    const cart = [];

    const products = [
        {
            name: "Samsung Galaxy Tab A8",
            imgSrc: "Images/img1.jpg",
            price: "488.99",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et ante ligula. Sed mattis laoreet viverra. Integer in libero eros. Integer sit amet facilisis ligula. Cras ac tincidunt sem. Maecenas eget semper nulla. Nulla urna ipsum, gravida sit amet lorem eget, tincidunt malesuada ligula. Nam ut lobortis orci, vitae tempus tortor.",
        },
        {
            name: "Nokia T20",
            imgSrc: "Images/img2.jpg",
            price: "299.00",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et ante ligula. Sed mattis laoreet viverra. Integer in libero eros. Integer sit amet facilisis ligula. Cras ac tincidunt sem. Maecenas eget semper nulla. Nulla urna ipsum, gravida sit amet lorem eget, tincidunt malesuada ligula. Nam ut lobortis orci, vitae tempus tortor.",
        },
        {
            name: "Lenovo P11 Plus",
            imgSrc: "Images/img3.jpg",
            price: "479.00",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et ante ligula. Sed mattis laoreet viverra. Integer in libero eros. Integer sit amet facilisis ligula. Cras ac tincidunt sem. Maecenas eget semper nulla. Nulla urna ipsum, gravida sit amet lorem eget, tincidunt malesuada ligula. Nam ut lobortis orci, vitae tempus tortor.",
        },
        {
            name: "Apple iPad 9th Gen",
            imgSrc: "Images/ipad.jpg",
            price: "525.00",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et ante ligula. Sed mattis laoreet viverra. Integer in libero eros. Integer sit amet facilisis ligula. Cras ac tincidunt sem. Maecenas eget semper nulla. Nulla urna ipsum, gravida sit amet lorem eget, tincidunt malesuada ligula. Nam ut lobortis orci, vitae tempus tortor.",
        },
        {
            name: "Apple iPad 10th Gen",
            imgSrc: "Images/ipad2.jpg",
            price: "775.00",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et ante ligula. Sed mattis laoreet viverra. Integer in libero eros. Integer sit amet facilisis ligula. Cras ac tincidunt sem. Maecenas eget semper nulla. Nulla urna ipsum, gravida sit amet lorem eget, tincidunt malesuada ligula. Nam ut lobortis orci, vitae tempus tortor.",
        },
        {
            name: "Apple iPad Pro 4th Gen",
            imgSrc: "Images/ipad3.jpg",
            price: "1618.99",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et ante ligula. Sed mattis laoreet viverra. Integer in libero eros. Integer sit amet facilisis ligula. Cras ac tincidunt sem. Maecenas eget semper nulla. Nulla urna ipsum, gravida sit amet lorem eget, tincidunt malesuada ligula. Nam ut lobortis orci, vitae tempus tortor.",
        },
    ];

    function displayProducts() {
        const productContainer = document.querySelector(".product-container");

        products.forEach((product) => {
            const productHTML = `
            <div class="col-12 col-lg-4 d-flex flex-column justify-content-center">
                <div class="product-item-wrapper d-flex flex-column bg-info border border-black mb-3">
                    <h4 id="itemName" class="fw-bold d-flex justify-content-center">${
                        product.name
                    }</h4>
                    <img id="itemImg" class="img-fluid d-flex mx-auto" src="${
                        product.imgSrc
                    }" alt="${product.name}"/>
                    <div class="d-flex justify-content-center">
                        <span>Price: $</span>
                        <span id="itemCartPrice">${product.price}</span>
                    </div>
                    <p class="text-center" id="itemDescription">
                        ${product.description}
                    </p>
                    <button class="btn btn-primary" onclick="addItemToCart(${products.indexOf(
                        product
                    )})">Add to Cart</button>
                     
                </div>
            </div>`;

            productContainer.innerHTML += productHTML;
        });
    }

    // Call the function to display products on page load
    displayProducts();

    function toggleCartModal() {
        const cartModal = document.querySelector(".cart-modal");
        if (cartModal.style.display === "block") {
            cartModal.style.display = "none";
        } else {
            cartModal.style.display = "block";
            updateCartModal(); // Update the content when the modal is displayed
        }
    }

    function updateCartModal() {
        const cartModal = document.querySelector(".cart-content");
        cartModal.innerHTML = ""; // Clear the current content

        if (cart.length === 0) {
            cartModal.innerHTML = "<p>Your cart is empty</p>";
            clearCartTotal(); // Clear the cart total when the cart is empty
            return;
        }

        if (cart.length > 1) {
            document.getElementsByClassName("");
        }

        for (const cartItem of cart) {
            const productDiv = document.createElement("div");
            productDiv.classList.add(
                "cart-item",
                "p-3",
                "m-2",
                "border",
                "border-dark",
                "d-flex"
            );

            productDiv.innerHTML = `
            <div class="cart-item-img">
                <img src="${cartItem.imgSrc}" alt="${
                cartItem.name
            }" class="img-fluid" style="max-width: 100px;">
            </div>
            <div class="cart-item-details ms-3">
                <h4 class="fw-bold">${cartItem.name}</h4>
                <p class="mb-1">Price: $${cartItem.price}</p>
                <div class="cart-item-quantity mb-1">
                    <label for="quantityInput${
                        cartItem.productIndex
                    }">Quantity:</label>
                    <input
                        type="number"
                        id="quantityInput${cartItem.productIndex}"
                        class="form-control form-control-sm mb-2"
                        style="width: 60px;"
                        value="${cartItem.quantity}"
                        min="1"
                        onchange="updateCartItemQuantity(${
                            cartItem.productIndex
                        }, this.value)"
                    />

                </div>
                <button class="btn btn-danger mb-2" onclick="removeItemFromCart(${cart.indexOf(
                    cartItem
                )})">Remove</button>

                
            </div>
        `;

            cartModal.appendChild(productDiv);
        }

        updateCartTotal();

        // Call the function to update the visibility of the "Checkout" button
        updateButtonVisibility();
    }

    function clearCartTotal() {
        const cartTotalElement = document.querySelector(".cart-total");
        cartTotalElement.textContent = ""; // Clear the cart total content
    }

    function addItemToCart(productIndex) {
        const selectedProduct = products[productIndex];

        // Check if the selected product already exists in the cart
        const existingItem = cart.find(
            (item) => item.productIndex === productIndex
        );

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...selectedProduct,
                productIndex: productIndex,
                quantity: 1,
            });
        }

        // Show the alert message
        const alertMessage = document.getElementById("alertMessage");
        alertMessage.style.display = "block";

        // Hide the alert message after 2 seconds
        setTimeout(() => {
            alertMessage.style.display = "none";
        }, 2000);

        // Update the cart modal and cart total immediately
        updateCartModal();
        updateCartTotal();
    }

    function viewItemsInCart() {
        const cartModal = document.querySelector(".cart-modal");
        cartModal.style.display = "block";
        updateCartModal(); // You also need to call this function here to populate the cart modal content
    }

    function clearCart() {
        cart.length = 0; // Clear the cart array

        updateButtonVisibility();
        updateCartModal(); // Update the cart modal to reflect the changes
    }

    function updateCartTotal() {
        const cartTotalElement = document.querySelector(".cart-total");
        const cartTotal = cart.reduce((total, cartItem) => {
            return total + parseFloat(cartItem.price) * cartItem.quantity;
        }, 0);

        cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;
    }

    function updateButtonVisibility() {
        const checkoutButton = document.getElementById("checkoutBtn");
        const clearCartBtn = document.getElementById("clearBtn");
        if (cart.length > 0) {
            checkoutButton.style.display = "block"; // Show the buttons if there are items in the cart
            clearCartBtn.style.display = "block"; //
        } else {
            checkoutButton.style.display = "none"; // Hide the button if the cart is empty
            clearCartBtn.style.display = "none";
        }
    }

    // Define the updateCartItemQuantity function
    function updateCartItemQuantity(productIndex, newQuantity) {
        // Ensure the new quantity is a positive integer
        const parsedQuantity = parseInt(newQuantity);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        // Find the cart item by product index
        const cartItem = cart.find(
            (item) => item.productIndex === productIndex
        );

        if (cartItem) {
            // Update the quantity of the cart item
            cartItem.quantity = parsedQuantity;

            // Update the cart modal and cart total
            updateCartModal();
            updateCartTotal();
        }
    }

    function removeItemFromCart(productIndex) {
        // Find the index of the cart item by product index
        const itemIndex = cart.findIndex(
            (item) => item.productIndex === productIndex
        );

        if (itemIndex !== -1) {
            // Remove the item from the cart array
            cart.splice(itemIndex, 1);

            // Update the cart modal and cart total
            updateCartModal();
            updateCartTotal();
        }
    }
}

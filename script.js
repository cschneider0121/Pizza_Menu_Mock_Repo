// MENU DATA

class menuItem {
    constructor(name, price, description, imagePath = "") {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imagePath = imagePath;
    }
}

const menuData = {
    specialtyPizza: [
        new menuItem("Meat Lovers", 18, "Pepperoni, Sausage, Bacon, you're gonna want seconds.", "../Resources/Images/meat_lovers.jpg"),
        new menuItem("Veggie Delight", 16, "Tomatoes, Green Peppers, Black Olives and Mushrooms. Veggie lovers, this one's for you.", "../Resources/Images/veggie_delight.jpg")
    ],
    buildYourOwnPizza: [
        new menuItem("Make it your own!", 12, "Choose between our toppings! .50+ per topping.", "../Resources/Images/build-your-own.jpg")
    ],
    pasta: [
        new menuItem("Spaghetti", 13, "Who doesn't love Spaghetti?", "../Resources/Images/spaghetti.jpg"),
        new menuItem("Alfredo", 14, "Creamy, yummy, white pasta sauce Alfredo. Get your fix.", "../Resources/Images/alfredo.jpg")
    ],
    drinks: [
        new menuItem("Coke", 2, "Classic Coca-cola."),
        new menuItem("Diet Coke", 2, "Favorite Diet Soda"),
        new menuItem("Fanta Orange", 2.50, "Orange Delicious")
    ]
}
  
// MENU SECTION 
const menuContainer = document.getElementById("menu-container");

Object.entries(menuData).forEach(([category]) => {
    const categoryWrapper = document.createElement("div");
    categoryWrapper.className = "menu-group";
    menuContainer.appendChild(categoryWrapper);

    const button = document.createElement("button");
    button.className = "menu-section-button";
    button.dataset.target = `${category}-section`;
    button.ariaControls = `${category}-section`;
    button.ariaExpanded = "false";
    button.textContent = category.replace(/([A-Z])/g, " $1").toUpperCase(); // converts category name to readable string with all uppercase letters
    button.textContent = button.textContent + " +";
    categoryWrapper.appendChild(button);

    const section = document.createElement("div");
    section.className = "menu-section-div";
    section.id = `${category}-section`;
    section.dataset.section = category;
    section.hidden = true;
    categoryWrapper.appendChild(section);
}) 

const menuSectionButtons = document.querySelectorAll(".menu-section-button");
const menuSectionDivs = document.querySelectorAll(".menu-section-div");

// fill menu section divs
const fillMenuSectionDiv = (menuSectionDiv) => {
    const key = menuSectionDiv.dataset.section;
    const menuDataItems = menuData[key] || [];
    menuDataItems.forEach(menuItem => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.className = "menu-item-div";

        const menuItemTitlePriceContainer = document.createElement('div');
        menuItemTitlePriceContainer.className = "menu-item-title-price-container";

        const menuItemTitle = document.createElement('h3');
        menuItemTitle.textContent = menuItem.name; 
        menuItemTitlePriceContainer.appendChild(menuItemTitle);

        const menuItemPrice = document.createElement('h4');
        menuItemPrice.textContent = menuItem.price;
        menuItemTitlePriceContainer.appendChild(menuItemPrice);

        const menuItemTitlePriceDescriptionContainer = document.createElement('div');
        menuItemTitlePriceDescriptionContainer.className = "menu-item-title-price-description-container";
        menuItemTitlePriceDescriptionContainer.appendChild(menuItemTitlePriceContainer);

        const menuItemDescription = document.createElement('p');
        menuItemDescription.textContent = menuItem.description;
        menuItemTitlePriceDescriptionContainer.appendChild(menuItemDescription);

        menuItemDiv.appendChild(menuItemTitlePriceDescriptionContainer);

        if (menuItem.imagePath.length > 0) { // make sure image path exists before creating image element, otherwise dont make an image element at all
            const menuItemImage = document.createElement('img');
            menuItemImage.src = menuItem.imagePath;
            menuItemDiv.appendChild(menuItemImage);
        }
        menuSectionDiv.appendChild(menuItemDiv);
    })
}

menuSectionDivs.forEach(menuSectionDiv => {
    fillMenuSectionDiv(menuSectionDiv);  
})

// set button functionality
menuSectionButtons.forEach(menuSectionButton => {
    menuSectionButton.addEventListener("click", (event) => {
        const button = event.target;
        const targetId = menuSectionButton.dataset.target;
        const section = document.getElementById(targetId);
        console.log(`button clicked: ${targetId} ${section}`);
        if (!section) return;

        const isOpen = getComputedStyle(section).display === "block";
        if (isOpen) {
            section.style.display = "none";
            button.textContent = button.textContent.slice(0, -1) + "+";
        }
        else {
            section.style.display = "block";
            button.textContent = button.textContent.slice(0, -1) + "-";
        }

        menuSectionButton.setAttribute("aria-expanded", String(!isOpen));
    })
})




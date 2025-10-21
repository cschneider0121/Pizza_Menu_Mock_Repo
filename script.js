// MENU DATA

class menuItem {
    constructor(name, description, imagePath) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
    }
}

const menuData = {
    specialtyPizza: [
        new menuItem("Meat Lovers", "mmmm yummy meaty yumyum", "placeholder/image/path"),
        new menuItem("Veggie Delight", "You like veggies? Great! Yummy veggie yum yum", "placeholder/image/path")
    ],
    pasta: [
        new menuItem("Spaghetti", "new le sserafim album?", "placeholder/image/path"),
        new menuItem("Alfredo", "Creamy yummy white pasta saucy goodness", "placeholder/image/path")
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
    button.style.fontSize = "x-large";
    button.style.width = "100%";
    button.style.padding = "5% 0";
    button.style.margin = "0";
    button.style.border = "white";
    button.style.cursor = "pointer";
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

        const menuItemTitle = document.createElement('h3');
        menuItemTitle.textContent = menuItem.name; 
        menuItemDiv.appendChild(menuItemTitle);

        const menuItemDescription = document.createElement('p');
        menuItemDescription.textContent = menuItem.description;
        menuItemDiv.appendChild(menuItemDescription);

        const menuItemImage = document.createElement('img');
        menuItemImage.src = menuItem.imagePath;
        menuItemDiv.appendChild(menuItemImage);

        menuItemDiv.style.width = "100%";
        menuItemDiv.style.display = "flex";
        menuSectionDiv.appendChild(menuItemDiv);
    })
}

menuSectionDivs.forEach(menuSectionDiv => {
    fillMenuSectionDiv(menuSectionDiv);  
})

// set button functionality
menuSectionButtons.forEach(menuSectionButton => {
    menuSectionButton.addEventListener("click", () => {
        const targetId = menuSectionButton.dataset.target;
        const section = document.getElementById(targetId);
        console.log(`button clicked: ${targetId} ${section}`);
        if (!section) return;

        const isOpen = getComputedStyle(section).display === "block";
        if (isOpen) {
            section.style.display = "none";
        }
        else {
            section.style.display = "block";
        }

        menuSectionButton.setAttribute("aria-expanded", String(!isOpen));
    })
})




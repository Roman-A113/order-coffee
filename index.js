const addButton = document.querySelector(".add-button");
const form = document.querySelector("form");

function updateBeverages() {
    const beverages = document.querySelectorAll(".beverage");
    
    beverages.forEach((bev, index) => {
        const num = index + 1;
        
        bev.querySelector(".beverage-count").textContent = `Напиток №${num}`;
        
        bev.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.name = `milk-${num}`;
        });
        
        const removeBtn = bev.querySelector(".remove-beverage");
        if (removeBtn) {
            removeBtn.disabled = beverages.length <= 1;
        }
    });
}
updateBeverages();

addButton.addEventListener("click", () => {
    const beverages = document.querySelectorAll(".beverage");
    const lastBeverage = beverages[beverages.length - 1];
    const newBeverage = lastBeverage.cloneNode(true);

    newBeverage.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });

    form.insertBefore(newBeverage, addButton.parentElement);

    updateBeverages();
});

form.addEventListener("click", (e) => {
    if (e.target.closest(".remove-beverage")) {
        const beverages = document.querySelectorAll(".beverage");
    
        if (beverages.length <= 1) return; 

        e.target.closest(".remove-beverage").closest(".beverage").remove();

        updateBeverages();
    }
});
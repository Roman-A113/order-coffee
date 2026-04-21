const addButton = document.querySelector(".add-button");
const form = document.querySelector("form");

addButton.addEventListener("click", () => {
    const beverages = document.querySelectorAll(".beverage");
    const newIndex = beverages.length + 1;

    const lastBeverage = beverages[beverages.length - 1];
    const newBeverage = lastBeverage.cloneNode(true);

    newBeverage.querySelector(".beverage-count").textContent = `Напиток №${newIndex}`;

    const radioButtons = newBeverage.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio) => {
        radio.name = `milk-${newIndex}`;
        radio.checked = false;
    });

    newBeverage.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.checked = false;
    });
    form.insertBefore(newBeverage, addButton.parentElement);
});

const modal = document.querySelector("#order-modal");
const closeButton = document.querySelector("#close-modal");
const submitButton = document.querySelector(".submit-button");

submitButton.onclick = function (event) {
    event.preventDefault();
    modal.showModal();
};

closeButton.onclick = function () {
    modal.close();
};

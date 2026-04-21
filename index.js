const addButton = document.querySelector(".add-button");
const form = document.querySelector("form");
const modal = document.querySelector("#order-modal");
const closeButton = document.querySelector("#close-modal");
const submitButton = document.querySelector(".submit-button");
const modalMessage = document.querySelector("#modal-message");
const tableBody = document.querySelector("#table-body");

function updateBeverages() {
    const beverages = document.querySelectorAll(".beverage");

    beverages.forEach((bev, index) => {
        const num = index + 1;

        bev.querySelector(".beverage-count").textContent = `Напиток №${num}`;

        bev.querySelectorAll('input[type="radio"]').forEach((radio) => {
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

    newBeverage.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach((input) => {
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

function getDrinkDeclension(count) {
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;

    if (lastTwoDigits > 10 && lastTwoDigits < 20) return "напитков";

    if (lastDigit === 1) return "напиток";
    if (lastDigit >= 2 && lastDigit <= 4) return "напитка";

    return "напитков";
}

submitButton.onclick = function (event) {
    event.preventDefault();
    tableBody.innerHTML = "";

    const beverages = document.querySelectorAll(".beverage");
    beverages.forEach((beverage) => {
        const drink = beverage.querySelector("select").options[beverage.querySelector("select").selectedIndex].text;
        const milk = beverage.querySelector('input[name^="milk"]:checked').nextElementSibling.textContent;
        const options = Array.from(beverage.querySelectorAll('input[name="options"]:checked'))
            .map((checkbox) => checkbox.nextElementSibling.textContent)
            .join(", ");

        const row = `<tr>
            <td>${drink}</td>
            <td>${milk}</td>
            <td>${options}</td>
        </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
    });

    const declension = getDrinkDeclension(beverages.length);
    modalMessage.textContent = `Вы заказали ${beverages.length} ${declension}`;

    modal.showModal();
};

closeButton.onclick = function () {
    modal.close();
};

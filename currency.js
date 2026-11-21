const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");

convertBtn.addEventListener("click", convertCurrency);

swapBtn.addEventListener("click", () => {
    const from = document.getElementById("from");
    const to = document.getElementById("to");

    let temp = from.value;
    from.value = to.value;
    to.value = temp;
});

async function convertCurrency() {
    const amount = Number(document.getElementById("amount").value);
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;

    const result = document.getElementById("result");
    const loading = document.getElementById("loading");

    try {
        loading.textContent = "Loading...";
        result.textContent = "";

        const response = await fetch(
            "https://open.er-api.com/v6/latest/KES"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch exchange rates");
        }

        const data = await response.json();

        const rates = data.rates;

        let amountInKES;

        if (from === "KES") {
            amountInKES = amount;
        } else {
            amountInKES = amount / rates[from];
        }

        let converted;

        if (to === "KES") {
            converted = amountInKES;
        } else {
            converted = amountInKES * rates[to];
        }

        result.textContent =
            `${from} ${amount.toLocaleString()} = ${to} ${converted.toFixed(2)}`;

    } catch (error) {
        result.innerHTML =
            `<span class="error">Unable to fetch exchange rates. Try again later.</span>`;
    }

    loading.textContent = "";
}
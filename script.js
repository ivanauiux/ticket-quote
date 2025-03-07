 document.addEventListener("DOMContentLoaded", function () {
    function updateAirlineCode() {
        const via = document.getElementById("via").value;
        const airlineCodeInput = document.getElementById("airlineCode");

        const airlineCodes = {
            "ETIHAD AIRWAYS": "EY",
            "EMIRATES AIRLINES": "EK",
            "PHILIPPINE AIRLINES": "PR",
            "CEBU PACIFIC AIR": "5J",
            "SINGAPORE AIRLINES": "SQ",
            "CATHAY PACIFIC": "CX",
            "GULF AIRWAYS": "GF",
            "KUWAIT AIRWAYS": "KU",
            "SAUDI AIR": "SV",
            "QATAR AIRWAYS": "QR",
            "THAI AIRWAYS": "TG",
            "ROYAL BRUNEI": "BI"
        };

        airlineCodeInput.value = airlineCodes[via] || "";
    }

    document.getElementById("via").addEventListener("change", updateAirlineCode);

    // Make Hand Carry & Meal Read-Only
    document.getElementById("handCarry").setAttribute("readonly", true);
    document.getElementById("meal").setAttribute("readonly", true);

    document.getElementById("flightForm").addEventListener("input", function () {
        const sabrePrice = parseFloat(document.getElementById("sabrePrice").value) || 0;
        const sellingPrice = parseFloat(document.getElementById("sellingPrice").value) || 0;
        const upsell = parseFloat(document.getElementById("upsell").value) || 0;

        const total = sabrePrice + sellingPrice + upsell;
        document.getElementById("total").value = total.toFixed(2);

        generateQuotation(); // Update quotation when prices change
    });

    document.getElementById("sabrePrice").addEventListener("input", calculateSellingPrice);

    function calculateSellingPrice() {
        let sabrePrice = parseFloat(document.getElementById("sabrePrice").value) || 0;
        let sellingPriceField = document.getElementById("sellingPrice");
        let sellingPrice = 0;

        if (sabrePrice >= 0 && sabrePrice <= 1000) {
            sellingPrice = 150;
        } else if (sabrePrice > 1000 && sabrePrice <= 2000) {
            sellingPrice = 175;
        } else if (sabrePrice > 2000 && sabrePrice <= 3000) {
            sellingPrice = 200;
        } else if (sabrePrice > 3000 && sabrePrice <= 3500) {
            sellingPrice = 250;
        } else if (sabrePrice > 3500 && sabrePrice <= 4000) {
            sellingPrice = 300;
        } else if (sabrePrice >= 4500) {
            sellingPrice = sabrePrice * 0.08;
        }

        sellingPriceField.value = sellingPrice > 0 ? sellingPrice.toFixed(2) : "";
    }

    function generateQuotation() {
    const via = document.getElementById("via").value;
    const airlineCode = document.getElementById("airlineCode").value;
    let baggage = document.getElementById("baggage").value || "N/A"; // Ensure baggage selection is used
    const handCarry = document.getElementById("handCarry").value || "N/A";
    const meal = document.getElementById("meal").value || "N/A";
    const flightDetails = document.getElementById("flightDetails").value;
    const total = document.getElementById("total").value || "0";

    // Ensure baggage is properly displayed in the format
    let baggageText = `BAG ALLOWANCE - ${baggage} / ${airlineCode}`; 

    let formattedFlightDetails = flightDetails
        .replace(/\b(Z|J|B)\b/g, "") // Remove (Z), (J), (B)
        .replace(/\s+\b\d{3,4} \d+ \/E\b/g, "") // Remove aircraft type and "/E"
        .replace(/\b1ADT\s+\d+\s+\d+\b/g, "") // Remove passenger & fare amount
        .replace(/\s{2,}/g, " ") // Remove extra spaces
        .trim();

    const quotationText = `VIA ${via}\n` +
        `${handCarry} HAND CARRY + ${meal}\n` +
        `${baggageText}\n\n` +  // Display the correct baggage selection
        `FLIGHT DETAILS:\n\n` +
        formattedFlightDetails + "\n\n" +
        `TOTAL FARE - AED ${total}\n\n` +
        `Kindly note that no reservation has been made yet. Rates are subject to change without prior notice.`;

    document.getElementById("quotation").value = quotationText;
}

    document.getElementById("flightForm").addEventListener("input", generateQuotation);

    // COPY FUNCTION
    document.getElementById("copyButton").addEventListener("click", function () {
        const quotationText = document.getElementById("quotation");
        quotationText.select();
        document.execCommand("copy");

        // Show a temporary copied message
        const copyMessage = document.getElementById("copyMessage");
        copyMessage.style.display = "inline";
        setTimeout(() => {
            copyMessage.style.display = "none";
        }, 1500);
    });
});

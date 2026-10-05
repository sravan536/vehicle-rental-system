// ============================================
// VEHICLE RENTAL SYSTEM - PROFESSIONAL JS
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // VEHICLE SEARCH
    // ========================================

    const searchInput =
        document.getElementById("vehicleSearch");

    const typeSelect =
        document.getElementById("vehicleType");

    const vehicleCards =
        document.querySelectorAll(".vehicle-card");


    function filterVehicles() {

        const searchText = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        const selectedType = typeSelect
            ? typeSelect.value
            : "all";


        vehicleCards.forEach(function (card) {

            const vehicleName =
                card.dataset.name || "";

            const vehicleType =
                card.dataset.type || "";


            const nameMatch =
                vehicleName.includes(searchText);

            const typeMatch =
                selectedType === "all" ||
                vehicleType === selectedType;


            if (nameMatch && typeMatch) {

                card.style.display = "block";

                setTimeout(function () {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, 20);

            } else {

                card.style.opacity = "0";
                card.style.transform = "translateY(15px)";

                setTimeout(function () {
                    card.style.display = "none";
                }, 250);
            }

        });
    }


    if (searchInput) {
        searchInput.addEventListener(
            "input",
            filterVehicles
        );
    }


    if (typeSelect) {
        typeSelect.addEventListener(
            "change",
            filterVehicles
        );
    }


    // ========================================
    // BOOKING PRICE CALCULATOR
    // ========================================

    const startDate =
        document.getElementById("start_date");

    const endDate =
        document.getElementById("end_date");

    const totalPrice =
        document.getElementById("totalPrice");


    function calculateTotal() {

        if (!startDate ||
            !endDate ||
            !totalPrice) {
            return;
        }


        if (!startDate.value ||
            !endDate.value) {

            totalPrice.textContent =
                "₹0.00";

            return;
        }


        const start =
            new Date(startDate.value);

        const end =
            new Date(endDate.value);


        const difference =
            end.getTime() - start.getTime();


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            ) + 1;


        if (days <= 0) {

            totalPrice.textContent =
                "Invalid dates";

            return;
        }


        if (typeof pricePerDay === "undefined") {
            return;
        }


        const total =
            days * pricePerDay;


        totalPrice.textContent =
            "₹" + total.toFixed(2);
    }


    if (startDate) {

        startDate.addEventListener(
            "change",
            calculateTotal
        );
    }


    if (endDate) {

        endDate.addEventListener(
            "change",
            calculateTotal
        );
    }


    // ========================================
    // MINIMUM BOOKING DATE
    // ========================================

    if (startDate) {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        startDate.min = today;
    }


    if (endDate) {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        endDate.min = today;
    }


    if (startDate && endDate) {

        startDate.addEventListener(
            "change",
            function () {

                endDate.min =
                    startDate.value;


                if (
                    endDate.value &&
                    endDate.value <
                    startDate.value
                ) {

                    endDate.value =
                        startDate.value;
                }


                calculateTotal();
            }
        );
    }


    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================

    const revealElements =
        document.querySelectorAll(".reveal");


    if (revealElements.length > 0) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add("active");

                                observer.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(
            function (element) {

                observer.observe(element);

            }
        );
    }


    // ========================================
    // BUTTON CLICK EFFECT
    // ========================================

    const buttons =
        document.querySelectorAll(".btn");


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                button.style.transform =
                    "scale(0.97)";

                setTimeout(function () {

                    button.style.transform =
                        "";

                }, 120);

            }
        );

    });


    // ========================================
    // IMAGE LOAD ANIMATION
    // ========================================

    const images =
        document.querySelectorAll(
            ".vehicle-card img, .detail-image img"
        );


    images.forEach(function (image) {

        image.addEventListener(
            "load",
            function () {

                image.style.opacity = "1";

            }
        );

    });

});
let currentIndex = 0; // Track the current index of the cards
let currentHighlightedIndex = 0; // Track the current highlighted word index
let highlightedElements = []; // Store highlighted elements
let timeoutId = null; // For debounce
let searchTerm = ''; // Store the current search term

// Array of plans (for the package cards)
const plans = [
    {
        name: "WellWise Essential",
        price1: "₹1,599",
        price2: "₹959",
        tests: [
            "Detailed Diabetes Test",
            "Heart Health"
        ],
        link: "https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20WellWise%20Essential%20package."
    },
    {
        name: "WellWise Advance",
        price1: "₹3,599",
        price2: "₹2,159",
        tests: [
            "Detailed Diabetes Test",
            "Heart Detailed Profile"
        ],
        link: "https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20WellWise%20Advance%20package."
    },
    {
        name: "WellWise Total",
        price1: "₹4,749",
        price2: "₹2,849",
        tests: [
            "All Advance Tests",
            "Complete Bone Health"
        ],
        link: "https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20WellWise%20Total%20package."
    },
    {
        name: "WellWise Exclusive",
        price1: "₹5,899",
        price2: "₹3,539",
        tests: [
            "All Total Package Tests",
            "Cardiac Marker"
        ],
        link: "https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20WellWise%20Exclusive%20package."
    },
    {
        name: "WellWise Platinum",
        price1: "₹7,999",
        price2: "₹4,799",
        tests: [
            "All Exclusive Tests",
            "Infection & Hepatitis B Screening"
        ],
        link: "https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20WellWise%20Platinum%20package."
    },
    {
        name: "WellWise Premium",
        price1: "₹12,999",
        price2: "₹7,799",
        tests: [
            "Most Comprehensive Package",
            "Oxidative Stress Markers"
        ],
        link: "https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20WellWise%20Premium%20package."
    }
];

// Function to display the plans on the page
function displayPlans() {
    const packageGrid = document.querySelector('.package-grid');
    packageGrid.innerHTML = '';

    const plan1 = plans[currentIndex];
    const plan2 = plans[currentIndex + 1] || plans[0]; // Wrap around if at the end

    packageGrid.innerHTML = `
        <div class="package-card">
            <h3 class="package-name">${plan1.name}</h3>
            <div class="price-tag">
                <div class="price-value">Price for 1+1: ${plan1.price1}</div>
                <div class="price-value">Price for 1: ${plan1.price2}</div>
            </div>
            <div class="test-list">
                <div class="test-item"><i class="fas fa-vial"></i><span>${plan1.tests[0]}</span></div>
                <div class="test-item"><i class="fas fa-heartbeat"></i><span>${plan1.tests[1]}</span></div>
            </div>
            <a href="${plan1.link}" target="_blank">
                <button class="book-button">Book Now</button>
            </a>
        </div>
        <div class="package-card">
            <h3 class="package-name">${plan2.name}</h3>
            <div class="price-tag">
                <div class="price-value">Price for 1+1: ${plan2.price1}</div>
                <div class="price-value">Price for 1: ${plan2.price2}</div>
            </div>
            <div class="test-list">
                <div class="test-item"><i class="fas fa-vial"></i><span>${plan2.tests[0]}</span></div>
                <div class="test-item"><i class="fas fa-heartbeat"></i><span>${plan2.tests[1]}</span></div>
            </div>
            <a href="${plan2.link}" target="_blank">
                <button class="book-button">Book Now</button>
            </a>
        </div>
    `;
}

// Function to change the displayed plan based on the direction (next/previous)
function changePlan(direction) {
    currentIndex = (currentIndex + direction + plans.length) % plans.length;
    displayPlans();
}

// Initial display
window.onload = displayPlans;

// Function to handle search with debounce
function searchFunction() {
    clearTimeout(timeoutId); // Clear previous timeout
    timeoutId = setTimeout(() => {
        const searchInput = document.getElementById('search-input');
        searchTerm = searchInput.value.trim().toLowerCase();

        // Clear previous highlights
        highlightedElements.forEach(element => {
            element.classList.remove('highlight');
            element.innerHTML = element.innerHTML.replace(/<mark>/g, '').replace(/<\/mark>/g, '');
        });
        highlightedElements = []; // Reset the array of highlighted elements

        // Exit if search term is empty
        if (!searchTerm) return;

        // Find all elements on the page and search for the term
        const elements = document.body.querySelectorAll('*');
        let foundMatch = false;

        elements.forEach(element => {
            if (element.innerText && element.innerText.toLowerCase().includes(searchTerm)) {
                foundMatch = true;
                const regex = new RegExp(searchTerm, 'gi');
                element.innerHTML = element.innerHTML.replace(regex, match => `<mark>${match}</mark>`);
                element.classList.add('highlight');
                highlightedElements.push(element);
            }
        });

        // If matches are found, scroll to the first one
        if (foundMatch && highlightedElements.length > 0) {
            highlightedElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            currentHighlightedIndex = 0; // Reset to the first highlighted element
            changePlan(1); // Automatically move to the next card if match found in the next card
        }
    }, 300); // Debounce delay of 300ms
}

// Function to navigate to the next highlighted word
function nextHighlightedWord() {
    if (highlightedElements.length > 0) {
        currentHighlightedIndex = (currentHighlightedIndex + 1) % highlightedElements.length;
        highlightedElements[currentHighlightedIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

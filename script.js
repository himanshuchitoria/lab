let currentIndex = 0;
let currentHighlightedIndex = 0;
let highlightedElements = [];
let timeoutId ;
let searchTerm = '';

const plans = [ 
    { name: "WellWise Essential", price1: "₹1,599", price2: "₹959", tests: ["Detailed Diabetes Test", "Heart Health"], link: "https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20WellWise%20Essential%20package." },
    { name: "WellWise Advance", price1: "₹3,599", price2: "₹2,159", tests: ["Detailed Diabetes Test", "Heart Detailed Profile"], link: "https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20WellWise%20Advance%20package." },
    { name: "WellWise Total", price1: "₹4,749", price2: "₹2,849", tests: ["All Advance Tests", "Complete Bone Health"], link: "https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20WellWise%20Total%20package." },
    { name: "WellWise Exclusive", price1: "₹5,899", price2: "₹3,539", tests: ["All Total Package Tests", "Cardiac Marker"], link: "https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20WellWise%20Exclusive%20package." },
    { name: "WellWise Platinum", price1: "₹7,999", price2: "₹4,799", tests: ["All Exclusive Tests", "Infection & Hepatitis B Screening"], link: "https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20WellWise%20Platinum%20package." },
    { name: "WellWise Premium", price1: "₹12,999", price2: "₹7,799", tests: ["Most Comprehensive Package", "Oxidative Stress Markers"], link: "https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20WellWise%20Premium%20package." }
];

function displayPlans() {
    const packageGrid = document.querySelector('.package-grid');
    packageGrid.innerHTML = '';

    const plan1 = plans[currentIndex];
    const plan2 = plans[currentIndex + 1] || plans[0];

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

function changePlan(direction) {
    currentIndex = (currentIndex + direction + plans.length) % plans.length;
    displayPlans();
}

window.onload = displayPlans;

let tests = [];
let currentPage = 0;
const itemsPerPage = 4;

async function loadTests() {
    try {
        const response = await fetch("tests.json");
        tests = await response.json();
        updateDisplay();
    } catch (error) {
        console.error("Error loading tests.json:", error);
    }
}

function updateDisplay() {
    const container = document.getElementById("healthCards");
    container.innerHTML = "";

    let start = currentPage * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedTests = tests.slice(start, end);

    paginatedTests.forEach(test => {
        let testCard = document.createElement("div");
        testCard.classList.add("health-card");
        testCard.innerHTML = `
            <div class="card-details">
                <h3>${test.name}</h3>
                <p class="test-description">${test.description}</p>
                <p class="price">₹${test.price}</p>
                <a href="https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20a%20${encodeURIComponent(test.name)}%20test." 
                   class="book-now" target="_blank">
                    Book Now <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        container.appendChild(testCard);
    });

    document.getElementById("pageNum").innerText = currentPage + 1;
}

function changePage(step) {
    let maxPage = Math.ceil(tests.length / itemsPerPage) - 1;
    if (currentPage + step >= 0 && currentPage + step <= maxPage) {
        currentPage += step;
        updateDisplay();
    }
}

// Function to trigger search
async function searchFunction() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (!searchTerm) return; // Exit if input is empty

        try {
            const response = await fetch("tests.json");
            if (!response.ok) throw new Error("Failed to load tests.json");
            const testData = await response.json();

            // Find matching tests (case-insensitive)
            const matchedTests = testData.filter(test => test.name.toLowerCase().includes(searchTerm));

            if (matchedTests.length > 0) {
                // Redirect to search-result.html with the search term
                window.location.href = `search-result.html?test=${encodeURIComponent(searchTerm)}`;
            } else {
                alert("No results found. Please try another search term.");
            }
        } catch (error) {
            console.error("Error searching in tests.json:", error);
            alert("Error loading search results. Please try again later.");
        }
    }, 300);
}

// Check if Enter key is pressed
function checkEnter(event) {
    if (event.key === 'Enter') {
        searchFunction();
    }
}


function nextHighlightedWord() {
    if (highlightedElements.length > 0) {
        currentHighlightedIndex = (currentHighlightedIndex + 1) % highlightedElements.length;
        highlightedElements[currentHighlightedIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

loadTests();

let currentIndex = 0;
let currentHighlightedIndex = 0;
let highlightedElements = [];
let timeoutId;
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

let currentPageFever = 0;
let currentPageFullBody = 0;
const itemsPerPage = 4;
let feverTests = [];
let fullBodyTests = [];

async function loadTests(url, category) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (category === "Fever") {
            feverTests = data;
            updateDisplayFever();
        } else if (category === "Full Body Checkup") {
            fullBodyTests = data;
            updateDisplayFullBody();
        }
    } catch (error) {
        console.error(`Error loading ${url}:`, error);
    }
}

function updateDisplayFever() {
    const container = document.getElementById("healthCards");
    container.innerHTML = "";

    let start = currentPageFever * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedTests = feverTests.slice(start, end);

    paginatedTests.forEach(test => {
        let testCard = document.createElement("div");
        testCard.classList.add("health-card");
        testCard.innerHTML = `
            <div class="card-details">
                <h3>${test.name}</h3>
                <p class="test-description">${test.description}</p>
                <p class="price">${test.price}</p>
                <a href="https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20a%20${encodeURIComponent(test.name)}%20test." 
                   class="book-now" target="_blank">
                    Book Now <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        container.appendChild(testCard);
    });

    document.getElementById("pageNum").innerText = currentPageFever + 1;
}

function updateDisplayFullBody() {
    const container = document.getElementById("fullBodyHealthCards");
    container.innerHTML = "";

    let start = currentPageFullBody * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedTests = fullBodyTests.slice(start, end);

    paginatedTests.forEach(test => {
        let testCard = document.createElement("div");
        testCard.classList.add("health-card");
        testCard.innerHTML = `
            <div class="card-details">
                <h3>${test.name}</h3>
                <p class="test-description">${test.description}</p>
                <p class="price">${test.price}</p>
                <a href="https://wa.me/918527860100?text=Hi%2C%20I%20want%20to%20book%20a%20${encodeURIComponent(test.name)}%20test." 
                   class="book-now" target="_blank">
                    Book Now <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        container.appendChild(testCard);
    });

    document.getElementById("fullBodyPageNum").innerText = currentPageFullBody + 1;
}

function changePageFever(step) {
    let maxPage = Math.ceil(feverTests.length / itemsPerPage) - 1;
    if (currentPageFever + step >= 0 && currentPageFever + step <= maxPage) {
        currentPageFever += step;
        updateDisplayFever();
    }
}

function changePageFullBody(step) {
    let maxPage = Math.ceil(fullBodyTests.length / itemsPerPage) - 1;
    if (currentPageFullBody + step >= 0 && currentPageFullBody + step <= maxPage) {
        currentPageFullBody += step;
        updateDisplayFullBody();
    }
}

// Load Tests
loadTests("fever_tests.json", "Fever");
loadTests("tests.json", "Full Body Checkup");


// **Redirection on Refresh**
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("search-result.html")) {
        if (performance.getEntriesByType("navigation")[0].type === "reload") {
            window.location.href = "index.html";
        }
    }
});

// **Search Function**
async function searchFunction() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (!searchTerm) return;

        try {
            const response = await fetch("tests.json");
            if (!response.ok) throw new Error("Failed to load tests.json");
            const testData = await response.json();

            const matchedTests = testData.filter(test => test.name.toLowerCase().includes(searchTerm));

            if (matchedTests.length > 0) {
                sessionStorage.setItem("lastSearch", searchTerm);
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

// **Check if Enter Key Pressed**
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    
    if (searchInput) {
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter" || event.keyCode === 13) {
                event.preventDefault();  // Prevents any default behavior
                searchFunction();
            }
        });
    }
});


// **Highlight Next Word in Search**
function nextHighlightedWord() {
    if (highlightedElements.length > 0) {
        currentHighlightedIndex = (currentHighlightedIndex + 1) % highlightedElements.length;
        highlightedElements[currentHighlightedIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// **Load Tests**
loadTests();

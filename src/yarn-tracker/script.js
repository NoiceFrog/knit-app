// Load yarn data from localStorage if available
let yarns = JSON.parse(localStorage.getItem('yarns')) || [];

// Function to save yarn data to localStorage
function saveYarnsToLocalStorage() {
    localStorage.setItem('yarns', JSON.stringify(yarns));
}

// Function to add yarn item
function addYarn(event) {
    event.preventDefault();

    // Get input values
    const yarnWeightNamesInput = document.getElementById('yarnWeightNames');
    const yarnGaugeInput = document.getElementById('yarnGauge');
    const yarnLenghtInput = document.getElementById('yarnLenght');
    const datePurchasedInput = document.getElementById('datePurchased');
    const yarnNameInput = document.getElementById('yarnName');
    const yarnColorInput = document.getElementById('yarnColor');
    const yarnWeightInput = document.getElementById('yarnWeight');
    const yarnBrandInput = document.getElementById('yarnBrand');
    const yarnQuantityInput = document.getElementById('yarnQuantity');

    const yarnWeightNames = yarnWeightNamesInput.value.trim();
    const yarnGauge = yarnGaugeInput.value.trim();
    const yarnLenght = yarnLenghtInput.value.trim();
    const datePurchased = datePurchasedInput.value.trim();
    const yarnName = yarnNameInput.value.trim();
    const yarnColor = yarnColorInput.value.trim();
    const yarnWeight = yarnWeightInput.value.trim();
    const yarnBrand = yarnBrandInput.value.trim();
    const yarnQuantity = parseInt(yarnQuantityInput.value);

    // Validate input
    if (!yarnName || isNaN(yarnQuantity) || yarnQuantity <= 0) {
        alert("Please enter valid yarn details.");
        return;
    }

    // Add yarn to the array
    yarns.push({ 
        weightName: yarnWeightNames,
        gauge: yarnGauge,
        lenght: yarnLenght,
        purchaseDate: datePurchased,
        name: yarnName,
        color: yarnColor,
        weight: yarnWeight,
        brand: yarnBrand,
        quantity: yarnQuantity 
    });

    // Update the list
    updateYarnList();

    // Save to localStorage
    saveYarnsToLocalStorage();

    // Clear input fields
    yarnWeightNamesInput.value = '';
    yarnGaugeInput.value = '';
    yarnLenghtInput.value = '';
    datePurchasedInput.value = '';
    yarnNameInput.value = '';
    yarnColorInput.value = '';
    yarnWeightInput.value = '';
    yarnBrandInput.value = '';
    yarnQuantityInput.value = '';
}

// Function to update yarn list
function updateYarnList() {
    const yarnList = document.getElementById('yarnList');
    yarnList.innerHTML = '';

    yarns.forEach((yarn, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>Purchase Date: ${yarn.purchaseDate}</span><br>
            <span>Name: ${yarn.name}</span><br>
            <span>Color: ${yarn.color}</span><br>
            <span>Weight(grams): ${yarn.weight}</span><br>
            <span>Weight(name): ${yarn.weight}</span><br>
            <span>Lenght: ${yarn.lenght}</span><br>
            <span>Gauge: ${yarn.gauge}</span><br>
            <span>Brand: ${yarn.brand}</span><br>
            <span>Quantity: ${yarn.quantity}</span><br>
            <button onclick="removeYarn(${index})">Remove</button>
            <button onclick="editYarn(${index})">Edit</button>
        `;
        yarnList.appendChild(li);
    });
}

// Function to remove yarn item
function removeYarn(index) {
    yarns.splice(index, 1);
    updateYarnList();
    saveYarnsToLocalStorage();
}

// Function to edit yarn item
function editYarn(index) {
    const yarn = yarns[index];
    const newWeigthName = prompt("Enter new yarn weight(name):", yarn.weightName);
    const newDate = prompt("Enter new purchase date:", yarn.purchaseDate);
    const newName = prompt("Enter new yarn name:", yarn.name);
    const newColor = prompt("Enter new color:", yarn.color);
    const newWeight = prompt("Enter new weight(grams):", yarn.weight);
    const newLenght = prompt("Enter new yarn lenght:", yarn.lenght);
    const newGauge = prompt("Enter new gauge:", yarn.gauge);
    const newBrand = prompt("Enter new brand:", yarn.brand);
    const newQuantity = parseInt(prompt("Enter new quantity:", yarn.quantity));

    if (newName && !isNaN(newQuantity) && newQuantity > 0) {
        yarn.lenght = newLenght;
        yarn.weightName = newWeigthName;
        yarn.purchaseDate = newDate;
        yarn.name = newName;
        yarn.color = newColor;
        yarn.weight = newWeight;
        yarn.gauge = newGauge;
        yarn.brand = newBrand;
        yarn.quantity = newQuantity;
        updateYarnList();
        saveYarnsToLocalStorage();
    } else {
        alert("Invalid input. Please try again.");
    }
}

// Event listener for form submission
document.getElementById('yarnForm').addEventListener('submit', addYarn);

// Initial update of yarn list
updateYarnList();

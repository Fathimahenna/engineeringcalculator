// Define conversion units and their conversion rates relative to a base unit for each category
const unitsByCategory = {
    length: ["m", "km", "cm", "mm", "mi", "yd", "ft", "in"],
    area: ["sqm", "sqkm", "sqmi", "sqyd", "sqft", "sqin", "hectare", "acre"],
    volume: ["m3", "liter", "ml", "gal", "qt", "pt", "cup", "oz"],
    mass: ["kg", "g", "lb", "oz"],
    temperature: ["°C", "°F", "K"],
    force: ["N", "kN", "lbf"],
    energy: ["J", "kJ", "cal", "kcal"],
    power: ["W", "kW", "hp"],
    electrical: ["A", "mA", "µA", "kA", "V", "mV", "µV", "kV", "Ω", "mΩ", "µΩ", "kΩ"],
    storage: ["bit", "byte", "KB", "MB", "GB", "TB", "PB", "ZB"],
    time: ["sec", "min", "hr", "day", "week", "month", "year"],
    speed: ["m/s", "km/h", "mph", "knot"],
    flow: ["m3/s", "l/s", "cfm", "gpm"]
    // Add more categories and units as needed
};

// Function to update unit options based on selected category
function updateUnits() {
    const category = document.getElementById("category").value;
    const fromUnitSelect = document.getElementById("from-unit");
    const toUnitSelect = document.getElementById("to-unit");

    // Clear previous options
    fromUnitSelect.innerHTML = "";
    toUnitSelect.innerHTML = "";

    // Populate from units
    unitsByCategory[category].forEach(unit => {
        const option = document.createElement("option");
        option.value = unit;
        option.textContent = unit;
        fromUnitSelect.appendChild(option);
    });

    // Populate to units (same options as from units)
    unitsByCategory[category].forEach(unit => {
        const option = document.createElement("option");
        option.value = unit;
        option.textContent = unit;
        toUnitSelect.appendChild(option);
    });
}

// Function to perform conversion
function convert() {
    const value = parseFloat(document.getElementById("value").value);
    const fromUnit = document.getElementById("from-unit").value;
    const toUnit = document.getElementById("to-unit").value;
    const category = document.getElementById("category").value;

    let result;

    // Call appropriate conversion function based on category
    switch (category) {
        case "length":
            result = convertLength(value, fromUnit, toUnit);
            break;
        case "area":
            result = convertArea(value, fromUnit, toUnit);
            break;
        case "volume":
            result = convertVolume(value, fromUnit, toUnit);
            break;
        case "mass":
            result = convertMass(value, fromUnit, toUnit);
            break;
        case "temperature":
            result = convertTemperature(value, fromUnit, toUnit);
            break;
        case "force":
            result = convertForce(value, fromUnit, toUnit);
            break;
        case "energy":
            result = convertEnergy(value, fromUnit, toUnit);
            break;
        case "power":
            result = convertPower(value, fromUnit, toUnit);
            break;
        case "electrical":
            result = convertElectrical(value, fromUnit, toUnit);
            break;
        case "storage":
                result = convertStorage(value, fromUnit, toUnit);
                break;
        case "time":
                result = convertTime(value, fromUnit, toUnit);
                break;
        case "speed":
                result = convertSpeed(value, fromUnit, toUnit);
                break;
        case "flow":
                result = convertFlow(value, fromUnit, toUnit);
                break;
        default:
            result = "Conversion logic not implemented for this unit pair.";
    }

    // Display result
    document.getElementById("result").textContent = `${value} ${fromUnit} = ${result} ${toUnit}`;
}

// Conversion functions for different categories

function convertLength(value, fromUnit, toUnit) {
    const lengthConversions = {
        "m": 1,
        "km": 1000,
        "cm": 0.01,
        "mm": 0.001,
        "mi": 1609.34,
        "yd": 0.9144,
        "ft": 0.3048,
        "in": 0.0254
    };

    return (value * lengthConversions[fromUnit] / lengthConversions[toUnit]).toFixed(4);
}

function convertArea(value, fromUnit, toUnit) {
    const areaConversions = {
        "sqm": 1,
        "sqkm": 1e6,
        "sqmi": 2.59e6,
        "sqyd": 0.836127,
        "sqft": 0.092903,
        "sqin": 0.00064516,
        "hectare": 1e4,
        "acre": 4046.86
    };

    return (value * areaConversions[fromUnit] / areaConversions[toUnit]).toFixed(4);
}

function convertVolume(value, fromUnit, toUnit) {
    const volumeConversions = {
        "m3": 1,
        "liter": 0.001,
        "ml": 1e-6,
        "gal": 0.00378541,
        "qt": 0.000946353,
        "pt": 0.000473176,
        "cup": 0.000236588,
        "oz": 2.95735e-5
    };

    return (value * volumeConversions[fromUnit] / volumeConversions[toUnit]).toFixed(4);
}

function convertMass(value, fromUnit, toUnit) {
    const massConversions = {
        "kg": 1,
        "g": 0.001,
        "lb": 0.453592,
        "oz": 0.0283495
    };

    return (value * massConversions[fromUnit] / massConversions[toUnit]).toFixed(4);
}

function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === "°C" && toUnit === "°F") {
        return ((value * 9/5) + 32).toFixed(2);
    } else if (fromUnit === "°F" && toUnit === "°C") {
        return ((value - 32) * 5/9).toFixed(2);
    } else if (fromUnit === "°C" && toUnit === "K") {
        return (value + 273.15).toFixed(2);
    } else if (fromUnit === "K" && toUnit === "°C") {
        return (value - 273.15).toFixed(2);
    } else if (fromUnit === "°F" && toUnit === "K") {
        return ((value + 459.67) * 5/9).toFixed(2);
    } else if (fromUnit === "K" && toUnit === "°F") {
        return ((value * 9/5) - 459.67).toFixed(2);
    } else {
        return "Conversion logic not implemented for this unit pair.";
    }
}

function convertForce(value, fromUnit, toUnit) {
    const forceConversions = {
        "N": 1,
        "kN": 1000,
        "lbf": 4.44822
    };

    return (value * forceConversions[fromUnit] / forceConversions[toUnit]).toFixed(4);
}

// Function to convert energy units
function convertEnergy(value, fromUnit, toUnit) {
    const energyConversions = {
        "J": 1,
        "kJ": 1000,
        "cal": 4.184,
        "kcal": 4184
    };

    return (value * energyConversions[fromUnit] / energyConversions[toUnit]).toFixed(4);
}

// Function to convert power units
function convertPower(value, fromUnit, toUnit) {
    const powerConversions = {
        "W": 1,
        "kW": 1000,
        "hp": 745.7
    };

    return (value * powerConversions[fromUnit] / powerConversions[toUnit]).toFixed(4);
}

// Function to convert electrical units
function convertElectrical(value, fromUnit, toUnit) {
    const electricalConversions = {
        "A": 1,
        "mA": 0.001,
        "µA": 0.000001,
        "kA": 1000,
        "V": 1,
        "mV": 0.001,
        "µV": 0.000001,
        "kV": 1000,
        "Ω": 1,
        "mΩ": 0.001,
        "µΩ": 0.000001,
        "kΩ": 1000
        // Add more units as needed
    };

    // Perform conversion and round to 4 decimal places
    const result = (value * electricalConversions[fromUnit] / electricalConversions[toUnit]).toFixed(4);

    return result;
}
// Function to convert storage units
function convertStorage(value, fromUnit, toUnit) {
    const storageConversions = {
        "bit": 1,
        "byte": 8,
        "KB": 8 * 1024,
        "MB": 8 * 1024 * 1024,
        "GB": 8 * 1024 * 1024 * 1024,
        "TB": 8 * 1024 * 1024 * 1024 * 1024,
        "PB": 8 * 1024 * 1024 * 1024 * 1024 * 1024,
        "ZB": 8 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024
    };

    // Perform conversion and round to 4 decimal places
    return (value * storageConversions[fromUnit] / storageConversions[toUnit]).toFixed(4);
}
// Function to convert time units
function convertTime(value, fromUnit, toUnit) {
    const timeConversions = {
        "sec": 1,
        "min": 60,
        "hr": 3600,
        "day": 86400,
        "week": 604800,
        "month": 2628000,
        "year": 31536000
    };

    // Check if the units are valid
    if (!(fromUnit in timeConversions) || !(toUnit in timeConversions)) {
        return "Conversion not supported for these units.";
    }

    // Perform conversion and round to 4 decimal places
    return (value * timeConversions[fromUnit] / timeConversions[toUnit]).toFixed(4);
}
// Function to convert speed units
function convertSpeed(value, fromUnit, toUnit) {
    
    const speedConversions = {
        "m/s": 1,
        "km/h": 0.277778,
        "mph": 0.44704,
        "knot": 0.514444
    };
    // Check if the units are valid
    if (!(fromUnit in speedConversions) || !(toUnit in speedConversions)) {
        return "Conversion not supported for these units.";
    }

    // Perform conversion and round to 4 decimal places
    return (value * speedConversions[fromUnit] / speedConversions[toUnit]).toFixed(4);
}

// Function to convert flow rate units
function convertFlow(value, fromUnit, toUnit) {


    const flowConversions = {
        "m3/s": 1,
        "l/s": 0.001,
        "cfm": 0.000471947,
        "gpm": 0.0000630902
    };

    // Check if the units are valid
    if (!(fromUnit in flowConversions) || !(toUnit in flowConversions)) {
        return "Conversion not supported for these units.";
    }

    // Perform conversion and round to 4 decimal places
    return (value * flowConversions[fromUnit] / flowConversions[toUnit]).toFixed(4);
}
// Initialize the unit options based on the default category
document.addEventListener("DOMContentLoaded", () => {
    updateUnits();
});

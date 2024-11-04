let btnContainer = document.querySelector('.btns');
let btns = btnContainer.querySelectorAll('button');
let display = document.getElementById('display');
let isCalculatorOn = true; // Flag to track the calculator state
let isEqualPressed = false; // Flag to track whether "=" button has been pressed

function toggleCalculator() {
  isCalculatorOn = !isCalculatorOn;
  display.value = ""; // Always clear the display when toggling
  if (isCalculatorOn) {
    // If calculator is turned on, remove the dimmed class and show all buttons
    display.classList.remove("dimmed");
    document.getElementById('off').textContent = 'Off';
    btns.forEach(btn => btn.classList.remove("hidden"));
  } else {
    // If calculator is turned off, add the dimmed class and hide all buttons except the toggle button
    display.classList.add("dimmed");
    document.getElementById('off').textContent = 'On';
    btns.forEach(btn => {
      if (btn.id !== "off") btn.classList.add("hidden");
    });
  }
}

// Add event listener to the "Off" button to toggle calculator on/off
document.getElementById('off').addEventListener('click', toggleCalculator);

// Using foreach to loop through
btns.forEach(btn => {
  btn.addEventListener('click', function() {
    if (!isCalculatorOn) return;
    if (display.value === 'Off') display.value = '';

    if (isEqualPressed) {
      display.value = "";
      isEqualPressed = false;
    }

    if (this.innerHTML === "=") {
      try {
        // Evaluate the expression
        let result = eval(display.value);
        if (!isFinite(result)) {
          // Display error if result is not a finite number
          display.classList.add("error");
          display.value = "Error";
        } else {
          display.value = result;
        }
      } catch (error) {
        // Display error if an exception occurs during evaluation
        display.classList.add("error");
        display.value = "Error";
      }
      isEqualPressed = true;
    } else if (this.id === "clear") {
      display.value = "";
    } else if (this.id === "bs") {
      display.value = display.value.slice(0, -1);
    } else if (this.innerHTML === "." && display.value === "") {
      display.value = "0.";
    } else if (/[0-9.]$/.test(display.value) && this.innerHTML === ".") {
      let lastNumberIndex = display.value.search(/[\d.]+$/);
      let lastNumber = display.value.substring(lastNumberIndex);
      if (lastNumber.includes(".")) return;
      display.value += this.innerHTML;
    } else if (/[+\-*/]$/.test(display.value) && /[+\-*/]/.test(this.innerHTML)) {
      display.value = display.value.slice(0, -1) + this.innerHTML;
    } else if (display.value.length >= 16) {
      return;
    } else {
      display.value += this.innerHTML;
    }
  });
});

// Add event listener to remove error class when display value changes
display.addEventListener('input', function() {
  display.classList.remove("error");
});


// Add event listener to the display input field to restrict input to numbers
// Remove any non-numeric characters from the input value

display.addEventListener('input', function() {
  this.value = this.value.replace(/\D/g, '');
});


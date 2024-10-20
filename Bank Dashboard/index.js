// Input fields
const inputDeposit = document.querySelector("#in-deposite");
const inputeWithraw = document.querySelector("#in-withdraw");

// Buttons
const btnDeposite = document.querySelector("#btn-deposite");
const btnWithdraw = document.querySelector("#btn-withdraw");

// Currency display
const currency = document.querySelector("#currency");

let curr = 1000;

currency.textContent = "$" + curr;

btnDeposite.addEventListener("click", function (e) {
  e.preventDefault();
  const depositAmount = Number(inputDeposit.value);
  curr += depositAmount;
  currency.textContent = "$" + curr;
  inputDeposit.value = ""; // Reset the input field
});

btnWithdraw.addEventListener("click", function (e) {
  e.preventDefault();
  const withdrawAmount = Number(inputeWithraw.value);
  if (curr >= withdrawAmount) {
    curr -= withdrawAmount;
    currency.textContent = "$" + curr;
    inputeWithraw.value = ""; // Reset the input field
  } else {
    alert("Balance cannot be less than 0");
    inputeWithraw.value = "";
  }
});

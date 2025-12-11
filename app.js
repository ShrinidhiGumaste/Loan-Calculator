document.getElementById("loan-form").addEventListener("submit", function (e) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";
  setTimeout(calculate, 2500); // This is for Image.
  e.preventDefault();
});
function calculate(e) {
  const amount = document.getElementById("loan_amount");
  const intrest = document.getElementById("intrest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly_payment");
  const totalAmount = document.getElementById("total_amount");
  const totalIntrest = document.getElementById("total_intrest");
  // Formula For Calvulating Intrest and EMI.
  const principle = parseFloat(amount.value);
  const calculatedIntrest = parseFloat(intrest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;
  const x = Math.pow(1 + calculatedIntrest, calculatedPayments);
  const monthly = (principle * x * calculatedIntrest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalAmount.value = (monthly * calculatedPayments).toFixed(2);
    totalIntrest.value = (monthly * calculatedPayments - principle).toFixed(2);

    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showAlert("Please Enter the Values to calculate");
  }
  e.preventDefault();
}
function showAlert(error) {
  // Creatimg an Element.
  const errorDiv = document.createElement("div");
  // Assinging a Bootstrap ClassName to the Created Element.
  errorDiv.className = "alert alert-danger";
  // Creating a TExtNode.
  errorDiv.appendChild(document.createTextNode(error));
  // Where to place this Alert(error) Message.
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  // Placing the Element.
  // insertBefore => Used to Place the Elemnts According to Requirements. It Takes two Parameters first(Which element must be Placed) & second(Where or Which element before it must be Placed).
  card.insertBefore(errorDiv, heading);
  // setTimeout => Its an Inbuilt function which is used to disappear somthing after some time. It takes Two Paremeters First(is a Function) & Second(After how much seconds it must disappear, it will be in Mili-seconds).
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
}

function calcTip() {

    // Enter your code here to make Tip Calculator work
    const subtotal = document.getElementById("subtotal").value;
    const tipValue = document.getElementById("tip").value;
    let x = (subtotal * 20) / 100;
    let total = ((Number(subtotal) * Number(tipValue)) / 100) + Number(subtotal);
    document.getElementById("total").innerHTML = "$" + total;
}
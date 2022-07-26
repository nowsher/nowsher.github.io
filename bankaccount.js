// (function () {

// var createAccount = function () {
//     alert("hi");
// }
// document.getElementById("createAcc").onclick = createAccount;

// })();

class Account {
    #name;
    #deposit;
    static accountInfoList = [];
    //static #accountInfoList1 = [];

    constructor() {
        this.#name = "";
        this.#deposit = "";
        // Account.#accountInfoList1 = [];
    }

    createNewAccount() {
        var name = document.getElementById("name").value;
        var deposit = document.getElementById("deposit").value;
        if (name != null && name != "" && deposit != null && deposit != "") {
            this.#name = name;
            this.#deposit = deposit;
        }
        Account.accountInfoList[Account.accountInfoList.length] = this;
        // Account.#accountInfoList1[Account.#accountInfoList1.length] = this;

        document.getElementById("name").value = "";
        document.getElementById("deposit").value = "";
    }

    getName() {
        return this.#name;
    }
    getDeposit() {
        return this.#deposit;
    }
    updateDeposit(amount) {
        this.#deposit = parseInt(this.#deposit) + parseInt(amount);
    }

}


function createAccount() {
    var ac = new Account();
    ac.createNewAccount();
    showAccountList();
}

function showAccountList() {
    setTimeout(function () {
        var textArea = document.getElementById("textArea");
        textArea.value = "";
        var selectList = document.getElementById("accountsList");
        selectList.innerHTML = "";
        for (let index = 0; index < Account.accountInfoList.length; index++) {
            const element = Account.accountInfoList[index];
            textArea.value += ((textArea.value != "") ? "\r\n" : "") + "Account name: " + element.getName() + " Balance: " + element.getDeposit();

            //Generale option items.
            selectList.innerHTML += "<option value='" + element.getName() + "'>" + element.getName() + "<//option>";
        }
    }, 500);
}

function depositClick() {
    if (document.getElementById("accountsList").options.length > 0) {
        document.getElementById("overlay").style.display = "block";
        document.getElementById("operationType").innerHTML = "Deposit amount";
    }
    else {
        alert("No account exist. Please add accounts first.");
    }
}

function debitClick() {
    if (document.getElementById("accountsList").options.length > 0) {
        document.getElementById("overlay").style.display = "block";
        document.getElementById("operationType").innerHTML = "Debit amount";
    }
    else {
        alert("No account exist. Please add accounts first.");
    }
}

function closeWindow() {
    document.getElementById("overlay").style.display = "none";
}

function changeValue() {
    document.getElementById("save").disabled = false;
}

function save() {
    var operationType = document.getElementById("operationType").innerHTML;

    var selectName = document.getElementById("accountsList");
    var nameValue = selectName.value;    //var text = e.options[e.selectedIndex].text;
    var amount = document.getElementById("amount").value;

    for (let index = 0; index < Account.accountInfoList.length; index++) {
        const element = Account.accountInfoList[index];
        if (element.getName() == nameValue) {
            let changed = false;
            if (operationType == "Deposit amount") {
                element.updateDeposit(amount);
                changed = true;
            }
            else
                if (operationType == "Debit amount") {
                    if (parseInt(element.getDeposit()) > amount) {
                        element.updateDeposit(-amount);
                        changed = true;
                    }
                    else {
                        alert("Overdraft not allowed.");
                    }
                }
                
            if (changed) {
                showAccountList();
                closeWindow();
                document.getElementById("amount").value = "";
            }
            break;
        }
    }

}
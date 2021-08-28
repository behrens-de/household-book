const thisDate = dateToIsoString(0);
const maxDate = dateToIsoString(0); // today
const minDate = dateToIsoString(-14); // today -14days

let input = {
    notiz: document.querySelector('input[name="notiz"]'),
    date: document.querySelector('input[name="date-of-use"]'),
    amount: document.querySelector('input[name="amount"]')
}
let select = {
    purpose: document.querySelector('select[name="purpose"]'),
}

let button = {
    incomings: document.querySelector('button[name="incomings"]'),
    outgoings: document.querySelector('button[name="outgoings"]'),
}

const tags = ['allgemeines', 'supermarkt', 'bäcker']


// Set the current Date to the Date-Input-Field and make a choose limit 
input.date.value = thisDate;
input.date.max = maxDate;
input.date.min = minDate;


// convert date to ISO Date String
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
function dateToIsoString(num = 0) {
    let date = new Date();
    let setDate = date.setDate(date.getDate() + num);
    return new Date(setDate).toISOString().split("T")[0];
}




let number = 0;
function validCurrency() {

    if (this.value.length > 0) {

        const rexgex = /^[0-9]{1,4}([,.][0-9]{1,2})?$/;
        const isValid = this.value.match(rexgex) ? true : false;

        if (isValid) {
            number = this.value.match(rexgex).input;
        }

        console.log(isValid, number);
        input.amount.value = number;
    }
}

function validCurrencyBlur() {
    input.amount.value = parseFloat(number).toLocaleString('de-DE', {
        style: 'decimal',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });
}


input.amount.addEventListener('keyup', validCurrency);
//input.amount.addEventListener('blur', validCurrencyBlur);


/**
 * 
 * @param {new Date} date 
 * @returns boolean (true) if date between min and max Date
 */
function validDate(date) {
    const maxDate = new Date(); // Today
    const minDate = new Date(); // Today - 90 Days
    minDate.setDate(minDate.getDate() - 90); // Set -90 Days
    return date < maxDate && date > minDate ? true : false;
}



function setIncomings(e) {
    e.preventDefault();
    validForm();
    const currency = validCurrency(input.amount);

    input.amount.value = (currency === Number) ? currency : "0.00";

    console.log('set Incomings');
}




//
function addSpendToOverview(e) {
    e.preventDefault();
    insertTableRow('spend')
    resetForm();
}


function addIncomToOverview(e) {
    e.preventDefault();
    insertTableRow('incom')
    resetForm();
}

function insertTableRow(className){
    const table = document.querySelector('table.overview');
    let row = table.insertRow(1);
    row.insertCell(0).innerHTML = input.date.value;
    row.insertCell(1).innerHTML = select.purpose.value;
    row.insertCell(2).innerHTML = input.notiz.value || 'xxx';
    row.insertCell(3).innerHTML = input.amount.value || '?,??';
    row.className = className;
}

function resetForm(){
    input.date.value = thisDate;
    input.notiz.value = '';
    input.amount.value = '';
    select.purpose.value = tags[0];
}

button.incomings.addEventListener('click', addSpendToOverview);
button.outgoings.addEventListener('click', addIncomToOverview);

// add tags 2 Selectlist 
for (let i = 0; i < tags.length; i++) {
    let xtags = tags[i];
    select.purpose.options.add(new Option(xtags, xtags, false));
}



// Validator Test 

const validator = new Validator();
const test = [
    '1', '1,0', '1.0',
    '1,11', '1.11',
    '01,11', '01.11',
    '21,11', '21.11',
    '021,11', '021.11'
]


test.forEach(t => {
    const tag = validator.amount(t) ? 'info' : 'error';
    console[tag](t, validator.amount(t))
});


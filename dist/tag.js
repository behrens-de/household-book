let inputTag = document.querySelector('[name="addTag"]');
let buttonTag = document.querySelector('[name="addTagBtn"]');
let storageItem = 'tags';



function setItem(e) {
    e.preventDefault();

    if (validateItem()) {
        let storage = [];
        // Check if some items inside the localStorage
        if (localStorage.getItem(storageItem) !== null) {

            let items = localStorage.getItem(storageItem);
            items = JSON.parse(items);

            items.forEach(item => {
                storage.push(item);
            });

        }
        storage.push(inputTag.value);
        localStorage.setItem(storageItem, JSON.stringify(storage));
    } else {
        console.error('Item isn´t valid');
    }
}

function validateItem() {

    let items = localStorage.getItem(storageItem);
    items = JSON.parse(items);

    let result = true;

    // Check if item is in storage
    if (items) {
        items.forEach(item => {
            if (item.toLowerCase() === inputTag.value.toLowerCase()) {
                result = false;
            }
        });
    }

    // Check if item value is min 3 characters
    if (inputTag.value.length < 3) {
        result = false;
    }
    return result;
}


// Event 
buttonTag.addEventListener('click', setItem);
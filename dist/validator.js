class Validator {

    /**
     * 
     * @param {*} number 
     * @returns 
     */
    
    amount(number) {
        if (number.split(/[.,]+/)[0].length > 1 && Number(number.split("")[0]) === 0) {
            return false;
        } 
        const regex = new RegExp("[0-9]{1,4}[.,][0-9]{2}");
        return regex.test(number);
    }
}
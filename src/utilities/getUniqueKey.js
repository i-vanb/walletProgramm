export const getUniqueKey = () => {
    let number = _addNumber[_addNumber.length-1];
    _addNumber.push(number+1);
    return number
}

const _addNumber = [0];



var image = {
    width: 100,
    height: 400,
    title: 'Cool image'
};
function multiplyNumbers(obj) {
    for (var key in obj) {
        if (typeof obj[key] !== 'number') {

            obj[key] = obj[key] * 2;
        }
    }
}
multiplyNumbers(image);
console.log(image);
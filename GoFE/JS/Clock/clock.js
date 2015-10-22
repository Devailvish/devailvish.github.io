(function () {

    var clock = document.getElementById('clock');
    var hourPad = document.createElement('div');
    hourPad.className = 'hourPad';
    var minPad = document.createElement('div');
    minPad.className = 'minPad';
    var secPad = document.createElement('div');
    secPad.className = 'secPad';

    var temp = [0, 0];


    clock.appendChild(hourPad);
    clock.appendChild(minPad);
    clock.appendChild(secPad);


    var renderDigit = function (x) {
        return x < 10 ? '0' + x : x;
    };


    var randomColor = function () {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    var setColor = function (elem) {
        elem.style.color = randomColor();
    };

    var updateClock = function () {
        var d = new Date();
        var hour = renderDigit(d.getHours());
        var min = renderDigit(d.getMinutes());
        var sec = renderDigit(d.getSeconds());

        if (temp[0] != hour) {
            setColor(hourPad);
        }

         if (temp[1] != min) {
            setColor(minPad);
        }

        temp[0] = hour;
        temp[1] = min;

        hourPad.innerHTML = hour + ":";
        minPad.innerHTML = min + ":";
        secPad.innerHTML = sec;

        setColor(secPad);
    };


    setInterval(updateClock, 1000);


}());

function magnify(imgID, glassID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
    glass = document.getElementById(glassID);

    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize =
        img.width * zoom + "px " + img.height * zoom + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    img.addEventListener("mouseenter", function () {
        glass.style.display = "block";
    });

    img.addEventListener("mouseleave", function () {
        glass.style.display = "none";
    });

    img.addEventListener("mousemove", moveMagnifier);

    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
        var pos, x, y;

        e.preventDefault();

        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;

        var offsetX = 20;
        var offsetY = 20;
        x += offsetX;
        y += offsetY;

        if (x > img.width - w / zoom) {
            x = img.width - w / zoom;
        }
        if (x < w / zoom) {
            x = w / zoom;
        }
        if (y > img.height - h / zoom) {
            y = img.height - h / zoom;
        }
        if (y < h / zoom) {
            y = h / zoom;
        }

        glass.style.left = x - w + "px";
        glass.style.top = y - h + "px";

        glass.style.backgroundPosition =
            "-" + (x * zoom - w) + "px -" + (y * zoom - h) + "px";
    }

    function getCursorPos(e) {
        var a,
            x = 0,
            y = 0;
        e = e || window.event;

        a = img.getBoundingClientRect();

        x = e.pageX - a.left;
        y = e.pageY - a.top;

        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}

magnify("myimage", "magnifier-glass", 3);

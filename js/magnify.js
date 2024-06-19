
function magnify(imgID, glassID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
    glass = document.getElementById(glassID);

    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    /* Show the magnifier glass when mouse enters the image: */
    img.addEventListener("mouseenter", function () {
        glass.style.display = "block";
    });

    /* Hide the magnifier glass when mouse leaves the image: */
    img.addEventListener("mouseleave", function () {
        glass.style.display = "none";
    });

    /* Execute a function when someone moves the magnifier glass over the image: */
    img.addEventListener("mousemove", moveMagnifier);

    /* And also for touch screens: */
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
        var pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;

        /* Apply offset to the magnifier glass position: */
        var offsetX = 20; // Horizontal offset in pixels
        var offsetY = 20; // Vertical offset in pixels
        x += offsetX;
        y += offsetY;

        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }

        /* Set the position of the magnifier glass: */
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /* Display what the magnifier glass "sees": */
        glass.style.backgroundPosition = "-" + ((x * zoom) - w) + "px -" + ((y * zoom) - h) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}

/* Initiate magnify function with the id of the image and the zoom level */
magnify("myimage", "magnifier-glass", 3);
document.addEventListener('click', function (event) {
    var navbarNav = document.getElementById('navbarNav');
    var navbarNavContainer = document.getElementById('navbarNavContainer');
    var isClickInside = navbarNavContainer.contains(event.target);

    if (!isClickInside) {
        var bsCollapse = new bootstrap.Collapse(navbarNav, {
            toggle: false
        });
        bsCollapse.hide();
    }
});
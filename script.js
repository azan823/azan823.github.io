/* Smooth scrolling animation */

document.querySelectorAll("a").forEach(link => {

```
link.addEventListener("click", function(e) {

    const target = this.getAttribute("href");

    if (target.startsWith("#")) {

        e.preventDefault();

        document.querySelector(target)
            .scrollIntoView({
                behavior: "smooth"
            });

    }

});
```

});

/* Console message */

console.log("Portfolio Loaded Successfully");

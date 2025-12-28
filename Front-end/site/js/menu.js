class MobileNavBar {
    constructor(menumobile, navlist, navLinks) {
        this.menumobile = document.querySelector(menumobile);
        this.navlist = document.querySelector(navlist);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }
    animateLinks(){
        this.navLinks.forEach((Link)=>{
            Link.style.animation?(Link.style.animation=""):(Link.style.animation=`navLinkFade 0.5 ease forwards 0.3s`)
        })
    }

    handleClick() {
        this.navlist.classList.toggle(this.activeClass);
        this.menumobile.classList.toggle(this.activeClass); // ✔ Correção
        this.animateLinks();
    }

    addClickEvent() {
        this.menumobile.addEventListener("click", this.handleClick);
    }

    init() {
        if (this.menumobile) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavBar(
    ".menumobile",
    ".navlist",
    ".navlist li"
);

mobileNavbar.init();

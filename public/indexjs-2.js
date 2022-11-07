let navbar = null;
let container = null;
let sections = null;
let flagEn = null;
let nextAnim = null;
let backAnim = null;
const pages = ["About", "Totems", "Vr","Team","Trailer"];
let currentPage = 0;
let wantedPage = null;
let blackFortress1 = null;
let blackFortress2 = null;
let blackFortress3 = null;
let blackFortress4 = null;
let blackFortress5 = null;
let menuButton = null;
let mobAnim = null;
let deskAnim = null;


function engWelcome() {
    document.getElementById('welcomeScreen').style.display = "none";
}

function bosWelcome() {
    document.getElementById('lang-button').click();
    document.getElementById('welcomeScreen').style.display = "none";
} 

function getNext(numId) {
    if(numId >= 4) numId = 0;
    else numId++;
    return pages[numId];
}

function getPrevious(numId) {
    if(numId <= 0) numId = 4;
    else numId--;
    return pages[numId];
}


function menuClick() {
    if(navbar.style.width === '50vw') {
        navbar.style.width = '0vw';
        menuButton.setDirection(-1);
        menuButton.play();
    }
    else {
        navbar.style.width = '50vw';
        menuButton.setDirection(1);
        menuButton.play();
    }
}

function backClick() {
    backAnim.goToAndPlay(0);
    //getPrevious(currentPage);
    document.getElementById(getPrevious(currentPage)).scrollIntoView();
}

function nextClick() {
    nextAnim.goToAndPlay(0);
    getNext(currentPage);
    document.getElementById(getNext(currentPage)).scrollIntoView();
}


window.onload = function() {

    history.replaceState(null, null, ' ');


    // function closeWelcome() {
    //     document.getElementById("welcomeScreen").classList.add("hideWelcome");
    // }
    
    // setTimeout(closeWelcome, 2300);

    // mijenjanje jezika jquery
    $('[class="bs"]').hide();
    $('[class="en"]').show();
    sections = document.querySelectorAll('.sec');
    navbar = document.querySelector('.navbar');
    container = document.querySelector('.container');
    flagEn = document.getElementById('flag-en');
    let en = document.querySelectorAll('.en');
    let bs = document.querySelectorAll('.bs');

    
    nextAnim = bodymovin.loadAnimation({
        container: document.getElementById('next-anim'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './anim/next_animatio_green_big.json' // the path to the animation json
    });

    

    backAnim = bodymovin.loadAnimation({
        container: document.getElementById('back-anim'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './anim/next_animatio_green_big.json' // the path to the animation json
    });

    

    blackFortress1 = bodymovin.loadAnimation({
        container: document.getElementById('blackFortress1'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './anim/tvrdjava_zastava_crna_text.json' // the path to the animation json
    });

    blackFortress1.setSpeed(0.5);

    blackFortress2 = bodymovin.loadAnimation({
        container: document.getElementById('blackFortress2'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './anim/tvrdjava_zastava_crna_text.json' // the path to the animation json
    });

    blackFortress2.setSpeed(0.5);

    blackFortress3 = bodymovin.loadAnimation({
        container: document.getElementById('blackFortress3'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './anim/tvrdjava_zastava_crna_text.json' // the path to the animation json
    });

    blackFortress3.setSpeed(0.5);

    blackFortress4 = bodymovin.loadAnimation({
        container: document.getElementById('blackFortress4'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './anim/tvrdjava_zastava_crna_text.json' // the path to the animation json
    });

    blackFortress4.setSpeed(0.5);

    blackFortress5 = bodymovin.loadAnimation({
        container: document.getElementById('blackFortress5'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './anim/tvrdjava_zastava_crna_text.json' // the path to the animation json
    });

    blackFortress5.setSpeed(0.5);

    menuButton = bodymovin.loadAnimation({
        container: document.getElementById('menu-button'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: './anim/menu_button_green.json' // the path to the animation json
    });

    menuButton.setSpeed(4);

    mobAnim = bodymovin.loadAnimation({
        container: document.getElementById('mob-anim'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: './anim/tvrdjava_mobile.json' // the path to the animation json
    });

    deskAnim = bodymovin.loadAnimation({
        container: document.getElementById('welcomeAnim'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: './anim/tvrdjava_white_outline.json' // the path to the animation json
    });
    
    function showEng() {
        document.getElementById("eng-button").classList.add("show");
    }

    function showBos() {
        document.getElementById("bos-button").classList.add("show");
    }

    // napravljena dva posebna zbog brzeg odziva
    setTimeout(showEng, 2000);
    setTimeout(showBos, 2000);

    $( "#lang-button" ).on( "click", function() {
        if ($(this).hasClass("active")) {
            bs.forEach(b => {
                b.style.display = 'block';
            });
            en.forEach(e => {
                e.style.display = 'none';
            });
            $(this).removeClass("active");
        }
        else {
            en.forEach(e => {
                e.style.display = 'block';
            });
            bs.forEach(b => {
                b.style.display = 'none';
            });
            $(this).addClass("active");
        }
      });

    function remove_hash_from_url() {
        var uri = window.location.toString();

        if (uri.indexOf("#") > 0) {
            var clean_uri = uri.substring(0,
                            uri.indexOf("#"));

            window.history.replaceState({},
                    document.title, clean_uri);
        }
    }

    function resetNavbar() {
        if(window.innerWidth < 600 && navbar.style.width === '50vw') {
            navbar.style.width = '0vw';
            menuButton.setDirection(-1);
            menuButton.play();
        } 
    }
    
    container.addEventListener("click", resetNavbar);
    
    let observerFunkcija = (entries) => {
        entries.forEach(entry => {
            let id = entry.target.getAttribute('id');
            let oldId = id;
            id = "l" + id.toLowerCase();
            // za bih 
            idBih = id + "-bs";

            if(entry.isIntersecting) {

                // uklanjanje hash-a iz url
                remove_hash_from_url();

                // dio koda koji odredjuje broj trenutne stranice
                let idNum = pages.indexOf(String(oldId));
                currentPage = idNum;
                // kraj dijela

                document.getElementById(id).style.color = "#ffffff";
                // za bih 
                document.getElementById(idBih).style.color = "#ffffff";
            }
            else {
                document.getElementById(id).style.color = "#9dc43f";
                document.getElementById(idBih).style.color = "#9dc43f";
            }
            
        });
        
    }
    
    const observer = new IntersectionObserver(observerFunkcija, {
        threshold: [0.3]
    });
    
    sections.forEach(section => {
        observer.observe(section);
    })
    
}

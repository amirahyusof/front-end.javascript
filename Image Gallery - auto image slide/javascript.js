let slide = document.querySelectorAll('.container .slider .slide');
let dots = document.querySelectorAll('.container .dots .dot');


let slideIndex = 0;

function showSlides(index){
    //Hide all sides
    slide.forEach(slide => {
        slide.style.display = "none";
    });

    //remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    })

    //Show the selected slide and set the corresponding dot as active
    slide[index].style.display = "block";
    dots[index].classList.add('active');
}

function nextSlide(){
    slideIndex++;
    if(slideIndex >= slide.length){
        slideIndex = 0;
    }
    showSlides(slideIndex);
}

function prevSlide(){
    slideIndex--;
    if(slideIndex < 0){
        slideIndex = slide.length - 1;
    }
    showSlides(slideIndex);
}

//intialize the slideshow
showSlides(slideIndex);

//add click event listeners to the dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () =>{
        showSlides(index);
        slideIndex = index; //update the slideIndex
    });
});

// Automatically advance the slides every 4 second (4000 miliseconds)
setInterval(nextSlide, 4000);

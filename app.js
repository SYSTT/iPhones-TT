document.getElementById("btn1").addEventListener("click", function() {
    document.querySelector(".bg-modal-eval").style.display = "flex";
});

document.getElementById("btn2").addEventListener("click", function() {
    document.querySelector(".bg-modal-stock").style.display = "flex";
});

document.getElementById("btn3").addEventListener("click", function() {
    document.querySelector(".bg-modal-booking").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", function() {
    document.querySelector(".bg-modal-eval").style.display = "none";
});

document.querySelector(".close2").addEventListener("click", function() {
    document.querySelector(".bg-modal-stock").style.display = "none";
});

document.querySelector(".close3").addEventListener("click", function() {
    document.querySelector(".bg-modal-booking").style.display = "none";
});
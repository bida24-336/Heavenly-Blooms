script.js
document.getElementById("feedback-form").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("thank-you").style.display = "block";
});

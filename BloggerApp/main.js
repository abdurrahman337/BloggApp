// här lägger vi till ett inlägg i bloggen.
const array = [
    {
      title: "Den allvarsamma leken"  ,
      author: "Hjalmar Söderberg",
      content: "Den allvarsamma leken från 1912 är en av våra främsta kärleksromaner. Hjalmar Söderbergs klassiker utspelar sig i 1900-talets Stockholm och skildrar en komplex kärlekshistoria mellan journalisten Arvid Stjärnblom och konstnärsdottern Lydia Stille."
    },
    {
        title: "Gösta Berlings saga"  ,
        author: "Selma Lagerlöf",
        content: "Gösta Berlings saga publicerades 1891 och är Selma Lagerlöfs debutroman. En mustig skröna från hennes älskade Värmland, präglad av både burlesk humor och djupt allvar och en saga som saknar motstycke i svensk litteratur."   
    },
    {
        title: "Onskan"  ,
        author: "Jan Guillou",
        content: "Huvudpersonen Erik Ponti, som har drag av bokens författare,[3] växer upp i 1950-talets Stockholm med sin sadistiske styvfar som slår honom nästan varje dag."   
    }


]

array.forEach(element => {
    console.log(element);
    var post = "<div class='blog-post'>" +
                   "<h2 class='titleh2'>" + element.title + "</h2>" +
                   "<p><strong>Avsändare:</strong> " + element.author + "</p>" +
                   "<p>" + element.content + "</p>" +
                   "<p><strong>Publicerat:</strong> " + "dateString" + "</p>" +
                   "<button onclick='deletePost(this)'>Radera</button>" +
                   "<button onclick='toggleCommentForm(this)'>Kommentera</button>" +
                   "<div class='comments'></div>" +
                   "<div class='comment-form' style='display:none;'>" +
                       "<label for='comment-author'>Ditt namn:</label>" +
                       "<input type='text' id='comment-author'>" +
                       "<label for='comment-content'>Din kommentar:</label>" +
                       "<textarea id='comment-content'></textarea>" +
                       "<button onclick='addComment(this)'>Skicka kommentar</button>" +
                   "</div>" +
                   "<button onclick='toggleRatingForm(this)'>Betygsätt inlägget</button>" +
                   "<div class='rating-form' style='display:none;'>" +
                       "<label for='post-rating-input'>Betyg (1-5 stjärnor):</label>" +
                       "<input type='number' id='post-rating-input' min='1' max='5' required>" +
                       "<button onclick='ratePost(this)'>Betygsätt</button>" +
                   "</div>" +
                   "<p><strong>Betyg:</strong> <span id='post-rating'>Inget betyg</span></p>" +
               "</div>";
// här lägger vi till nya inlägget i DOM.
    document.getElementById("blog-posts").innerHTML += post;
});

function addPost() {
    // hämtar info ifrån input fälten.
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var content = document.getElementById("content").value;
// lägger till tid och datum för när inlägget skrevs.
    var currentDate = new Date();
    var dateString = currentDate.toLocaleString();
// här skapar vi en html-sträng för inlägget som vi skrev.
    var post = "<div class='blog-post'>" +
                   "<h2>" + title + "</h2>" +
                   "<p><strong>Avsändare:</strong> " + author + "</p>" +
                   "<p>" + content + "</p>" +
                   "<p><strong>Publicerat:</strong> " + dateString + "</p>" +
                   "<button onclick='deletePost(this)'>Radera</button>" +
                   "<button onclick='toggleCommentForm(this)'>Kommentera</button>" +
                   "<div class='comments'></div>" +
                   "<div class='comment-form' style='display:none;'>" +
                       "<label for='comment-author'>Ditt namn:</label>" +
                       "<input type='text' id='comment-author'>" +
                       "<label for='comment-content'>Din kommentar:</label>" +
                       "<textarea id='comment-content'></textarea>" +
                       "<button onclick='addComment(this)'>Skicka kommentar</button>" +
                   "</div>" +
                   "<button onclick='toggleRatingForm(this)'>Betygsätt inlägget</button>" +
                   "<div class='rating-form' style='display:none;'>" +
                       "<label for='post-rating-input'>Betyg (1-5 stjärnor):</label>" +
                       "<input type='number' id='post-rating-input' min='1' max='5' required>" +
                       "<button onclick='ratePost(this)'>Betygsätt</button>" +
                   "</div>" +
                   "<p><strong>Betyg:</strong> <span id='post-rating'>Inget betyg</span></p>" +
               "</div>";
// här lägger vi till nya inlägget i DOM.
    document.getElementById("blog-posts").innerHTML += post;
    // vi rensar formulären efter att inlägget publicerats.
    clearForm();
}
// en funktion för att radera ett inlägg.
function deletePost(button) {
    var post = button.parentNode;
    post.parentNode.removeChild(post);
}
// när vi klickar på kommentera så dyker alt upp.annars är fälten i kommentars funkitonen osynlig.
function toggleCommentForm(button) {
    var post = button.parentNode;
    var commentForm = post.querySelector(".comment-form");
    commentForm.style.display = commentForm.style.display === 'none' ? 'block' : 'none';
}
// här lägger vi till en kommentar.
function addComment(button) {
    var post = button.parentNode.parentNode;
    var commentAuthor = post.querySelector("#comment-author").value;
    var commentContent = post.querySelector("#comment-content").value;
// här skapar i en sträng för kommentaren.
    var comment = "<div class='comment'>" +
                      "<p><strong>" + commentAuthor + ":</strong> " + commentContent + "</p>" +
                  "</div>";
// lägger till kommentaren i DOM.
    post.querySelector(".comments").innerHTML += comment;
    // rensar kommentars fälten efter kommentaren publicerats.
    clearCommentForm(post);
}
// fälten dyker fram när vi klickar på betygsätt inlägget.
function toggleRatingForm(button) {
    var post = button.parentNode;
    var ratingForm = post.querySelector(".rating-form");
    ratingForm.style.display = ratingForm.style.display === 'none' ? 'block' : 'none';
}

function ratePost(button) {
    var post = button.parentNode.parentNode;
    var postRatingSpan = post.querySelector("#post-rating");
    var postRatingInput = post.querySelector("#post-rating-input");
    // lägger till betyget i DOM om de är giltig annars visas ett fel meddelande.
    var rating = postRatingInput.value;
    if (rating >= 1 && rating <= 5) {
        postRatingSpan.textContent = rating + " stjärnor";
    } else {
        alert("Vänligen ange ett betyg mellan 1 och 5 stjärnor.");
    }

    clearRatingForm(post);
}
// rensar formuläret efter att vi publicerat.
function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("content").value = "";
}
// rensar  kommentars fältet efter att vi publicerat.
function clearCommentForm(post) {
    post.querySelector("#comment-author").value = "";
    post.querySelector("#comment-content").value = "";
    post.querySelector(".comment-form").style.display = 'none';
}
//rensar betyget efter att vi betyg satt.
function clearRatingForm(post) {
    post.querySelector("#post-rating-input").value = "";
    post.querySelector(".rating-form").style.display = 'none';
}

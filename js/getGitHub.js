function getGithub(){


    console.log('GET GITHUB')


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       console.log('REPO', JSON.parse (xhttp.responseText)[0].title);
    }
    };
    xhttp.open("GET", "https://api.github.com/repos/lufemas/md-blog/issues", true);
    xhttp.send();


}

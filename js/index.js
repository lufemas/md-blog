'use strict'



const $ = document
const $Test = $.getElementById(`test`)


$Test.innerHTML = "Not working"


let currArticle = {
  content: ''
}
// loadFile('../articles/001_Welcome-Article/page.md', currArticle)

console.log(currArticle)

$Test.innerText =  currArticle.content

// var xhr = new XMLHttpRequest();
// xhr.open("GET", "../articles/001_Welcome-Article/page.md", true);
// xhr.onload = function (e) {
//   if (xhr.readyState === 4) {
//     if (xhr.status === 200) {
//       $Test.innerHTML = xhr.responseText;
//     } else {
//       console.error(xhr.statusText);
//     }
//   }
// };
// xhr.onerror = function (e) {
//   console.error(xhr.statusText);
// };
// xhr.send(null); 


let indexReadmeStr = []

loadFile('../README.md',(text)=> {
  indexReadmeStr = text.split('\n')
  console.log('as', indexReadmeStr)

  $Test.innerHTML = createNavLinks(text,`main-nav-bar`,`main-nav-bar`)
})

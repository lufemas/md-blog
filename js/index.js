'use strict'



const $ = document
const $Test = $.getElementById(`test`)
const $content = $.getElementById(`content`)
const $pageNav = $.getElementById(`page-nav`)
const $pageSelection = $.getElementById(`page-selection`)


$Test.innerHTML = "Not working"


let currArticle = {
  content: ''
}
// loadFile('../articles/001_Welcome-Article/page.md', currArticle)

console.log(currArticle)

$Test.innerText =  currArticle.content

let indexReadmeStr = []

loadFile('../README.md',(text)=> {
  indexReadmeStr = text.split('\n')
  console.log('as', indexReadmeStr)

  $Test.innerHTML = createNavLinks(text,`main-nav-bar`,`main-nav-bar`)
})



// const issueCount = 57

const repoSourceName = 'showdownjs/showdown'
// const repoSourceName = 'lufemas/md-blog'
let currPage = 0
let artPerPage = 10
let articles = []


loadFile('https://api.github.com/repos/' + repoSourceName, ( res )=>{
    let issuesCount = JSON.parse(res).open_issues
    handlePagesSelection(5)
})

loadArticleLists(0,artPerPage)


// https://developer.github.com/v3/#pagination

function loadArticleLists(page, perPage){
 
  loadFile('https://api.github.com/repos/'+ repoSourceName +'/issues?page='+page+'&per_page='+perPage, ( res )=>{
    const issuesArr = JSON.parse(res)
  
    let issuesCount = issuesArr.length
  
    articles = [] 
    

    issuesArr.forEach(element => {
      articles.push( Article.extractArticleElements(element) )      
    });
      
    showArticlesList(articles)
  
  
  })
  
}


function showArticlesList(articles = [], page = 0, pageSize = 5){
    const $articleList = $.createElement('ul')
    $articleList.className = 'articles-list'

    articles.forEach((element, index) => {
      const $li = $.createElement('li')
      $li.innerText = element.title
      $li.indexCount = index
      $li.addEventListener('click', (e)=> {
        showArticle(index)
      })

      $articleList.appendChild($li)
    });

    $content.innerHTML = ''
    $content.appendChild($articleList)

}

function showArticle(numberOnPage){

  $content.innerHTML = ''
  $content.appendChild(articles[numberOnPage].$article)

}

function handlePagesSelection(pagesCount = 0){

  for(let i =1; i <= pagesCount ; i ++){
    const $option = $.createElement('option')
    $option.value = i
    $option.innerText = i

    $pageSelection.appendChild($option)
  }

}

$pageSelection.addEventListener('change', (e)=>{
  currPage = $pageSelection.value
  loadArticleLists(currPage,artPerPage)
})

// })


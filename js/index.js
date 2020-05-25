'use strict'



const $ = document
const $header = $.getElementById(`header`)
const $content = $.getElementById(`content`)
const $pageNav = $.getElementById(`page-nav`)
const $pageSelection = $.getElementById(`page-selection`)
const $tagsFilter = $.getElementById(`tags-filter`)
const $tagsList = $.getElementById(`tags-list`)


$header.innerHTML = "Not working"



// const issueCount = 57

const repoSourceName = 'ohmyzsh/ohmyzsh'
// const repoSourceName = 'showdownjs/showdown'
// const repoSourceName = 'lufemas/md-blog'
let currPage = 0
let artPerPage = 10
let articles = []

let indexReadmeStr = []

function authenticate(){
  console.log( 'Authentication:\n',
  fetch("https://api.github.com", {
    headers: {
      Authorization: "Basic bHVmZW1hcw=="
    }
  }).then( (res) => {
    console.log(res)
    loadArticleLists(0,artPerPage)
    loadTags()
  })
  ) 
}

authenticate()


let currArticle = {
  content: ''
}
// loadFile('../articles/001_Welcome-Article/page.md', currArticle)

console.log(currArticle)

$header.innerText =  currArticle.content



loadFile('README.md',(text)=> {
  indexReadmeStr = text.split('\n')
  console.log('as', indexReadmeStr)

  $header.innerHTML = createNavLinks(text,`main-nav-bar`,`main-nav-bar`)
})





loadFile('https://api.github.com/repos/' + repoSourceName, ( res )=>{
    let issuesCount = JSON.parse(res).open_issues
    handlePagesSelection(5)
})



// https://developer.github.com/v3/#pagination

function loadArticleLists(page, perPage, filter = ''){
 
  // https://api.github.com/repos/showdownjs/showdown/issues?page='+page+'&per_page='+perPage
  // https://api.github.com/repos/showdownjs/showdown/issues?labels=bug&page=1&per_page=1
  loadFile('https://api.github.com/repos/'+ repoSourceName +'/issues?'+ filter +'page='+page+'&per_page='+perPage, ( res )=>{
    const issuesArr = JSON.parse(res)
  
    let issuesCount = issuesArr.length
  
    articles = [] 
    

    issuesArr.forEach(element => {
      articles.push( Article.extractArticleElements(element) )      
    });
      
    showArticlesList(articles)
  
  
  })
  
}



function loadTags(){
 
  // https://api.github.com/repos/showdownjs/showdown/issues/labels
  loadFile('https://api.github.com/repos/'+ repoSourceName +'/labels', ( res )=>{
    const labelsArr = JSON.parse(res)
  
    let labelsCount = labelsArr.length
    

    labelsArr.forEach(element => {
       
      const $tagLi = $.createElement('li')

      $tagLi.innerText = element.name
      $tagLi.style.backgroundColor = `#${element.color}`
      
      $tagLi.addEventListener('click', (e)=>{
        loadArticleLists(0,artPerPage, `labels=${element.name}&`)
      })

      $tagsList.appendChild($tagLi)
  })
  
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


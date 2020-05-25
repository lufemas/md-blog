class Article{
    constructor(title,date,author, body, tags){
        this.title = title
        this.date = date
        this.author = author
        this.body = (()=>{
            let converter = new showdown.Converter();
            let mdText        = body;
            return converter.makeHtml(mdText);
        
        })()
        this.tags = tags

        this.$title = document.createElement('h3')
        this.$title.innerText = this.title

        this.$date = document.createElement('time')
        this.$date.className = 'created-at'
        this.$date.innerText = this.date

        this.$author = document.createElement('a')
        this.$author.innerText = this.author
        this.$author.href = `https://github.com/${this.author}`
        this.$author.target = `_blank`
        this.$author.className = 'author'


        this.$body = document.createElement('section')
        this.$body.innerHTML = this.body 
        this.$body.className = 'article-body'

        this.$tags = document.createElement('ul')
        this.tags.forEach( tag => {
            const $liTag = document.createElement('li')
            $liTag.innerText = tag;
            this.$tags.appendChild($liTag)
        })
        this.$tags.className = 'tags'

        this.$article = document.createElement('article')
        this.$article.appendChild(this.$title)
        this.$article.appendChild( this.$author)
        this.$article.appendChild(this.$date)
        this.$article.appendChild(this.$body)
        this.$article.appendChild(this.$tags)
        
        this.$article.className = 'article'


    }

    getArticleHTML(){
    }

    //split the issue array to requested info
    static extractArticleElements(arr){
        const tags = []

        arr.labels.forEach((element, index) => {
            tags.push(element.name)
          });

        return new Article(arr.title, arr.created_at, arr.user.login, arr.body, tags)
    }

}
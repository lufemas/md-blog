function createNavBar(aArr,id = '',className = ''){

    let liArr = ''
    liArr = `<li>` + aArr.join(`</li>\n<li>`) + `</li>`

    debugLog('List Arrays: ')
    debugLog(liArr)

    return `<nav id="${id}" class="${className}">` + liArr + `</nav>` 

}
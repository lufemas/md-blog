function createNavLinks(mdText, id = ``, className = ``){
    const mdArr = mdText.split('\n')

    const mdNavLinksIndex = getNavLinksArr(mdArr)

    const mdNavLinks = getLinksArray(mdArr,mdNavLinksIndex)

   debugLog(mdNavLinks)

    const HTMLLinks = createAnchors(mdNavLinks)

   debugLog( HTMLLinks)

   return createNavBar(HTMLLinks, id, className)
}



function getNavLinksArr( arr){
    let indexStart, indexEnd
    arr.forEach((element,index) => {
        if(/^(<!--)\s*{nav-bar}\s(-->)$/i.test(element)){
           debugLog('achouuu')
           debugLog(element)
           debugLog(index)
           debugLog('-------')
            indexStart = index
        }

        if(/^(<!--)\s*{\/nav-bar}\s(-->)$/i.test(element)){
           debugLog('achouuu fim')
           debugLog(element)
           debugLog(index)
           debugLog('-------')
            indexEnd = index
        }
        
    });
        
    let navLinksIndex = []

    for(let i = indexStart +1 ; i < indexEnd ; i++ ){
        navLinksIndex.push(i)
    }

   debugLog(navLinksIndex)
   debugLog('==========')

    return navLinksIndex
}


function getLinksArray(mdArr,linksIndex){
    const navLinks = []
    linksIndex.forEach(element => {
        navLinks.push(mdArr[element])
    });

    return navLinks
}


function createAnchors(navLinks){
    const aLinks = []
    navLinks.forEach(element => {
        let inText = ''
        let aText = ''
        inText = element.match(/\[(.+)\]/i)[1]
        // aText = element.match(/\W\W(.+)/i)
        aText = element.match(/\((.+)\)/i)[1]
        debugLog('-------------------')
        debugLog(inText)
        debugLog(aText)
        debugLog('-------------------')
        aLinks.push()
        aLinks.push(`<a href="${aText}">${inText}</a>`)
    });

    return aLinks
}
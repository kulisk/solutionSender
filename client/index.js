async function sendRequest() {
    let div = document.getElementById('output')
    try {
        let response = await fetch('http://localhost:5000')
        let json = await response.json()
        let problems = json.problems.map((item) => {
            return {
                id: item.id,
                name: item.name,
                statementUrl: item.statementUrl
            }
        })
        let br = document.createElement('br')
        problems.forEach(item => {
            let link = document.createElement('a');
            link.setAttribute('href', `./problem.html`)
            link.setAttribute('class', 'problemLink')
            link.textContent = item.name
            div.appendChild(link)
            div.appendChild(br)
        })
    } catch (e) {
        console.log(e)
    }
}

sendRequest().then()
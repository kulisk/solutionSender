const problemId = 32063

async function getStatementUrl() {
    const statementLink = document.getElementById('statement')
    try {
        let response = await fetch(`http://localhost:5000/${problemId}`)
        let text = await response.text()
        statementLink.setAttribute('href', text)
    } catch (e) {
        console.log(e)
    }

    const languages = document.getElementById('languages')
    try {
        let response = await fetch(`https://checking.sybon.org/api/Compilers`)
        let json = await response.json()
        for (let i = 0; i < json.length; i++) {
            let option = document.createElement('option')
            option.textContent = json[i].name
            option.setAttribute('value', json[i].id)
            if (json[i].name === 'C++') {
                option.setAttribute('selected', 'true')
            }
            languages.appendChild(option)
        }
    } catch (e) {
        console.log(e)
    }
}

getStatementUrl().then()
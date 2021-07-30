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
}

async function sendSolution() {
    alert('send!')
}

getStatementUrl().then()
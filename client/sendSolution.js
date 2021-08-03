async function sendSolution() {
    const url = 'http://localhost:5000'
    let compilers = Array.from(document.getElementsByClassName('languageOption'))
    const body = {
        compilerId: compilers.find((element) => element.selected).value,
        solution: document.getElementById('solutionCode').value,
        problemId: 32063,
    }
    try {
        let response = await fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(body)
        })
        let json = await response.json()
        console.log(json)
    } catch (e) {
        console.log(e)
    }
}
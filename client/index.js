async function sendRequest() {
    let div = document.getElementById('output')
    try {
        let response = await fetch('http://localhost:5000')
        let json = await response.json()
        div.textContent = JSON.stringify(json)
    } catch (e) {
        console.log(e)
    }
}

sendRequest().then()
async function getSubmits() {
    const submitsContainer = document.getElementById('submits')
    try {
        const response = await fetch('http://localhost:5000/submits')
        const json = await response.json()
        json.results.forEach(value => {
            const div = document.createElement('div')
            const divName = document.createElement('div')
            const divStatus = document.createElement('div')

            divName.textContent = value.problemName
            divStatus.textContent = value.status
            div.classList.add('submitContainer')
            if (value.status === "FAILED") {
                div.classList.add('bg-danger')
            } else {
                div.classList.add('bg-success')
            }

            div.appendChild(divName)
            div.appendChild(divStatus)

            submitsContainer.appendChild(div)
        })
    } catch (e) {
        console.log(e)
    }
}

getSubmits().then()
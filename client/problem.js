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
            option.className += 'languageOption'
            if (json[i].name === 'C++') {
                option.setAttribute('selected', 'true')
            }
            languages.appendChild(option)
        }
    } catch (e) {
        console.log(e)
    }
}

function share() {
    let textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = window.location.href;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let alert = document.createElement('div')
    alert.classList.add('alert', 'alert-success')
    alert.textContent = 'Copied'
    alert.style.position = 'fixed'
    alert.style.top = '0'
    alert.style.right = '0'

    try {
        document.execCommand('copy');
        document.body.insertBefore(alert, document.body.firstChild)
        setTimeout(() => {
            document.body.removeChild(alert)
        }, 1000)
    } catch (err) {
        console.log('Unable to copy');
    }
    document.body.removeChild(textArea);
}

getStatementUrl().then()
async function sendSolution() {
    const reqBody = {
        language: "Java",
        taskId: "23421",
        solution: "C++ solution"
    }
    const request = 'http://localhost:5000'
    try {
        let response = await fetch(request, {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(reqBody)
        })
        console.log(response.status)
    } catch (e) {
        console.log(e)
    }
}
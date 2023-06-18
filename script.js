const dice = document.querySelector("[data-dice]")
const dicePhoto = document.querySelector("[data-photo-dice]")
const advicePara = document.querySelector("[data-advice]")
const adviceId = document.querySelector("[data-advice-id]")

start()

dice.addEventListener("click", () => {
    start()
})

function start(){
    renderAdviceBefore()
    getAdvice().then(result => {
        renderAdviceAfter(result)
    })
}

async function getAdvice() {
    const url = "https://api.adviceslip.com/advice/71"
    try {
        const response = await fetch(url)
        if (!response.ok) {
            console.log("Response wasn't ok")
            return {msg: "API Error"}
        }
        const data = await response.json()
        return data.slip || {msg: "Advice not found!"}
    } catch (err) {
        console.error("Yo, some errors happened, err.message:", err.message)
        return {msg: "ERROR!"}
    }

}


function renderAdviceAfter({advice, id, msg}) {
    dicePhoto.classList.remove("advice__photo--animating")
    if (advice == null) {
        alert(msg)
    } else {
        advicePara.textContent = advice
        adviceId.textContent = id.toString()
    }

}

function renderAdviceBefore() {
    dicePhoto.classList.add("advice__photo--animating")
}
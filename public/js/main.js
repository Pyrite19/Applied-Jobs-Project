const deleteBtn = document.querySelectorAll('.delete')

Array.from(deleteBtn).forEach((element) => {
    element.addEventListener('click', deleteItem)
})

async function deleteItem() {
    console.log(this.parentNode.childNodes)
    const jobText = this.parentNode.childNodes[1].innerText
    const dayText = this.parentNode.childNodes[4].innerText
    const monthText = this.parentNode.childNodes[2].innerText
    const yearText = this.parentNode.childNodes[6].innerText
    try {
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'jobFromJS': jobText,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch (err) {
        console.log(err)
    }
}
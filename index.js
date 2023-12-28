const db = new Dexie('ComprasApp')
db.version(1).stores( { items: '++id,name,isPurchased'} )

const itemForm = document.getElementById('itemForm') // elementId: 
const itemsDiv = document.getElementById('itemsDiv') // elementId:

const populateItemsDiv = async () => {
    const allItems = await db.items.toArray()
 
    itemsDiv.innerHTML = allItems.map(item => `
        <div class="item ${item.isPurchased && 'purchased'}">
            <label>
                <input
                    type="checkbox"
                    class="checkbox"
                    onchange="toggleItemStatus(event, ${item.id})"
                    ${item.isPurchased && 'checked'}>
            </label>
            <div class="itemInfo">
                <p> ${item.name} </p>
            </div>
            <button class="deleteButton" onclick="removeItem(${item.id})">
            X
            </button>
        </div>
    `).join('')
}

window.onload = populateItemsDiv

itemForm.onsubmit = async (event) => { // : Event
    event.preventDefault() // evitar o recarregamento padrão

    const name = document.getElementById('nameInput').value // elementId:

    await db.items.add({ name: name })
    await populateItemsDiv()

    itemForm.reset() //limpa o form cada vez que adicionarmos um item ao db.
}

const toggleItemStatus = async (event, id) => {
    await db.items.update(id, { isPurchased: !!event.target.checked })
    await populateItemsDiv()
}

const removeItem = async (id) => {
    await db.items.delete(id)
    await populateItemsDiv()
}

// **************************  FIM DO CÓDIGO INICIAL  ********************

/*
const clearAll = async (event, id) => {
   await db.items.where("isPurchased").equals(true).modify(false)
    if (db.items.isPurchased == true) {
        db.items.isPurchased = false
    }
await db.items.update(id, { isPurchased: false }) 
await populateItemsDiv()
console.log(items)
}



const clearAll = async (id) => {

    await db.items.update(id, { isPurchased: false }) 
    await populateItemsDiv()
    console.log(items)
    }
*/
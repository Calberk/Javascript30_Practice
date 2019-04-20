const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates')  
const items = JSON.parse(localStorage.getItem('items')) || [];
const deleteBtn = document.querySelector('.deleteAll');
const selectAllBtn = document.querySelector('.selectAll');
const clearAllBtn = document.querySelector('.clearAll');

function addItem(e){
    e.preventDefault();

    const text = (this.querySelector('[name=item]')).value
    const item = {
        text,
        done: false
    };
    
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input class="checkbox" type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
                <label for="item${i}">${plate.text}</label>
            </li>
            `;
    
    }).join('');
}

function toggleDone(e) {
    if(!e.target.matches('input')) return; 
    console.log(e.target.dataset.index)
    const el = e.target;
    const index = el.dataset.index;

    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function deletePlates() {
    localStorage.clear();
    items.splice(0);
    populateList(items, itemsList);
}

// function selectAll() {
//     const allPlates = document.querySelectorAll('.checkbox');
//     allPlates.forEach(item => {
//         const index = item.dataset.index
//         items[index].done = true
//     });
//     localStorage.setItem('items', JSON.stringify(items));
//     populateList(items, itemsList);
// }

// function clearAll() {
//     const allPlates = document.querySelectorAll('.checkbox');
//     allPlates.forEach(item => {
//         const index = item.dataset.index
//         items[index].done = false
//     });
//     localStorage.setItem('items', JSON.stringify(items));
//     populateList(items, itemsList);
// }

function changeAllToValue( value ) {
    console.log('hello')
    const allPlates = document.querySelectorAll('.checkbox');
    allPlates.forEach(item => {
        const index = item.dataset.index
        items[index].done = value
    });
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}


addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
deleteBtn.addEventListener('click', deletePlates);
// selectAllBtn.addEventListener('click', selectAll);
// clearAllBtn.addEventListener('click', clearAll)
clearAllBtn.addEventListener('click', function(){
    changeAllToValue(false);
});
selectAllBtn.addEventListener('click', function(){
    changeAllToValue(true);
})
populateList(items, itemsList)

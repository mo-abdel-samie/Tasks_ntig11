const customer = document.querySelector('#customer')
const heads = [
    { inForm: "cusomerName", inView: "Cusomer Name" },
    { inForm: "cusomerBalance", inView: "Cusomer Balance" },
]

saveDataToStorage = (data) => {
    localStorage.setItem('myCustomer', JSON.stringify(data))
}

getDataFromStorage = () => {
    let myCustomer
    try {
        myCustomer = JSON.parse(localStorage.getItem('myCustomer'))
        if (!Array.isArray(myCustomer)) throw new Error()
    }
    catch (e) {
        myCustomer = []
    }
    return myCustomer
}

const myCustomer = getDataFromStorage()
if (customer) {
    customer.addEventListener('submit', function (e) {
        e.preventDefault()
        let currentDate = new Date()
        let customer = {
            id:currentDate.getSeconds()
        }
        if(isNaN(this.elements.cusomerBalance)){
            console.log("NAN");
            return
        }
        heads.forEach(h => customer[h.inForm] = this.elements[h.inForm].value)
        myCustomer.push(customer)
        saveDataToStorage(myCustomer)
        this.reset()
        window.location.replace('index.html')
    })

}
const createMyOwnElements = (element, parent, txt = "", classes = "", attributes = "") => {
    //create element, append parent , text content, classes, attributes
    let el = document.createElement(element)
    parent.appendChild(el)
    if (txt != '') el.textContent = txt
    if (classes != "") el.classList = classes
    return el
}
const drawTable = (myCustomer) => {
    table.textContent = ""
    let thead = createMyOwnElements('thead', table)
    createMyOwnElements('th', thead, '#')
    heads.forEach(h => createMyOwnElements("th", thead, h.inView))
    createMyOwnElements('th', thead, 'actions')
    let tbody = createMyOwnElements('tbody', table)
    if (myCustomer.length == 0) {
        let tr = createMyOwnElements('tr', tbody)
        let td = createMyOwnElements('td', tr, "no data")
        td.colSpan = "4"
    }
    else {
        myCustomer.forEach((customer, i) => {
            let tr = createMyOwnElements('tr', tbody)
            createMyOwnElements('td', tr, customer.id)
            heads.forEach((h) => createMyOwnElements('td', tr, customer[h.inForm]))
            let td = createMyOwnElements('td', tr)
            
            let addBtn = createMyOwnElements('button', td, "Add", "btn btn-primary mx-3")
            addBtn.addEventListener('click', ()=> addBalance(i))
            
            let pullBtn = createMyOwnElements('button', td, "Pull", "btn btn-warning")
            pullBtn.addEventListener('click', ()=> pullBalance(i))
            
            let delbtn = createMyOwnElements('button', td, "delete", "btn btn-outline-danger mx-3")
            delbtn.addEventListener('click', ()=> deteteItem(i))

        })
    }
}

const deteteItem = (index) => {
    myCustomer.splice(index, 1);
    saveDataToStorage(myCustomer);
    drawTable(myCustomer)
}

/**
 * ================================= Add Balance ========================================
 */

const addBal = document.querySelector('#addBalance')
const addBalance = (index)=> {
    addBal.style.display = "block"
    addBal.setAttribute('data-index', index)
}

if(addBal){
    addBal.addEventListener('submit', function (e) {
        e.preventDefault()
        index = e.target.getAttribute('data-index');
        console.log(index);
        let customer = myCustomer[index]
        
        console.log(customer);
    
        if((this.elements.addBalance.value*1.0) < 10000  ) {
            customer.cusomerBalance = (customer.cusomerBalance*1.0) + (this.elements.addBalance.value*1.0)
            saveDataToStorage(myCustomer)
            this.reset()
            window.location.replace('index.html')
        }else {
            let error = document.querySelector('#addError');
            error.textContent = "Must be lest than 10000"
            error.classList.remove('d-none');
        }
    })
}


/**
 * ================================= Pull Balance ========================================
 */
const pullBal = document.querySelector('#pullBalance')
const pullBalance = (index)=> {
    pullBal.style.display = "block"
    pullBal.setAttribute('data-index', index)
}

if(pullBal){
    pullBal.addEventListener('submit', function (e) {
        e.preventDefault()
        index = e.target.getAttribute('data-index');
        console.log(index);
        let customer = myCustomer[index]
        
        console.log(customer);
    
        if((this.elements.pullBalance.value*1.0) <= customer.cusomerBalance ) {
            customer.cusomerBalance = (customer.cusomerBalance*1.0) - (this.elements.pullBalance.value*1.0)
            saveDataToStorage(myCustomer)
            this.reset()
            window.location.replace('index.html')
        }else {
            let error = document.querySelector('#pullError');
            error.textContent = "Must be lest than your Balance"
            error.classList.remove('d-none');
        }
    })
}


const table = document.querySelector('#tableData')
if (table) {
    drawTable(myCustomer)
}





const commonURL = "https://jsonplaceholder.typicode.com/"
const APIList = [
    {
        text: "Posts",
        url : `${commonURL}posts`,
        dataModal : ["userId", "id", "title", "body"]
    },
    {
        text: "Get",
        url : `${commonURL}Get`,
        dataModal : ["userId", "id", "title", "body"]
    }
]

const getDataFromApi = async (url, cb) => {
    try{
        let data = await (await fetch(url)).json()
        cb(data, null)
    }catch(e){
        cb(null, e)
    }
}

const createElement = (element) => {
    let postsContainer = document.querySelector('#postsContainer');
    postsContainer.innerHTML += `
        <div class="card mb-3">
            <div class="card-header">
            ${element.title}
            </div>
            <div class="card-body">
            ${element.body}
            </div>
        </div>
    `
}


const navLinks = document.querySelector('#navLinks')

APIList.forEach(btn=>{

    navLinks.innerHTML += `
        <li class="nav-item">
            <a class="nav-link active" href="#">${btn.text}</a>
        </li>
    `
})


getDataFromApi('https://jsonplaceholder.typicode.com/posts',(res, err)=>{
    if(err) return console.log(err)
    res.forEach(post => {
       createElement(post) 
    });
})




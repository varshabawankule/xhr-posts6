const cl= console.log;

const postContainer =document.getElementById('postContainer')
const formId = document.getElementById('formId')
const titleControl=document.getElementById('title')
const bodyControl = document.getElementById('body')
const userIdControl= document.getElementById('userId')
const addbtn= document.getElementById('addbtn')
const updatebtn= document.getElementById('updatebtn')


function snackBar(msg, icon){
    Swal.fire({
        title: msg,
        icon : icon,
        timer: 3000
    })
}





const BASE_URL = `https://jsonplaceholder.typicode.com`
const POST_URL = `${BASE_URL}/posts`


function createCards(arr){
    let result= '';

    arr.forEach(post =>{

        result += `
         <div class="col-md-6 offset-md-3 mb-3" id=${post.id}>
            <div class="card">
                <div class="card-header">
                    <h3>${post.title}</h3>

                </div>
                <div class="card-body">
                    <p>${post.body}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button onClick="onEdit(this)" class="btn btn-sm btn-outline-primary">Edit</button>
                    <button onClick="onRemove(this)" class="btn btn-sm btn-outline-danger">Remove</button>

                </div>
                
            </div>
        </div>
        
        `
    })
    postContainer.innerHTML= result
}

function fetchPosts(){

    
spinner.classList.remove('d-none')
    let xhr= new XMLHttpRequest()
    xhr.open('GET', POST_URL, true)
    xhr.send()
    xhr.onload = function(){
        if(xhr.status >= 200 &&xhr.status <= 299){
            let postsArr= JSON.parse(xhr.response)
            createCards(postsArr)
spinner.classList.add('d-none')

        }else{
spinner.classList.add('d-none')


        }
    }
}
fetchPosts()

function onSubmit(eve){
    eve.preventDefault()

    let obj={
        title: titleControl.value ,
        body: bodyControl.value,
        userId : userIdControl.value
    }
cl(obj)
spinner.classList.remove('d-none')


let xhr= new XMLHttpRequest()
xhr.open('GET', POST_URL,true)
xhr.send()
xhr.onload= function(){
    if(xhr.status >= 200 && status <= 299){
        let res= JSON.parse(xhr.response)

        let col=document.createElement('div')
       col.className= `col-md-6 mb-3`
       col.innerHTML= `
        <div class="card">
                <div class="card-header">
                    <h3>${obj.title}</h3>

                </div>
                <div class="card-body">
                    <p>${obj.body}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button onClick="onEdit(this)" class="btn btn-sm btn-outline-primary">Edit</button>
                    <button onClick="onRemove(this)" class="btn btn-sm btn-outline-danger">Remove</button>

                </div>
                
            </div>
       
       `
       postContainer.prepend(col)
formId.reset()
snackBar(`The Post Added successfully`, ` success`)
spinner.classList.add('d-none')


    }else{

        snackBar(`someting went wrong`, `error`)

spinner.classList.add('d-none')

    }
}

}

function onRemove(ele){
    let REMOVE_ID= ele.closest('.col-md-6').id
    let REMOVE_URL= `${BASE_URL}/posts/${REMOVE_ID}`

    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {

spinner.classList.remove('d-none')

    let xhr= new XMLHttpRequest()
    xhr.open('DELETE', REMOVE_URL)
    xhr.send()
    xhr.onload= function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let res= JSON.parse(xhr.response)
            ele.closest('.col-md-6').remove()

          
spinner.classList.add('d-none')

        }else{

spinner.classList.add('d-none')

        }
    }


  }
});

}


function onEdit(ele){
    let EDIT_ID= ele.closest('.col-md-6').id
    localStorage.setItem('EDIT_ID', EDIT_ID)
    let EDIT_URL = `${BASE_URL}/posts/${EDIT_ID}`


spinner.classList.remove('d-none')

    let xhr= new XMLHttpRequest()
    xhr.open('GET', EDIT_URL)
    xhr.send()
    xhr.onload= function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let EDIT_OBJ= JSON.parse(xhr.response)

            titleControl.value= EDIT_OBJ.title,
            bodyControl.value= EDIT_OBJ.body,
            userIdControl.value= EDIT_OBJ.userId


            addbtn.classList.add('d-none')
            updatebtn.classList.remove('d-none')




        }
    }

}




function onUpdt(){
    let UPDATE_ID = localStorage.getItem('EDIT_ID')

    let UPDATE_URL = `${BASE_URL}/posts/${UPDATE_ID}`

    let UPDATED_OBJ={
         title: titleControl.value ,
        body: bodyControl.value,
        userId : userIdControl.value


    }
spinner.classList.remove('d-none')


    let xhr= new XMLHttpRequest()
    xhr.open('PATCH', UPDATE_URL)
    xhr.send(UPDATED_OBJ)
    xhr.onload= function(){
        if(xhr.status >= 200 && xhr.status <= 299){
            let res= JSON.parse(xhr.response)

            let col= document.getElementById('UPDATE_ID')
            let h3= col.querySelector('.card-header h3')
            let p =col.querySelector('.card-body p')

            h3.innerText=UPDATED_OBJ.title,
            p.innerText= UPDATED_OBJ.body

            formId.reset()
            
            updatebtn.classList.add('d-none')
            addbtn.classList.remove('d-none')


            snackBar(`The post with id ${UPDATE_ID} updated successfully`, `success`)

spinner.classList.add('d-none')


        }else{
            snackBar(`something went while updating post`, `error`)
spinner.classList.add('d-none')


        }
    }
}








formId.addEventListener('submit', onSubmit)
updatebtn.addEventListener('click', onUpdt)

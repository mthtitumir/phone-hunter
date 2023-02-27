const loadData = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data =await res.json();
    displayData(data.data, dataLimit);
}
const displayData = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent='';
    // display 10 phones only 
    

    // show all btn process 
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10){
        phones=phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } 
    else{
        showAll.classList.add('d-none');
    }

    // no phones found message
    const noPhone = document.getElementById('no-found-message');
    if (phones.length===0){
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    phones.forEach (phone =>{
        
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`
        <div class="card">
            <img class="p-3" src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
                <div class="btn btn-primary" onclick="loadPhoneDetails('${phone.slug}') " data-bs-toggle="modal" data-bs-target="#exampleModal">Details</div>

                

            </div>
        </div>
        `;
        console.log(phone);

        phonesContainer.appendChild(phoneDiv);
        // loader ends 
        
    });
    toggleSpinner(false);
}

// repeated tasks function 
const searchProcess = dataLimit =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadData(searchText, dataLimit);
}
// search btn event 

document.getElementById('search-btn').addEventListener('click', function(){
    // loader starts 
    searchProcess(10);
})

// search input field key handler
document.getElementById('search-field').addEventListener('keydown', function(key){
    if (key.key ==='Enter'){
        searchProcess(10);    
    }
   
    
})
// spinner function 

const toggleSpinner = isLoading =>{
    const spinnerDiv = document.getElementById('loader');
    if (isLoading){
        spinnerDiv.classList.remove('d-none');
    }
    else{
        spinnerDiv.classList.add('d-none');
    }
}

// showAll function 
document.getElementById('show-all').addEventListener('click', function(){
    searchProcess();
})

// phone details 
const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data =await res.json();
    displayPhoneDetails(data.data);
    // console.log(data);
}

const displayPhoneDetails = phone =>{
    const modalContainer= document.getElementById('modal-container');
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal-content');
    modalDiv.innerHTML =`
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${phone.name}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">Released Date : ${phone.releaseDate} </div>
    <div class="text-center">
        <img src="${phone.image}" alt="">
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            
    </div>
    `;
    modalContainer.appendChild(modalDiv);
    console.log(phone);
}
// loadData('iphone');
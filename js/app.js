
const allDataFetch = async(dataLImit) =>{
 
  const url =" https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
   
  displayCardData(data.data.tools,dataLImit)
}

const displayCardData=(details,dataLImit)=>{
 
   const cardContainer = document.getElementById('card-container');
   cardContainer.textContent="";
   const showAllBtn = document.getElementById('show-all');
   
  if (dataLImit && details.length >6){
    details = details.slice(0,6);
    
    showAllBtn.classList.remove('d-none')
  }
  else{
    showAllBtn.classList.add('d-none')
  }
 

   details.forEach(detail =>{
    
    const {id,name,image,published_in}=detail;
   

    const createDiv = document.createElement('div');
    createDiv.classList.add('col');
    createDiv.innerHTML=`
    <div class="card h-100 p-2">
    <img style="height:160px;" src="${image}" class="card-img-top" alt="...">
    <h4>Features</h4>
    <ol class="p-3">
       ${detail.features.map(feauture =>`<li>${feauture}</li>`
        ) .join('')}
    </ol>
    <hr/>
    <div class="d-flex justify-content-between align-items-center">
    <div>
    <h5>${name}</h5>
    <h5><i class="fa-solid fa-calendar-days"></i> ${published_in}</h5>
    </div>
    <button onclick="loadCardDetails('${id}')" class="btn arrow-btn bg-danger-subtle" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <i class="fa-solid fa-arrow-right arrow-icon"></i>
</button>
    </div>
  </div>`
  cardContainer.appendChild(createDiv);
   });
   loadingSpinner(false);
}



const loadingSpinner = isLoading =>{
  const loaderSpinner = document.getElementById('spin-loader');
  if(isLoading){
    loaderSpinner.classList.remove('d-none');
  }
  else{
    loaderSpinner.classList.add('d-none');
  }
}

const processSearch =(dataLImit)=>{
  loadingSpinner(true);
  allDataFetch(dataLImit);
}
window.onload = function() {
  processSearch(6);
  
};

document.getElementById('btn-show-all').addEventListener('click', function(){
     processSearch();
})



 const  loadCardDetails = async (id) =>{
  const url= `https://openapi.programming-hero.com/api/ai/tool/${id}`
  
  const res = await fetch(url);
  const data= await res.json();
  displayCardDetails(data.data);
 }

 const displayCardDetails = (modals) =>{
     
   const modalBody =document.getElementById('modal-body');
   modalBody.innerHTML=`
   <div class="row rounded-4 m-4">
   <div class="col  m-3  border p-4 bg-danger-subtle rounded-4 border-danger-subtle">
      <h4 id="description">${modals.description
      }</h4>
    <div class="row ">
       <div class="col m-1 text-center border bg-body-tertiary rounded-4 text-success"> <h4 class="py-5 px-1">${modals.pricing[0].price === "No cost"? "Free of cost":modals.pricing[0].price}  <span>Basic</span> </h4> </div>
       <div class="col m-1 text-center border bg-body-tertiary rounded-4 text-warning" ><h4 class="py-5 px-1">${modals.pricing[1].price === "No cost"? "Free of cost":modals.pricing[1].price}<span> Pro</span>  </h4> </div>
       <div class="col m-1 text-center border bg-body-tertiary rounded-4 text-danger"> <h4 class="py-5 px-1">${modals.pricing[2].price =="Contact us "? "Free of cost/ Enterprise"  :  "Contact us Enterprise" } </h4></div>
       
    </div>

    <div class="d-flex justify-content-evenly mt-3 flex-wrap">
       <div>
          <h4>Features</h4>
          <ul class="px-3">
            <li>${modals.features[1].feature_name}</li>
            <li>${modals.features[2].feature_name}</li>
            <li>${modals.features[3].feature_name}</li>
        </ul>
       </div>
       <div>
           <h4>Integrations</h4>
           <ul class="px-3">
           ${modals.integrations.length === 0 ? "No data Found" :  modals.integrations.map(lists =>`<li>${lists}</li>`
           ) .join('')}
          
        </ul>
       </div>
    </div>

   </div>
   <div class="col  m-3 border p-4 rounded-4">
      <div class="position-relative" >
      <p class="position-absolute top-0 end-0 bg-danger px-2 text-white m-2 rounded-3 fs-5 ${modals.accuracy.score ? "d-block": "d-none"} ">${modals.accuracy.score}% accuracy</p> 
      <img class="img-fluid rounded-4 w-100 h-auto " src="${modals.image_link[0]}" alt="" srcset="">
      </div>
      <h4 class="text-center mt-4 my-1">${modals.input_output_examples[0].input ?modals.input_output_examples[0].input : "Can you give any e xample ?"}</h4>
      <p class="text-center mt-2">${modals.input_output_examples[0].output ?
       modals.input_output_examples[0].output : "No! Not yet! Take a break!!"}</p>
   </div>
  </div>
   `
 }



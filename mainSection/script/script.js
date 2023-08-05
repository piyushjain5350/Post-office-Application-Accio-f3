const ip=document.getElementById('ip');
const latitude=document.getElementById('latitude');
const longitude=document.getElementById('longitude');
const city=document.getElementById('city');
const region=document.getElementById('region');
const organsation=document.getElementById('organisation');
const host=document.getElementById('host');
const mapDisplay=document.getElementById('mapDisplay');
const timeZone=document.getElementById('timeZone');
const dateAndTime=document.getElementById('dateAndTime');
const pincode=document.getElementById('pincode');
const pincodeNumber=document.getElementById('pincodeNumber');
const cardsContainer=document.getElementById('post-office-cards');
const searchInput=document.getElementById('searchInput');

let userDetails=JSON.parse(sessionStorage.getItem('userDetails'));

let loc=userDetails.location.split(',');
// console.log(loc);
let lat=loc[0];
let long=loc[1];

// console.log(userDetails);
function setData(){
    ip.innerText=userDetails.ip;
    city.innerText=userDetails.city;
    region.innerText=userDetails.region;
    organsation.innerText=userDetails.organisation;
    host.innerText=userDetails.hostname;
    latitude.innerText=lat;
    longitude.innerText=long;

    timeZone.innerText=userDetails.timezone;
    pincode.innerText=userDetails.pincode;

}

setData();

// map display

mapDisplay.innerHTML=`
<iframe src="https://maps.google.com/maps?q=${lat}, ${long}&output=embed"></iframe>
`;

//date and time

let date =new Date().toLocaleString("en-US", { timeZone: `${userDetails.timezone}` });
dateAndTime.innerText=date.toString();

// fetch nearby locations of post office with the help of pincode
// https://api.postalpincode.in/pincode/${pincode}

let postOfficeData=[];

async function fetchPostOfficeData(){
    // const data=
    let pincode=userDetails.pincode;
    // console.log(pincode);
    const request = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const jsonResponse = await request.json();

    // console.log(jsonResponse[0]);

    jsonResponse[0].PostOffice.map((e)=>{
        let obj={
            name:e.Name,
            branch:e.BranchType,
            status:e.DeliveryStatus,
            district:e.District,
            division:e.Division
        }
        postOfficeData.push(obj);
    });
    pincodeNumber.innerText=jsonResponse[0].Message;
    renderData(postOfficeData);
    // console.log(postOfficeData);
}



{/* <div class="card">
    <p>Name: <span class="cardName"></span></p>
    <p>Branch Type: <span class="cardBranch"></span></p>
    <p>Delivey-status: <span class="cardStatus"></span></p>
    <p>District: <span class="cardDistrict"></span></p>
</div> */}
function renderData(postOfficeData){
    postOfficeData.map((e)=>{
        const div=document.createElement('div');
        div.classList.add('card');
        div.innerHTML=`
            <p>Name: <span class="cardName">${e.name}</span></p>
            <p>Branch Type: <span class="cardBranch">${e.branch}</span></p>
            <p>Delivey-status: <span class="cardStatus">${e.status}</span></p>
            <p>District: <span class="cardDistrict">${e.district}</span></p>
            <p>Division: <span class="cardDivision">${e.division}</span></p>
        `;
        cardsContainer.appendChild(div);
    })
};

fetchPostOfficeData();


// search the data

searchInput.addEventListener('input',(e)=>{
    e.preventDefault();
    let searchValue=searchInput.value.toLowerCase();
    cardsContainer.innerHTML="";
    const filteredData=postOfficeData.filter((e)=>{
        return e.name.toLowerCase().includes(searchValue)|| e.branch.toLowerCase().includes(searchValue);
    });
    renderData(filteredData)
});
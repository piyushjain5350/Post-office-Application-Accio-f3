const ipVal=document.getElementById('ipVal');
const ipDetails=document.getElementById('ipDetails');

fetchIp();

async function fetchIp(){
    const request = await fetch("https://ipinfo.io/json?token=4fd6f3942d54ff");
    const jsonResponse = await request.json();

    ipVal.innerText = jsonResponse.ip;
    let userDetails={
        ip:jsonResponse.ip,
        city:jsonResponse.city,
        region:jsonResponse.region,
        organisation:jsonResponse.org,
        hostname:jsonResponse.hostname,
        timezone:jsonResponse.timezone,
        pincode:jsonResponse.postal,
        location:jsonResponse.loc
    }
    // console.log(userDetails);
    let a=sessionStorage.setItem('userDetails',JSON.stringify(userDetails));
}


//button
ipDetails.addEventListener('click',()=>{
    window.location.href='./mainSection';
});

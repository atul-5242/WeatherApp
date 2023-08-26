const Sub_H_btn1=document.querySelector('[btn-for-subHeading1]');
const Sub_H_btn2=document.querySelector('[btn-for-subHeading2]');
const grantLocation=document.querySelector('[grant-location]');
const InputForm=document.querySelector('[input-form]')
const ValueInput=document.querySelector('[value-input]')
const CityData=document.querySelector('[city]');
const grantBtn=document.querySelector('[btn-grant]');
const MainWeather1=document.querySelector('[main-weather-main]');
const MainWeather=document.querySelector('[main-weather]');
const loader=document.querySelector('[loading]');
const FormInput=document.querySelector('#formInput');
const BtnInput=document.querySelector("btn-submit");
const Error=document.querySelector('[error]')


// Initial Status.
Sub_H_btn1.classList.add('active-bg-col-tab');
grantLocation.classList.add('active');
var Current_tab=Sub_H_btn1;
const API_KEY="a4eb55731167789d556a4dbfeb38ba72";
var permission_given=0;
const input_Submit=0;




function renderData_next(info){



  const City2=document.querySelector('[city2]');
  const Country_flag2=document.querySelector('[count-flag2]');
  const Weather_Condition2=document.querySelector('[weather-Condition2]');
  const Weather_condition_logo2=document.querySelector('[weather-condition-logo2]');
  const Temperature2=document.querySelector('[temperature2]');
  const Para12= document.querySelector('[para12]');
  const Para22= document.querySelector('[para22]');
  const Para32= document.querySelector('[para32]');




  const CouName2=info?.name;
  const descrip2=info?.weather[0]?.description;
  const temp2=(info?.main?.temp - 273.15).toFixed(2);
  const Wspeed2=info?.wind?.speed+'m/s';
  const Whumidity2=info?.main?.humidity+'%';
  const Wcloud2=info?.clouds?.all+'%';
  const coun_flag2=(info?.sys?.country)?.toLowerCase();
  const weather_logo2=info?.weather[0]?.icon;
  // console.log(Wcloud)
2
  City2.innerText=CouName2;
  Country_flag2.src=`https://flagcdn.com/16x12/${coun_flag2}.png`
  Weather_Condition2.innerText=descrip2;
  Weather_condition_logo2.src=`https://openweathermap.org/img/wn/${weather_logo2}@2x.png`
  Temperature2.innerText=temp2;
  Para12.innerText=Wspeed2;
  Para22.innerText=Whumidity2;
  Para32.innerText=Wcloud2;
    // console.log("name->",CouName);
    // console.log("descrip->",descrip);
    // console.log("temp->",temp);
    // console.log("Wspeed->",Wspeed);
    // console.log("Whumidity->",Whumidity);
    // console.log("Wcloud->",Wcloud);

}
function renderData_current(info){



  const City=document.querySelector('[city]');
  const Country_flag=document.querySelector('[count-flag]');
  const Weather_Condition=document.querySelector('[weather-Condition]');
  const Weather_condition_logo=document.querySelector('[weather-condition-logo]');
  const Temperature=document.querySelector('[temperature]');
  const Para1= document.querySelector('[para1]');
  const Para2= document.querySelector('[para2]');
  const Para3= document.querySelector('[para3]');




  const CouName=info?.name;
  const descrip=info?.weather[0]?.description;
  const temp=(info?.main?.temp - 273.15).toFixed(2);
  const Wspeed=info?.wind?.speed+'m/s';
  const Whumidity=info?.main?.humidity+'%';
  const Wcloud=info?.clouds?.all+'%';
  const coun_flag=(info?.sys?.country)?.toLowerCase();
  const weather_logo=info?.weather[0]?.icon;
  // console.log(Wcloud)

  City.innerText=CouName;
  Country_flag.src=`https://flagcdn.com/16x12/${coun_flag}.png`
  Weather_Condition.innerText=descrip;
  Weather_condition_logo.src=`https://openweathermap.org/img/wn/${weather_logo}@2x.png`
  Temperature.innerText=temp;
  Para1.innerText=Wspeed;
  Para2.innerText=Whumidity;
  Para3.innerText=Wcloud;
    // console.log("name->",CouName);
    // console.log("descrip->",descrip);
    // console.log("temp->",temp);
    // console.log("Wspeed->",Wspeed);
    // console.log("Whumidity->",Whumidity);
    // console.log("Wcloud->",Wcloud);

}


function getLocation() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  };
}

function act_deactivate_grant(){
    permission_given++;//ye taki next time ke liye kese remove ya add rkhe
    grantLocation.classList.remove('active');//1
    MainWeather1.classList.add('active');//2
    //upar dono ko yhn ess liye rakhe hai taki add and remove tabhi ho jab locatio ki permission user de de.
}


function showPosition(position) {
    act_deactivate_grant();
    let lat =position.coords.latitude ;
    let lon =position.coords.longitude;
    fetchDataByGeo_main(lon,lat);
}

async function fetchDataByGeo_main(lon,lat){
    loader.classList.add('active');
    let reponse= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    let data=await reponse.json();
    loader.classList.remove('active');
    // console.log(Current_tab)
      renderData_current(data);    
}

async function fetchDataByGeo_next(cityname){
  loader.classList.add('active');
  let reponse= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}`);
  let data=await reponse.json();
  console.log(data);
  loader.classList.remove('active');
  // console.log(Current_tab)
  if(String(data?.cod)!=='404'){
    renderData_next(data);    
    MainWeather.classList.add('active');
    Error.classList.remove('active');
  }
  else{
    Error.classList.add('active');
    MainWeather.classList.remove('active');
  }
    
}




Sub_H_btn1.addEventListener('click',()=>{

    if(Current_tab!=Sub_H_btn1){
        Sub_H_btn1.classList.add('active-bg-col-tab');
        Sub_H_btn2.classList.remove('active-bg-col-tab');

        InputForm.classList.remove('active');
        if(permission_given==1){
          grantLocation.classList.remove('active');
          // console.log("Clicked")
          MainWeather1.classList.add('active');
        }
        else{
        grantLocation.classList.add('active');
        }
        MainWeather.classList.remove('active');
        Current_tab=Sub_H_btn1;
        Error.classList.remove('active')
    }
})

Sub_H_btn2.addEventListener('click',()=>{
    
    if(Current_tab!=Sub_H_btn2){
        Sub_H_btn1.classList.remove('active-bg-col-tab');
        Sub_H_btn2.classList.add('active-bg-col-tab');
        grantLocation.classList.remove('active');
        InputForm.classList.add('active');
        MainWeather1.classList.remove('active');

        Current_tab=Sub_H_btn2;
    }
})


// grantBtn:
grantBtn.addEventListener('click',()=>{
  getLocation();
})


// input by text:-
FormInput.addEventListener('submit',function(event){
  event.preventDefault();

  const val=(String(document.querySelector('#value-input').value));
  if(val==""){
    Error.classList.add('active')
    MainWeather.classList.remove('active')
    
  }
  else{
    fetchDataByGeo_next((document.querySelector('#value-input').value).toLowerCase())
    MainWeather.classList.add('active');
    Error.classList.remove('active')
  }

})




window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locatonTimeZone  = document.querySelector('.location-timezone');
 let temperatureSection = document.querySelector('.temperature');
 let temperatureSpan = document.querySelector('.temperature span');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
           long =position.coords.longitude;
           lat = position.coords.latitude;
           const proxy ="https://cors-anywhere.herokuapp.com/";
           const api=` ${proxy}https://api.darksky.net/forecast/6e5622288cc6bf8f04c2b40a7939d4fc/${lat},${long}`;
          fetch(api)
           .then(response=>{
               return response.json()
           })
           .then(data =>{
            
               const {temperature,summary,icon} = data.currently;
               //setting dom element 
               temperatureDegree.textContent = temperature;
               temperatureDescription.textContent = summary;
               locatonTimeZone.textContent= data.timezone;
               setIcons(icon,document.querySelector('.icon'));

               //degree conversion
               let celsius = (temperature - 32)*(5/9); 
               //degree celsius
                temperatureSection.addEventListener('click',() =>{
                    if(temperatureSpan.textContent === 'F')
                    {
                        temperatureSpan.textContent ='C';
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent ='F';
                        temperatureDegree.textContent=temperature;
                    }
                })

           });
        
        });
      
        }
        function setIcons(icon, iconID){
            const skycons = new Skycons({"color":"white"});
            const currentIcon = icon.replace(/-/g,"_").toUpperCase();
            skycons.play();
            return skycons.set(iconID,Skycons[currentIcon]);
        }
    
      
});
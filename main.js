
if("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(function(position) {
        const lan = position.coords.latitude;
        const lon = position.coords.longitude;
        const weatherRequest = new XMLHttpRequest();
        weatherRequest.open('GET', 'https://api.apixu.com/v1/current.json?key=bc9483dbdb8241d9908194859172209&q='+lan+','+ lon);
        
        weatherRequest.onload = function() {
            const ourData = JSON.parse(weatherRequest.responseText);
           console.log(ourData);
        
           const weatherText = ourData.current.condition.icon;
           const weatherIcon = weatherText.replace('//cdn.apixu.com/weather/','');
           
           document.getElementById('temp').innerHTML =  ourData.current.temp_c+' C°' ;
           document.getElementById('city').innerHTML = ourData.location.country +', '+ ourData.location.name;
           document.getElementById('weatherText').innerHTML = ourData.current.condition.text;

           document.getElementById('check').addEventListener('change',changeMetric);
           function changeMetric(id){
             if (document.getElementById('check').checked) {
               document.getElementById('temp').innerHTML = ourData.current.temp_c+ ' C°';
             } else {
              document.getElementById('temp').innerHTML = ourData.current.temp_f + ' F°';
             }
           }
           const img = new Image();
           const main = document.getElementById('main');
           img.onload = function() {
             main.appendChild(img);
           };
            img.src =  weatherIcon;
        };
        weatherRequest.send();
	});
}



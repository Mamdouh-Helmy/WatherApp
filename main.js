"use strict";


async function getWeather(forecastUrl, dayIndex = 0) {
    try {
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        const forecastDataAllDays = forecastData.forecast.forecastday;

        document.querySelector('.spans .name').innerText = `${forecastData.location.name}, ${forecastData.location.country}`;
        document.querySelector('.temp').innerText = `${forecastData.current.temp_c}°C`;
        const localtime = forecastData.forecast.forecastday[dayIndex].date;
        
        let date, day , month , year , dayName;
        let months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        date = new Date(localtime);
        day = date.getDate();
        month = months[date.getMonth()]; 
        year = date.getFullYear();
        dayName = days[date.getDay()];
        document.querySelector('.spans .his').innerText = `${month} ${day}, ${year}`;
        document.querySelector('.the-day').innerText = dayName;
        document.querySelector('.situation').innerText = forecastData.current.condition.text;
        
        let all_day = document.querySelector('.all-day');
        all_day.innerHTML = '';

        const hoursForSelectedDay = forecastDataAllDays[dayIndex].hour;
        
        hoursForSelectedDay.forEach((element, index) => {
            if (index <= 7) { 
                let i = document.createElement('li');
                let span1 = document.createElement('span');
                let span2 = document.createElement('span');
                let img = document.createElement('img');
                let span3 = document.createElement('span');
                let ele = element.time.slice(-5); 
                span1.textContent = ele;
                img.src = element.condition.icon;
                span3.textContent = `${element.temp_c}°C`;
                
                i.appendChild(span1);
                span2.appendChild(img);
                i.appendChild(span2);
                i.appendChild(span3);
                all_day.appendChild(i);
                if (index === 1) {
                    i.classList.add('active');
                }
            } else {
                return false;
            }
        });
    } catch (error) {
        console.error("Error fetching the weather data:", error);
    }
}


getWeather("https://api.weatherapi.com/v1/forecast.json?key=eda8d98890214bab926190059241708&q=30.788173466742045,31.003218931049286&days=3", 0);

let today = document.querySelector('.today');
let pre = document.querySelector('.pre');
let next = document.querySelector('.next');

today.addEventListener('click', function (e) {
    getWeather("https://api.weatherapi.com/v1/forecast.json?key=eda8d98890214bab926190059241708&q=30.788173466742045,31.003218931049286&days=3", 0);
});

pre.addEventListener('click', function (e) {
    getWeather("https://api.weatherapi.com/v1/forecast.json?key=eda8d98890214bab926190059241708&q=30.788173466742045,31.003218931049286&days=3", 2);

});


next.addEventListener('click', function (e) {
    getWeather("https://api.weatherapi.com/v1/forecast.json?key=eda8d98890214bab926190059241708&q=30.788173466742045,31.003218931049286&days=3", 1);
});

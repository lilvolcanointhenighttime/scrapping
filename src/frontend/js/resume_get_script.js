document.getElementById('searchForm').onsubmit = function(event) {
  event.preventDefault();
  
  var text = document.getElementById('text').value;
  var area = document.getElementById('area').value;


  if(text && area) {
    var url = `http://yourhost.example/api/scraper/hh/resumes?text=${text}&area=${area}`;
  } if(text) {
    var url = `http://yourhost.example/api/scraper/hh/resumes?text=${text}`;
  } if(area) {
    var url = `http://yourhost.example/api/scraper/hh/resumes?area=${area}`;
  }else {
    var url = 'http://yourhost.example/api/scraper/hh/resumes'
  }

  fetch(url)
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          alert('Пользователь не авторизован!');
          window.location.href = 'http://yourhost.exampleges/login.html'
        } else {
          alert('Произошла ошибка при выполнении запроса. Код ошибки: ' + response.status);
        }
    }
    return response.json();
    })
    .then(data => {
        displayResults(data);
    })
    .catch(error => console.error('Ошибка:', error));
};

function displayResults(data) {
  var results = document.getElementById('results');
  results.innerHTML = '';

  data.forEach(function(item) {
    var card = document.createElement('div');
    card.className = 'vacancy-card';


    var text = document.createElement('h2');
    text.textContent = item.text;
    card.appendChild(text);

    var area = document.createElement('p');
    area.textContent = 'Область: ' + (item.area);
    card.appendChild(area);

    var age = document.createElement('p');
    age.textContent = 'Возраст: ' + (item.age);
    card.appendChild(age);

    var salary = document.createElement('p');
    salary.textContent = 'Зарплата: ' + (item.salary);
    card.appendChild(salary);

    var experience = document.createElement('p');
    experience.textContent = 'Опыт: ' + (item.experience);
    card.appendChild(experience);

    var applyLink = document.createElement('a');
    applyLink.href = item.link;
    applyLink.textContent = 'Просмотреть резюме';
    applyLink.target = '_blank';
    card.appendChild(applyLink);

    results.appendChild(card);
  });
}

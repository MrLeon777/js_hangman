let entryField = document.querySelector('.entry_field'),
    acceptButton = document.querySelector('.accept'),
    list = document.querySelector('#result'),
    keyboard = document.querySelectorAll('.letter')

let hangmanDictionary = ['чехословакия','дружина','пышность','эпиграф',
'сущность','фильм','медведь','кот','любовь','параметр','слово'];

let inputChar = '';
let result = [];
let currentWord = hangmanDictionary[random(hangmanDictionary.length)].split('');

let lifes = 6;


displayFields()
createArrRes()

document.querySelector('.lifes_left').innerHTML = `Жизней осталось: ${lifes}`    

keyboard.forEach(key => {
  key.addEventListener('click', () => {
    inputChar = key.innerHTML;
    if (showChar(inputChar) === false) {
      key.style.color = 'red'
      key.style.borderColor = 'red'
      lifes -= 1;
      switch(lifes) {
        case 5:
          document.querySelector('#hangman_head').style.display = 'block';
          break
        case 4:
          document.querySelector('#hangman_torse').style.display = 'block';
          break
        case 3:
          document.querySelector('#hangman_rhand').style.display = 'block';
          break
        case 2:
          document.querySelector('#hangman_lhand').style.display = 'block';
          break
        case 1:
          document.querySelector('#hangman_lleg').style.display = 'block';
          break
        case 0:
          document.querySelector('#hangman_rleg').style.display = 'block';
          setTimeout("alert('Game Over')", 500);
          setTimeout("document.location.reload()", 600);
          break
      }
      
    } else {
      key.style.color = 'lime'
      key.style.borderColor = "lime"
    }
    if (currentWord.join('') === result.join('')) {
      setTimeout("alert('Победа!')", 500);
      setTimeout("document.location.reload()", 600);
    }
    showChar(inputChar);
    document.querySelector('.lifes_left').innerHTML = `Жизней осталось: ${lifes}`

  })
})



function random(max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// создает пустой массив
function createArrRes() {
  for (let i = 0; i < currentWord.length; i++) {
    result.push('')
  }
  return result
}


// показывает символ в массиве, выводит символ в хтмл
function showChar(inputChar) {
  if (currentWord.includes(inputChar)) {
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === inputChar) {
        result[i] = currentWord[i];
        document.querySelector(`#item_${i}`).innerHTML = currentWord[i];
      }
    }
    
    return true
  } else {
    return false 
  }
}

// создает поля в html
function displayFields() {
  let displayField = '';
  currentWord.forEach((item, i) => { 
    displayField += `<li id='item_${i}'></li>`
  })
  list.innerHTML = displayField
}




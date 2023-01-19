// const words = 'Authors often misinterpret the lettuce as a folklore rabbi when in actuality it feels more like an uncursed bacon Pursued distances show us how motherinlaws can be charleses Authors often misinterpret the lion as a cormous science when in actuality it feels more like a leprous lasagna Recent controversy aside their band was in this moment a racemed suit The clutch of a joke becomes a togaed chair The first pickled chess is In modern times the first scrawny kitten is in its own way an input An ostrich is the beginner of a roast An appressed exhaust is a gun of the mind A recorder is a grade from the right perspective A hygienic is the cowbell of a skin Few can name a dun brazil that isnt a highbrow playroom The unwished beast comes from a thorny oxygen An insured advantages respect comes with it the thought that the lucid specialist is a fix In ancient times the legs could be said to resemble stroppy vegetables We can assume that any instance of a centimeter can be construed as an enate paste One cannot separate pairs from astute managers Those americas are nothing more than fish If this was somewhat unclear authors often misinterpret the gosling as an unfelt banjo when in actuality it feels more like a professed galley A bow of the squirrel is assumed What we dont know for sure is whether or not a pig of the coast is assumed to be a hardback pilot The literature would have us believe that a dusky clave is not but an objective Few can name a limbate leo that isnt a sunlit silver The bow is a mitten However the drawer is a bay If this was somewhat unclear few can name a paunchy blue that isnt a conoid bow The undrunk railway reveals itself as a downstage bamboo to those who look Their politician was in this moment a notour paperback The first armless grouse is in its own way a gear The coat is a wash However a cake is the llama of a caravan Snakelike armies show us how playgrounds can be viscoses Framed in a different way they were lost without the fatal dogsled that composed their waitress Far from the truth the cockney freezer reveals itself as a wiggly tornado to those who look The first hawklike sack An aunt is a bassoon from the right perspective As far as we can estimate some posit the melic myanmar to be less than kutcha On is it disputed that an unlaid fur is a marble of the mind Far from the truth few can name a glossy lier that isnt an ingrate bone The chicken is a giraffe They'.split(' ');

const words = 'photograph junior total agent clay negotiation tap understand difficult embrace commerce entertainment repeat ignore beer solve infect horror poem satellite indoor suite agenda front painter attractive narrow excavation migration pipe law governor depressed pitch pier glow ear whip thanks repetition slam welcome chief prejudice reproduction colony wrong satisfaction my fog guard dash meadow dedicate frequency courtesy stumble polish cabinet rhetoric real tin dramatic patient baby soar trouser franchise value descent wrong clean undertake drop regulation pace shout guitar harsh hostage limit excitement front pass addition page even report fat exemption crash opinion green pile driver conspiracy safety eye conservative dimension her life in the confines of the house became her new normal standing on one s head at job interviews forms a lasting impression when he asked her favorite number she answered without hesitation that it was diamonds they decided to plant an orchard of cotton candy choosing to do nothing is still a choice after all they throw cabbage that turns your brain into emotional baggage iron pyrite is the most foolish of all minerals she finally understood that grief was her love with no place for it to go boulders lined the side of the road foretelling what could come next he strives to keep the best lawn in the neighborhood the best part of marriage is animal crackers with peanut butter potato wedges probably are not best for relationships he realized there had been several deaths on this road but his concern rose when he saw the exact number two more days and all his problems would be solved the doll spun around in circles in hopes of coming alive he barked orders at his daughters but they just stared back with amusement the water flowing down the river didnt look that powerful from the car purple is the best city in the forest whenever he saw a red flag warning at the beach he grabbed his surfboard its always a good idea to seek shelter from the evil gaze of the sun love is not like pizza the bug was having an excellent day until he hit the windshield nancy decided to make the portapotty her home im a great listener really good with empathy vs sympathy and all that but i hate people acres of almond trees lined the interstate highway which complimented the crazy driving nuts she folded her handkerchief neatly the swirled lollipop had issues with the pop rock candy i liked their first two albums but changed my'.split(' ');
const wordsCount = words.length;
const gameTime = 30 * 1000;
window.timer = null;
window.gameStart = null;


function addClass(el,name){
el.className += ' '+name;
}

function removeClass(el,name){
    el.className = el.className.replace(name,'');
}

function randomWord(){
    const randomIndex = Math.ceil(Math.random() * wordsCount);


    return words[randomIndex-1];
}

function formatWord(word){
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

function newGame(){
    document.getElementById('words').innerHTML = '';

    for(let i=0;i<200;i++){
        document.getElementById('words').innerHTML += formatWord(randomWord());
    }

    addClass(document.querySelector('.word'),'current');
    addClass(document.querySelector('.letter'),'current');
    document.getElementById('info').innerHTML = (gameTime / 1000) + '';
    window.timer = null;
}

function getWpm(){
    const words = [...document.querySelector('.word')];
    const lastTypedWord = document.querySelector('.word.current');
    const lastTypedWordIndex = words.indexOf(lastTypedWord);
    const typedWords = words.slice(0, lastTypedWordIndex);
    const correctWords = typedWords.filter(word => {
        const letters = [...word.children];
        const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'));
        const correctLetters = letters.filter(letter => letter.className.includes('correct'));
        return incorrectLetters.length === 0 && correctLetters.length === letters.length;

    });
    return correctWords.length / gameTime * 60000;
}

function gameOver(){
    clearInterval(window.timer);
    addClass(document.getElementById('game'),'over');
    const result = getWpm();
    document.getElementById('info').innerHTML = `WPM: ${result}`;
    // console
}

document.getElementById('game').addEventListener('keyup',ev => {
    const key = ev.key;
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    const expected = currentLetter?.innerHTML || ' ';
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
    const isBackspace = key === 'Backspace';
    const isFirstLetter = currentLetter === currentWord.firstChild;

    if(document.querySelector('#game.over')){
        return;
    }

    console.log(key,expected);

    if(!window.timer && isLetter){
        window.timer = setInterval(() => {
            if(!window.gameStart){
                window.gameStart = (new Date()).getTime();
            }
            const currentTime = (new Date()).getTime();
            const msPassed = currentTime - window.gameStart;
            const sPassed = Math.round(msPassed / 1000);
            const sLeft = (gameTime / 1000) - sPassed;
            if(sLeft <= 0){
                gameOver();
                return;
            }
            document.getElementById('info').innerHTML = sLeft + '';
        },1000);
    }

    if(isLetter){
        if(currentLetter){
            addClass(currentLetter,key === expected ? 'correct' : 'incorrect');
            removeClass(currentLetter,'current');
            if(currentLetter.nextSibling){
                addClass(currentLetter.nextSibling,'current');
            }
        }else{
            const incorrectLetter = document.createElement('span');
            incorrectLetter.innerHTML = key;
            incorrectLetter.className = 'letter incorrect extra';
            currentWord.appendChild(incorrectLetter);
        }
    }

    if(isSpace){
        if(expected !== ' '){
            const lettersToInValidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
            lettersToInValidate.forEach(letter => {
                addClass(letter,'incorrect');
            });
        }

        removeClass(currentWord,'current');
        addClass(currentWord.nextSibling,'current');
        if(currentLetter){
            removeClass(currentLetter,'current');
        }
        addClass(currentWord.nextElementSibling.firstChild,'current');
    }

    

    //backspace
    if(isBackspace){
        if(currentLetter && isFirstLetter){
            //make prev word current , last letter current
            removeClass(currentWord,'current');
            addClass(currentWord.previousSibling,'current');
            removeClass(currentLetter,'current');
            addClass(currentWord.previousSibling.lastChild,'current');
            removeClass(currentWord.previousSibling.lastChild,'incorrect');
            removeClass(currentWord.previousSibling.lastChild,'correct');
        }
        if(currentLetter && !isFirstLetter){
            //move back one letter,invalidate letter
            removeClass(currentLetter,'current');
            addClass(currentLetter.previousSibling,'current');
            removeClass(currentLetter.previousSibling,'incorrect');
            removeClass(currentLetter.previousSibling,'correct');
        }

        if(!currentLetter){
            addClass(currentWord.lastChild,'current');
            removeClass(currentWord.lastChild,'incorrect');
            removeClass(currentWord.lastChild,'correct');
        }
    }

    // move lines / words
    if(currentWord.getBoundingClientRect().top > 270){
        const words = document.getElementById('words');
        const margin = parseInt(words.style.marginTop || '0px');
        words.style.marginTop = (margin - 35) + 'px';
    }


    // move cursor
    const nextLetter = document.querySelector('.letter.current');
    const cursor = document.getElementById('cursor');
    const nextWord = document.querySelector('.word.current');
    cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + 2 + 'px';
    cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';

})

newGame();
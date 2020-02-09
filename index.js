'use strict';

const SCORE = {
    q1:0,
    q2:0,
    q3:0,
    q4:0,
    q5:0,
    count:0,
    sum() {
        let scSum=0
        let i=0;
        while (i<=4){
            scSum += Object.values(this)[i];
            i++
        }
        return scSum;
    },
    reset() {
        let i=1;
        while(i<=5){
            this[`q${i}`]=0;
            i++;
        }
        this.count=0;
        
    }
}


const QUESTIONS = {
    q0:{
        q: 'How well do you know the history of the young United States?',
        ansArr: 'Lets find out together, shall we?',
        buttonText: 'Begin'
    },
    q1:{
        q: 'Who among the listed presidents was the only one to be unanimously elected?',
        ansArr: ['George Washington','John Adams','Thomas Jefferson', 'James Madison'],
        ansVal:'George Washington',
        ansText:'George Washington, along with being the only Independent elected to the office of the Presidency, was the only person unanimously elected to the post.',
        buttonText: 'Submit',
        ansImg:'images/george.jpg',
        alt:'George Washington Portrait'
    },
    q2:{
        q: 'Three individuals wrote The Federalist Papers: Alexander Hamilton, James Madison, and whom?',
        ansArr: ['Benjamin Franklin','William Short','John Jay', 'George Clinton'],
        ansVal:'John Jay',
        ansText:'John Jay, before becoming a pivotal figure in the development of the American legal system, wrote five of the Federalist essays.',
        buttonText: 'Submit',
        ansImg:'images/jay.jpg',
        alt:'John Jay Portrait'
    },
    q3:{
        q: 'The first Constitution of the U.S., the Articles of Confederation, were signed by the 13 colonies between 1777 and 1781. Which state was the last to sign?',
        ansArr: ['Virginia','Massachusetts','Delaware', 'Maryland'],
        ansVal:'Maryland',
        ansText:`Maryland was the last state to ratify the Articles of Confederation in January 1781, nearly three years after Congress' stated deadline.`,
        buttonText: 'Submit',
        ansImg:'images/md.png',
        alt:'Maryland Flag'
    },
    q4:{
        q: 'Where was the treaty that ended the American Revolutionary War signed?',
        ansArr: ['London','Philadelphia','Paris', 'Prague'],
        ansVal:'Paris',
        ansText:`The United States and the United Kingdom signed their peace treaty in 1783 in Paris.`,
        buttonText: 'Submit',
        ansImg:'images/paris.jpg',
        alt:'Paris Peace Treaty'
    },
    q5:{
        q: 'While historians in North America view it as an independent conflict, historians in the U.K. view the War of 1812 as a theater of what larger conflict?',
        ansArr: ['Wallachian Uprising','Napoleonic Wars','French Invasion of Spain', 'Mahtra War'],
        ansVal:'Napoleonic Wars',
        ansText:`Most of Europe would consider the War of 1812 to be the American theater of the greater Napoleonic Wars`,
        buttonText: 'Submit',
        ansImg:'images/w1812.jpg',
        alt:'War of 1812 sample image'
    },
    q6:{
        q: ``,
        ansArr: ['Congratulations', 'Good job', 'Oof'],
        buttonText: 'Reset'
    }
}

// Fills in the value after the Score: text
function renderScore() {
    console.log(SCORE)
    if (SCORE.count != 0 && SCORE.count != 6 ){
        $('.js-q-score-fill').html(`Score: ${SCORE.sum()}/5<br>`);
        $('.js-q-score-fill').append(`Question ${SCORE.count}/5  `);    
    }
}

// Checks the value of count to see which question should be rendered, then renders the question.
function renderQandA(){
    if(!$('.js-image').hasClass('hidden-m')){
        $('.js-image').toggleClass('hidden-m')
    }
    if($('.js-q-score-fill').hasClass('hidden-m')){
        $('.js-q-score-fill').toggleClass('hidden-m')
    }
    $('.js-q-score-fill').toggleClass('hidden-s')
    $('.js-question').html(`
        <h2>
            ${QUESTIONS[`q${SCORE.count}`].q}
        </h2>
    `);

    let answerArray = generateAnswerArray()
    $('.js-options').html('')
    $('.js-options').append(answerArray)
    $('.js-image').html('')
}

// Fills in the text under the main question line, either the radio buttons or the end stage message
function generateAnswerArray(){
    if(SCORE.count === 0){
        return `<h3>${QUESTIONS[`q${SCORE.count}`].ansArr}</h3>`
    } else if(SCORE.count === 6){
        switch (SCORE.sum()) {
            case 0:
            case 1:
                return `<h3> Oof, ${SCORE.sum()} out of 5? Lets try that again...</h3>`;
            case 2:
            case 3:
                return `<h3> Good job, ${SCORE.sum()} out of 5. Let's see if we can get that higher...</h3>`;
            case 4:
            case 5:
                return `<h3> Congratulations, ${SCORE.sum()} out of 5! But can you do it again?</h3>`;
            default:
                return `<h3>Well, you aren't supposed to see this. How'd you manage that?</h3>`
          }
    } else {
        return QUESTIONS[`q${SCORE.count}`].ansArr.reduce((acc, cur) =>{
            return acc.concat(
                `<input type="radio" name="options" class="radio" value="${cur}">${cur}</br>`
            )
        },'')
    }
}

// Loads the response to the submitted answer
function renderAnswerResponse(answer){
    if (QUESTIONS[`q${SCORE.count}`].ansVal === answer){
        SCORE[`q${SCORE.count}`]++  
    };
    renderScore();
    $('.js-q-score-fill').toggleClass('hidden-s hidden-m')
    let response = SCORE[`q${SCORE.count}`] != 0 ? 
        'Correct. ' : 
        `Incorrect, the answer was ${QUESTIONS[`q${SCORE.count}`].ansVal}. `;
    
    // reset options and load answer
    $('.js-options').html('')
    $('.js-options').append(`<p class="response">${response} ${QUESTIONS[`q${SCORE.count}`].ansText}</p>`)    
    
    // hides the question for extra space
    // $('.js-question').toggleClass('hidden-s')

    // shows the image
    $('.js-image').toggleClass('hidden-m')
    $('.js-image').html('')
    $('.js-image').append(`<img src="${QUESTIONS[`q${SCORE.count}`].ansImg}" alt="${QUESTIONS[`q${SCORE.count}`].alt}" height="100%">`)
}

// replaces the value of the input type button to change the button role
function renderButton(){
    if($('input:button').val()==="Submit"){
          
    } else {
        $('input:button').val(QUESTIONS[`q${SCORE.count}`].buttonText)
    }
    handleButtonClick();    
}

// Diverges the different responses to pressing the button
function handleButtonClick(){
    $('input:button').click(function(){        
        let buttonVal=$('input:button').val()
        if(buttonVal=='Next'){
            handleNext();
        } else if(buttonVal=='Submit'){
            handleSubmit();
        } else if(buttonVal=='Reset'){
            handleReset();
        } else if(buttonVal=='Begin'){
            handleBegin();
        } else {
            alert('dun goofed')
        }
    })
    
}

// submit button response
function handleSubmit(){
    renderScore();
    let radioValue = $("input[name='options']:checked").val();
    if(!radioValue){
        alert('Please select an answer')
    } else {
        renderAnswerResponse(radioValue)
        $('input:button').val('Next') 
    }

}

// next button response
function handleNext(){
    SCORE.count++;
    renderQandA()
    if(SCORE.count==6){
        $('input:button').val('Reset')     
    } else{
        $('input:button').val('Submit') 
    }

}

// reset button response
function handleReset (){
    SCORE.reset();   
    handleNext()
    renderScore() 
}

// begin button response
function handleBegin(){
    handleNext()
    renderScore()
}

// load-in function
function mainFunctionCall(){
    renderScore();
    renderQandA();
    renderButton();
}

$(mainFunctionCall)
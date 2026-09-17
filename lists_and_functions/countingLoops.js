//scripts for countdowns until learn/test trials begin --> using looping functions

//initialize global/counting variables
var countdown_reset = 6;
var countdown = countdown_reset;

//this is a message that will display to the user after they have completed the attention check
var trial_will_begin_again = {
    type: 'html-keyboard-response',
    stimulus: function(){
        countdown--
        return 'Trials will resume in:<br><br>' + countdown + ' seconds';
    },
    choices: "NO_KEYS",
    trial_duration: 1000,
    // prompt shows the legend for keys by colour
    prompt: '<br><span style="color:red;">J</span> &nbsp &nbsp &nbsp <span style="color:yellow;">K</span> &nbsp &nbsp &nbsp <span style="color:green;">L</span>',
}

// countdown for beginning of learn trials
var learn_trial_will_begin = {
    type: 'html-keyboard-response',
    stimulus: function(){
        countdown--
        return 'Trials will begin in:<br><br>' + countdown + ' seconds';
    },
    choices: "NO_KEYS",
    trial_duration: 1000,
    // prompt shows the legend for keys by colour
    //prompt: '<br><span style="color:red;">J</span> &nbsp &nbsp &nbsp <span style="color:yellow;">K</span> &nbsp &nbsp &nbsp <span style="color:green;">L</span>',
}
// Looping logic for countdown
var counting_down_until_learn_trials = {
    timeline: [learn_trial_will_begin],
    loop_function: function(data){
        if(countdown <= 1){ // no time left
            countdown = countdown_reset; //reset countdown
            return false;
        } 
        else {return true;}
    } 
}

// Looping logic for countdown
var counting_down_until_trials = {
    timeline: [trial_will_begin_again],
    loop_function: function(data){
        if(countdown <= 1){ // no time left
            countdown = countdown_reset; //reset countdown
            return false;
        } 
        else {return true;}
    } 
}

 //this is a message that will display to the user after they have completed the attention check
 var test_trial_will_begin = {
    type: 'html-keyboard-response',
    stimulus: function(){
        countdown--
        return 'Trials will begin in:<br><br>' + countdown + ' seconds<br><br>';
    },
    choices: "NO_KEYS",
    trial_duration: 1000,
    // prompt shows the legend for keys by colour
    prompt: '<span style="color:orange;">F = Non-word</span> &nbsp &nbsp &nbsp  <span style="color:#87cefa;"> H = English word </span>'
}

// Looping logic for countdown
var counting_down_until_test_trials = {
    timeline: [test_trial_will_begin],
    loop_function: function(data){
        if(countdown <= 1){ // no time left
            countdown = countdown_reset; //reset countdown
            return false;
        } 
        else {return true;}
    } 
}
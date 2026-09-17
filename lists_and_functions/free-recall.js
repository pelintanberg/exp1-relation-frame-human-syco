var jsPsychFreeRecall = (function(jspsych) {
  "use strict";

  const info = {
    name: jsPsychFreeRecall,
    description: '',
    parameters: {
      questions: {
        type: jspsych.ParameterType.HTML_STRING,
        array: true,
        default: 'please type the word you recall. press enter after typing each word. <br> when you are done recalling all words, please kindly wait.',
        no_function: false,
        description: ''
      },
      premable: {
        type: jspsych.ParameterType.HTML_STRING,
        default: null,
        no_function: false,
        description: ''
      }
    }
  };

  class FreeRecallPlugIn {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

  trial(display_element, trial) {

    trial.preamble = typeof trial.preamble == 'undefined' ? "" : trial.preamble;
    if (typeof trial.rows == 'undefined') {
      trial.rows = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.rows.push(1);
      }
    }
    if (typeof trial.columns == 'undefined') {
      trial.columns = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.columns.push(40);
      }
    }

    // Default value for time limit option
    trial.duration = trial.duration || -1;
    // Time handlers
    var setTimeoutHandlers = [];

    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    //trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial); //for some reason, this did not work with my code. Ask Michael Kahana

    // show preamble text
    display_element.innerHTML += '<div id="jsPsychFreeRecall-preamble" class="jsPsychFreeRecall-preamble">'+trial.preamble+'</div>';

    // add question and textbox for answer
    display_element.innerHTML += '<div id="jsPsychFreeRecall" class="jsPsychFreeRecall-question" style="margin: 2em 0em;">'+
      '<p class="jsPsychFreeRecall">' + trial.questions + '</p>'+
      '<textarea name="#jsPsychFreeRecall-response" id="recall_box" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>'+
      '</div>';

    // set up response collection
    var rts = [];
    var recalled_words = [];
    var key_presses = [];
    var key_times = [];
    
    $('textarea').keydown(function(e){
      // Get timing of key press relative to start of recall period
      var endTime = (new Date()).getTime();
      var response_time = endTime - startTime;
      // Record key press and its timing
      key_presses.push(e.keyCode)
      key_times.push(response_time)
      // If enter, space, semicolon, or comma is pressed, record the word and
      // its timing, then clear the text box for the next word
      if (e.keyCode===13 | e.keyCode===32 | e.keyCode===186 | e.keyCode===188) {
        rts.push(response_time);
        // get recalled word
        word = display_element.querySelector('textarea').value.toLowerCase();
        recalled_words.push(word);
        // empty the contents of the textarea
        display_element.querySelector('textarea').value = '';
        // suppress the character that was entered
        return false;
      }
    });

    if (trial.duration > 0) {
      var t2 = setTimeout(function() {
        end_trial();
      }, trial.duration);
      setTimeoutHandlers.push(t2);
    }
    
    // automatically place cursor in textarea when page loads
    $(function(){
      $('textarea').focus();
    });

    var end_trial = function() {
      // kill any remaining setTimeout handlers
      for (var i = 0; i < setTimeoutHandlers.length; i++) {
        clearTimeout(setTimeoutHandlers[i]);
      }

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // clear the display
      display_element.innerHTML = '';

      // gather the data to store for the trial
      var trial_data = {
        "rt": rts,
        "recwords": recalled_words,
        "key_presses": key_presses,
        "key_times": key_times,
        "word": word
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      this.jsPsych.finishTrial(trial_data);
    };

    var startTime = (new Date()).getTime();

    *if (trial.duration > 0) {
      var t2 = setTimeout(function() {
        end_trial();
      }, trial.duration);
      setTimeoutHandlers.push(t2);
    }
  
  };
  
  FreeRecallPlugIn.info = info;

  return FreeRecallPlugIn;
})(jsPsychModule);

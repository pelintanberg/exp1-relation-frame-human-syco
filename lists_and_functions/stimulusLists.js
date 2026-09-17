//24 words used in the contingency learning phase
var learn_stim_words = ["ankle", "broom", "beach", "bread", "candy","canoe","chalk", "eagle", "elbow", "frost", "glove", "heart", "knife", "olive", "pants", "piano", "robin", "spoon", "stone", "thumb", "tiger", "tulip", "water", "yacht"];

//24 words that were not part of the study phase
var test_new_words = ["apple","belly","blade","chair","cider","clown","glass","gravy","honey","horse","house","moose","onion","penny","phone","radio","sheep","skunk","snake","steak","sugar","table","tooth","whale"];

//48 non-words for lexical decision task
var test_non_words = ["aited", "ature", "beags", "borno", "doard", "drarp", "efter", "egent", "eldur", "feems", "fover", "fulla", "furch", "fusas", "gerif", "gight", "godry", "goser", "guels", "halms", "hedal", "herun", "jeros", "lorny", "pames", "phamp", "pokel", "risex", "roner", "sards", "seils", "selay", "shile", "shord", "shoug", "slaip", "smein", "sofes", "spari", "stasp", "steaf", "theep", "titla", "tixth", "triol", "vocks", "wakon", "yunks"];

//colour option array
var colour_options = ['red','yellow','green'];
 
//24 element array of arrays --> Data structure with properties for each word (which is highC and lowC colour, which block to assign it to etc..), to be used in a loop that places items into a simpler trial array to be used as stimulus for study and test phase.
var learnStim = [
    {word:"word1", HiContCol:'red', LoContCol1: 'yellow', LoContCol2: 'green', block: 1, stage: 'early'},
    {word:"word2", HiContCol:'red', LoContCol1: 'yellow', LoContCol2: 'green', block: 5, stage: 'late'},
    {word:"word3", HiContCol:'red', LoContCol1: 'yellow', LoContCol2: 'green', block: 2, stage: 'early'},
    {word:"word4", HiContCol:'red', LoContCol1: 'yellow', LoContCol2: 'green', block: 6, stage: 'late'},
    {word:"word5", HiContCol:'red', LoContCol1: 'green', LoContCol2: 'yellow', block: 3, stage: 'early'},
    {word:"word6", HiContCol:'red', LoContCol1: 'green', LoContCol2: 'yellow', block: 7, stage: 'late'},
    {word:"word7", HiContCol:'red', LoContCol1: 'green', LoContCol2: 'yellow', block: 4, stage: 'early'},
    {word:"word8", HiContCol:'red', LoContCol1: 'green', LoContCol2: 'yellow', block: 8, stage: 'late'},
    
    {word:"word9", HiContCol:'yellow', LoContCol1: 'red', LoContCol2: 'green', block: 1, stage: 'early'},
    {word:"word10", HiContCol:'yellow', LoContCol1: 'red', LoContCol2: 'green', block: 5, stage: 'late'},
    {word:"word11", HiContCol:'yellow', LoContCol1: 'red', LoContCol2: 'green', block: 2, stage: 'early'},
    {word:"word12", HiContCol:'yellow', LoContCol1: 'red', LoContCol2: 'green', block: 6, stage: 'late'},
    {word:"word13", HiContCol:'yellow', LoContCol1: 'green', LoContCol2: 'red', block: 3, stage: 'early'},
    {word:"word14", HiContCol:'yellow', LoContCol1: 'green', LoContCol2: 'red', block: 7, stage: 'late'},
    {word:"word15", HiContCol:'yellow', LoContCol1: 'green', LoContCol2: 'red', block: 4, stage: 'early'},
    {word:"word16", HiContCol:'yellow', LoContCol1: 'green', LoContCol2: 'red', block: 8, stage: 'late'},

    {word:"word17", HiContCol:'green', LoContCol1: 'red', LoContCol2: 'yellow', block: 1, stage: 'early'},
    {word:"word18", HiContCol:'green', LoContCol1: 'red', LoContCol2: 'yellow', block: 5, stage: 'late'},
    {word:"word19", HiContCol:'green', LoContCol1: 'red', LoContCol2: 'yellow', block: 2, stage: 'early'},
    {word:"word20", HiContCol:'green', LoContCol1: 'red', LoContCol2: 'yellow', block: 6, stage: 'late'},
    {word:"word21", HiContCol:'green', LoContCol1: 'yellow', LoContCol2: 'red', block: 3, stage: 'early'},
    {word:"word22", HiContCol:'green', LoContCol1: 'yellow', LoContCol2: 'red', block: 7, stage: 'late'},
    {word:"word23", HiContCol:'green', LoContCol1: 'yellow', LoContCol2: 'red', block: 4, stage: 'early'},
    {word:"word24", HiContCol:'green', LoContCol1: 'yellow', LoContCol2: 'red', block: 8, stage: 'late'}
];

// shuffling Function for 1-dim array
Array.prototype.shuffle = function() {
    var input = this;

    for (var j = input.length-1; j >=0; j--) {

        var randomIndex = Math.floor(Math.random()*(j+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[j];
        input[j] = itemAtIndex;
    }
    return input;
};

//randomize word stimlulus list
var learn_stim_words = jsPsych.randomization.sampleWithoutReplacement(learn_stim_words, 24);

//assign shuffled stimulus list to the data structure of hi/lo contingency trials
for (k = 0; k < learn_stim_words.length; k++) {
    learnStim[k].word = learn_stim_words[k];
};


function getCorrKey(col){
    var colourKey = "";
   
    if (col == "red"){colourKey = "j"}
    else if (col == "yellow"){colourKey = "k"}
    else {colourKey = "l"}

    return colourKey;
};

//A function that produces the learn_stim array depending on the block that is passed
function getBlockStim(n){
    let block_n = learnStim.filter(learnStim => learnStim.block === n);
    
    var blockStim_n = [
        {  
            word: block_n[0].word,
            colour: block_n[0].LoContCol1,
            block: block_n[0].block,
            cont_condition: 'lo',
            correct_response: getCorrKey(block_n[0].LoContCol1)
        },
        {
            word: block_n[0].word,
            colour: block_n[0].LoContCol2,
            block: block_n[0].block,
            cont_condition: 'lo',
            correct_response: getCorrKey(block_n[0].LoContCol2)
        }
    ];

    for (k = 0; k <8; k++){
        blockStim_n.push({word: block_n[0].word, colour: block_n[0].HiContCol, block: n, cont_condition: 'hi', correct_response: getCorrKey(block_n[0].HiContCol)});
        blockStim_n.push({word: block_n[1].word, colour: block_n[1].HiContCol, block: n, cont_condition: 'hi', correct_response: getCorrKey(block_n[1].HiContCol)});
        blockStim_n.push({word: block_n[2].word, colour: block_n[2].HiContCol, block: n, cont_condition: 'hi', correct_response: getCorrKey(block_n[2].HiContCol)});
    };

    for (i = 1; i <3; i++){
        blockStim_n.push({word: block_n[i].word, colour: block_n[i].LoContCol1, block: n, cont_condition: 'lo', correct_response: getCorrKey(block_n[i].LoContCol1)});
        blockStim_n.push({word: block_n[i].word, colour: block_n[i].LoContCol2, block: n, cont_condition: 'lo', correct_response: getCorrKey(block_n[i].LoContCol2)});

    };

    //shuffle the stimulus array ensuring that adjacent colours are not repeated
    var noRepeatBlock_Stim_n = jsPsych.randomization.shuffleNoRepeats(blockStim_n, function(a,b) { return a.colour === b.colour});
    return noRepeatBlock_Stim_n;//blockStim_n;
};

//an array of an array that contains all of the stimulus items for the learn task
var learn_trials_all_blocks = [
    getBlockStim(1), 
    getBlockStim(2),
    getBlockStim(3),
    getBlockStim(4),
    getBlockStim(5),
    getBlockStim(6),
    getBlockStim(7),
    getBlockStim(8),
];

// the array of arrays is flattened so that all data is sequentially held in a 1-dim array of objects
var flat_learn_trials_all = learn_trials_all_blocks.flat();

//a subset of the stimulus block containing only stimuli from the first 4 blocks (early)
let earlyblock = learnStim.filter(learnStim => learnStim.stage === 'early');
   
//a subset of the stimulus block containing only stimuli from the last 4 blocks (late)
let lateblock = learnStim.filter(learnStim => learnStim.stage === 'late');
    
//a random sample from earlyblock and lateblock for use during the LDT (task 2)
var test_stim_early = jsPsych.randomization.sampleWithoutReplacement(earlyblock,6);
var test_stim_late = jsPsych.randomization.sampleWithoutReplacement(lateblock,6);
      
//create a colour order for the NEW words in the test phase LDT
var new_words_col_order_LDT = [];
    for (i = 0; i<8; i++){   
        new_words_col_order_LDT.push("red");
        new_words_col_order_LDT.push("yellow");
        new_words_col_order_LDT.push("green");
    }
//shuffle colour order for NEW words with no repeats
new_words_col_order_LDT = jsPsych.randomization.shuffleNoRepeats(new_words_col_order_LDT);

//create a colour order for the NON words in the test phase LDT
var non_words_col_order_LDT = [];
    for (i = 0; i < 16; i++){   
        non_words_col_order_LDT.push("red");
        non_words_col_order_LDT.push("yellow");
        non_words_col_order_LDT.push("green");
    }
//shuffle colour order for NON words with no repeats
non_words_col_order_LDT = jsPsych.randomization.shuffleNoRepeats(non_words_col_order_LDT);
   
//create stimulus array for test phase LDT, initialize
var test_stim = [
    {  
        word: test_stim_early[0].word,
        colourLDT: test_stim_early[0].HiContCol,
        condition: 'word',
        cont_condition: 'hi',
        correct_response: 'h',
        stage: 'early',
        block: learnStim.filter(learnStim => learnStim.word === test_stim_early[0].word).map(learnStim => learnStim.block)[0]
    },
    {
        word: test_stim_early[0].word,
        colourLDT: test_stim_early[0].LoContCol1,
        condition: 'word',
        cont_condition: 'lo',
        correct_response: 'h',
        stage: 'early',
        block: learnStim.filter(learnStim => learnStim.word === test_stim_early[0].word).map(learnStim => learnStim.block)[0]
    }
];

//function to check if a number is even/odd
const isEven = num => ((num % 2) == 0) ? true : false;
    
//add elements from early block (adds 5 more elements), alternates which "Low Contingency" colours are used
for (i = 1; i < 6; i++){
    test_stim.push({word: test_stim_early[i].word, colourLDT: test_stim_early[i].HiContCol, condition:'word',cont_condition:'hi',correct_response:'h',stage: 'early', block: learnStim.filter(learnStim => learnStim.word === test_stim_early[i].word).map(learnStim => learnStim.block)[0]});    
        if(isEven(i)){
            test_stim.push({word: test_stim_early[i].word, colourLDT: test_stim_early[i].LoContCol1, condition:'word',cont_condition:'lo',correct_response:'h',stage: 'early', block: learnStim.filter(learnStim => learnStim.word === test_stim_early[i].word).map(learnStim => learnStim.block)[0]})
        }
        else{
            test_stim.push({word: test_stim_early[i].word, colourLDT: test_stim_early[i].LoContCol2, condition:'word',cont_condition:'lo',correct_response:'h',stage: 'early', block: learnStim.filter(learnStim => learnStim.word === test_stim_early[i].word).map(learnStim => learnStim.block)[0]})
        }  
    }

//add elements from late block, alternates which "Low Contingency" colour is used
for (i = 0; i < 6; i++){
    test_stim.push({word: test_stim_late[i].word, colourLDT: test_stim_late[i].HiContCol, condition:'word',cont_condition:'hi',correct_response:'h', stage: 'late', block: learnStim.filter(learnStim => learnStim.word === test_stim_late[i].word).map(learnStim => learnStim.block)[0]});
        if(isEven(i)){
            test_stim.push({word: test_stim_late[i].word, colourLDT: test_stim_late[i].LoContCol1, condition:'word',cont_condition:'lo',correct_response:'h',stage: 'late', block:learnStim.filter(learnStim => learnStim.word === test_stim_late[i].word).map(learnStim => learnStim.block)[0]})
        }
        else{
            test_stim.push({word: test_stim_late[i].word, colourLDT: test_stim_late[i].LoContCol2, condition:'word',cont_condition:'lo',correct_response:'h',stage: 'late', block: learnStim.filter(learnStim => learnStim.word === test_stim_late[i].word).map(learnStim => learnStim.block)[0]})
        }  
    }
    
//add new-word elements
test_new_words.shuffle(); //extra shuffle
for (i = 0; i < 24; i++){
        test_stim.push({word: test_new_words[i], colourLDT: new_words_col_order_LDT[i], condition: 'word', cont_condition: 'new', correct_response: 'h', stage: 'new'})
}

//add non-word elements
test_non_words.shuffle(); //extra shuffle
for (i = 0; i < 48; i++){
        test_stim.push({word: test_non_words[i], colourLDT: non_words_col_order_LDT[i], condition: 'nonword', cont_condition: 'non', correct_response:'f', stage: "new"})
}

//shuffle the LDT test stimulus array  
    test_stim = jsPsych.randomization.sampleWithoutReplacement(test_stim, 96);
//Note: LDT will not have equal distribution of colour stimuli, but it will have equal distribution of word/non-word


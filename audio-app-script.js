// OPEN AND CLOSE MODAL WINDOW

const add_song_open_window = document.querySelector("#add_song_btn");
const add_songs_window = document.querySelector("#add-songs-window")
const add_song_close_window = document.querySelector("#cancel")

add_song_open_window.addEventListener("click", ()=>{
    add_songs_window.style.display = "flex";
})

add_song_close_window.addEventListener("click", close)

function close(){
    add_songs_window.style.display = "none";
}

// FILE HANDLING

const choose_audio_btn = document.querySelector("#choose-audio-btn")
const audio_file_input = document.querySelector("#file-input");
const filenameVar = document.querySelector("#custom-text");

let file_chosen;
let isEmpty = true;
choose_audio_btn.addEventListener("click", ()=>{
    audio_file_input.click();
    //file_chosen = audio_file_input.value;
});

audio_file_input.addEventListener("change", filename);

let audioDur = document.createElement("audio");
let shortenedFilename, files, url, filenameValue, duration;

function filename(event){
    let target = event.currentTarget;
    let file = target.files[0];
    let reader = new FileReader()
    if (target.files && file) {
        //var reader = new FileReader();

        reader.onload = function (e) {
            audioDur.src = e.target.result;
            audioDur.addEventListener('loadedmetadata', function(){
                
                duration = audioDur.duration;
                duration = duration.toFixed(0);
                //console.log("The duration of the song is of: " + duration + " seconds");
            },false);
        };

        reader.readAsDataURL(file);
    }
    
    //files = event.target.files;
    url = URL.createObjectURL(file);
    console.log(url);

    filenameValue = audio_file_input.value.match( /[\/\\]([\w\d\s\.\-\(\)]+)$/);
    console.log(filenameValue)
    filenameValue = filenameValue[1];
    console.log(filenameValue)
    
    if(filenameValue.length > 14){
        shortenedFilename = filenameValue.slice(0, 14) + "..."
        console.log(shortenedFilename);
        filenameVar.innerHTML = shortenedFilename;
    } else {
        filenameVar.innerHTML = filenameValue;
    }

}

// PLAY AUDIO - TESTING

//const play_btn = document.querySelector("#play");
//const pause_btn = document.querySelector("#pause");

/*
play_btn.addEventListener("click", ()=>{
    audio = new Audio(url);
    audio.play()
})
*/

// MANAGING RECORDS

// Needed Variables: 
// filenameValue - contains full name of a file
// duration - duration of a selected file
// url of audio file

const add_to_playlist_btn = document.querySelector("#add-song");
const optional_audio_name = document.querySelector("#audio-name");
const audio_tracks_container = document.querySelector("#audio-tracks");
const no_songs_message = document.querySelector("#no_songs_to_show")

let arrayOfRecords = [];
let arrayOfURLs = [];
let arrayOfDurations = [];

add_to_playlist_btn.addEventListener("click", createRecord);

// Create Record - ko kliknemo Add to Playlist Button;
let name_node;
function createRecord(){

    arrayOfDurations.push(duration); // dolžino muzike pošlje v array
    arrayOfURLs.push(url) // url pošlje v array

    let record_container = document.createElement("div");
    record_container.classList.add("record-container");
    let name = getName();
    name_node = document.createTextNode(name); 

    let name_container = document.createElement("p");
    name_container.appendChild(name_node);

    // V metodi classList.add niso dovoljeni presledki;
    // URL-je vrži v array;
    let play_btn_records = document.createElement("div");
    play_btn_records.classList.add("play_icon");
    let play_icon = document.createElement("i");
    play_icon.classList.add("fas");
    play_icon.classList.add("fa-solid");
    play_icon.classList.add("fas");
    play_icon.classList.add("fa-play");
    play_icon.classList.add("record-icon");
    play_btn_records.appendChild(play_icon);
    play_btn_records.addEventListener("click", determineAudio)

    let trash_btn_records = document.createElement("div");
    trash_btn_records.classList.add("trash_icon");
    let trash_icon = document.createElement("i");
    trash_icon.classList.add("fas");
    trash_icon.classList.add("fa-solid");
    trash_icon.classList.add("fas");
    trash_icon.classList.add("fa-trash");
    trash_icon.classList.add("record-icon");
    trash_btn_records.appendChild(trash_icon);
    trash_btn_records.addEventListener("click", deleteRecord)

    let records_icons_container = document.createElement("div");
    records_icons_container.classList.add("records_icons_container")
    records_icons_container.appendChild(play_btn_records);
    records_icons_container.appendChild(trash_btn_records);

    record_container.appendChild(name_container);
    record_container.appendChild(records_icons_container);
    
    no_songs_message.remove();

    arrayOfRecords.push(record_container);
    console.log(arrayOfRecords);
    displayRecords();

}

// Determine a Name of a Record
function getName(){
    let filenameToDisplay;
    if(optional_audio_name.value == ""){
        if(filenameValue.length > 25){
            filenameToDisplay = filenameValue.slice(0, 25) + "..."
        } else {
            filenameToDisplay = filenameValue;
            optional_audio_name.value = "";
        }
    } else {
        filenameToDisplay = optional_audio_name.value;
    }
    return filenameToDisplay;
}

// Display Records

function displayRecords(){
    if(!fromModal){

    }
    close()
    for(let i = 0; i < arrayOfRecords.length; i++){
        audio_tracks_container.appendChild(arrayOfRecords[i])
    }
}

// KAJ ŠE MORAM SPROGRAMIRATI
/*
1. Brisanje vseh elementov - NAREJENO
2. Brisanje posameznih elementov - NAREJENO
3. Predvajanje - NAREJENO
4. Pauziranje - NAREJENO
4. Autoplay možnost
5. Preskok na naslednji oz. na prejšnji file
6. Vizualizacija
*/

// Delete Specific Record

let fromModal = false;
function deleteRecord(e){
    let parent = e.target.parentElement;
    let masterParent = parent.parentElement;
    let realMasterParent = masterParent.parentElement;
    console.log(realMasterParent);

    for(let i = 0; i < arrayOfRecords.length; i++){
        if(realMasterParent == arrayOfRecords[i]){
            arrayOfRecords.splice(i, 1);
            arrayOfURLs.splice(i, 1);
            arrayOfDurations.splice(i, 1);
            realMasterParent.remove();
            fromModal = false;
            displayRecords();
        }
    }
}

// Delete All Records

const delete_all_btn = document.querySelector("#delete_all_btn")
delete_all_btn.addEventListener("click", deleteAll)

function deleteAll(){
    for(let i = 0; i < arrayOfRecords.length; i++){
        arrayOfRecords[i].remove();
    }
    resetInterval()
    arrayOfDurations.length = 0;
    arrayOfRecords.length = 0;
    arrayOfURLs.length = 0;
}

// PLAY AUDIO

let audioIsPlaying = false;
const song_title_elem = document.querySelector("#song-title");

// This function figures out array index of requested audio URL
let num_of_song; 
let currentDuration;
let currentName; 
function determineAudio(e){
    let parent = e.target.parentElement;
    let masterParent = parent.parentElement;
    let realMasterParent = masterParent.parentElement;
    for(let i = 0; i < arrayOfRecords.length; i++){
        if(realMasterParent == arrayOfRecords[i]){
            currentDuration = arrayOfDurations[i];
            num_of_song = i;
            currentNameFunc(num_of_song);
            playAudio();
        }
    }
}

// Determine name of the song currently playing

function currentNameFunc(index){
    currentName = arrayOfRecords[index].children[0].innerHTML;
    console.log(currentName);
    song_title_elem.innerHTML = currentName;
}

// This function plays audio from list
let audio;
function playAudio(){
    // Če se predvaja drugi audio, ga ustavi in kliče funkcijo, ki ponastavi štoparico (interval)
    
    if(audioIsPlaying){
        audio.pause();
        // To prestavi iz IF STAVKA da deluje tudi, ko je audio pavziran
        /*
        clearInterval(stopwatch);
        resetInterval()
        */
        // 

        //audio.currentTime = 0;
    } /*else {
        //audio.currentTime = 0;
    }*/

    clearInterval(stopwatch);
    resetInterval()
    
    let currentURL = arrayOfURLs[num_of_song]
    console.log(currentURL);
    audio_length_elem.innerHTML = currentDuration;
    audio = new Audio(currentURL);
    audio.play();
    audioIsPlaying = true;
    stopwatchFunc() // Start Stopwatch
}

const pause_btn = document.querySelector("#pause");
pause_btn.addEventListener("click", pauseAudio);

function pauseAudio(){
    if(audioIsPlaying){
        audio.pause();
        audioIsPlaying = false;
        clearInterval(stopwatch); // Stop stopwatch
    }
}

const play_btn = document.querySelector("#play");
play_btn.addEventListener("click", playAudioAgain);

// If audio is paused and user wants to play it
function playAudioAgain(){
    audio.play();
    audioIsPlaying = true;
    stopwatchFunc() // Start stopwatch to resume song
}

// Stopwatch

const elapsed_time_elem = document.querySelector("#elapsed-time");
const audio_length_elem = document.querySelector("#audio-length");
const audio_progress_line = document.querySelector("#progress-line")

let stopwatch, progress_percentage; 
let time_elapsed = 0;
function stopwatchFunc(){
    stopwatch = setInterval(() => {
        time_elapsed++;
        elapsed_time_elem.innerHTML = time_elapsed;
        progress_percentage = time_elapsed / currentDuration * 100
        audio_progress_line.style.width = progress_percentage + "%";
        console.log(time_elapsed);
        if(time_elapsed == currentDuration){
            clearInterval(stopwatch);
            resetInterval()
            // Če je autoplay ON, kliči funkcijo za predvajanje naslednje datoteke
            if(autoplay_ON){
                forward()
            }
            /*
            elapsed_time_elem.innerHTML = "00";
            audio_length_elem.innerHTML = "00";
            time_elapsed = 0;
            */
        }0
    }, 1000);
}

// Resets interval
function resetInterval(){
    time_elapsed = 0;
    elapsed_time_elem.innerHTML = "00";
    audio_length_elem.innerHTML = "00"
    progress_percentage = 0;
    audio_progress_line.style.width = 0 + "%";
}

// Restarts song from the beginning / skips to next song

const forward_btn = document.querySelector("#forward");
const backward_btn = document.querySelector("#backward");

backward_btn.addEventListener("click", restartSong)

function restartSong(){
    resetInterval();
    playAudio();
}

forward_btn.addEventListener("click", forward)

function forward(){
    resetInterval();
    num_of_song = num_of_song + 1;
    currentNameFunc(num_of_song);
    playAudio();
}

/* Autoplay */

const autoplay_btn = document.querySelector("#autoplay")

let autoplay_ON = false;

autoplay_btn.addEventListener("click", ()=>{
    if(!autoplay_ON){
        autoplay_ON = true;
        autoplay_btn.style.backgroundColor = "green";
    } else {
        autoplay_ON = false;
        autoplay_btn.style.backgroundColor = "black";
    }
})



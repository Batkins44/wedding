let numPpl
let date = new Date();
let lastName;


var config = {
    apiKey: "AIzaSyDGTLySPjCLycGOSjFuKDP70pNI-rURO04",
    authDomain: "rsvp-3ef51.firebaseapp.com",
    databaseURL: "https://rsvp-3ef51.firebaseio.com"
  };

firebase.initializeApp(config);

firebase.getFBsettings = () => {
	return config;
};

$("#q1button").click(() => {
let response=$('input[name=attend]:checked').val()
lastName = $('#lName').val();
    if(response){
        if(response == 'yes'){
            $("#q1").addClass("hide");
            $("#q2").removeClass("hide");
        }else{
            $("#q1").html(`<h2>Thank you for your response</h2>`);
            let declineObj = {
                lastName:`${lastName}`
            }
                firebase.database().ref('/Declining').push(declineObj)
                

        }
    }else{
        window.alert("Please select an option");
    }

})

$("#q2button").click(() => {
    let response=$("#num-people").val();
    console.log(response);
    if(response){
        $("#q2").addClass("hide");
        $("#q3").removeClass("hide")
        for(let i=0;i<response;i++){
            $("#q3form").append(`Name:<input type="text" id="person${i}"><br>Meal:<input type="radio" name="food${i}" id="chicken${i}" value="chicken">Chicken
            <input type="radio" name="food${i}" id="salmon${i}" value="salmon">Salmon<hr>`)
            numPpl = i;
        }

    }else{
        window.alert("Please enter a number");
    }
})

$("#q3button").click(() => {
    console.log(numPpl)
    let actualNum = numPpl + 1;
    let family = {
        dateSubmitted:`${date}`,
        numPpl:`${actualNum}`,
        lastName:`${lastName}`
    }
    console.log(family)
    for(let i=0;i<actualNum;i++){
        let currentPerson = $(`#person${i}`).val()
        let currentMeal = $(`input[name=food${i}]:checked`).val();
        family[`${currentPerson}`] = currentMeal


}


console.log(family)
firebase.database().ref('/Attending').push(family)
$("#q3").html(`<h2>Thank you for your response</h2>`)
})
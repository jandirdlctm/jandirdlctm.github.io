
//var addButton = document.querySelector("#add_class");
//var updateButon = document.querySelector("#SubmitUpdate");
//var Classes = null;
//var text = document.getElementById("done").value;
//console.log("the text value was gotten");

var mainPage = document.querySelector('#mainPage');
var createPage = document.querySelector('#signUpPage');
var loginPage = document.querySelector('#loginPage');

//HOW THEY WILL LOOK FIRST TIME YOU GO IN
mainPage.style.display = 'none';
createPage.style.display = 'none';
loginPage.style.display = 'block';

console.log("We are connected");

//var BASE_URL = "https://squirrelvillage.herokuapp.com"
//change it everywhere where it says "localhost"


//CREATING THE CLASSES
var BASE_URL = "https://class-rating-app.herokuapp.com";
var Classes = null;
var createClass = function(clas, major, professor, location, rating) {
	var data = "clas=" + encodeURIComponent(clas);
	data += "&major=" + encodeURIComponent(major);
	data += "&professor=" + encodeURIComponent(professor);
	data += "&location=" + encodeURIComponent(location);
	data += "&rating=" + encodeURIComponent(rating);

	fetch("BASE_URL/classes", {
		method: 'POST',
		body: data,
		credentials: 'include',
		headers: {
			"Content-type": "application/x-www-form-urlencoded"
		}
	}).then(function(response){
		console.log("class saved ");

		addClasses();
	});
};

var BASE_URL = "https://class-rating-app.herokuapp.com";
var deleteClass = function(id){
	console.log(id)

	fetch(`BASE_URL/classes/${id}`, {
		method: "DELETE",
		credentials: 'include'
	}).then(function(response){
		addClasses();
		console.log("class got deleted");
	});
};



//ADD BUTTON FUNCTIONALITY
var addButton = document.querySelector("#add_class");
addButton.onclick = function(){
	console.log("The Add button was clicked");
	//getting the object
	var clasObject = document.querySelector("#class");
	var majorObject = document.querySelector("#major");
	var professorObject = document.querySelector("#professor");
	var locationObject = document.querySelector("#location");
	var ratingObject = document.querySelector("#rating");
	//getting the value
	var clasInput = clasObject.value;
	console.log(clasInput);
	var majorInput = majorObject.value;
	var professorInput = professorObject.value;
	var locationInput = locationObject.value;
	var ratingInput = ratingObject.value;
	console.log(ratingInput);

	
	if (clasInput != ""){
		document.getElementById('class').value = "";
		document.getElementById('major').value = "";
		document.getElementById('professor').value = "";
		document.getElementById('location').value = "";
		document.getElementById('rating').value = "";


		console.log(clasInput,majorInput,professorInput,locationInput,ratingInput);
		createClass(clasInput, majorInput, professorInput, locationInput, ratingInput);

	}
	else{
		alert("Enter a valid class please");
	}
};

var doneButton = document.querySelector("#done");
var updateButon = document.querySelector("#SubmitUpdate");
doneButton.onclick = function(){
	console.log("The done button was clicked");
	addButton.disabled = true;	
	console.log("The addButton was disabled");
	text = true;
	updateButon.disabled = true;
	console.log("The Update button was disabled");
};

var updateClass = function(clas, major, professor, location, rating, id ) {
console.log(id)
var classObject = document.querySelector("#class");
var majorObject = document.querySelector("#major");
var professorObject = document.querySelector("#professor");
var locationObject = document.querySelector("#location");
var ratingObject = document.querySelector("#rating");
var updateButton = document.querySelector("#SubmitUpdate");

classObject.value = clas;
majorObject.value = major;
professorObject.value = professor;
locationObject.value = location;
ratingObject.value = rating;
updateButton.innerHTML = "Update"

//UPDATE BUTTON FUNCTIONALITY
var BASE_URL = "https://class-rating-app.herokuapp.com";
var updateButon = document.querySelector("#SubmitUpdate");
updateButton.onclick = function(){
clas = classObject.value;
major = majorObject.value;
professor = professorObject.value;
location = locationObject.value;
rating = ratingObject.value;

console.log(id, clas, major, professor, location, rating);
var data = "clas=" + encodeURIComponent(clas);
data += "&major=" + encodeURIComponent(major);
data += "&professor=" + encodeURIComponent(professor);
data += "&location=" + encodeURIComponent(location);
data += "&rating=" + encodeURIComponent(rating);
	
if (clas != ""){
		document.getElementById('class').value = "";
		document.getElementById('major').value = "";
		document.getElementById('professor').value = "";
		document.getElementById('location').value = "";
		document.getElementById('rating').value = "";


		console.log(clas,major,professor,location,rating);
		

	}
	else{
		alert("Enter a valid class please");
	}

fetch(`BASE_URL/classes/${id}`, {
	method: 'PUT',
	credentials: 'include',
	body: data,
	headers: {
        "Content-type": "application-x-www-form-urlencoded"
}
 		}).then(function(response){
 			addClasses()
		console.log("classes updated")
 		});
 };
};




//LOGIN PAGE
// AUTHENTICATION
var BASE_URL = "https://class-rating-app.herokuapp.com";
var login = function(userNameInput, passwordInput){
	var h3 = document.querySelector("#h3")
	datdastring = 'email=' + encodeURIComponent(userNameInput)+ '&password=' + encodeURIComponent(passwordInput)
	fetch("BASE_URL/sessions",{
		method: "POST",
		body: datdastring,
		credentials: "include"
	}).then(function(response){
		if (response.status == 201){
			console.log("Succesfullly entered ");
			alert("Succesfullly entered");
			h3.innerHTML = "Login Succesful";

			var mainPage = document.querySelector('#mainPage');
			var createPage = document.querySelector('#signUpPage');
			var loginPage = document.querySelector('#loginPage');
		
			addClasses()
		
			mainPage.style.display = 'block';
			createPage.style.display = 'none';
			loginPage.style.display = 'none';

			addClasses()

		}
		else {
			alert("Username or Password is incorrect");
			console.log("i am in the else");
			h3.innerHTML = "Invalid attempt, please try again."
			h3.style.color = "red"

			document.getElementById('userName').value = "";
			document.getElementById('Password').value = "";
		};
	});
};


var loginButton = document.querySelector('#login');
loginButton.onclick = function(){

	var userName = document.querySelector("#userName");
	var password = document.querySelector("#Password");

	var userNameInput = userName.value;
	var passwordInput = password.value;

	if (userNameInput == ""){
		alert("Please enter a valid username and password.");
		document.getElementById('userName').value = "";
		document.getElementById('Password').value = "";



	}
	else if (passwordInput == ""){
		alert("Please enter a valid username and password");
		document.getElementById('userName').value = "";
		document.getElementById('Password').value = "";


	}
	else{
		login(userNameInput, passwordInput);
	};
};


//CREATE PAGE
//CREATE NEW USER
var NewUser = document.querySelector('#newUser');
NewUser.onclick = function(){
	var h3 = document.querySelector("h3")
	h3.style.display = 'none';
	var mainPage = document.querySelector('#mainPage');
	var createPage = document.querySelector('#signUpPage');
	var loginPage = document.querySelector('#loginPage');
	mainPage.style.display = 'none';
	createPage.style.display = 'block';
	loginPage.style.display = 'none';
	//registerPerson();

	var registerPerson = document.querySelector("#signup");
	registerPerson.onclick = function(){
	var firstName = document.querySelector("#fname");
 	var lastName = document.querySelector("#lname");
 	var email = document.querySelector("#email");
 	var password = document.querySelector("#password");

 	var firstNameInput = firstName.value;
 	var lastNameInput = lastName.value;
 	var emailInput = email.value;
 	var passwordInput = password.value;
 	if( firstNameInput == "" ){
 		alert("Please fill out all the fields.");
 		document.getElementById('fname').value = "";
 		document.getElementById('lname').value = "";
 		document.getElementById('email').value = "";
 		document.getElementById('password').value = "";

 	} else if( lastNameInput == "" ){
 		alert("Please fill out all the fields.");
 		document.getElementById('fname').value = "";
 		document.getElementById('lname').value = "";
 		document.getElementById('email').value = "";
 		document.getElementById('password').value = "";

 	} else if( emailInput == "" ){
 		alert("Please fill out all the fields.");
 		document.getElementById('fname').value = "";
		document.getElementById('lname').value = "";
		document.getElementById('email').value = "";
		document.getElementById('password').value = "";

 	} else if( passwordInput == "" ){
 		alert("Please fill out all the fields.");
		document.getElementById('fname').value = "";
		document.getElementById('lname').value = "";
		document.getElementById('email').value = "";
		document.getElementById('password').value = "";

 	}
 	else{ 		
 		createNewUser(firstNameInput,lastNameInput, emailInput, passwordInput);
 	}
}
};

var BASE_URL = "https://class-rating-app.herokuapp.com";
var createNewUser = function(fname,lname,email,password){
	var data = "fname=" + encodeURIComponent(fname);
	data += "&lname=" + encodeURIComponent(lname);
	data += "&email=" + encodeURIComponent(email);
	data += "&password=" + encodeURIComponent(password);

	fetch("BASE_URL/users",{
		method: "POST",
		body: data,
		credentials: "include"

	}).then(function(response){
		if (response.status == 201){
			alert("Account  Succesfullly Created!");
			var mainPage = document.querySelector('#mainPage');
			var createPage = document.querySelector('#signUpPage');
			var loginPage = document.querySelector('#loginPage');
			mainPage.style.display = 'none';
			createPage.style.display = 'none';
			loginPage.style.display = 'block';

			addClasses()
		}
		else if (response.status == 422){
			var inUse = document.querySelector("#InUse");
			inUse.innerHTML = "The email already exists, Enter a new email!"
			inUse.style.color = "red"

			var firstName = document.querySelector("#fname");
 			var lastName = document.querySelector("#lname");
 			var email = document.querySelector("#email");
 			var password = document.querySelector("#password");

 			document.getElementById('fname').value = "";
 			document.getElementById('lname').value = "";
 			document.getElementById('email').value = "";
 			document.getElementById('password').value = "";
		};
	});
};


//SIGN UP PAGE



//var BASE_URL = "https://class-rating-app.herokuapp.com";
var addClasses = function(){
	fetch("https://class-rating-app.herokuapp.com/classes",{
		credentials: 'include'
	}).then(function(response){
		console.log("server responded.");
			var stat = response.status
			if (stat == 401){
				// show the forms for login and signUp
				var mainPage = document.querySelector('#mainPage');
				var createPage = document.querySelector('#signUpPage');
				var loginPage = document.querySelector('#loginPage');

				//HOW THEY WILL LOOK FIRST TIME YOU GO IN
				mainPage.style.display = 'none';
				createPage.style.display = 'none';
				loginPage.style.display = 'block';
				return;
			}
		response.json().then(function(data){
			//showing the div for data
			//hiding the other forms
			var mainPage = document.querySelector('#mainPage');
			var createPage = document.querySelector('#signUpPage');
			var loginPage = document.querySelector('#loginPage');

			mainPage.style.display = 'block';
			createPage.style.display = 'none';
			loginPage.style.display = 'none';
			

			console.log(data)
			Classes = data;


			var classes = document.querySelector("#layout");
			classes.innerHTML = "";

			data.forEach(function(clas) {
				console.log(clas);
				var newItem = document.createElement("li");
				newItem.className = "Class-style";

				var clasDiv = document.createElement("div");
				clasDiv.innerHTML = `Class: <span style="font-style:impact;">${clas.clas}<span>`;
				clasDiv.className = "classes-name";
				newItem.appendChild(clasDiv);

				var majorDiv = document.createElement("div");
				if (clas.major){
					majorDiv.innerHTML = `Major: <span style="font-style:impact;">${clas.major}<span>`;
				}
				else{
					majorDiv.innerHTML = "No major";
				}
				majorDiv.className = "classes-major";
				newItem.appendChild(majorDiv);

				var professorDiv = document.createElement("div");
				if (clas.professor){
					professorDiv.innerHTML = `Professor: <span style="font-style:impact;">${clas.professor}<span>`;
				}
				else{
					professorDiv.innerHTML = "No professor";
				}
				professorDiv.className = "classes-professor";
				newItem.appendChild(professorDiv);

				var locationDiv = document.createElement("div");
				if (clas.location){
					locationDiv.innerHTML = `Location: <span style="font-style:impact;">${clas.location}<span>`;
				}
				else{
					locationDiv.innerHTML = "No location"
				}
				locationDiv.className = "classes-location";
				newItem.appendChild(locationDiv);

				var ratingDiv = document.createElement("div");
				if (clas.rating){
					ratingDiv.innerHTML = `Rating: <span style="font-style:impact;">${clas.rating}<span>`;
				}
				else{
					ratingDiv.innerHTML = "No Rating";
				}
				ratingDiv.className = "classes-rating";
				newItem.appendChild(ratingDiv);




				var deleteButton = document.createElement("button");
				deleteButton.innerHTML = "Delete";
				deleteButton.onclick = function(){
					var proceed = confirm(`do you want to delete ${clas.clas}?`);
					if (proceed) {
						deleteClass(clas.id);
					}
				};
				deleteButton.className = "classes-delete";


				var editButton = document.createElement("button");
				editButton.innerHTML = "Edit";

				editButton.onclick = function(){
					console.log("The update button was clicked");
					updateClass(clas.clas, clas.major, clas.professor, clas.location, clas.rating, clas.id);
				};


				editButton.className = "classes-edit";

				newItem.appendChild(deleteButton);
				newItem.appendChild(editButton);
				classes.appendChild(newItem);


			});

		});
	});
};

addClasses();

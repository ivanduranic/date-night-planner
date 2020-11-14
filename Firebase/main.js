// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDMZw6o6gX-PQ0xKe9Ez2lcEqNBV7mVDYM",
    authDomain: "project-1-93527.firebaseapp.com",
    databaseURL: "https://project-1-93527.firebaseio.com",
    projectId: "project-1-93527",
    storageBucket: "project-1-93527.appspot.com",
    messagingSenderId: "946238864249",
    appId: "1:946238864249:web:7f317c2cb92915072a8da8",
    measurementId: "G-TX4T77L3T1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  // Reference messages collection
  var messagesRef = firebase.database().ref('messages');
  
  // Listen for form submit
  document.getElementById('contactForm').addEventListener('submit', submitForm);
  
  // Submit form
  function submitForm(e){
    e.preventDefault();
  
    // Get values
    var name = getInputVal('name');
    var email = getInputVal('email');
    var message = getInputVal('message');
  
    // Save message
    saveMessage(name, email, message);
  
    // Show alert
    document.querySelector('.alert').style.display = 'block';
  
    // Hide alert after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';
    },3000);
  
    // Clear form
    document.getElementById('contactForm').reset();
  }
  
  // Function to get get form values
  function getInputVal(id){
    return document.getElementById(id).value;
  }
  
  // Save message to firebase
  function saveMessage(name, email, message){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      name: name,
      email:email,
      message:message
    });
  }
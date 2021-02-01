const firebaseConfig = {
    apiKey: "AIzaSyCsT5QrQpzyQTyaB3Dq7qIDrNMJEoODPpI",
    authDomain: "alpha-f18cd.firebaseapp.com",
    databaseURL: "https://alpha-f18cd-default-rtdb.firebaseio.com",
    projectId: "alpha-f18cd",
    storageBucket: "alpha-f18cd.appspot.com",
    messagingSenderId: "532001314322",
    appId: "1:532001314322:web:a6353cee49e5fa4f7caacb",
    measurementId: "G-SHW9Z6D14W"
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebase를 전역 변수로 설정
console.log(firebase)

//인증 서비스 제공 업체
var provider = new firebase.auth.GoogleAuthProvider();

//사용자 인증
const auth = firebase.auth();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const btnGoogle = document.getElementById('btnGoogle');
const signOutBtn = document.getElementById('signOutBtn');
const signOutBtn_li = document.getElementById('signOutBtn_li');

const userDetails = document.getElementById('userDetails');

const container1 = document.getElementById('container1');


const userLoginEmail = document.getElementById('userLoginEmail');
const userLoginPassword = document.getElementById('userLoginPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');





// Add login event
btnLogin.addEventListener('click', e => {
    // Get email and pass
    const email = userLoginEmail.value;
    const pass = userLoginPassword.value;
    const auth = firebase.auth();

    // Sign in
    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e => {
        console.log(e.message)
        alert("PASSWORD incorrect")
    });
});


// Add Enter Key login
userLoginPassword.addEventListener("keyup", function(event) {
// Number 13 is the "Enter" key on the keyboard
if (event.keyCode === 13) {
    // Cancel the default action, if needed
    // event.preventDefault();
    // Trigger the button element with a click
    btnLogin.click();
}
});




// Add signup event
btnSignUp.addEventListener('if (window.event.keyCode == 13)', e => {
    // Get email and pass
    // TODO: CHECK 4 REAL EMAILZ
    const email = userLoginEmail.value;
    const pass = userLoginPassword.value;
    const auth = firebase.auth();

    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));
    promise
        .catch(e => console.log(e.message));
});










//인증 이벤트 처리
btnGoogle.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => {auth.signOut(); window.location.reload(true);}
signOutBtn_li.onclick = () => {auth.signOut(); window.location.reload(true);}

auth.onAuthStateChanged(user => {
    if (user) {
        //sign in
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        container1.hidden = true;
        userDetails.innerHTML = email + '<span> 안녕하세요.<span>'

        $("#login_popup").hide();
        $("#logout_li").show();


        
        
        if (self.name != 'reload') {
            self.name = 'reload';
            self.location.reload(true);
        }
        else self.name = ''; 

        var db = firebase.firestore();

        const docRef = db.collection("setting").doc(email);
        
        
        // const inputTextField = document.querySelector("#command_text");
        // const saveButton = document.querySelector("#saveButton");
        
        //Command_text save
        // saveButton.addEventListener("click", function() {
        //     const textToSave = inputTextField.value;
        //     if (!textToSave){
        //         alert("명령어를 입력하세요");
        //     } else {
            
        //     alert("Your command is :" + textToSave);
        //     console.log("Your command is :" + textToSave);
        //     docRef.set({
        //         Command_text : textToSave,
        //     }).then(function(){
        //         console.log("Status saved!");
        //     }).catch(function(error){
        //         console.log("Got an error: " + error);
        //     });
        //     }
        // });


        //Command_voice save
                
        var Command_Text, voiceUrl;
        var files = [];
        var reader ;



        document.getElementById("select").onclick = function(e){


            var input = document.createElement('input');
            input.type = 'file';    

            input.onchange = e => {
                files = e.target.files;
                reader = new FileReader();
                reader.readAsDataURL(files[0]);
            }
            input.click();

        }


        document.getElementById('upload').onclick = function(){
            Command_Text = document.getElementById('namebox').value;
            var uploadTask = firebase.storage().ref('Voices/'+email+'/'+Command_Text+".wav").put(files[0]);

            uploadTask.on('state_changed', function(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // document.getElementById('UpProgress').innerHTML = 'Upload' + progress + '%';
            },

            function(error) {
                alert(error);
                console.log('error :' + error);
            },

            function() {
                uploadTask.snapshot.ref.getDownloadURL().then(function(url){
                    voiceUrl = url;
                
                console.log(voiceUrl);
                const docRef = db.collection("setting").doc(email);
                docRef.set({
                    Command_Text : Command_Text,
                    Command_Voice_Link : voiceUrl,
                    Udate_Time : Date()
                });
            });
            alert('설정이 완료되었습니다');
            }
            
            );

        }




    } else{
        //sign out
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        container1.hidden = false;
        userDetails.innerHTML = '';

        $("#login_popup").show();
        $("#logout_li").hide();
  

        const setting_section = document.querySelector("#setting_section");
            
        setting_section.addEventListener("click", function() {
            alert("Login please")
        });
}
});









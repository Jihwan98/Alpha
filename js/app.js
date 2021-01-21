(function() {
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
    
    const signInBtn = document.getElementById('signInBtn');
    const signOutBtn = document.getElementById('signOutBtn');
    
    const userDetails = document.getElementById('userDetails');
    
    const container = document.getElementById('container');
    
    
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    
    
    
    
    // Add login event
    btnLogin.addEventListener('click', e => {
        // Get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
    
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email,pass);
        promise.catch(e => {
            console.log(e.message)
            alert("PASSWORD incorrect")
        });
    });
    
    // Add signup event
    btnSignUp.addEventListener('click', e => {
        // Get email and pass
        // TODO: CHECK 4 REAL EMAILZ
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
    
        // Sign in
        const promise = auth.createUserWithEmailAndPassword(email,pass);
        promise.catch(e => console.log(e.message));
        promise
            .catch(e => console.log(e.message));
    });
    
    
    
    
    
    
    
    
    
    
    
    
    //인증 이벤트 처리
    signInBtn.onclick = () => auth.signInWithPopup(provider);
    
    signOutBtn.onclick = () => auth.signOut();
    
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
            container.hidden = true;
            userDetails.innerHTML = email + '<span> 안녕하세요.<span>'
        } else{
            //sign out
            whenSignedIn.hidden = true;
            whenSignedOut.hidden = false;
            container.hidden = false;
            userDetails.innerHTML = '';
        }
    });
    
    }());
    
    
    
    
    
    
    
    
    
    
    
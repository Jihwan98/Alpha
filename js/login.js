/**
 * PhotoApp class
 */
class PhotoApp {
    /**
     * 생성자
     */
    constructor() {
        this.init();
        this.initEvent();
    }

    /**
     * 변수할당
     */
    init() {

        // IndexedDB 정보
        this.INDEXED_DB_NAME = 'USER'
        this.INDEXED_VERSION = 1
        this.INDEXED_STORE = 'Users'
        
        this.auth = firebase.auth()
        this.$btnGoogle = $('#btnGoogle')
    }

    /**
     * Event Binding
     */
    initEvent() {
        this.$btnGoogle.on('click', this.onGoogleClick.bind(this))
    }

    /**
     * Google 버튼 눌러서 로그인 / 회원가입
     */
    onGoogleClick(e) {
        e.preventDefault()
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        this.auth
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(this.signInWithPopup.bind(this, googleProvider))
            .catch(error => console.error('인증상태 설정 중 오류' , error))
    }

    /**
     * 구글 / 페이스북 로그인 팝업을 띄운다
     */
    signInWithPopup(provider) {
        this.auth
            .signInWithPopup(provider)
            .then(result => {
                // 로그인 결과값을 DB에 저장
                this.saveUserAtDB(result.user)
                    .then(user => {
                        // 로그인 성공 시 갤러리 입장
                        this.enterGallery()
                    })
            })
            .catch(error => console.error('로그인 오류', error))
    }

    /**
     * 회원가입 후 user 정보를 indexedDB에 저장한다.
     */
    saveUserAtDB(user) {
        if (!indexedDB) {
            return
        }
        return new Promise((resolve, reject) => {
            var request = indexedDB.open(this.INDEXED_DB_NAME, this.INDEXED_VERSION)
            const storeName = this.INDEXED_STORE
            request.onupgradeneeded = () => {
                const db = request.result
                const store = db.createObjectStore(storeName, {keyPath: 'uid'})
            }
            request.onsuccess = () => {
                const db = request.result
                const tx = db.transaction([storeName], 'readwrite')
                const store = tx.objectStore(storeName)
                
                // 저장된 user.uid를 불러온다.
                store.get(user.uid).onsuccess = event => {
                    const data = event.target.result
                    console.log('query: ', data)
                    if (!data) {
                        // 저장된 uid가 없으면 저장한다.
                        const newUser = {
                            uid: user.uid
                            , email: user.email
                            , photoURL: user.photoURL ? user.photoURL : ''
                            , displayName: user.displayName
                        }
                        store.put(newUser)
                        resolve(newUser)
                    }
                    resolve(data)
                }
            }
            request.oncomplete = () => {
                console.log('트랜잭션 완료')
                db.close();
            }
            request.onerror = error => {
                reject(error)
            }
        })
    }

    /**
     * 갤러리 입장
     * 로그인/회원가입/로그인 세션상태 체크 후 갤러리 화면으로 전환함
     */
    enterGallery() {
        this.$memberWrap.hide()
        this.$galleryWrap.show()
    }
}

/**
 * DOM Content Loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    window.photoApp = new PhotoApp();
});

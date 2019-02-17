var formLogin = document.getElementById('form');

formLogin.addEventListener('submit', function(e) {
    e.preventDefault();

    var email = e.target.email.value;
    var password = encPass(e.target.pwd.value);
    e.target.email.value = '';
    e.target.pwd.value = '';
    console.log('email: ', email);
    console.log('password: ', password);
});

// 'lallaveweb'
function encPass(password) {
    var pt = password;
    var key = CryptoJS.MD5("5dc8f460c3ccaf86d2e276a2779f5d25".toUpperCase());

    key.words[4] = key.words[0];
    key.words[5] = key.words[1];

    // create a 64-bit zero filled
    var iv = CryptoJS.lib.WordArray.create(64 / 8);
    var encrypted = CryptoJS.TripleDES.encrypt(pt, key, {
        iv: iv
    });
    var encryptedBase64 = encrypted.toString();
    return encryptedBase64;
}
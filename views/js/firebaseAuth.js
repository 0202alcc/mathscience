function signInWithGoogle() {
	var googleAuthProvider = new firebase.auth.GoogleAuthProvider
	firebase.auth().signInWithPopup(googleAuthProvider)
		.then(function(data) {
			console.log(data)
			var user = firebase.auth().currentUser
			var idToken = user.idToken
			var image = user.photoURL
			var email = user.email
			var name = user.displayName
			//set the image, p, and h3 to be the photo url of google acct, email, and display name
			document.getElementById('profileInfo').style.display = "inline"
			document.getElementById('google-pic').style.display = "inline"
			document.getElementById('gone').innerHTML = null
			document.getElementById('google-pic').setAttribute('src', image)
			document.getElementById('pfp').setAttribute('src', image)
			document.getElementById('google-email').innerHTML = email
			document.getElementById('google-displayName').innerHTML = name
		})
		.catch(function(error) {
			console.log(error)
		})
}

function checkIfLoggedIn() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log('User signed in')
			console.log(user)
			// do logged in stuff
			var user = firebase.auth().currentUser
			var idToken = user.idToken
			var image = user.photoURL
			var email = user.email
			var name = user.displayName
			document.getElementById('profileInfo').style.display = "inline"
			document.getElementById('google-pic').style.display = "inline"
			document.getElementById('gone').innerHTML = null
			document.getElementById('google-pic').setAttribute('src', image)
			document.getElementById('pfp').setAttribute('src', image)
			document.getElementById('google-email').innerHTML = email
			document.getElementById('google-displayName').innerHTML = name
		}
		else {
			console.log('User not signed in.')
			// do not logged in stuff
		}
	})

}
window.onload = function() {
	checkIfLoggedIn()
}

function signOut() {
	firebase.auth().signOut()

	location.reload();
}
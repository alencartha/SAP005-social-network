// exporte suas funções

// export const createPost = (post) => {
//   firebase
//     .firestore()
//     .collection('post')
//     .add({
//       text: post
//     });
// };



export const likePost =(likes) =>{
  likePost = likePost +1;
}


const post=[];

export const createPost = (mensagem) => {
  post.push(mensagem);
};

export const getPosts =()=>{
  return post;
}

export const handleSignUp = (email, password) => {
  firebase.auth()
  .createUserWithEmailAndPassword(email, password)
  .catch((error) => {
    var errorMessage = error.message;
    alert(`${errorMessage}`)
    console.log("deuerrado!");
  });
};

export const handleGoogleSignUp = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider)
}



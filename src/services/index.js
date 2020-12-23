// exporte suas funções


 export const createPost = (post) => {
   firebase
     .firestore()
     .collection('post')
     .add({
        name: firebase.auth().currentUser.displayName,
        text: post,
        likes:0,
        comentarios:[]
     })
 };

export const getPosts =()=>{
  const post = firebase.firestore().collection('post')
  post.get().then(snap=>{
    snap.forEach(doc=>{
      addPost(doc)
      console.log(doc.data())
    });
      
    });
  return post;
};

export const addPost = (post) =>{
  const user = post.data().name;
  const likes = post.data().likes;
  const postTemplate= 
  `
      <section id="post-container" id="${post.id}">
        <div class="post-item">
            <img src="../../img/user.png">
            <p>${post.data().name}</p>
        </div>
        <div id="text-container">
          <p id="text-post">${post.data().text} </p>
        </div>
      </section>
      <section id="container-edit"> 
        <div class="item-edit">
          <img src="../../img/like.png" alt="like" id="like">
          <p id="number-of-likes">${post.data().likes} </p>
        </div>
        <div class="item-edit">
            <p id="edit-post">EDITAR</p>
            <p id="delete-post">DELETAR</p>
        </div>     
      </section>
  `
  document.getElementById("text").innerHTML += postTemplate;
  document.getElementById("hello-user").innerHTML = `Olá, ${user} !`;
};

export const likes = (id, likes) => {
  firebase
    .firestore()
    .collection('post')
    .doc(id)
    .update({
      likes: likes + 1,
    });
};

export const handleSignUp = (email, password) => {
  firebase.auth()
  .createUserWithEmailAndPassword(email, password)
  .then(user =>{
    console.log("usuario")
    alert("Usuário criado com sucesso!")
  })
  .catch((error) => {
    let errorMessage = error.message;
    alert(`${errorMessage}`)
  });
};

export const handleGoogleSignUp = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');
  firebase.auth().signInWithRedirect(provider);
  alert(`Bem-vindo ${firebase.auth().currentUser.displayName}`)
};

export const handleSignIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) =>{
    alert(`Bem-vindo ${firebase.auth().currentUser.email}!`)
  })
  .catch((error) => {
    let errorMessage = error.message;
    alert(`${errorMessage}`)
  });
};

export const handleSingOut = () => {
  firebase.auth().signOut()
  .then(()=>{
    alert("Obrigada por acessar nossa rede!")
  })
  .catch((error) => {
    let errorMessage = error.message;
    alert(`${errorMessage}`)
  });
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      onNavigate('/login');
    });
};


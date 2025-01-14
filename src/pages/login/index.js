import { handleGoogleSignIn, handleSignIn } from '../../services/index.js';
import showModal from '../../components/showModal.js';
import { onNavigate } from '../../utils/history.js';

export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <section id="page-login">
      <div id="login-info">
        <img id="logo-login" src="../../img/img-login.jpg" alt="logo login">
        <p id="text-login">Vestibular chegando, dúvidas em como fazer uma boa redação?
           Relaxe estamos aqui para te ajudar!
           KAT - Redações é uma aplicação desenvolvida para você que está com dúvidas em redações e 
           precisa daquela dica extra.
           Faça seu cadastro e aproveite tudo que a aplicação lhe oferece para arrasar no vestibular.</p>
      </div>
      <form id="formLogin">
        <section>
          <h2>Acesse sua conta</h2>
        </section>
        <p class="inputInformationLogin">
          <input class="input" id="email" type="email" placeholder="E-mail cadastrado" required>
          <input class="input" id="password" type="password" placeholder="Senha" required>
        </p>
        <button type="button" id="btnLogin">Entrar</button>
        <div class="other">
          <div class="empty"> </div>
          <div> OU </div>
          <div class="empty"> </div>
        </div>
        <button type="button" id="btnGoogle">
            <span>
                <img id="imgGoogle" src="../../img/google-symbol-1.png">
            </span>
            <span>Entrar com Google</span>
        </button>
        <p>Ainda não possui cadastro, <a id="register">registre-se.</a></p>
      </form>
    </section>
    <footer>
      <div id="kat">
        <p id="copy">&copy; Desenvolvido por KAT - Redações</p>
      </div>
      <div id="devs">
        <p><a id="ale" href="http://github.com/ale-alves/" target="_blank">Alessandra Alves</a></p>
        <p><a id="kau" href="http://github.com/kauanaagostini/" target="_blank">Kauana Agostini</a></p>
        <p><a id="tha" href="http://github.com/alencartha/" target="_blank">Thaís Alencar</a></p>
      </div>
    </footer>
  `;

  const btnGoogle = rootElement.querySelector('#btnGoogle');
  const btnLogin = rootElement.querySelector('#btnLogin');
  const btnSignUp = rootElement.querySelector('#register');

  btnLogin.addEventListener('click', () => {
    const email = rootElement.querySelector('#email').value;
    const password = rootElement.querySelector('#password').value;
    handleSignIn(email, password)
      .then((data) => {
        const { email } = data;
        const { name } = data;
          localStorage.setItem('email', email);
          localStorage.setItem('name', name);
        onNavigate('/publicacoes');
      })
      .catch((error) => {
        const errorMessage = error.message;
        showModal(errorMessage);
      });
  });

  btnGoogle.addEventListener('click', () => {
    handleGoogleSignIn()
      .then(() => {
        onNavigate('/publicacoes');
      })
      .catch((error) => {
        const errorMessage = error.message;
        showModal(errorMessage);
      });
  });

  btnSignUp.addEventListener('click', () => {
    onNavigate('/criar-conta');
  });

  return rootElement;
};

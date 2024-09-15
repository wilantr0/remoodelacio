export const estilos = `

html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #f1f0f1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 600px;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

p {
  padding: 20px;
}

button {
  border-radius: 20px;
  border: 1px solid #0d6efd;
  color: #0d6efd;
  background-color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-top: 10px;
}

input[type='submit'] {
  border-radius: 20px;
  border: 1px solid #0d6efd;
  background-color: #0d6efd;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-top: 10px;

  &:focus {
    border: 1px solid #0d6efd;
  }
}

button {
  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  &.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }
}

/* Style Input Fields */

input {
  background-color: #eee;
  border: none;
  margin: 0px 0;
  width: 100%;
}

.password-container {
  background-color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 8px;
}

#password {
  margin: 0;
}

.social-login {
  display: flex;
  justify-content: center;
  align-items: center;
}

.input {
  background-color: #eee;
  border: none;
  width: 100%;
  margin: 8px 0px;
  padding: 12px 15px;
}

input {
  &:focus {
    outline: none;
    border-bottom: 2px solid #333;
  }

  &:active {
    outline: none;
  }
}

div > input:focus ~ span {
  border-bottom: 2px solid #333;
}

svg {
  width: 40px;
}

.show-password-checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  height: 100%;
}

label:hover {
  cursor: pointer;
}

#showPassword {
  background: transparent;
  border: none;
  color: #333;
  padding: 0;
  margin: 0;
}

select {
  background-color: #eee;
  border-right: 10px solid transparent;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

/* Set motion Keyframes */
@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #0d6efd;

  /* fallback for old browsers */
  background: rgb(17, 88, 193);
  background: -moz-linear-gradient(
    150deg,
    rgba(17, 88, 193, 1) 0%,
    rgba(187, 86, 107, 1) 75%
  );
  background: -webkit-linear-gradient(
    150deg,
    rgba(17, 88, 193, 1) 0%,
    rgba(187, 86, 107, 1) 75%
  );
  background: linear-gradient(
    150deg,
    rgba(17, 88, 193, 1) 0%,
    rgba(187, 86, 107, 1) 75%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1158c1",endColorstr="#bb566b",GradientType=1);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

button:focus {
  outline: 0;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;

  a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
  }
}

/* icons */

/* at the end remove all links Blue Color */

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}
`;

export default estilos;

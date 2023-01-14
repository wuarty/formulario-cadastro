class Validaform {
  constructor() {
    this.formulario = document.querySelector(".form");
    this.evento();
  }

  evento() {
    this.formulario.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const campos = this.checaCampos();
    const senhas = this.checaSenhas();

    if (campos && senhas) {
      alert("enviado");
      this.formulario.submit();
    }
  }

  checaSenhas() {
    let valid = true;
    const senha = this.formulario.querySelector(".senha");
    const repetirSenha = this.formulario.querySelector(".repetir");

    if (senha.value !== repetirSenha.value) {
      this.criaErro(senha, `Campos senha e repitir senha precisam ser iguais`);
      this.criaErro(
        repetirSenha,
        `Campos senha e repitir senha precisam ser iguais`
      );
    }

    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, `A senha precisam ter entre 6 a 12 caracteres`);
    }

    return valid;
  }

  checaCampos() {
    let valid = true;

    for (let errorText of this.formulario.querySelectorAll(".error-text")) {
      errorText.remove();
    }

    for (let campo of this.formulario.querySelectorAll(".validar")) {
      const label = campo.previousElementSibling.innerText;
      if (!campo.value) {
        this.criaErro(campo, `O campo ${label} não pode estar em branco.`);
        valid = false;
      }

      if (campo.classList.contains("cpf")) {
        if (!this.cpfValida(campo)) valid = false;
      }
      if (campo.classList.contains("usuario")) {
        if (!this.usuarioValida(campo)) valid = false;
      }
    }
    return valid;
  }

  usuarioValida(campo) {
    const usuario = campo.value;
    let valid = true;
    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, "O usuario precisa ter entre 3 a 12 caracteres");
      valid = false;
    }
    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(
        campo,
        "Nome de usuario precisa conter a apenas letras e números"
      );
      valid = false;
    }
    return valid;
  }

  cpfValida(campo) {
    const cpf = new ValidaCpf(campo.value);

    if (!cpf.valida()) {
      this.criaErro(campo, "CPF invalido");
    }
    return true;
  }

  criaErro(campo, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("error-text");
    campo.insertAdjacentElement("afterend", div);
  }
}

const valida = new Validaform();

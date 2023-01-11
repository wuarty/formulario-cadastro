class ValidaCpf {
  constructor(cpfEnviado) {
    Object.defineProperty(this, "cpflimpo", {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfEnviado.replace(/\D+/g, ""),
    });
  }

  eSequencia() {
    return this.cpflimpo.charAt(0).repeat(11) === this.cpflimpo;
  }

  geraCpfnovo() {
    const cpfBranco = this.cpflimpo.slice(0, -2);
    const digito1 = this.geraDigito(cpfBranco);
    const digito2 = this.geraDigito(cpfBranco + digito1);
    this.novoCpf = cpfBranco + digito1 + digito2;
  }

  geraDigito(cpfBranco) {
    let total = 0;
    let reverso = cpfBranco.length + 1;

    for (let stringNu of cpfBranco) {
      total += reverso * Number(stringNu);
      reverso--;
    }

    const digito = 11 - (total % 11);
    return digito <= 9 ? digito : "0";
  }

  valida() {
    if (!this.cpflimpo) return false;
    if (typeof this.cpflimpo !== "string") return false;
    if (this.cpflimpo.length !== 11) return false;
    if (this.eSequencia()) return false;
    this.geraCpfnovo();

    return this.novoCpf === this.cpflimpo;
  }
}

let cpfValida = new ValidaCpf("070.987.720-03");
console.log(cpfValida.valida());

if (cpfValida.valida()) {
  console.log("Cpf válido");
} else {
  console.log("Cpf inválido");
}

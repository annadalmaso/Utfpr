/*Clase principal, construtora, garante que ao iniciar um nome objeto 
ele tera todas as caracterisitcas listadas
this ponteiro de referencia para lista(classe)
*/
class Lista {
    constructor( idade, sexo, corOlhos, corCabelo) {
      this.idade = idade;
      this.sexo = sexo;
      this.corOlhos = corOlhos;
      this.corCabelo = corCabelo;
    }
  }
  
  /*Aqui esta sendo feito a tabela */
  class UI {
    static displayLista() {
      const listas = Store.getListas(); 
  
      listas.forEach((lista) => UI.addToList(lista));
    }
  
    static addToList(lista) {
      const list = document.querySelector('#Listar');
  
      const row = document.createElement('tr');
      
      row.innerHTML = `
      <tbody>
        <tr>
          <td>x</td>
          <td>${lista.idade}</td>
          <td>${lista.sexo}</td>
          <td>${lista.corOlhos}</td>
          <td>${lista.corCabelo}</td>
        </tr>
      </tbody>  
      `;
  
      list.appendChild(row);
    }
  
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#form-id');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  //ainda não esta funcionando direito,  AARUUMMAARR
    static clearFields() {
      document.querySelector('#idade').value = '';
      // document.querySelector('input[name=sexo]:checked') =  '';
      document.querySelector('#corOlhos').value = '';
      document.querySelector('#corCabelo').value = '';
    }
  }
  
  //autoincrement ID
  function generatorId(){
  
  }
  
  
  /* Aqui faz a consulta no local storge se tiver dados vai dar o retorno do JSON, se não
  vai retornar um array vazio para prencher. assim ele na primeira tentaiva da uma msg de erro,
  e depois são prenchidas conforme é informado nos campos */
  class Store {
    static getListas() {
      let listas;
      if (localStorage.getItem('listas') === null) {
        listas = [];
      } else {
        listas = JSON.parse(localStorage.getItem('listas'));
      }
  
      return listas; //lista aqui é um objeto
    }
  
    /*Pega a lista que é objeto e coloca no localstorege em formato JSON*/
    static addList(lista) {
      const listas = Store.getListas();
      listas.push(lista);
      localStorage.setItem('listas', JSON.stringify(listas));
    }
  
  }
  
  // Escuta: em determinada tag da DOM 
  document.addEventListener('DOMContentLoaded', UI.displayLista);
  
  // Seleciona o formulario pelo ID
  document.querySelector('#form-id').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // tentativa de fazer funcionar ID
    const id =  generatorId()
  
    const idade = document.querySelector('#idade').value;
    
    const sexo = document.querySelector('input[name=sexo]:checked').value;
    console.log(sexo)

    var corOl = document.getElementById('select');
    const corOlhos = select.options[corOl.selectedIndex].value
    console.log(corOlhos)
  
    var corC = document.getElementById('select1')
    const corCabelo = select1.options[corC.selectedIndex].value
    console.log(corCabelo)
  
  
    // Validação para salvar
    if (idade === '' || sexo === '' || corOlhos === '' || corCabelo === '') {
      UI.showAlert('Por favor Preencha todos os campos', 'danger');
    } else {
      // Instancia da lista, criar um novo objeto com parametros obrigatorios
      const lista = new Lista(idade, sexo, corOlhos, corCabelo);
  
      // Adicionando a lista
      UI.addToList(lista);
  
      // Adicionando ao localStorge
      Store.addList(lista);
  
      // Show success message
      UI.showAlert('Item adicionado', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
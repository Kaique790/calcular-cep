const state = document.getElementById('state');
const district = document.getElementById('district');
const street = document.getElementById('street');

function getCep(cep){fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(data => data.json())
    .then(json => {
        console.log(json);
        if (json.estado == undefined || json.bairro == undefined || json.logradouro == undefined) {
            state.innerHTML = 'inexistente';
            district.innerHTML = 'inexistente';
            street.innerHTML = 'inexistente';
        } else {
           state.innerHTML = json.estado;
            district.innerHTML = json.bairro;
            street.innerHTML = json.logradouro; 
        }
        
    })
    .catch(error => console.error('Erro ao buscar o CEP:', error));
}
const form = document.getElementById('form');
const inputCep = document.getElementById('cep');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (checkInputCep()) { 
        const cep = inputCep.value.replace('-', '').trim();
        getCep(cep); 
    };
});

function checkInputCep(){
    const cepValue = inputCep.value.replace('-', '')
    if(cepValue === '' || cepValue.length < 8 || isNaN(cepValue)) {
        inputCep.parentElement.classList.add('erro');
        return false;
    } else {
        inputCep.parentElement.classList.remove('erro');
        return true;
    };
};
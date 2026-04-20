// ===============================
//  CAMADA DE DADOS
// ===============================
let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
let medicos = JSON.parse(localStorage.getItem('medicos')) || [];
let consultas = JSON.parse(localStorage.getItem('consultas')) || [];

function salvarDados() {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    localStorage.setItem('medicos', JSON.stringify(medicos));
    localStorage.setItem('consultas', JSON.stringify(consultas));
}

// ===============================
//  CAMADA DE NEGÓCIO
// ===============================

// valida CPF duplicado
function cpfJaExiste(cpf) {
    return pacientes.some(p => p.cpf === cpf);
}

// valida CRM duplicado
function crmJaExiste(crm) {
    return medicos.some(m => m.crm === crm);
}

// cria paciente
function criarPaciente(dados) {
    if (cpfJaExiste(dados.cpf)) {
        alert('CPF já cadastrado!');
        return false;
    }
    pacientes.push(dados);
    salvarDados();
    return true;
}

// cria médico
function criarMedico(dados) {
    if (crmJaExiste(dados.crm)) {
        alert('CRM já cadastrado!');
        return false;
    }
    medicos.push(dados);
    salvarDados();
    return true;
}

// cria consulta
function criarConsulta(paciente, medico, data) {
    consultas.push({ paciente, medico, data });
    salvarDados();
}

// ===============================
//  CAMADA DE APRESENTAÇÃO
// ===============================

function atualizarLista(elementoId, array, tipo) {
    const lista = document.getElementById(elementoId);
    lista.innerHTML = '';

    array.forEach((item) => {
        let li = document.createElement('li');

        if (tipo === 'paciente') {
            li.textContent = `${item.nome} (CPF: ${item.cpf}), Gênero: ${item.genero}, Motivo: ${item.motivo}`;
        }

        if (tipo === 'medico') {
            li.textContent = `${item.nome} (CRM: ${item.crm})`;
        }

        if (tipo === 'consulta') {
            li.textContent = `${item.data} - Paciente: ${item.paciente.nome} (${item.paciente.genero}), Médico: ${item.medico.nome}, Motivo: ${item.paciente.motivo}`;
        }

        lista.appendChild(li);
    });
}

function atualizarSelects() {
    const pacienteSelect = document.getElementById('pacienteConsulta');
    const medicoSelect = document.getElementById('medicoConsulta');

    pacienteSelect.innerHTML = '';
    medicoSelect.innerHTML = '';

    pacientes.forEach((p, i) => {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = p.nome;
        pacienteSelect.appendChild(option);
    });

    medicos.forEach((m, i) => {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = m.nome;
        medicoSelect.appendChild(option);
    });
}

// ===============================
//  CAMADA DE CONTROLE (EVENTOS)
// ===============================

// Paciente
document.getElementById('form-paciente').addEventListener('submit', function(e){
    e.preventDefault();

    const paciente = {
        nome: document.getElementById('nomePaciente').value,
        cpf: document.getElementById('cpfPaciente').value,
        telefone: document.getElementById('telefonePaciente').value,
        genero: document.getElementById('generoPaciente').value,
        motivo: document.getElementById('motivoPaciente').value,
        historico: document.getElementById('historicoPaciente').value
    };

    if (criarPaciente(paciente)) {
        atualizarLista('lista-pacientes', pacientes, 'paciente');
        atualizarSelects();
        this.reset();
    }
});

// Médico
document.getElementById('form-medico').addEventListener('submit', function(e){
    e.preventDefault();

    const medico = {
        nome: document.getElementById('nomeMedico').value,
        crm: document.getElementById('crmMedico').value,
        especialidade: document.getElementById('especialidadeMedico').value
    };

    if (criarMedico(medico)) {
        atualizarLista('lista-medicos', medicos, 'medico');
        atualizarSelects();
        this.reset();
    }
});

// Consulta
document.getElementById('form-consulta').addEventListener('submit', function(e){
    e.preventDefault();

    const paciente = pacientes[document.getElementById('pacienteConsulta').value];
    const medico = medicos[document.getElementById('medicoConsulta').value];
    const data = document.getElementById('dataConsulta').value;

    criarConsulta(paciente, medico, data);

    atualizarLista('lista-consultas', consultas, 'consulta');
    this.reset();
});

// ===============================
//  INICIALIZAÇÃO
// ===============================
function iniciarSistema() {
    atualizarLista('lista-pacientes', pacientes, 'paciente');
    atualizarLista('lista-medicos', medicos, 'medico');
    atualizarLista('lista-consultas', consultas, 'consulta');
    atualizarSelects();
}

iniciarSistema();

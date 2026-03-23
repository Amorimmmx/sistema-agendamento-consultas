// --- Dados ---
let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
let medicos = JSON.parse(localStorage.getItem('medicos')) || [];
let consultas = JSON.parse(localStorage.getItem('consultas')) || [];

// --- Salvar no localStorage ---
function salvarDados() {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    localStorage.setItem('medicos', JSON.stringify(medicos));
    localStorage.setItem('consultas', JSON.stringify(consultas));
}

// --- Atualizar listas ---
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

// --- Atualizar selects ---
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

// --- Inicialização ---
function iniciarSistema() {
    atualizarLista('lista-pacientes', pacientes, 'paciente');
    atualizarLista('lista-medicos', medicos, 'medico');
    atualizarLista('lista-consultas', consultas, 'consulta');
    atualizarSelects();
}

// --- Eventos ---

// Paciente
document.getElementById('form-paciente').addEventListener('submit', function(e){
    e.preventDefault();

    const nome = document.getElementById('nomePaciente').value;
    const cpf = document.getElementById('cpfPaciente').value;

    // Evitar CPF duplicado
    if (pacientes.some(p => p.cpf === cpf)) {
        alert('CPF já cadastrado!');
        return;
    }

    const paciente = {
        nome,
        cpf,
        telefone: document.getElementById('telefonePaciente').value,
        genero: document.getElementById('generoPaciente').value,
        motivo: document.getElementById('motivoPaciente').value,
        historico: document.getElementById('historicoPaciente').value
    };

    pacientes.push(paciente);

    atualizarLista('lista-pacientes', pacientes, 'paciente');
    atualizarSelects();
    salvarDados();

    this.reset();
});

// Médico
document.getElementById('form-medico').addEventListener('submit', function(e){
    e.preventDefault();

    const crm = document.getElementById('crmMedico').value;

    // Evitar CRM duplicado
    if (medicos.some(m => m.crm === crm)) {
        alert('CRM já cadastrado!');
        return;
    }

    const medico = {
        nome: document.getElementById('nomeMedico').value,
        crm,
        especialidade: document.getElementById('especialidadeMedico').value
    };

    medicos.push(medico);

    atualizarLista('lista-medicos', medicos, 'medico');
    atualizarSelects();
    salvarDados();

    this.reset();
});

// Consulta
document.getElementById('form-consulta').addEventListener('submit', function(e){
    e.preventDefault();

    const paciente = pacientes[document.getElementById('pacienteConsulta').value];
    const medico = medicos[document.getElementById('medicoConsulta').value];
    const data = document.getElementById('dataConsulta').value;

    const consulta = { paciente, medico, data };

    consultas.push(consulta);

    atualizarLista('lista-consultas', consultas, 'consulta');
    salvarDados();

    this.reset();
});

// Iniciar sistema ao carregar
iniciarSistema();
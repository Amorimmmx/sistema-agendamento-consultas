# Clínica Médica

Sistema simples para **cadastro de pacientes, médicos e agendamento de consultas**, desenvolvido com HTML, CSS e JavaScript.  

O projeto salva os dados localmente no navegador usando **localStorage**, garantindo que as informações não se percam ao atualizar a página.

---

## Tecnologias utilizadas

- HTML5  
- CSS3  
- JavaScript (ES6)  
- localStorage para persistência de dados  

---

## Funcionalidades

1. **Cadastro de pacientes**  
   - Nome, CPF, telefone, gênero, motivo da consulta e histórico.  
   - Evita CPF duplicado.  

2. **Cadastro de médicos**  
   - Nome, CRM e especialidade.  
   - Evita CRM duplicado.  

3. **Agendamento de consultas**  
   - Seleção de paciente e médico, com data e hora da consulta.  
   - Mostra a lista de consultas cadastradas.  

4. **Persistência de dados**  
   - Dados são salvos no navegador usando `localStorage`.  
   - Ao recarregar a página, os dados permanecem.  

---

## Como usar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/clinica-medica.git

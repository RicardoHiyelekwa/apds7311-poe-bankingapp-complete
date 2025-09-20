# APDS7311 - Portfolio of Evidence (PoE)

Este repositório contém o projeto desenvolvido como parte do **Portfolio of Evidence (PoE)** para a disciplina **APDS7311**.  
O projeto foi desenvolvido em **React + TypeScript** e complementado com pipelines de CI/CD, análise de qualidade de código e auditoria de segurança em cloud.

---

## 📌 Estrutura do Projeto
- **Frontend:** React + TypeScript
- **Backend:** Node.js
- **Pipeline CI/CD:** CircleCI
- **Análise de Código:** SonarQube + ngrok
- **Auditoria de Segurança:** ScoutSuite (AWS)

---

## 📍 Parte 1 – Desenvolvimento da Aplicação
- Aplicação desenvolvida em **React + TypeScript** para o frontend.  
- Implementação de backend em **Node.js**.  
- Uso de boas práticas de **clean code**, tipagem estática (TypeScript) e componentes reutilizáveis.  

---

## 📍 Parte 2 – Integração com CircleCI e SonarQube
- Configuração de pipeline no **CircleCI** para build e execução de testes.  
- **SonarQube** configurado em **Docker local**:  
  ```bash
  docker run -d --name sonarqube -p 9000:9000 sonarqube:lts
  ```
- Exposição do SonarQube com **ngrok** para acesso público e integração com CircleCI:  
  ```bash
  ngrok http 9000
  ```
- O CircleCI passou a executar **sonar-scanner** conectado ao SonarQube via URL pública fornecida pelo ngrok.  

---

## 📍 Parte 3 – Auditoria de Segurança com ScoutSuite
- Instalação do **AWS CLI** e configuração do utilizador `audit-user`.  
- Execução do **ScoutSuite** para auditar recursos AWS:  
  ```bash
  python scout.py aws --profile default
  ```
- Geração de relatórios HTML em:  
  ```
  scoutsuite-report/aws-default.html
  ```
- Notas: alguns erros como `SubscriptionRequiredException` e `OptInRequired` surgiram, pois certos serviços AWS (ex: Direct Connect, Redshift, EMR) não estavam habilitados na conta.  
- Justificação: esses erros **não afetam a segurança**, apenas indicam que o serviço não existe ou não está subscrito.  

---

## 📂 Estrutura do Repositório
```
/backend         → Código backend (Node.js)
/frontend        → Código frontend (React + TypeScript)
.circleci        → Configuração do pipeline CI/CD
scoutsuite-report → Relatórios de auditoria de segurança
README.md        → Este documento
```

---

## 🚀 Execução Local
### 1. Clonar o repositório
```bash
git clone https://github.com/RicardoHiyelekwa/apds7311-poe-bankingapp-complete.git
cd APDS7311-POE
```

### 2. Instalar dependências
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Rodar frontend e backend
```bash
cd backend && npm start
cd frontend && npm start
```

### 4. Executar SonarQube com Docker
```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts
ngrok http 9000
```

### 5. Executar ScoutSuite
```bash
python scout.py aws --profile default
```

---

## ✅ Conclusão
Este projeto demonstra:
- Desenvolvimento em **React + TypeScript** com Node.js.  
- Integração CI/CD com **CircleCI**.  
- Análise de qualidade de código com **SonarQube + ngrok**.  
- Auditoria de segurança em **AWS com ScoutSuite**.  

Assim, cobre as práticas de **desenvolvimento seguro, automação e monitorização contínua**, conforme exigido no PoE da disciplina APDS7311.

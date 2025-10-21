
MANUTENÇÃO PREDITIVA COM ESP32 + OPENPLC + MODBUS TCP + MERN
============================================================

📌 OBJETIVO
Desenvolver um sistema de manutenção preditiva para ambientes críticos (ex: data centers), monitorando temperatura via sensor LM35 conectado ao ESP32 com OpenPLC. O backend Node.js coleta dados via Modbus TCP, aplica lógica de alerta e disponibiliza uma API REST para visualização e análise.

------------------------------------------------------------
🔧 COMPONENTES DO SISTEMA
------------------------------------------------------------

1. HARDWARE
- ESP32 Dev Kit
- Sensor LM35 (temperatura e umidade)
- Conexão Wi-Fi

2. SOFTWARE
- OpenPLC rodando no ESP32
- Backend Node.js + Express
- MongoDB para armazenamento
- React (frontend opcional)
- Protocolo Modbus TCP

------------------------------------------------------------
🧱 ARQUITETURA DE PASTAS DO BACKEND
------------------------------------------------------------

manutencao-preditiva-backend/
├── server.js               # Ponto de entrada do servidor
├── .env                    # Variáveis de ambiente
├── config/
│   └── db.js               # Conexão com MongoDB
├── modbus/
│   └── client.js           # Cliente Modbus TCP
│   └── poller.js           # Leitura periódica dos registradores
├── models/
│   └── SensorData.js       # Modelo de dados do sensor
│   └── Alert.js            # Modelo de alertas
├── controllers/
│   └── sensorController.js # Lógica de negócio
│   └── alertController.js  # Lógica de alertas
├── routes/
│   └── sensorRoutes.js     # Endpoints da API
│   └── alertRoutes.js      # Endpoints de alertas
├── utils/
│   └── thresholds.js       # Limiares configuráveis
│   └── logger.js           # Logs customizados

------------------------------------------------------------
🪜 PROGRAMA LADDER (OPENPLC)
------------------------------------------------------------

%IW0 → tempCPU (ex: 305 = 25 °C)  
%MW0 → tempLimit (ex: 300 = 24.0 °C)  
%QX0.0 → cooler  
%QX0.1 → alarme  
%T0 → Temporizador TP (T#10s)

Lógica Ladder:

|----[ %IW0 > %MW0 ]----( %QX0.0 )----|  // Ativa o cooler se tempCPU > tempLimit  
|----[ %IW0 > %MW0 ]----[ TP T#10s ]----( %QX0.1 )----|  // Ativa alarme após 10s de temperatura crítica


------------------------------------------------------------
📡 COMUNICAÇÃO MODBUS TCP
------------------------------------------------------------

- ESP32 atua como escravo Modbus TCP
- Backend atua como mestre, lendo registradores via `modbus-serial`
- Intervalo de leitura configurável (ex: a cada 10 segundos)

------------------------------------------------------------
🧠 LÓGICA DE ALERTA
------------------------------------------------------------

- Se temperatura > limite (ex: 25 °C), gerar alerta
- Salvar leitura e alerta no MongoDB
- Expor via API REST para frontend ou sistemas externos

------------------------------------------------------------
🔐 VARIÁVEIS DE AMBIENTE (.env)
------------------------------------------------------------

PORT=xxxx
MONGO_URI=mongodb://localhost:xxxxx/manutencao
MODBUS_HOST=xxx.xxx.x.xxx
MODBUS_PORT=xxx
TEMP_LIMIT=xx

------------------------------------------------------------
📊 ENDPOINTS DA API
------------------------------------------------------------

GET /api/sensors/latest       → Última leitura
GET /api/alerts               → Histórico de alertas
POST /api/config              → Atualizar limites
GET /api/status               → Estado atual do sistema

------------------------------------------------------------
📌 APLICAÇÕES REAIS
------------------------------------------------------------

- Monitoramento ambiental em data centers
- Prevenção de falhas térmicas em quadros elétricos
- Controle de temperatura em salas técnicas e telecom
- Registro histórico para auditoria e análise preditiva

MIT License

Copyright (c) 2025 iothingzzz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


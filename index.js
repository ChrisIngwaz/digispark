const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Esto permite que tu servidor entienda JSON (un formato que usa Payphone para enviar datos)
app.use(express.json());

// Esta es la ruta donde Payphone enviará sus notificaciones
app.post('/webhook/payphone', (req, res) => {
  const { status, transactionId, amount } = req.body;

  // Aquí puedes hacer lo que quieras con los datos que te envía Payphone
  console.log(`Estado: ${status}, ID de Transacción: ${transactionId}, Monto: ${amount}`);

  // Responde a Payphone que todo salió bien
  res.status(200).send('Notificación recibida');
});

// Inicia el servidor en el puerto que definiste
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});

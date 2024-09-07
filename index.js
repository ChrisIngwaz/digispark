const express = require('express');
const axios = require('axios'); // Importa axios para hacer llamadas HTTP
const app = express();
const PORT = process.env.PORT || 3000;

// Esto permite que tu servidor entienda JSON (un formato que usa Payphone para enviar datos)
app.use(express.json());

// Esta es la ruta donde Payphone enviará sus notificaciones
app.post('/webhook/payphone', async (req, res) => {
  const { status, transactionId, amount } = req.body;

  try {
    // Aquí le pedimos a Payphone más información sobre la transacción
    const response = await axios.post(
      'https://pay.payphonetodoesposible.com/api/button/V2/Confirm',
      {
        transactionId: transactionId, // El ID de la transacción que recibimos
        clientTransactionId: "dSDiyDGO90WLWwzf7NGjew", // Esto es como un nombre especial para la transacción
      },
      {
        headers: {
          'Authorization': `Bearer Q8Fak2wDKiAQctM0Lyx5EmgsDIEVH2AJ8pYyPbc3Szi1OR2akVBPbwxK-iyF8JmcXmqnQncnvSk0iHOmfYnaLTZBdHyNBRGD9Ho3ABsIQX7mUbl7v2Ro8XTTmM3MT1OleSq9TpGrWMNsnyuD3LLP6hC5LOjRdRhQLlFw6XUe2XtF68NL8G2U1f24_AuSsk7LlvrppGwBrzdpxDlmX-HR3o7aE47oqaBhok5ikFSGdG3yKLWMjGTWUWxCTEh94nN6LGezY5UrJVPB4MRjcEFi1VKHfT8NTT6R3aqSFI9h2ZVFCtqoE7qxJUAPjrqIclIKMcxCmg` // Esto es como una llave para abrir la puerta
        }
      }
    );

    console.log(`Estado: ${status}, ID de Transacción: ${transactionId}, Monto: ${amount}`);
    console.log('Respuesta de Payphone:', response.data);

    // Decimos que todo salió bien
    res.status(200).send('Notificación recibida y confirmación enviada');
  } catch (error) {
    console.error('Error al confirmar la transacción:', error);
    res.status(500).send('Error al confirmar la transacción');
  }
});

// Inicia el servidor en el puerto que definiste
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});

import axios from 'axios';

export async function sendReport(formData, mensaje) {
  try {
    // Definir el objeto con los parámetros que espera la función Lambda
    const requestBody = {
      from: formData.from,
      to: formData.recipient,
      subject: formData.subject,
      student: formData.studentName,
      mensaje: mensaje, // Incluyendo el mensaje HTML completo
    };

    // Encabezados de la solicitud
    const headers = {
      'authorizationToken': 'allow',  // O cambiar a "Authorization"
      'Content-Type': 'application/json'
    };

    // Realizar la solicitud POST a Lambda usando axios
    const response = await axios.post(
      "https://23pg3d1bg8.execute-api.us-east-1.amazonaws.com/KPA-Services/WeeklyReport",
      requestBody,
      { headers }
    );

    console.log('Reporte enviado con éxito:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error al enviar el reporte:', error);
    throw error;
  }
}

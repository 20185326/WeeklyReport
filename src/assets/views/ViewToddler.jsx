import React, { useState,useEffect } from 'react';
import PasswordPopup from '../../components/PasswordPopup'; // Importar el componente de la contraseña
import {
  Button,
  CircularProgress,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import JSZip from 'jszip';
import { Upload, Download } from 'lucide-react';

export default function ViewToddler() {


  ///POP UPPOP UPPOP UPPOP UPPOP UPPOP UP
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timer, setTimer] = useState(null);

  // Recuperar el estado de localStorage al iniciar
  useEffect(() => {
    const storedIsUnlocked = localStorage.getItem('isUnlocked');
    if (storedIsUnlocked === 'true') {
      setIsUnlocked(true);
      // Verificar si el tiempo ya ha expirado
      const expirationTime = localStorage.getItem('unlockExpirationTime');
      if (expirationTime && Date.now() > expirationTime) {
        setIsUnlocked(false); // Bloquear la pantalla si ha pasado el tiempo
        localStorage.removeItem('isUnlocked');
        localStorage.removeItem('unlockExpirationTime');
      }
    }
  }, []);

  const unlockScreen = () => {
    setIsUnlocked(true);
    const expirationTime = Date.now() + 3600000; // 1 hora en milisegundos
    localStorage.setItem('isUnlocked', 'true');
    localStorage.setItem('unlockExpirationTime', expirationTime);

    // Establecer temporizador para bloquear la pantalla después de 1 hora
    setTimer(
      setTimeout(() => {
        setIsUnlocked(false);
        localStorage.removeItem('isUnlocked');
        localStorage.removeItem('unlockExpirationTime');
      }, 3600000) // 3600000 ms = 1 hora
    );
  };

  // Limpiar el temporizador y el estado en el desmontaje del componente
  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    
  }, [timer]);

  ///POP UPPOP UPPOP UPPOP UPPOP UPPOP UP



  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileUpload = async (event, grade) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setDownloadUrl(null);

    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    try {
      const zip = new JSZip();
      zip.file(fileName, file);

      const images = ['1.png', '2.png', '3.png'];
      for (const imageName of images) {
        const imageResponse = await fetch(`/${grade}/${imageName}`);
        if (!imageResponse.ok) {
          throw new Error(`Error al obtener la imagen ${imageName}`);
        }
        const imageBlob = await imageResponse.blob();
        zip.file(imageName, imageBlob);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });

      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Zip = reader.result.split(',')[1];

          const response = await fetch(
            'https://23pg3d1bg8.execute-api.us-east-1.amazonaws.com/KPA-Services/ProgressReport',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                authorizationToken: 'allow',
              },
              body: JSON.stringify({ zipFile: base64Zip, grado: grade }),
            }
          );

          if (!response.ok) {
            throw new Error('Error in the server response');
          }

          const data = await response.json();
          setDownloadUrl(JSON.parse(data.body).downloadUrl);
        } catch (err) {
          console.error('Error:', err);
          setError('Error processing the ZIP file on the server');
        } finally {
          setIsLoading(false);
        }
      };

      reader.readAsDataURL(zipBlob);
    } catch (err) {
      console.error('Error:', err);
      setError('Error processing the CSV file and images');
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
      // Reiniciar el estado después de la descarga
      setDownloadUrl(null);
      setError(null);
    }
  };

  return (
    <div>
    {!isUnlocked ? (
      <PasswordPopup onPasswordSubmit={unlockScreen} /> // Mostrar el popup de contraseña si no está desbloqueado
    ) : (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box sx={{ position: 'relative', mb: 2 }}>
          <img
            src="https://cloudpot2.s3.us-east-1.amazonaws.com/KeyPointIcon.png"
            alt="Key Point Academy Logo"
            width={200}
            height={60}
          />
        </Box>
        <h2 className="text-2xl font-bold text-center mb-4" style={{ color: '#001858' }}>Progress Report Generator</h2>

        <Typography variant="body1" gutterBottom align="center" sx={{ mb: 3 }}>
          Upload yout student roster and download all their report cards in a convenient ZIP file
        </Typography>
        {['Toddler','2K', '3K', '4K'].map((grade) => (
          <Box key={grade} sx={{ width: '100%', mb: 2 }}>
            <input
              accept=".csv, .xls, .xlsx"
              style={{ display: 'none' }}
              id={`raised-button-file-${grade}`}
              type="file"
              onChange={(e) => handleFileUpload(e, grade)}
            />
            <label htmlFor={`raised-button-file-${grade}`}>
              <Button
                variant="contained"
                color="success"
                component="span"
                disabled={isLoading || !!downloadUrl}
                startIcon={isLoading ? <CircularProgress size={24} /> : <Upload />}
                fullWidth
              >
                {isLoading ? 'Procesando...' : `Upload Excel File |  ${grade}`}
              </Button>
            </label>
          </Box>
        ))}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDownload}
          disabled={!downloadUrl}
          startIcon={<Download />}
          fullWidth
        >
          Download Report Cards (ZIP)
        </Button>
      </Paper>

      {/* Modal Dialog */}
      <Dialog open={isLoading} onClose={() => {}} disableEscapeKeyDown>
        <DialogTitle>Processing...</DialogTitle>
        <DialogContent sx={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress sx={{ mr: 2 }} />
          <DialogContentText>
            Please wait while we process your file.
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  )}
  </div>
  )
}

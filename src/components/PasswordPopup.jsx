import React, { useState } from 'react';

const PasswordPopup = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'Kpc@2024') {
      onPasswordSubmit(); // Si la contraseña es correcta, desbloquear
    } else {
      setError(true); // Si la contraseña es incorrecta, mostrar error
    }
  };

  // Función para manejar el cierre del popup
  const handleClose = () => {
    window.history.back(); // Navegar a la página anterior
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h2 className="text-2xl font-semibold mb-4">Por favor, ingresa la contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Contraseña"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
          <button
            type="submit"
            className="w-full py-2 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ingresar
          </button>
          <button
            onClick={handleClose}
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
        </div>

        </form>
        {error && <p className="mt-2 text-red-500 text-sm">Contraseña incorrecta. Inténtalo de nuevo.</p>}
      </div>
    </div>
  );
};

export default PasswordPopup;

import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';
import DynamicSection from './DynamicSection';
import { addRow, handleChange, handleDynamicChange, handleSubmit } from '../utils/formHandlers';
import { Circles } from 'react-loader-spinner'; // Componente de carga
import Modal from 'react-modal'; // Modal de confirmación

Modal.setAppElement('#root'); // Necesario para accesibilidad de react-modal

const ReportForm = () => {
  const [formData, setFormData] = useState({
    recipient: '',
    family: '',
    studentName: '',
    subject: '',
    week: '',
    date: '',
    grade: '',
    performanceScale: [],
    kpaPride: [],
    accommodations: [],
    comments: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormChange = (e) => {
    handleChange(e, formData, setFormData);
  };

  const addFormRow = (section) => {
    addRow(section, formData, setFormData);
  };

  const removeFormRow = (section, index) => {
    setFormData((prevFormData) => {
      const updatedSection = prevFormData[section].filter((_, i) => i !== index);
      return { ...prevFormData, [section]: updatedSection };
    });
  };

  const handleFormDynamicChange = (section, index, field, value) => {
    handleDynamicChange(section, index, field, value, formData, setFormData);
  };

  const handleFormSubmit = async () => {
    setIsLoading(true); // Mostrar el modal de carga
    await handleSubmit(formData); // Esperar a que el envío se complete
    setIsLoading(false); // Ocultar el modal de carga
    setIsSubmitted(true); // Mostrar el modal de confirmación
  };

  const closeConfirmationModal = () => {
    setIsSubmitted(false); // Cerrar el modal de confirmación
  };

  const validateForm = () => {
    const areMainFieldsFilled =
      formData.recipient &&
      formData.family &&
      formData.studentName &&
      formData.subject &&
      formData.week &&
      formData.date &&
      formData.grade;

    const areDynamicFieldsFilled = (section) => {
      return formData[section].every(
        (entry) => entry.description && entry.value && entry.value !== 'Select'
      );
    };

    const isValid =
      areMainFieldsFilled &&
      areDynamicFieldsFilled('performanceScale') &&
      areDynamicFieldsFilled('kpaPride') &&
      areDynamicFieldsFilled('accommodations');

    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" style={{ backgroundColor: '#E0E0E0' }}>
      <form className="bg-white shadow-lg rounded-lg p-8 w-3/5 space-y-6" style={{ border: '1px solid #D1D1D1' }}>
        <h2 className="text-2xl font-bold text-center mb-4" style={{ color: '#001858' }}>Weekly Report Form</h2>

        {/* Compact Fields */}
        <div className="grid grid-cols-3 gap-4">
          <FormInput 
            label="Recipient:" 
            type="text" 
            name="recipient" 
            value={formData.recipient} 
            onChange={handleFormChange} 
            className="w-full" 
            placeholder="e.g., Flores.Mora@gmail.com" 
            style={{ borderColor: '#D1D1D1', backgroundColor: '#FFFFFF' }}
          />  
          <FormInput 
            label="Family:" 
            type="text" 
            name="family" 
            value={formData.family} 
            onChange={handleFormChange} 
            className="w-full" 
            placeholder="e.g., Flores Mora Family" 
            style={{ borderColor: '#D1D1D1', backgroundColor: '#FFFFFF' }}
          />
          <FormInput 
            label="Student Name:" 
            type="text" 
            name="studentName" 
            value={formData.studentName} 
            onChange={handleFormChange} 
            className="w-full" 
            placeholder="e.g., Pablo Francisco Flores Mora" 
            style={{ borderColor: '#D1D1D1', backgroundColor: '#FFFFFF' }}
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <FormInput 
            label="Subject:" 
            type="text" 
            name="subject" 
            value={formData.subject}
            onChange={handleFormChange} 
            className="w-full" 
            placeholder="e.g., ESL | Excelling" 
            style={{ borderColor: '#D1D1D1', backgroundColor: '#FFFFFF' }}
          />
          <FormInput 
            label="Week:" 
            type="text" 
            name="week" 
            value={formData.week}
            onChange={handleFormChange} 
            className="w-full" 
            placeholder="e.g., 6 week" 
            style={{ borderColor: '#D1D1D1', backgroundColor: '#FFFFFF' }}
          />
          <FormInput 
            label="Date:" 
            type="date" 
            name="date" 
            value={formData.date}
            onChange={handleFormChange} 
            className="w-full" 
            style={{ borderColor: '#D1D1D1', backgroundColor: '#FFFFFF' }}
          />
          <FormInput 
            label="Grade:" 
            type="text" 
            name="grade" 
            value={formData.grade}
            onChange={handleFormChange} 
            placeholder="e.g. 2nd" 
            style={{ borderColor: '#D1D1D1', backgroundColor: '#FFFFFF' }}
          />
        </div>

        {/* Performance Scale Section */}
        <DynamicSection 
          title="Performance Scale" 
          section="performanceScale" 
          entries={formData.performanceScale}
          onAdd={() => addFormRow('performanceScale')} 
          onRemove={(index) => removeFormRow('performanceScale', index)}
          onChange={handleFormDynamicChange} 
        />

        {/* KPA Pride Section */}
        <DynamicSection 
          title="KPA Pride" 
          section="kpaPride" 
          entries={formData.kpaPride}
          onAdd={() => addFormRow('kpaPride')} 
          onRemove={(index) => removeFormRow('kpaPride', index)}
          onChange={handleFormDynamicChange} 
        />

        {/* Accommodations Section */}
        <DynamicSection 
          title="Accommodations" 
          section="accommodations" 
          entries={formData.accommodations}
          onAdd={() => addFormRow('accommodations')} 
          onRemove={(index) => removeFormRow('accommodations', index)}
          onChange={handleFormDynamicChange} 
        />

        {/* Comments Section */}
        <div>
          <label className="block font-semibold mb-2" style={{ color: '#001858' }}>Comments:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleFormChange}
            className="w-full border border-gray-300 p-3 rounded-lg resize-none focus:outline-none focus:ring-2"
            rows="4"
            style={{ borderColor: '#D1D1D1', color: '#333333', backgroundColor: '#FFFFFF' }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleFormSubmit}
          disabled={!isFormValid}
          className={`w-full font-bold py-3 rounded-lg transition duration-200 ${
            isFormValid
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          style={{
            backgroundColor: isFormValid ? '#002B7F' : '#D1D1D1',
            color: isFormValid ? '#FFFFFF' : '#9E9E9E',
          }}
        >
          Send Report
        </button>
      </form>

      {/* Modal de Carga */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <Circles height="100" width="100" color="#4fa94d" ariaLabel="loading" />
        </div>
      )}

      {/* Modal de Confirmación */}
      <Modal
        isOpen={isSubmitted}
        onRequestClose={closeConfirmationModal}
        contentLabel="Confirmation Modal"
        className="bg-white p-6 rounded shadow-md text-center max-w-sm mx-auto"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold mb-4" style={{ color: '#001858' }}>¡Reporte Enviado!</h2>
        <p className="mb-6">El reporte se ha enviado exitosamente.</p>
        <button
          onClick={closeConfirmationModal}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Cerrar
        </button>
      </Modal>
    </div>
  );
};

export default ReportForm;

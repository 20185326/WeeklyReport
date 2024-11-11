// src/utils/formHandlers.js

import { sendReport } from "../services/aws";

export const handleChange = (e, formData, setFormData) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

export const addRow = (section, formData, setFormData) => {
  setFormData({
    ...formData,
    [section]: [...formData[section], { description: '', value: '' }],
  });
};

export const handleDynamicChange = (section, index, field, value, formData, setFormData) => {
  const updatedSection = formData[section].map((item, i) =>
    i === index ? { ...item, [field]: value } : item
  );
  setFormData({ ...formData, [section]: updatedSection });
};



export const handleSubmit = async (formData) => {
  const {from,week, family, studentName, subject, date, grade, performanceScale, kpaPride, accommodations, comments } = formData;

  // Construir HTML del mensaje
  const performanceList = performanceScale.map(
    (item) => `
    <li style="display: flex; justify-content: space-between; align-items: center; color: #374151; margin-bottom: 8px;">
      <div style="flex: 1; text-align: justify; max-width: 55%;">
        <strong style="font-size: 15px;">•</strong>&emsp;${item.description}
      </div>
      <div style="text-align: right; margin-left: auto;"><strong>${item.value}</strong></div>
    </li>`
  ).join('');

  const kpaPrideList = kpaPride.map(
    (item) => `<li>${item.description}: <strong>${item.value}</strong></li>`
  ).join('');

  const accommodationsList = accommodations.map(
    (item) => `<li>${item.description}: <strong>${item.value}</strong></li>`
  ).join('');

  const mensaje = `
  <html>
    <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0;">
      <div style="width: 95%; max-width: 750px; margin: auto; border: 1px solid #ddd; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px; background-color: #363661; border-radius: 5px;">
          <img src="https://drive.google.com/uc?export=view&id=1FQEesRZV2NsM4DAiqmPIQWYrdSySCBHv" alt="KPAA Logo" style="max-width: 200px; height: auto;">
        </div>

        <h2 style="color: #363661;">Dear ${family}</h2>
        <p>Please find below the weekly report (${week} - ${date}) for ${studentName}. Should you have any questions or concerns, please let us know at ${from} Thank you and have a blessed weekend.</p>
        <hr style="border: 1px solid #363661;">

        ${studentName ? `
        <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 20px; margin-bottom: 15px; max-width: 800px; margin-left: auto; margin-right: auto;">
          ${subject ? `
          <div style="text-align: center; margin-bottom: 10px; flex: 1 1 30%; min-width: 30%;">
            <p style="margin: 0; font-weight: bold;">Student</p>
            <p style="margin: 0;">${studentName}</p>
          </div>` : ''}
          ${subject ? `
          <div style="text-align: center; margin-bottom: 10px; flex: 1 1 30%; min-width: 30%;">
            <p style="margin: 0; font-weight: bold;">Subject</p>
            <p style="margin: 0;">${subject}</p>
          </div>` : ''}
          ${grade ? `
          <div style="text-align: center; margin-bottom: 10px; flex: 1 1 30%; min-width: 30%;">
            <p style="margin: 0; font-weight: bold;">Grade</p>
            <p style="margin: 0;">${grade}</p>
          </div>` : ''}
        </div>` : ''}

        ${performanceList ? `
        <h3 style="background-color: #363661; color: #fff; padding: 4px; border-radius: 5px; text-align: center;">Performance Scale</h3>
        <div style="padding: 6px; background-color: #f1f1f1; border-radius: 5px; margin-bottom: 15px;">
          <ul style="max-width: 100%; margin: 0 auto; padding-left: 20px; list-style-type: disc; list-style-position: outside;">
            ${performanceList}
          </ul>
        </div>` : ''}

        ${kpaPrideList ? `
        <h3 style="background-color: #363661; color: #fff; padding: 4px; border-radius: 5px; text-align: center;">KPA Pride</h3>
        <div style="padding: 6px; background-color: #f1f1f1; border-radius: 5px; margin-bottom: 15px;">
          <ul>${kpaPrideList}</ul>
        </div>` : ''}

        ${accommodationsList ? `
        <h3 style="background-color: #363661; color: #fff; padding: 4px; border-radius: 5px; text-align: center;">Accommodations</h3>
        <div style="padding: 6px; background-color: #f1f1f1; border-radius: 5px; margin-bottom: 15px;">
          <ul>${accommodationsList}</ul>
        </div>` : ''}

        ${comments ? `
        <h3 style="background-color: #363661; color: #fff; padding: 4px; border-radius: 5px; text-align: center;">Comments</h3>
        <div style="padding: 10px; background-color: #f1f1f1; border-radius: 5px; text-align: justify; word-break: break-word;">
          <ul><li>${comments}</li></ul>
        </div>` : ''}
      </div>
    </body>
  </html>
  `;

  try {
    const response = await sendReport(formData,mensaje);
    return response
    // Aquí podrías agregar alguna lógica adicional, como mostrar un mensaje de éxito
  } catch (error) {
    return error
    // Aquí podrías manejar el error, como mostrar un mensaje al usuario
  }
};
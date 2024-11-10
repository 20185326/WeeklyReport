const FormInput = ({ label, type, name, value, onChange, className,placeholder }) => (
    <div className={`flex flex-col ${className}`}>
        <label className="block text-gray-700 font-semibold mb-1">{label}</label>
        <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder} // Pass the placeholder here
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
    );
export default FormInput;
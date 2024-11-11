const FormInput = ({ label, type, name, value, onChange, className, placeholder, options }) => (
    <div className={`flex flex-col ${className}`}>
        <label className="block text-gray-700 font-semibold mb-1">{label}</label>
        {options ? (
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        )}
    </div>
);

export default FormInput;

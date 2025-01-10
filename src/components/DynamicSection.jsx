// Dynamic Section Component
const DynamicSection = ({ title, section, entries, onAdd, onRemove, onChange }) => {
  // Function to adjust the height of the textarea
  const autoExpand = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  if (title=="Accommodations"){
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <button
            type="button"
            onClick={onAdd}
            className="text-blue-600 font-bold text-lg hover:text-blue-800"
          >
            +
          </button>
        </div>
        {entries.map((entry, index) => (
          <div key={index} className="flex gap-2 items-center">
            <textarea
              placeholder="Description"
              value={entry.description}
              onChange={(e) => onChange(section, index, 'description', e.target.value)}
              onInput={autoExpand} // Adjust the height automatically
              className="w-5/6 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="1"
              style={{ overflow: 'hidden' }} // Prevent scrollbars from appearing
            />
            <select
              value={entry.value}
              onChange={(e) => onChange(section, index, 'value', e.target.value)}
              className="w-1/6 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="Always">Always</option>
              <option value="Nearly always">Nearly always</option>
              <option value="Often">Often</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Rarely">Rarely</option>
              <option value="Hardly ever">Hardly ever</option>
            </select>
            <button
              type="button"
              onClick={() => onRemove(index)} // Llama a onRemove con el índice de la fila
              className="text-red-600 font-bold text-lg hover:text-red-800"
            >
              -
            </button>
          </div>
        ))}
      </div>
    );
  }
  else {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <button
            type="button"
            onClick={onAdd}
            className="text-blue-600 font-bold text-lg hover:text-blue-800"
          >
            +
          </button>
        </div>
        {entries.map((entry, index) => (
          <div key={index} className="flex gap-2 items-center">
            <textarea
              placeholder="Description"
              value={entry.description}
              onChange={(e) => onChange(section, index, 'description', e.target.value)}
              onInput={autoExpand} // Adjust the height automatically
              className="w-5/6 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="1"
              style={{ overflow: 'hidden' }} // Prevent scrollbars from appearing
            />
            <select
              value={entry.value}
              onChange={(e) => onChange(section, index, 'value', e.target.value)}
              className="w-1/6 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="Does Not Meet">Does Not Meet</option>
              <option value="In Process">In Process</option>
              <option value="Meets">Meets</option>
              <option value="Exceeds">Exceeds</option>
            </select>
            <button
              type="button"
              onClick={() => onRemove(index)} // Llama a onRemove con el índice de la fila
              className="text-red-600 font-bold text-lg hover:text-red-800"
            >
              -
            </button>
          </div>
        ))}
      </div>
    );
  }
};

export default DynamicSection;

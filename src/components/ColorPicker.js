const ColorPicker = ({ color, onChange }) => {
  const colors = [
    { value: "red-400", label: "Vermell", bgColor: "bg-red-400", hoverColor: "hover:bg-red-600" },
    { value: "lime-400", label: "Verd", bgColor: "bg-lime-400", hoverColor: "hover:bg-lime-600" },
    { value: "blue-400", label: "Blau", bgColor: "bg-blue-400", hoverColor: "hover:bg-blue-600" },
    { value: "yellow-400", label: "Groc", bgColor: "bg-yellow-400", hoverColor: "hover:bg-yellow-600" },
    { value: "pink-400", label: "Rosa", bgColor: "bg-pink-400", hoverColor: "hover:bg-pink-600" }
  ];

  return (
    <div className="flex flex-col gap-2 mt-2 mb-4">
      <p>Color de la targeta:</p>
      <div className="flex flex-row gap-2 justify-center items-center">
        {colors.map((colorOption) => (
          <div
            key={colorOption.value}
            onClick={() => onChange(colorOption.value)}
            className={`p-4 cursor-pointer rounded-full ${colorOption.bgColor} ${colorOption.hoverColor} transition-all duration-200 relative`}
            title={colorOption.label}
          >
            {color === colorOption.value && (
              <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-800 absolute inset-0 flex justify-center items-center"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;

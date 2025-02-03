import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const Dropdown = ({
  options = [],
  multiple = false,
  searchable = true,
  portal = false,
  zIndex = 1050,
  onRenderOption,
  outlined = false, // Properti untuk mengubah gaya menjadi outlined
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);
  const portalContainerRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectOption = (option) => {
    setSelectedOptions((prev) => {
      if (multiple) {
        return prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option];
      } else {
        setIsOpen(false);
        return [option];
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        (!portal ||
          (portalContainerRef.current &&
            !portalContainerRef.current.contains(event.target)))
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [portal]);

  const renderDropdown = (
    <div
      ref={portal ? portalContainerRef : undefined}
      className={`absolute left-0 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg`}
      style={{
        zIndex: zIndex,
        maxHeight: "250px",
        overflowY: "auto",
      }}
    >
      {searchable && (
        <div className="flex flex-row gap-2 p-2 items-center border-b border-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#c2c2c2"
            className="h-5 w-5 text-gray-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            type="text"
            className="w-full text-sm focus:outline-none"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      )}

      <ul className="max-h-60 overflow-y-auto">
        {filteredOptions.map((option) => (
          <li
            key={option.value}
            className={`cursor-pointer px-4 py-2 text-sm hover:bg-blue-50 ${
              selectedOptions.includes(option) ? "bg-blue-100" : ""
            }`}
            onClick={() => selectOption(option)}
          >
            {onRenderOption ? onRenderOption(option) : option.label}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-row gap-10 items-center w-full">
      <label className="block text-sm font-medium text-black-700 mb-1">
        Label
      </label>
      <div
        className={`relative w-full ${
          outlined ? "border border-blue-500 rounded-lg" : ""
        }`}
        ref={dropdownRef}
      >
        <button
          className={`w-full flex items-center justify-between px-2 py-1 rounded-md shadow-sm text-sm focus:outline-none ${
            outlined
              ? "border border-blue-500 bg-white"
              : "border border-gray-300 bg-white"
          }`}
          onClick={toggleDropdown}
        >
          <span className="flex gap-1">
            {selectedOptions.length
              ? selectedOptions.map((opt) => (
                  <span
                    key={opt.value}
                    className="py-1 px-2 bg-gray-200 rounded-full flex flex-row items-center gap-1"
                  >
                    {opt.label}
                    {multiple && (
                      <div
                        role="button"
                        onClick={() => selectOption(opt)}
                        className="cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                    )}
                  </span>
                ))
              : "Select..."}
          </span>
          <svg
            className="h-4 w-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isOpen ? "M5 15l5-5 5 5" : "M5 5l5 5 5-5"}
            />
          </svg>
        </button>

        {isOpen &&
          (portal
            ? ReactDOM.createPortal(renderDropdown, document.body)
            : renderDropdown)}
      </div>
    </div>
  );
};

export default Dropdown;

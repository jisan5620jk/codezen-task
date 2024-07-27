import { useState } from "react";
import PropTypes from "prop-types";
import "./custom-select.css";

const CustomSelect = ({
  isClearable,
  isSearchable,
  isDisabled,
  options,
  value,
  placeholder,
  isGrouped,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValues, setSelectedValues] = useState(value || []);

  // Handle opening of the menu
  const handleMenuOpen = () => {
    setIsOpen(true);
    onMenuOpen();
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearchHandler) {
      onSearchHandler(e.target.value);
    }
  };

  // Handle selection of options
  const handleOptionClick = (option) => {
    if (isMulti) {
      const newValues = selectedValues.includes(option)
        ? selectedValues.filter((val) => val !== option)
        : [...selectedValues, option];
      setSelectedValues(newValues);
      onChangeHandler(newValues);
    } else {
      setSelectedValues(option);
      onChangeHandler(option);
      setIsOpen(false);
    }
  };

  // Handle clearing selected values
  const handleClear = () => {
    if (isMulti) {
      setSelectedValues([]);
      onChangeHandler([]);
    } else {
      setSelectedValues(null);
      onChangeHandler(null);
    }
  };

  // Filter options based on search term
  const filteredOptions = options.filter((option) => {
    if (isGrouped) {
      return option.options.some((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return option.label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={`kzui-select ${isDisabled ? "kzui-select--disabled" : ""}`}>
      <div
        className={`kzui-select__control ${
          isOpen ? "kzui-select__control--open" : ""
        }`}
        onClick={isDisabled ? null : handleMenuOpen}
      >
        {isMulti ? (
          <div className="kzui-select__multi-value">
            {selectedValues.map((val) => (
              <span key={val} className="kzui-select__multi-value-item">
                {val}
                {isClearable && (
                  <button
                    className="kzui-clear-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionClick(val);
                    }}
                  >
                    &times;
                  </button>
                )}
              </span>
            ))}
            {isSearchable && (
              <input
                type="text"
                className="kzui-select__search-input"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
              />
            )}
          </div>
        ) : (
          <span className="kzui-select__single-value">
            {selectedValues || placeholder}
          </span>
        )}
        {isClearable && selectedValues && (
          <button
            className="kzui-select__input-clear-button"
            onClick={handleClear}
          >
            &times;
          </button>
        )}
      </div>

      {isOpen && (
        <div className="kzui-select__menu">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((group) =>
              isGrouped ? (
                <div key={group.label} className="kzui-select__group">
                  <div className="kzui-select__group-label">{group.label}</div>
                  {group.options.map((option) => (
                    <div
                      key={option.value}
                      className={`kzui-select__option ${
                        selectedValues.includes(option.value)
                          ? "kzui-select__option--selected"
                          : ""
                      }`}
                      onClick={() => handleOptionClick(option.value)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  key={group.value}
                  className={`kzui-select__option ${
                    selectedValues.includes(group.value)
                      ? "kzui-select__option--selected"
                      : ""
                  }`}
                  onClick={() => handleOptionClick(group.value)}
                >
                  {group.label}
                </div>
              )
            )
          ) : (
            <div className="kzui-select__no-options">No options available</div>
          )}
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  placeholder: PropTypes.string,
  isGrouped: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChangeHandler: PropTypes.func.isRequired,
  onMenuOpen: PropTypes.func,
  onSearchHandler: PropTypes.func,
};

CustomSelect.defaultProps = {
  isClearable: false,
  isSearchable: false,
  isDisabled: false,
  value: null,
  placeholder: "Select...",
  isGrouped: false,
  isMulti: false,
  onMenuOpen: () => {},
  onSearchHandler: () => {},
};

export default CustomSelect;

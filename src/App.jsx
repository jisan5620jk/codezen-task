import CustomSelect from "./CustomSelect";

const options = [
  {
    label: "Fruits",
    options: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { label: "Carrot", value: "carrot" },
      { label: "Broccoli", value: "broccoli" },
    ],
  },
];

const App = () => {
  const handleChange = (value) => {
    console.log(value);
  };

  const handleMenuOpen = () => {
    console.log("Menu opened");
  };

  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="kzui-select__container">
        <h1>Custom Select Example</h1>
        <CustomSelect
          isClearable
          isSearchable
          options={options}
          value={null}
          placeholder="Select an item..."
          isGrouped
          isMulti
          onChangeHandler={handleChange}
          onMenuOpen={handleMenuOpen}
          onSearchHandler={handleSearch}
        />
    </div>
  );
};

export default App;

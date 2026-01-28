const FilterList = ({ value, onChange }) => {
  return (
    <div>
      <label>
        filter shown with:{" "}
        <input value={value} onChange={onChange} />
      </label>
    </div>
  );
};
export default FilterList;

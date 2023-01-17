import inputWithValue from "./inputWithValue";

const CheckBox = ({ label, ...props }) => {
  return (
    <div>
      <label style={{color: 'whitesmoke'}}>{label}
        <input {...props} />
      </label>
    </div>
  );
};

export default inputWithValue({initialState: false})(CheckBox);

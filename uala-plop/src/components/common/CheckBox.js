const CheckBox = ({ name, label, onChange, ...props }) => {
  return (
    <div>
      <label style={{color: 'whitesmoke'}} htmlFor={name}>{label}</label>
      <input name={name} type='checkbox' onChange={onChange} />
    </div>
  );
};

export default CheckBox;

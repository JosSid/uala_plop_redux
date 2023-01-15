const Form = ({initialValue, onSubmit, ...props}) => {
    return (
        <form value={initialValue} onSubmit={onSubmit} className={props.className}>
            {props.children}
        </form>
    )
};

export default Form;
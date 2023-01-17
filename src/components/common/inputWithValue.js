import { useState } from "react";

export default function inputWithValue ({initialState}) {
    return function (WrappedComponent) {
        const WithValueComponent = ({getDataEvent,...props}) => {
            const [value, setValue] = useState(initialState);

            if(props.type === 'checkbox'){
                const handleChangeData = (event) => {
                    setValue(event.target.checked);
                    getDataEvent(event);
                }
                return <WrappedComponent {...props} onChange={handleChangeData} value={value} checked={value} />
            }

            const handleChangeData = (event) => {
                setValue(event.target.value);
                getDataEvent(event);
            }
            return <WrappedComponent {...props} onChange={handleChangeData} value={value} />
        };
        WithValueComponent.displayName = `withData(${
            WrappedComponent.displayName ?? WrappedComponent.name
          })`;

        return WithValueComponent;
    };
};
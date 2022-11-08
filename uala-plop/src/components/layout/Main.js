import { Fragment } from 'react';

const Main = ({title, children}) => {
  return (<Fragment>
            <h2>{title}</h2>
            <section>{children}</section>
        </Fragment>);
};

export default Main;

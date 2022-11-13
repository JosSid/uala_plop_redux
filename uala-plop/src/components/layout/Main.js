import { Fragment } from 'react';

const Main = ({ title, children }) => {
  return (
    <Fragment>
      <h2 style={{ top: '80px', position: 'sticky', backgroundColor: 'whitesmoke'}}>{title}</h2>
      <section>{children}</section>
    </Fragment>
  );
};

export default Main;

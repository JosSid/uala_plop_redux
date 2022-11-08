import { Fragment } from 'react';

const AdModel = ({ad}) => {
  return (
    <Fragment>
      <h2>{ad.sale ? 'Vendo' : 'Busco'}</h2>
      <h3>{ad.name}</h3>
      <img
        src={ad.photo || 'https://shop.sarmy.net.nz/missing_product_image.jpg'}
        alt='Foto'
      />
      <h3>{ad.price}</h3>
      <h6>Categorias</h6>
      <p>
        {ad.tags && ad.tags.map((tag) => <span key={tag}>{` -${tag}- `}</span>)}
      </p>
    </Fragment>
  );
};

export default AdModel;

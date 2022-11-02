import { useEffect, useState } from 'react';
import { getAds } from './service';
import {Link} from 'react-router-dom'
import './AdsPage.css';

const AdsPage = () => {
  const [ads, setAds] = useState([]);

  const getListAds = async () => {
    const listAds = await getAds();

    setAds(listAds);
  };

  useEffect(() => {
    getListAds();
  }, []);

  return (
    <div className='ads__page'>
      {ads.map((ad) => (
        <Link to={`/ads/${ad.id}`} key={ad.id} className='ad__container'>
          <h3>{ad.name}</h3>
          <h3>{ad.price}</h3>
          <img src={ad.photo ||'https://shop.sarmy.net.nz/missing_product_image.jpg'} alt='Foto' />
          <h3>{ad.sale ? 'Venta' : 'Busco'}</h3>
          <h6>Categorias</h6>
          {ad.tags.map((tag) => (
            <span key={tag}>{`${tag} `}</span>
          ))}
        </Link>
      ))}
    </div>
  );
};

export default AdsPage;

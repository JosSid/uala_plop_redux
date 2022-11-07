import { useEffect, useState } from 'react';
import { getAds } from './service';
import {Link, useNavigate} from 'react-router-dom'
import Confirm from '../common/confirm_element/Confirm.js';
import './AdsPage.css';

const AdsPage = () => {
  const [ads, setAds] = useState([]);
  const [confirm,setConfirm] = useState(true);
  const navigate = useNavigate();

  const getListAds = async () => {
    const listAds = await getAds();

    setAds(listAds);
  };

  const goToCreate = () => navigate('/ads/new');
  const notConfirm = () => setConfirm(false)

  const message = () => {
    return (
      <div>
        <h2>Not Advertisments for you</h2>
        <h2>Go to create your advertisment?</h2>
      </div>
    )
  }

  useEffect(() => {
    getListAds();
  }, []);

  return (
    <div className='ads__page'>
      {ads.length > 0 && confirm && <Confirm confirm={goToCreate} notConfirm={notConfirm}>{message()}</Confirm>}
      {ads.map((ad) => (
        <Link to={`/ads/${ad.id}`} key={ad.id} className='ad__container'>
          <h3>{ad.sale ? 'Vendo' : 'Busco'}</h3>
          <h3>{ad.name}</h3>
          <img src={ad.photo ||'https://shop.sarmy.net.nz/missing_product_image.jpg'} alt='Foto' />
          <h3>{ad.price}</h3>
          <h6>Categorias</h6>
          {ad.tags.map((tag) => (
            <span key={tag}>{` -${tag}- `}</span>
            ))}
        </Link>
      ))}
    </div>
  );
};

export default AdsPage;

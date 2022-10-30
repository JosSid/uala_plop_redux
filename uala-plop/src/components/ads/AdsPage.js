import { useEffect, useState } from 'react';
import { getAds } from './service';
import './AdsPage.css';

const AdsPage = () => {
  const [ads, setAds] = useState([]);

  const getListAds = async () => {
    const listAds = await getAds();
    
    setAds(listAds);
  };

  useEffect(() => {getListAds()}, []);

  return (
    <div className='ads__page'>
      <ul>
        {ads.map((ad) => (
          <li key={ad.id}>{ad.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdsPage;

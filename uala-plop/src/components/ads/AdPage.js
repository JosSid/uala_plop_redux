import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getAdId } from "./service.js";
import './AdsPage.css'
const AdPage = () => {

  const {id} = useParams();

  const [ad, setAd] = useState({});

  const getAd = async(id) => {
    const data = await getAdId(id)
    setAd(data) 
  } 

 useEffect(() => {
    getAd(id)

 },[id])
  

  

  return (
    <div className='ads__page'>
      <div key={ad.id} className='ad__container'>
        <h3>{ad.name}</h3>
        <h3>{ad.price}</h3>
        <img
          src={
            ad.photo || 'https://shop.sarmy.net.nz/missing_product_image.jpg'
          }
          alt='Foto'
        />
        <h3>{ad.sale ? 'Venta' : 'Busco'}</h3>
        <h6>Categorias</h6>
        <p>{ad.tags}</p>
      </div>
    </div>
  );
};

export default AdPage;

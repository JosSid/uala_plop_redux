import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getAdId } from "./service.js";
import Spinner from '../common/spinner/Spinner.js';
import './AdsPage.css'
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
const AdPage = () => {

  const {id} = useParams();

  const [ad, setAd] = useState(null);
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const getAd = async(id) => {
    try{
      resetError()
      const data = await getAdId(id)
      setAd(data) 
    }catch(err){
      if(err.status === 404) {
        navigate('404')
      }
      setError(err)
    }

  } 

  const resetError = () => setError(null)

 useEffect(() => {
    getAd(id)

 },[id])
  

  

  return (
    <div className='ads__page'>
      {ad ? (
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
              <p>{ad.tags && ad.tags.map(tag => <span key={tag}>{` -${tag}- `}</span>)}</p>
            </div>
      ) : (<Spinner />)}

      {error && (
       <ErrorDisplay error={error} resetError={resetError} />
      )}
    </div>
  );
};

export default AdPage;

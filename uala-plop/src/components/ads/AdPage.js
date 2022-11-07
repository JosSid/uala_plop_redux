import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getAdId, deleteAd } from './service.js';
import Spinner from '../common/spinner/Spinner.js';
import './AdsPage.css';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
import Button from '../common/Button.js';
import Confirm from '../common/confirm_element/Confirm.js';
const AdPage = () => {
  const { id } = useParams();

  const [ad, setAd] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => setConfirm(true)

  const getAd = async (id) => {
    try {
      resetError();
      const data = await getAdId(id);
      setAd(data);
    } catch (err) {
      if (err.status === 404) {
        navigate('404');
      }
      setError(err);
    }
  };

  /*   const getUser = async () =>{
    try{
      resetError();
      const user = await dataOwner();
      return user.id
    }catch(err){
      setError(err)
    }
  } */

  const deletedAd = async () => {
    try {
      setIsFetching(true);

      deleteAd(id);
      
      setIsDeleted(true);

      setTimeout(() => {
        navigate('/')
      }, 500);
    } catch (err) {
      setError(err);
    }
  };

  const resetError = () => setError(null);

  useEffect(() => {
    getAd(id);
  }, [id]);

  return (
    <div className='ads__page'>
      {ad ? (
        <div key={ad.id} className='ad__container'>
          <h2>{ad.sale ? 'Vendo' : 'Busco'}</h2>
          <h3>{ad.name}</h3>
          <img
            src={
              ad.photo || 'https://shop.sarmy.net.nz/missing_product_image.jpg'
            }
            alt='Foto'
          />
          <h3>{ad.price}</h3>
          <h6>Categorias</h6>
          <p>
            {ad.tags &&
              ad.tags.map((tag) => <span key={tag}>{` -${tag}- `}</span>)}
          </p>
          {!isDeleted && !confirm && (<Button variant='primary' onClick={handleConfirm}>
            Delete Ad
          </Button>)}
          {confirm && !isDeleted && <Confirm children='Are you sure for delete ad?' confirm={deletedAd} notConfirm={()=> setConfirm(false)}></Confirm>}
        </div>
      ) : (
        <Spinner />
      )}

      {error && <ErrorDisplay error={error} resetError={resetError} />}
      {isFetching && (
        <div>
          <Spinner />
          <h1>Deleted Ad</h1>
        </div>
      )}
    </div>
  );
};

export default AdPage;

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdId, deleteAd } from './service.js';
import Spinner from '../common/spinner/Spinner.js';
import './AdsPage.css';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
import Button from '../common/Button.js';
import Confirm from '../common/confirm_element/Confirm.js';
import AdModel from './AdModel.js';
const AdPage = () => {
  const { id } = useParams();

  const [ad, setAd] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => setConfirm(true);

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
        navigate('/');
      }, 500);
    } catch (err) {
      setError(err);
    }
  };

  const resetError = () => setError(null);

  useEffect(() => {
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
    getAd(id);
  }, [id, navigate]);

  return (
    <div className='ads__page'>
      {ad ? (
        <div key={ad.id} className='ad__container'>
          <AdModel ad={ad} />
          {!isDeleted && !confirm && (
            <Button variant='primary' onClick={handleConfirm}>
              Delete Ad
            </Button>
          )}
          {confirm && !isDeleted && (
            <Confirm
              children='Are you sure for delete ad?'
              confirm={deletedAd}
              notConfirm={() => setConfirm(false)}
            ></Confirm>
          )}
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

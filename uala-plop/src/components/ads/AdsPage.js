import { useEffect, useState } from 'react';
import { getAds } from './service';
import { Link, useNavigate } from 'react-router-dom';
import Confirm from '../common/confirm_element/Confirm.js';
import './AdsPage.css';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
import AdModel from './AdModel.js';

const AdsPage = () => {
  const [ads, setAds] = useState([]);
  const [confirm, setConfirm] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getListAds = async () => {
    try {
      const listAds = await getAds();

      setAds(listAds);
    } catch (err) {
      setError(err);
    }
  };

  const resetError = () => setError(null);

  const goToCreate = () => navigate('/ads/new');
  const notConfirm = () => {
    setConfirm(false);
    navigate('/');
  };

  const message = () => {
    return (
      <div>
        <h2>Not Advertisments for you</h2>
        <h2>Go to create your advertisment?</h2>
      </div>
    );
  };

  useEffect(() => {
    getListAds();
  }, []);

  return (
    <div className='ads__page'>
      {ads.length < 1 && confirm && (
        <Confirm confirm={goToCreate} notConfirm={notConfirm}>
          {message()}
        </Confirm>
      )}
      {ads.map((ad) => (
        <Link to={`/ads/${ad.id}`} key={ad.id} className='ad__container'>
          <AdModel ad={ad} />
        </Link>
      ))}
      {error && <ErrorDisplay error={error} resetError={resetError} />}
    </div>
  );
};

export default AdsPage;

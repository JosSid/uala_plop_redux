import { useEffect, useState } from 'react';
import { getAds } from './service';
import { Link, useNavigate } from 'react-router-dom';
import Confirm from '../common/confirm_element/Confirm.js';
import './AdsPage.css';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
import AdModel from './ad_model/AdModel.js';
import FilterAds from '../common/filter_ads/FilterAds.js';
import storage from '../../utils/storage.js';
const AdsPage = () => {
  const [ads, setAds] = useState([]);
  const [copyAds, setCopyAds] = useState([]);
  const [search, setSearch] = useState(false);
  const [charge, setCharge] = useState(false);
  const [confirm, setConfirm] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getListAds = async () => {
    try {
      const listAds = await getAds();
      setCopyAds(listAds);
      setAds(listAds);
      setCharge(true);
    } catch (err) {
      setError(err);
    }
  };

  const getFilterAds = () => {
    setAds(copyAds);
    let filterAds = copyAds;
    const name = storage.get('name');
    const sale = storage.get('sale');
    const range = storage.get('range');
    const tags = storage.get('tags');
    if (sale !== 'all') {
      if (sale === 'forSale') {
        filterAds = filterAds.filter((e) => e.sale);
      } else {
        filterAds = filterAds.filter((e) => !e.sale);
      }
    }
    if (name) {
      filterAds = filterAds.filter((e) => e.name.toLowerCase().includes(name));
    }

    if (range !== [0, 1100]) {
      if (range[0] > 0) {
        filterAds = filterAds.filter((e) => e.price >= range[0]);
      }
      if (range[1] < 1100) {
        filterAds = filterAds.filter((e) => e.price <= range[1]);
      }
    }

    if (tags === [] || tags === null) {
      setAds(filterAds);
    } else {
      filterAds = filterAds.filter(
        (e) => JSON.stringify(e.tags) === JSON.stringify(tags)
      );
      storage.set('tags', null);
      storage.set('sale', 'all');
    }

    setAds(filterAds);
  };

  const isSearching = (bool) => {
    setSearch(bool);
    setCharge(false);
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
    !charge && !search && getListAds();
    charge && search && setAds(copyAds);
    charge && !search && getFilterAds();
    // eslint-disable-next-line
  }, [charge, search, copyAds]);

  return (
    <div className='ads__page'>
      {ads.length < 1 && confirm && (
        <Confirm confirm={goToCreate} notConfirm={notConfirm}>
          {message()}
        </Confirm>
      )}
      <FilterAds isSearching={isSearching} />
      {ads.map((ad) => (
        <div  key={ad.id} className='ad__container'>
          <Link className='ad__link' to={`/ads/${ad.id}`}>
            <AdModel ad={ad} />
          </Link>
        </div>
      ))}
      {error && <ErrorDisplay error={error} resetError={resetError} />}
    </div>
  );
};

export default AdsPage;

import { useEffect, useState } from 'react';
import { getAds, getTags } from './service';
import { Link, useNavigate } from 'react-router-dom';
import Confirm from '../common/confirm_element/Confirm.js';
import styles from './AdsPage.module.css';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
import AdModel from './ad_model/AdModel.js';
import FilterAds, { filterConfig } from '../common/filter_ads/FilterAds.js';
import storage from '../../utils/storage';
const AdsPage = () => {
  const [ads, setAds] = useState([]);
  const [filters, setFilters] = useState(storage.get('filter') || filterConfig);
  const [listTags, setListTags] = useState([]);
  const [charge, setCharge] = useState(false);
  const [confirm, setConfirm] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getListAds = async () => {
    try {
      const listAds = await getAds();
      const listTags = await getTags();
      setAds(listAds);
      setListTags(listTags);
      setCharge(true);
    } catch (err) {
      setError(err);
    }
  };

  const getFilters = (filters) => {
    setFilters(filters);
  };

  // const getFilterAds = () => {
  //   setAds(copyAds);
  //   let filterAds = copyAds;
  //   const name = storage.get('name');
  //   const sale = storage.get('sale');
  //   const range = storage.get('range');
  //   const tags = storage.get('tags');
  //   if (sale !== 'all') {
  //     if (sale === 'forSale') {
  //       filterAds = filterAds.filter((e) => e.sale);
  //     } else {
  //       filterAds = filterAds.filter((e) => !e.sale);
  //     }
  //   }
  //   if (name) {
  //     filterAds = filterAds.filter((e) => e.name.toLowerCase().includes(name));
  //   }

  //   if (range !== [0, 1100]) {
  //     if (range[0] > 0) {
  //       filterAds = filterAds.filter((e) => e.price >= range[0]);
  //     }
  //     if (range[1] < 1100) {
  //       filterAds = filterAds.filter((e) => e.price <= range[1]);
  //     }
  //   }

  //   if (tags === [] || tags === null) {
  //     setAds(filterAds);
  //   } else {
  //     filterAds = filterAds.filter(
  //       (e) => JSON.stringify(e.tags) === JSON.stringify(tags)
  //     );
  //     storage.set('tags', null);
  //     storage.set('sale', 'all');
  //   }

  //   setAds(filterAds);
  // };

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
    !charge && getListAds();
    getFilters(filters);

    //charge && !search && getFilterAds();
    // eslint-disable-next-line
  }, [charge, ads]);

  // const filterByName = (ads, filter) => {
  //   return ads.filter(ad => ad.name.toLowerCase().includes(filter.name.toLowerCase()))
  // };

  // const filterBySale = (ads, filter) => {
  //   if(filter.sale === 'forSale') {
  //     return ads.filter(ad => ad.sale)
  //   };
  //   if(filter.sale === 'wanted') {
  //     return ads.filter(ad => !ad.sale)
  //   };
  //   return ads
  // };

  const filterAds = (ads, filter) => {
    const adverts = ads
      .filter((ad) =>
        filter.sale === 'all'
          ? ad
          : filter.sale === 'forSale'
          ? ad.sale
          : !ad.sale
      )
      .filter((ad) => ad.name.toLowerCase().includes(filter.name.toLowerCase()))
      .filter((ad) =>
        filter.range[1] > 1000
          ? ad.price >= filter.range[0]
          : ad.price >= filter.range[0] && ad.price <= filter.range[1]
      )
      .filter((ad) =>
        !filter.tags.length
          ? ad
          : ad.tags.includes(filter.tags.find((e) => ad.tags.includes(e)))
      );

    return adverts;
  };

  const filteredAds = filterAds(ads, filters);
  console.log(filteredAds);

  return (
    <div className={styles.ads__page}>
      {filteredAds.length < 1 && confirm && (
        <Confirm confirm={goToCreate} notConfirm={notConfirm}>
          {message()}
        </Confirm>
      )}
      <FilterAds listTags={listTags} getFilters={getFilters} />
      {filteredAds.map((ad) => (
        <div key={ad.id} className={styles.ad__container}>
          <Link className={styles.ad__link} to={`/ads/${ad.id}`}>
            <AdModel ad={ad} />
          </Link>
        </div>
      ))}
      {error && <ErrorDisplay error={error} resetError={resetError} />}
    </div>
  );
};

export default AdsPage;

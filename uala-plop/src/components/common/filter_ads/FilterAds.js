import { useEffect, useState } from 'react';
import styles from'./FilterAds.module.css';
import FormField from '../formField/FormField.js';
import Range from 'rc-slider';
import 'rc-slider/assets/index.css';
import Button from '../Button.js';
import storage from '../../../utils/storage.js';
import { getTags } from './service';
const FilterAds = ({ isSearching }) => {
  const [active, setActive] = useState(false);
  const [name, setName] = useState('');
  const [sale, setSale] = useState('');
  const [range, setRange] = useState([0, 1100]);
  const [tags, setTags] = useState([]);
  const [listTags, setListTags] = useState([]);

  const getListTags = async() => {
    const listTags = await getTags();
    setListTags(listTags)
  }

  const filter = (event) => {
    event.preventDefault();
    isSearching(!active);
    setActive(false);
    !sale && setSale('all')
  };

  const handleActive = () => {
    setActive(!active);
    isSearching(false);
    storage.set('sale', 'all')
  };

  const handleName = (event) => setName(event.target.value);
  const handleSale = (event) => setSale(event.target.value);
  

  const handleRange = (event) => setRange(event);

  const handleChangeTags = (event) => {
    const selectedTags = event.target.selectedOptions;
    const finallyTags = Array.from(selectedTags).map((e) => e.value);
    setTags(finallyTags);
    console.log(finallyTags)
  };

  useEffect(() => {
    getListTags();
  }, []);

  return (
    <div className={styles.filter__container}>
      <div className={`${styles.filter__active} ${!active && styles.filter__inactive}`} onClick={handleActive}>
        Filter Advertisments 🔍
      </div>
      {active && (
        <form onSubmit={filter} className={styles.filter__form}>
          <fieldset>
            <legend>For sale or Wanted :</legend>
            <label htmlFor='sale'>All</label>
            <input
              type='radio'
              name='sale'
              id='all'
              value={'all'}
              onChange={handleSale}
             checked={!sale || sale === 'all' ? true : false}
            />
            <label htmlFor='sale'>For Sale</label>
            <input type='radio' name='sale' id='sale' value={'forSale'}  onChange={handleSale} checked={sale === 'forSale' ? true : false}/>
            <label htmlFor='wanted'>Wanted</label>
            <input type='radio' name='sale' id='wanted' value={'wanted'}  onChange={handleSale} checked={sale === 'wanted' ? true : false}/>
          </fieldset>
          <FormField
            type='text'
            name='name'
            label='Title Advertisment'
            onChange={handleName}
            value={name}
          />
          <label htmlFor=''>Price Range</label>
          <Range
            min={0}
            max={1100}
            step={100}
            onChange={handleRange}
            marks={{
              0: { label: 0 },
              100: { label: '100' },
              200: { label: '200' },
              300: { label: '300' },
              400: { label: '400' },
              500: { label: '500' },
              600: { label: '600' },
              700: { label: '700' },
              800: { label: '800' },
              900: { label: '900' },
              1000: { label: '1000' },
              1100: { label: 'No limit' },
            }}
            range={[0, 1100]}
            defaultValue={range}
            handleStyle={[{border: 'solid 4px red'},{border: 'solid 4px #18349b'}]}
            allowCross={false}
          />

          <select
            name='tags'
            id='tags'
            value={tags}
            onChange={handleChangeTags}
            multiple={true}
            size={listTags.length + 1}
          >
            <optgroup label='TAGS'>
              {listTags.map(e => 
                <option key={e} name={e} value={e}>
                {e}
              </option>
              )}
            </optgroup>
          </select>
          <Button type='submit'>SEARCH</Button>
        </form>
      )}
    </div>
  );
};

export default FilterAds;

import { useState } from 'react';
import styles from'./FilterAds.module.css';
import FormField from '../formField/FormField.js';
import Range from 'rc-slider';
import 'rc-slider/assets/index.css';
import storage from '../../../utils/storage.js';

export const filterConfig = {
  name:'', 
  sale: '',
  range: [0, 1100],
  tags: []}

const FilterAds = ({getFilters,listTags}) => {
  const filters = storage.get('filter');
  const [active, setActive] = useState(false);
  const [name, setName] = useState(filters?.name || filterConfig.name);
  const [sale, setSale] = useState(filters?.sale || filterConfig.sale);
  const [range, setRange] = useState(filters?.range || filterConfig.range);
  const [tags, setTags] = useState(filters?.tags || filterConfig.tags);
  
  const handleActive = () => {
    active && storage.set('filter', {name,sale,range, tags})
    setActive(!!!active);
  }
   
  

  const handleName = (event) => {
    setName(event.target.value);
    getFilters({ ...filterConfig, name: event.target.value})

  }
  const handleSale = (event) => {
    setSale(event.target.value);
    getFilters({ ...filterConfig, sale: event.target.value})
  }


  const handleRange = (event) => {
    setRange(event);
    getFilters({ ...filterConfig, range: event})
  }

  const handleChangeTags = (event) => {
    const selectedTags = event.target.selectedOptions;
    const finallyTags = Array.from(selectedTags).map((e) => e.value);
    setTags(finallyTags);
    getFilters({ ...filterConfig, tags: finallyTags})
  };


  return (
    <div className={styles.filter__container}>
      <div className={`${styles.filter__active} ${!active && styles.filter__inactive}`} onClick={handleActive}>
        Filter Advertisments 🔍
      </div>
      {active && (
        <form className={styles.filter__form}>
          <fieldset>
            <legend>For sale or Wanted :</legend>
            <label htmlFor='sale'>All</label>
            <input
              type='radio'
              name='sale'
              id='all'
              value={'all'}
              onChange={handleSale}
             checked={!sale || sale === 'all'}
            />
            <label htmlFor='sale'>For Sale</label>
            <input type='radio' name='sale' id='sale' value={'forSale'}  onChange={handleSale} checked={sale === 'forSale'}/>
            <label htmlFor='wanted'>Wanted</label>
            <input type='radio' name='sale' id='wanted' value={'wanted'}  onChange={handleSale} checked={sale === 'wanted'}/>
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
        </form>
      )}
    </div>
  );
};

export default FilterAds;

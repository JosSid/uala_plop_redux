import { useEffect, useState } from 'react';
import './FilterAds.css';
import FormField from '../formField/FormField.js';
import Range from 'rc-slider';
import 'rc-slider/assets/index.css';
import Button from '../Button.js';
import storage from '../../../utils/storage.js';
const FilterAds = ({ isSearching }) => {
  const [active, setActive] = useState(false);
  const [name, setName] = useState(storage.get('name') || '');
  const [sale, setSale] = useState(storage.get('sale') || 'all');
  const [range, setRange] = useState(storage.get('range') || [0, 1100]);
  const [tags, setTags] = useState(storage.get('tags') || null);

  const filter = (event) => {
    event.preventDefault();
    isSearching(!active);
    setActive(false);
  };

  const handleActive = () => {
    setActive(!active);
    isSearching(false);
    storage.set('sale', 'all')
  };

  const handleName = (event) => setName(event.target.value);
  const handleSale = (event) => {
    setSale(event.target.value);
  };

  const handleRange = (event) => setRange(event);

  const handleChangeTags = (event) => {
    const selectedTags = event.target.selectedOptions;
    const finallyTags = Array.from(selectedTags).map((e) => e.value);
    setTags(finallyTags);
  };

  useEffect(() => {
    storage.set('name', name);
    storage.set('sale', sale);
    storage.set('range', range);
    storage.set('tags', tags);
  }, [range, name, sale, tags]);

  return (
    <div className='filter__container'>
      <div className='filter__active' onClick={handleActive}>
        Filter Advertisments 🔍
      </div>
      {active && (
        <form onSubmit={filter} className='filter__form'>
          <fieldset onChange={handleSale}>
            <legend>For sale or Wanted :</legend>
            <label htmlFor='sale'>All</label>
            <input
              type='radio'
              name='sale'
              id='all'
              value={'all'}
              defaultChecked
            />
            <label htmlFor='sale'>For Sale</label>
            <input type='radio' name='sale' id='sale' value={'forSale'} />
            <label htmlFor='wanted'>Wanted</label>
            <input type='radio' name='sale' id='wanted' value={'wanted'} />
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
            onChange={handleChangeTags}
            multiple={true}
          >
            <optgroup label='TAGS'>
              <option name='lifestyle' value='lifestyle'>
                Life Style
              </option>
              <option name='mobile' value='mobile'>
                Mobile
              </option>
              <option name='motor' value='motor'>
                Motor
              </option>
              <option name='work' value='work'>
                Work
              </option>
            </optgroup>
          </select>
          <Button type='submit'>SEARCH</Button>
        </form>
      )}
    </div>
  );
};

export default FilterAds;

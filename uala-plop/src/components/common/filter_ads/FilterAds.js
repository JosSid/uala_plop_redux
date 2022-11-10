import { useEffect, useState } from 'react';
import './FilterAds.css';
import FormField from '../formField/FormField.js';
import Range from 'rc-slider';
import 'rc-slider/assets/index.css';

const FilterAds = ({ads, filterAds}) => {
  const [active, setActive] = useState(false);
  const [name, setName] = useState('');
  const [sale, setSale] = useState('all');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const [tags, setTags] = useState([]);
  
  const listAds = [...ads]
  const filter = () => {

    let copyNewAds = [...ads].filter(e => e.name.toLowerCase().includes(name));

    !name.length ? filterAds(listAds) : filterAds(copyNewAds)
  }
  console.log(name.length)

  const handleActive = () => setActive(!active);
  const handleName = (event) => setName(event.target.value);
  const handleSale = (event) => {
    setSale(event.target.value);
  };

  const handleMin = (event) => setMin(event);
  const handleMax = (event) => setMax(event);
  const handleChangeTags = (event) => {
    const selectedTags = event.target.selectedOptions;
    const finallyTags = Array.from(selectedTags).map((e) => e.value);
    setTags(finallyTags);
  };


  useEffect(() => {
    min > max && setMax(min);
    filter()
  }, [min, max,name]);

  //Necesitare un efecto para cargar las preferencias de localStorage
  return (
    <div className='filter__container'>
      <div className='filter__button' onClick={handleActive}>
        Filter Advertisments 🔍
      </div>
      {active && (
        <div className='filter__form'>
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
            <input type='radio' name='sale' id='sale' value={'sale'} />
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
          <label htmlFor=''>Min</label>
          <Range
            min={0}
            max={1000}
            step={100}
            onChange={handleMin}
            marks={{
              0: { label: 0 },
              100: { label: '100' },
              500: { label: 500 },
              1000: { label: '1000+' },
            }}
          />
          <label htmlFor=''>Max</label>
          <Range
            value={max}
            min={0}
            max={1000}
            step={100}
            onChange={handleMax}
            marks={{
              0: { label: 0 },
              100: { label: '100' },
              500: { label: 500 },
              1000: { label: '1000+' },
            }}
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
        </div>
      )}
    </div>
  );
};

export default FilterAds;

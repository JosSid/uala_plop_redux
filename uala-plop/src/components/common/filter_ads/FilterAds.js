import { useState } from 'react';
import './FilterAds.css';
import FormField from '../formField/FormField.js';
import Range from 'rc-slider';
import 'rc-slider/assets/index.css';
const FilterAds = () => {
  const [active, setActive] = useState(false);
  const [name, setName] = useState('');
  const [sale, setSale] = useState('all');
  const [price, setPrice] = useState(null);
  const [tags, setTags] = useState([]);

  const handleName = (event) => setName(event.target.value)
  const handleSale = (event) => {
    setSale(event.target.value)
  };

  const handleRange = (event) => console.log(event)
  console.log(price)
  return (
    <div className='filter__container'>
      <div className='filter__button'>Filter Advertisments 🔍</div>
      <div className='filter__form'>
      <fieldset onChange={handleSale}>
          <legend>For sale or Wanted :</legend>
          <label htmlFor='sale'>All</label>
          <input type='radio' name='sale' id='all' value={'all'} defaultChecked/>
          <label htmlFor='sale'>For Sale</label>
          <input type='radio' name='sale' id='sale' value={'sale'}  />
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
          
            <Range
            onChange={handleRange}
            step={100}
            defaultValue={[0,500]}
            tabIndex={[0,100]}
            min={0}
            max={1000}
            marks={{0:{style:{color:'blue'},label:'2000000000'}, 250:2,700:3}}
            included={false}
            handler={2}
            />


      </div>
    </div>
  );
};

export default FilterAds;

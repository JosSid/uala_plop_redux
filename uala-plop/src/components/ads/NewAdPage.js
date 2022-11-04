import { useState } from 'react';
import FormField from '../common/formField/FormField.js';
import Button from '../common/Button.js';
import { createAd } from './service.js';

const NewAdPage = ({ titleApp, ...props }) => {
  const [name, setName] = useState('');
  const [sale, setSale] = useState(true);
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState(null);

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeSale = (event) => setSale(event.target.value);
  const handleChangePrice = (event) => setPrice(parseInt(event.target.value));
  const handleChangeTags = (event) => {
    const newTags = event.target.selectedOptions;
    const reNewTags = Array.from(newTags).map(e => e.value)
    setTags(reNewTags);
    
  };

  const handlePhoto = (event) => {
    setPhoto(event.target.value)
    console.log(photo)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const createNewAd = await createAd({name,sale,price,tags,photo})
      return createNewAd
    }catch(err){

    }
    console.log({name,sale,price,tags,photo});
  };



  return (
    <div className='newAdPage__container'>
      <h1>Create Advertisment</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type='text'
          name='name'
          label='Title Advertisment'
          className='loginForm-field'
          onChange={handleChangeName}
          value={name}
        />
        <fieldset onChange={handleChangeSale}>
          <legend>For sale or Wanted :</legend>
          <label htmlFor=''>For Sale</label>
          <input type='radio' name='sale' value={true} defaultChecked />
          <label htmlFor=''>Wanted</label>
          <input type='radio' name='sale' value={false} />
        </fieldset>
        <FormField
          type='number'
          name='price'
          label='Price'
          className='loginForm-field'
          onChange={handleChangePrice}
          value={price}
        />

        <select
          name='tags'
          id='tags'
          onChange={handleChangeTags}
          multiple={true}
        >
          <optgroup >
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
        <label htmlFor="photo">Upload picture</label>
        <input onChange={handlePhoto} type='file' name='photo' id='photo' />
        <Button
          type='submit'
          variant='primary'
          className='loginForm-submit'
          disabled={false}
        >
          Create Advertisment
        </Button>
      </form>
    </div>
  );
};

export default NewAdPage;

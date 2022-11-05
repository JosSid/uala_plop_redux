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
  const [error, setError] = useState(null);//implementar
  const [enabled, setEnabled] =useState(false);//implementar
 

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeSale = (event) => setSale(event.target.value);
  const handleChangePrice = (event) => setPrice(parseInt(event.target.value));
  const handleChangeTags = (event) => {
    const selectedTags = event.target.selectedOptions;
    const finallyTags = Array.from(selectedTags).map(e => e.value)
    setTags(finallyTags);
    
  };

  const handlePhoto = (event) => {
    setPhoto(event.target.files)
    
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);



    try{
      const createNewAd = await createAd(formData)
      return createNewAd
    }catch(err){
      setError(err)
    }

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

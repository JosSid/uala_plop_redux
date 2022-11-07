import { useState } from 'react';
import FormField from '../common/formField/FormField.js';
import Button from '../common/Button.js';
import { createAd } from './service.js';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
import { useNavigate } from 'react-router-dom';
import Spinner from '../common/spinner/Spinner.js';
import './NewAdPage.css'

const NewAdPage = ({ titleApp, ...props }) => {
  const [name, setName] = useState('');
  const [sale, setSale] = useState(true);
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null); 
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate()

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeSale = (event) => setSale(event.target.value);
  const handleChangePrice = (event) => setPrice(parseInt(event.target.value));
  const handleChangeTags = (event) => {
    const selectedTags = event.target.selectedOptions;
    const finallyTags = Array.from(selectedTags).map((e) => e.value);
    setTags(finallyTags);
  };

  const handlePhoto = (event) => {
    setPhoto(event.target.files);
  };

  const isButtonEnabled = () => name  && price && tags.length > 0;

  const resetError = () => setError(null)



  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    resetError()
    setIsFetching(true)
    try {
      
      const createNewAd = await createAd(formData);
      const newAd = createNewAd.id;
      
      navigate(`/ads/${newAd}`)
      
    } catch (err) {
      setError(err);
    }
    setIsFetching(false)
  };

  return (
    <div className='newAdPage__container'>
      {isFetching && (<Spinner />)}
      <h1>Create Advertisment</h1>
      <form className='form__container' onSubmit={handleSubmit}>
        <FormField
          type='text'
          name='name'
          label='Title Advertisment'
          className='loginForm-field'
          onChange={handleChangeName}
          value={name}
          placeholder='Required field*'
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
          placeholder='Required field*'
          min='0'
        />
        <label htmlFor='tags'>Tags</label>
        <select
          name='tags'
          id='tags'
          onChange={handleChangeTags}
          multiple={true}
        >
          <optgroup label='Required field*'>
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
        <label htmlFor='photo'>Upload picture</label>
        <input onChange={handlePhoto} type='file' name='photo' id='photo' />
        {isButtonEnabled() && <Button
          type='submit'
          variant='primary'
          className='loginForm-submit'
          disabled={!isButtonEnabled()}
          
        >
          Create Advertisment
        </Button>}
      </form>
      {error && (
       <ErrorDisplay error={error} resetError={resetError} />
      )}
    </div>
  );
};

export default NewAdPage;

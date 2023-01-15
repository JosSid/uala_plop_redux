import { useState, useEffect } from 'react';
import {FormField} from '../common/formField/FormField.js';
import Button from '../common/Button.js';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
import Spinner from '../common/spinner/Spinner.js';
import styles from './NewAdPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getListTags, getUi } from '../../store/selectors.js';
import { tagsLoad, createAd, uiResetError } from '../../store/actions.js';

const NewAdPage = () => {
  const [name, setName] = useState('');
  const [sale, setSale] = useState(true);
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const {error, isFetching} = useSelector(getUi)
  const listTags = useSelector(getListTags)
  const dispatch = useDispatch()
    
  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeSale = (event) => setSale(JSON.parse(event.target.value));
  const handleChangePrice = (event) => setPrice(parseInt(event.target.value));
  const handleChangeTags = (event) => {
    const selectedTags = event.target.selectedOptions;
    const finallyTags = Array.from(selectedTags).map((e) => e.value);
    setTags(finallyTags);
  };

  const handlePhoto = (event) => {
    setPhoto(event.target.files[0]);
  };

  const isButtonEnabled = () => name && price && tags.length > 0;

  const resetError = () => dispatch(uiResetError());

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sale', sale);
    formData.append('price', price);
    photo && formData.append('photo', photo);
    formData.append('tags', tags);
  
    dispatch(createAd(formData))

  };

  useEffect(() => {
    const getNewTags = () => {
      dispatch(tagsLoad())
      };
    getNewTags();
  }, [dispatch]);

  return (
    <div className={styles.newAdPage__container}>
      {isFetching && <Spinner />}
      <h1>Create Advertisment</h1>
      <form data-testid="login-form" className={styles.form__container} onSubmit={handleSubmit}>
        <FormField
          type='text'
          name='name'
          label='Title Advertisment'
          onChange={handleChangeName}
          value={name}
          placeholder='Required field*'
        />
        <fieldset>
          <legend>For sale or Wanted :</legend>
          <label htmlFor='sale'>For Sale</label>
          <input
            type='radio'
            name='sale'
            id='sale'
            value={true}
            onChange={handleChangeSale}
            checked={sale}
          />
          <label htmlFor='wanted'>Wanted</label>
          <input
            type='radio'
            name='sale'
            id='wanted'
            onChange={handleChangeSale}
            value={false}
            checked={!sale}
          />
        </fieldset>
        <FormField
          type='number'
          name='price'
          label='Price'
          onChange={handleChangePrice}
          value={price}
          placeholder='Required field*'
          min='0'
        />
        <label htmlFor='tags'>Tags</label>
        <select
          name='tags'
          id='tags'
          value={tags}
          onChange={handleChangeTags}
          multiple={true}
          size={listTags.length + 1}
        >
          <optgroup label='Required field*'>
            {listTags.map((e) => (
              <option key={e} name={e} value={e}>
                {e}
              </option>
            ))}
          </optgroup>
        </select>
        <label htmlFor='photo'>Upload picture</label>
        <p className={styles.recomendation__size}>
          *Recomended size 300px / 300px
        </p>
        <input
          onChange={handlePhoto}
          type='file'
          name='photo'
          id='photo'
          photo={photo}
        />
        {isButtonEnabled() && (
          <Button
            type='submit'
            className='loginForm-submit'
            disabled={!isButtonEnabled()}
          >
            Create Advertisment
          </Button>
        )}
      </form>
      {error && <ErrorDisplay error={error} resetError={resetError} />}
    </div>
  );
};

export default NewAdPage;

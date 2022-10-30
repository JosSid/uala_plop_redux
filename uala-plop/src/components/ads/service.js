import client from "../../api/client.js"

const adsURL = '/api/v1/adverts'

export const getAds =  async () => {
    const ads = await client.get(adsURL)
    
    return ads;
   
};
const ads = [
    {
        content: 
            "Hola que tal estas",
        userId: 1,
        updatedAt: '202199876',
        id: 1,
    },
    {
        content: 
            "No tan bien como tu",
        userId: 1,
        updatedAt: '2020986567876',
        id: 2,
    }
];

const AdsPage = () => {
    return (
        <div className="ads__page">
            <ul>
                {ads.map(ad => <li key={ad.id}>{ad.content}</li>)}

            </ul>
        </div>
    )
};

export default AdsPage;
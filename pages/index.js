import React from 'react'
import { client } from '../lib/client';
import { Products, FooterBanner, HeroBanner } from '../components';


const Home = ({ products, BannerData}) => (
    <>
      <HeroBanner heroBanner={BannerData.length && BannerData[0]} />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map((product) => <Products key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={BannerData && BannerData[0]} />
    </>
  
)

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query)

  const Bannerquery = '*[_type == "banner"]';
  const BannerData = await client.fetch(Bannerquery)

  return {
    props: { products, BannerData}
  }
}

export default Home;
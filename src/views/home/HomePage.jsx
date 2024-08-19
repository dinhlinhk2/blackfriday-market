import { useContext } from 'react';

import images from '../../utils/images';
import '../../styles/HomePage.scss';
import { FilterView, Preloader, Title } from '../../components/common/index';
import { ProductContext } from '../../context/productContext';

function HomePage() {
    const { productsLoading } = useContext(ProductContext);

    return (
        <main className="bg-secondary">
            <section className="sc-banner">
                <div className="banner-item h-100 img-cover">
                    <img src={images.banner_1} alt="banner_1" className="img-cover" />
                </div>
            </section>
            <section className="sc-wrapper py-5">
                <Title title="Featured Products" />
                {productsLoading ? (
                    <Preloader />
                ) : (
                    <div>
                        <FilterView />
                        <br /> <br />
                    </div>
                )}
            </section>
        </main>
    );
}

export default HomePage;

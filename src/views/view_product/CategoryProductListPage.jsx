import { useContext, useEffect } from 'react';
import { CategoryContext } from '../../context/categoryContext';
import { useParams } from 'react-router-dom';
import { Preloader, ProductList, Title } from '../../components/common';

function CategoryProductListPage() {
    const { categoryKey } = useParams();
    const { getCategoryProducts, dispatch, categoryProducts, categoryLoading } = useContext(CategoryContext);
    useEffect(() => {
        getCategoryProducts(dispatch, categoryKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryKey]);
    return (
        <main className="bg-secondary">
            <div className="container">
                <div className="sc-wrapper py-5">
                    <Title title={categoryKey} />
                    {categoryLoading ? <Preloader /> : <ProductList products={categoryProducts} />}
                </div>
            </div>
        </main>
    );
}

export default CategoryProductListPage;

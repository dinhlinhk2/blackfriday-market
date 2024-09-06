import { useContext, useEffect, useState } from 'react';

import { BasketContext } from '../../context/basketContext';
import { Paypal, SelectAddress } from '../../components/common';
import '../../styles/BasketPage.scss';
import { formatPrice } from '../../utils/helpers';
import { getCheckoutTotal } from '../../actions/basketActions';

import * as addressapi from './../../services/addressapi';
function Checkout() {
    const { basket, checkoutTotal, checkoutCount, dispatch: basketDispatch } = useContext(BasketContext);

    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState();
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState();
    const [wards, setWards] = useState([]);
    const [ward, setWard] = useState();
    const [reset, setReset] = useState(false);

    useEffect(() => {
        getCheckoutTotal(basketDispatch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [basket]);

    useEffect(() => {
        setDistrict(null);
        const getDistrictByProvinceId = async (provinceId) => {
            const res = await addressapi.getDistrictByProvinceId(provinceId);
            if (res.status === 200) {
                setDistricts(res.data.data);
            }
        };
        province && getDistrictByProvinceId(province);
        !province ? setReset(true) : setReset(false);
        !province && setDistricts([]);
    }, [province]);

    useEffect(() => {
        setWard(null);
        const getWardsByDistrictId = async (districtId) => {
            const res = await addressapi.getWardsByDistrictId(districtId);
            if (res.status === 200) {
                setWards(res.data.data);
            }
        };
        province && getWardsByDistrictId(district);
        !province ? setReset(true) : setReset(false);
        (!province || !district) && setWards([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [district]);

    useEffect(() => {
        const getAllProvince = async () => {
            const res = await addressapi.getAllProvince();
            if (res.status === 200) {
                setProvinces(res.data.data);
            }
        };
        getAllProvince();
    }, []);

    const ward_name = wards?.find((item) => {
        const a = item.id === Number(ward);
        return a;
    });

    const district_name = districts?.find((item) => {
        const a = item.id === Number(district);
        return a;
    });
    const province_name = provinces?.find((item) => {
        const a = item.id === Number(province);
        return a;
    });
    return (
        <main className="bg-secondary">
            <div className="container">
                <div className="sc-wrapper">
                    <div className="basket grid">
                        {/* basket left */}
                        <div className="basket-l py-4">
                            <div className="basket-top bg-white px-3 py-4">
                                <h2>
                                    Checkout Your Order <span className="text-primary">({checkoutCount})</span>
                                </h2>
                            </div>

                            <div className="basket-list bg-white my-3">
                                {basket.map((item) => {
                                    return (
                                        <div className="basket-list-item grid px-3 py-3" key={item.id}>
                                            <div className="checkbox-item py-3">
                                                <div className="checkbox-icon"></div>
                                            </div>

                                            <div className="basket-list-item-info grid">
                                                <div className="item-info-img">
                                                    <img
                                                        src={item?.thumbnail}
                                                        alt={item?.title}
                                                        className="img-cover"
                                                    />
                                                </div>
                                                <div className="item-info-details py-2">
                                                    <div className="item-info-details-top">
                                                        <h4>{item.title}</h4>
                                                        <button type="button" className="remove-btn"></button>
                                                    </div>

                                                    <div className="flex align-center flex-wrap py-1">
                                                        <span className="fs-13 text-dark">Brand: {item?.brand}</span>
                                                        <span className="mx-3 fs-13 text-dark">
                                                            Category: {item?.category}
                                                        </span>
                                                    </div>

                                                    <div className="flex align-center justify-between">
                                                        <span className="fw-7 fs-17 text-yellow">${item.price}</span>
                                                        <div className="quantity">
                                                            <div className="quantity-toggle flex">
                                                                Quantity:
                                                                <div className="fs-14 mx-2 qty-value flex align-center justify-center">
                                                                    {item.quantity}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="fs-14">
                                                        <span className="fw-6">
                                                            Total: {formatPrice(item.totalPrice)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* basket right */}
                        <div className="basket-r py-4">
                            <div className="summary bg-white py-2 px-4">
                                <h2>Summary</h2>
                                <div className="flex align-center justify-between my-2">
                                    <p>Total</p>
                                    <p className="fw-6 fs-24">
                                        <span className="fw-7 text-yellow">US </span>
                                        {formatPrice(checkoutTotal)}
                                    </p>
                                </div>
                                <h3>Địa chỉ</h3>
                                <div className="flex flex-column">
                                    <div className="flex my-2 ">
                                        <SelectAddress
                                            value={province}
                                            setValue={setProvince}
                                            label="Thành Phố"
                                            options={provinces}
                                        />
                                        <SelectAddress
                                            value={district}
                                            setValue={setDistrict}
                                            label="Quận/Huyện"
                                            options={districts}
                                            reset={reset}
                                        />
                                        <SelectAddress
                                            value={ward}
                                            setValue={setWard}
                                            label="Phường/Xã"
                                            options={wards}
                                            reset={reset}
                                        />
                                    </div>
                                    <h3>Địa chỉ đầy đủ</h3>
                                    <input
                                        onCopy={(e) => console.log(e.target.value)}
                                        type="text"
                                        readOnly
                                        className="border"
                                        value={`${ward ? `${ward_name?.name},` : ''} ${
                                            district ? `${district_name?.name},` : ''
                                        } ${province ? `${province_name?.name}` : ''}`}
                                    />
                                </div>
                            </div>

                            <Paypal
                                payload={{
                                    products: basket,
                                    total: checkoutTotal,
                                }}
                                amount={checkoutTotal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Checkout;

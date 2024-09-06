import { memo } from 'react';
import '../../styles/SelectAddress.scss';
import PropTypes from 'prop-types';
// eslint-disable-next-line react/prop-types
function SelectAddress({ label, options = [], value, setValue, reset }) {
    return (
        <div className="mx-2">
            <label className="fw-5" htmlFor="select-address">
                {label}
            </label>
            <select
                value={reset ? '' : value}
                onChange={(e) => setValue(e.target.value)}
                id="select-address"
                className="w-100 border"
            >
                <option value="">{`--${label}--`}</option>
                {options.map((option) => {
                    return (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

SelectAddress.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    setValue: PropTypes.func,
};

export default memo(SelectAddress);

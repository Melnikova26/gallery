import Select, { DropdownIndicatorProps, StylesConfig, components } from "react-select";
import ValueType from 'react-select';
import st from './../selectItem/SelectItem.module.scss';
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface ISelectCreatedProps {
    name: string;
}
interface IValuesInput {
    from: number | string;
    to: number | string;
}
interface ISelect {
    label: string;
    value: string;
}

const SelectCreatedItem: React.FC<ISelectCreatedProps> = ({name}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [valuesInput, setValuesInput] = useState<IValuesInput>({from: '', to: ''});
    const [selectedOption, setSelectedOption] = useState<ISelect | null>(null);
    const [option, setOption] = useState<ISelect>();
    
useEffect(() => {
    const optionValue = valuesInput.from !== '' || valuesInput.to !== '' ? { label: `${valuesInput.from}-${valuesInput.to}`, value: `${valuesInput.from}-${valuesInput.to}` } : null;
    optionValue && setOption(optionValue);
    console.log(option);
}, [valuesInput])

    const setValueInFolder = () => {
        setIsDropdownOpen(false);
    }
    const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => (
    
        <components.DropdownIndicator {...props}>
            {isDropdownOpen ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                >
                    <path
                        d="M0.321395 4.1663L4.22936 0.314613C4.65497 -0.104871 5.34503 -0.104871 5.77064 0.314613L9.67861 4.1663C10.3652 4.84298 9.87892 6 8.90797 6L1.09203 6C0.121082 6 -0.365172 4.84298 0.321395 4.1663Z"
                        fill="black"
                        fillOpacity="0.3" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                >
                    <path
                        d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.36609e-08 1.09203 0L8.90797 6.7345e-07C9.87892 7.57111e-07 10.3652 1.15702 9.67861 1.8337Z"
                        fill="black"
                        fillOpacity="0.3" />
                </svg>
            )}
        </components.DropdownIndicator>
    );
    const customStyles: StylesConfig = {
        control: (provided, state) => ({
          ...provided,
          background: '#fff',
          borderRadius: state.menuIsOpen ? '0.5rem 0.5rem 0 0' : '0.5rem',
          border: state.menuIsOpen ? '1px solid #000' : '1px solid rgba(0, 0, 0, 0.30)',
        //   borderBottom: state.menuIsOpen ? '1px solid rgba(0, 0, 0, 0.30)' : 'none',
          boxShadow: state.isFocused && state.menuIsOpen? '' : '',
          height: '2.8125rem',
          width: '16.5625rem',
          maxWidth: '16.5625rem',
          fontSize: '0.8125rem',
          color: '#000',
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none',
        }),
      };

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
      
        setValuesInput((prevValues: IValuesInput) => ({
                ...prevValues,
                [name]: value,
        }));

      };
    return (
        <div className={st.selectCreated}>
            <Select
            options={[]}
            isSearchable={true}
            components={{DropdownIndicator, }}
            defaultValue={selectedOption}
            styles={customStyles} className={`${st.selectCreated}`} placeholder={name} onMenuOpen={() => setIsDropdownOpen(true)}
            // onMenuClose={() => setIsDropdownOpen(false)}
            />
           { isDropdownOpen ? 
            
            <div className={st.date} >
                <input
                    className={st.from}
                    name='from'
                    type="number"
                    value={valuesInput?.from}
                    placeholder='From'
                    required
                    onChange={handleChange}
                />
                <div className={st.line}></div>
                <input
                    className={st.to}
                    name='to'
                    type="number"
                    value={valuesInput?.to}
                    placeholder='To'
                    required
                    onChange={handleChange}
                />
            </div> 
            :
            null
            }
        </div>

      );
        
    
}

export default SelectCreatedItem;
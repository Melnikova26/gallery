import SelectItem from "../selectItem/SelectItem";
import st from './SelectItems.module.scss';
export interface ISelectValues {
    value: string;
    label: string;
}

const authors: ISelectValues[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const locations: ISelectValues[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const created = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  

const SelectItems = () => {
return(
    <div className={st.selectsDisplay}>
        <input className = {st.input} name='name' type="text" placeholder="Name" />
        <SelectItem name={'Author'} options={authors}/>
        <SelectItem name={'Location'} options={locations}/>
        <SelectItem name={'Created'} options={created}/>
    </div>
    
)
}
export default SelectItems;
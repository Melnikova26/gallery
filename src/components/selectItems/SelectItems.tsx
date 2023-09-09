import { useQuery } from "react-query";
import SelectItem from "../selectItem/SelectItem";
import st from './SelectItems.module.scss';
import { getAuthors, getLocations, getPaintings } from "../../services/fetcher";
import SelectCreatedItem from "../selectCreatedItem/SelectCreatedItem";
export interface ISelectValues {
    value: string;
    label: string;
}
export interface IAuthor {
    id: number;
    name: string;
}
export interface ILocation {
    id: number;
    location: string;
}

// const authors: ISelectValues[] = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ]
//   const locations: ISelectValues[] = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ]
  

const SelectItems = () => {
    const {data: authors} = useQuery({
        queryFn: () => getAuthors(),
        queryKey: ['authors'],
    });
    console.log(authors);

    const {data: locations} = useQuery({
        queryFn: () => getLocations(),
        queryKey: ['locations'],
    });
    console.log(locations);

    const {data: paintings} = useQuery({
        queryFn: () => getPaintings(),
        queryKey: ['paintings'],
    });

    const authorsArray = authors?.map((author: IAuthor) => {
        return {value: author.name, label: author.name}
    })
    const locationsArray = locations?.map((location: ILocation) => {
        return {value: location.location, label: location.location}
    })


return(
    <div className={st.selectsDisplay}>
        <input className = {st.input} name='name' type="text" placeholder="Name" />
        <SelectItem name={'Author'} options={authorsArray}/>
        <SelectItem name={'Location'} options={locationsArray}/>
        <SelectCreatedItem name={'Created'}/>
    </div>
    
)
}
export default SelectItems;
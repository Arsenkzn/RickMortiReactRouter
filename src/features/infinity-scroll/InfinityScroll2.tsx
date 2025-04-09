import {useState} from 'react';
import useSearch2 from '../search/useSearch2';
//import './App.css'
import { Item } from '../../entities/Item'
import { Link } from 'react-router-dom';


interface Props {
  category: string;
}

export default function InfinityScroll() {

const CategoryPage: FC<Props> = ({ category }) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        switch(category){
            case 'characters':
            setItems(characters);
            break;
            case 'location':
            setItems(locations);
            break;
            case 'episode':
            setItems(episodes);
            break;
        }
    }, [category]);

    const renderItemDetails = (item: Item) => {
        return Object.entries(item)
            .filter(([key, _]) => key !== 'image')
            .map(([key, value]) => {
                if (!value) return null;
                return (
                    <p key={key}>
                        <strong>{key}:</strong> {value}
                    </p>
                );
            });
    };

 // const [query, setQuery]= useState('');
  const [pageNumber, setPageNumber] = useState(1);
//   const {
//     loading,
//     character,
//     hasMore,
//     error
//   }   =  
  useSearch2(pageNumber);

  const handleChange = (e) => {
   // setQuery(e.target.value);
   setPageNumber(e.target.value);
   }

  return (
    <div className='App'>ведите запрос: 
        <input type='text' onChange={handleChange} />
        {/* {
          character.map(item => <div key={item} className='character'>{item}</div>)
        }
        {loading && <div className='loading'>Loading...</div>}
        {error && <div className='error'>Error</div>} */}
        return (
        <>
            <h1>{category}</h1>
            {items.map((item) => (
                <div key={item.id} className="item">
                    {renderItemDetails(item)}
                    {item.image && <img src={item.image} alt={item.name || 'Изображение'} />}
                    <br />
                    <Link to={`/${category}/${item.id}`}>Подробнее</Link>
                </div>
            ))}
        </>
    );
    </div>
  )
}
}
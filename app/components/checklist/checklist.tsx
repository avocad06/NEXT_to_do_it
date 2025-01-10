import ListItem from './listitem/listitem';
import styles  from './style.module.css';

function CheckList() {
    return (
        <section>
            <div>todo/done 탭 영역 뱃지</div>
            <ul>
                <ListItem />
                <ListItem />
            </ul>            
        </section>
    )
}

export default CheckList;
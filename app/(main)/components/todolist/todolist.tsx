'use client';

import type { TodoInline } from '../../../(main)/page';
import AddBar from '../../../components/addbar/addbar';
import CheckList from "../../../components/checklist/checklist";
import { useTodo } from '../../../hooks/useTodo';
import styles from './style.module.css';



function TodoList({todoData}: { todoData:TodoInline[] }) {
    
    // 초기 렌더링 값을 서버 렌더링 값으로 전달
    const { todo, fetchTodo, addTodo } = useTodo(todoData);

    return (
        <div className={"g_wrapper"}>
            <button onClick={fetchTodo} style={{backgroundColor: 'pink', cursor: 'pointer', borderRadius: '15px'}}>클릭하면 새로고침 됨</button>
            <AddBar onAdd={addTodo} onRefresh={fetchTodo} />
            <div className={styles.card_wrap}>
                <CheckList
                    isCompleted={false}
                    content={todo?.filter((item) => item.isCompleted === false) ?? []}
                />
                <CheckList
                    isCompleted={true}
                    content={todo?.filter((item) => item.isCompleted === true) ?? []}
                />
            </div>
        </div>
    );
}

export default TodoList;
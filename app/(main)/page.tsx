import AddBar from "../components/addbar/addbar";
import CheckList from "../components/checklist/checklist";
import { square } from "../styles/fonts";


export default function MainPage() {
    return (
        <main className={`g_main ${square.variable}`}>
            <div className={"g_wrapper"}>
                <AddBar />
                <CheckList />
                <CheckList />
            </div>
        </main>
    )
}
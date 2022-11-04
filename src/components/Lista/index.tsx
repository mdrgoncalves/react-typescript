import { ITarefas } from "../../types/tarefa";
import Item from "./Item";
import style from './Lista.module.scss';

interface ListaProps {
    tarefas: ITarefas[];
    selecionaTarefa: (tarefaSelecionada: ITarefas) => void;
}

function Lista({ tarefas, selecionaTarefa }: ListaProps) {

    return (
        <aside className={style.listaTarefas}>
            <h2> Estudos do dia </h2>
            <ul>
                {tarefas.map(item => (
                    <Item 
                        selecionaTarefa={selecionaTarefa}
                        key={item.id}
                        {...item}
                    />
                ))}
            </ul>
        </aside>
    );
}

export default Lista;
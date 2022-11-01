<h1 align="center">
    React - Escrevendo em Typescript
</h1>

<p align="center">
 • <a href="#-about">Sobre</a> 
 • <a href="#-tech-stack">Conteúdo Estudado</a>  
</p>

# 💻 Sobre

React em Typescript - Projeto para estudo de React.

---

# 🛠 Conteúdo Estudado

# SRP - Single Responsability Principal

Cada funcionalidade do código deve ter apenas uma responsabilidade. Como a ferramente mais utilizada será o Function Component, então cada componente deve ter apenas uma responsabilidade.

# Instalando projeto em React via NPM

Para inicializar um projeto em React, utiliza-se o comando no terminal:

```bash
npx create-react-app nome-do-projeto --template typescript
```

# Criação de Components com Class Component

Uma das formas antigamente utilizadas para criação de componentes era extendendo uma classe a partir da importação do React.

```tsx
import React from "react";

class Botao extends React.Component {
    render() {
        return (
            <button>
                Botão
            </button>
        )
    }
}

export default Botao;
```

Esse botão é renderizado no App.tsx como se fosse uma tag HTML através da sua principal funcão render(): 

```tsx
import React from 'react';
import Botao from './components/Botao';

function App() {
  return (
    <div className="App">
      <Botao />
    </div>
  );
}

export default App;
```

# Criação de Components com Function Component

A forma mais utilizada atualmente para criação de componentes é através de uma função que retorna um JSX/TSX. Devido as atualizações no Function Component que possibilitou a utilização dos recursos de STATE antigamente associado ao método de Class Function, aos poucos esse último vem se tornando um recurso deprecated.

```tsx
import React from "react";

function Lista() {

    return (
        <aside>
            <h2> Estudos do dia </h2>
            <ul>
                <li>
                    <h3>
                        React
                    </h3>
                    <span>
                        02:00:00
                    </span>
                </li>
                <li>
                    <h3>
                        Javascript
                    </h3>
                    <span>
                        01:00:00
                    </span>
                </li>
            </ul>
        </aside>
    );
}

export default Lista;
```

# Renderizando uma Array

Para que seja possível construir um código de forma reativa e dinâmica, em vez de torna o código imperativo, utilizasse o array para criar esse dinamismo: 

```tsx
import React from "react";

function Lista() {

    const tarefas = [{
        tarefa: 'React',
        tempo: '02:00:00'
    },
    {
        tarefa: 'Javascript',
        tempo: '01:00:00'
    },
    {
        tarefa: 'Typescript',
        tempo: '03:00:00'
    }];

    return (
        <aside>
            <h2> Estudos do dia </h2>
            <ul>
                {tarefas.map((item, index) => (
                    <li key={index}>
                        <h3> {item.tarefa} </h3>
                        <span> {item.tempo} </span>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Lista;
```

Assim em vez de ser necessário criar um item HTML descritivo novo toda vez que se atualizar a lista, o próprio recurso do JSX combinado com métodos de Array fazem o trabalho.

# Map e Keys

Quando se utiliza o método .map no React, ele fica um pouco perdido por não saber que item da lista corresponde ao DOM real pelo dinamismo inerente. Então é necessário uma chave (key) para linkar uma coisa com a outra. Então o React pede esse atributo sempre que for fazer uma renderização através de lista.

# Utilizando CSS em React

A primeira forma para se passar estilização para um componente é utilizando a propriedade inline:

```tsx
render() {
    const backgroundColor = 'green';
    const styles = {
        backgroundColor
    }
    return (
        <button style={styles}>
            Botão
        </button>
    )
}
```

A outra forma é a mais comum e popularmente utilizada no ambiente nativo HTML, que é aquela na qual se externa o documento de estilização. Porém no React se importa esse documento através da palavra 'import'. 
Para facilitar a escrita e impedir a sobrescrição de códigos, utiliza-se o SASS e o CSS Modules.

# Instalando o SASS e Aplicando

Para instalar o SASS, utiliza-se o comando no terminal:

```bash
npm install --save-dev sass
```

Para utilizar o SASS, é necessário criar um arquivo .scss e importar esse arquivo no arquivo .tsx. 

```tsx
import React from "react";
import './styles.scss';
```

A aplicação no componente acontece através da propriedade className.

# CSS Modules

Para que não haja a sobrescrita de estilos, utiliza-se o CSS Modules. Para isso, como se está utilizando Typescript é necessário um plugin chamado 'typescript-plugin-css-modules', instalado através do comando:

```bash
npm install -D typescript-plugin-css-modules
```

Também é necessário indicar sua utilização no tsconfig.json, através das linhas abaixo:

```json
{
    "compilerOptions": {
        "plugins": [{ "name": "typescript-plugin-css-modules" }]
    }
}
```

A primeira mudança do CSS Module é que o arquivo de estilização agora recebe o nome de 'style.module.scss'. A segundo é que sua importação é realizada como se fosse um objeto:

```tsx
import style from './style.module.scss';
```

Seguindo o mesmo princípio na aplicação no className: 

```tsx
<button className={style.botao}>
    Botão
</button>
```

# Props

Props são as propriedades que são passadas para um componente. Elas são passadas através de um atributo HTML, que no caso do React é chamado de 'props'. 
No Class Component ele se passa da seguinte forma:

```tsx
interface BotaoProps {
    children: React.ReactNode;
}

class Botao extends React.Component<BotaoProps> {
    render() {
        return (
            <button className={style.botao}>
                {this.props.children}
            </button>
        )
    }
}
```

No Function Component a ideia é a mesma:

```tsx
export default function Item(
    {tarefa, tempo} :
    {tarefa: string, tempo: string}
) {
    return (
        <li className={style.item}>
            <h3> {tarefa} </h3>
            <span> {tempo} </span>
        </li>
    )
}
```

A aplicação desse componente ficaria a seguinte:

```tsx
return (
    <aside className={style.listaTarefas}>
        <h2> Estudos do dia </h2>
        <ul>
            {tarefas.map((item, index) => (
                <Item 
                    key={index}
                    {...item}
                />
            ))}
        </ul>
    </aside>
)
```

# React.Fragment

Um dos requisitos do JSX, ao contrário do HTML, é que as tags não podem ficar soltas dentro de um componente, é necessário fazer um wrapper através de um elemento pai para que seja possível renderizar. Porém isso pode ser desviado através da tag 'React.Fragment', que ao englobar esses elementos soltos, renderiza corretamente esses mesmo elementos.

```tsx
export function Relogio() {

    return (
        <React.Fragment>
            <span>0</span>
            <span>0</span>
            <span>:</span>
            <span>0</span>
            <span>0</span>
        </React.Fragment>
    )
}
```

Uma forma de se abreviar esse código é ocultar a expressão React.Fragment e utilizar apenas < ></>.

# States

States são as variáveis que são utilizadas para armazenar informações que podem ser alteradas. Elas são declaradas dentro do componente e são alteradas através de uma função que é passada como parâmetro para o componente.

# States em Function Component

No Function Component a chamada do state é através do 'useState', o use se refere a chamada de um ReactHook.

```tsx
function Lista() {

    //Inicio do State
    const [tarefas, setTarefas] = useState([{
        tarefa: 'React',
        tempo: '02:00:00'
    },
    {
        tarefa: 'Javascript',
        tempo: '01:00:00'
    },
    {
        tarefa: 'Typescript',
        tempo: '03:00:00'
    }]);

    return (
        <aside className={style.listaTarefas}>
            <h2 onClick={() => 
                //Aplicação do State
                setTarefas([...tarefas, {
                    tarefa: 'Nova Tarefa',
                    tempo: '00:00:00'
                }])
            }> Estudos do dia </h2>
            <ul>
                {tarefas.map((item, index) => (
                    <Item 
                        key={index}
                        {...item}
                    />
                ))}
            </ul>
        </aside>
    );
}
```

# States em Class Component

No Class Component a chamada do state é através do 'this.state', e a alteração do state é feita através da função 'this.setState'. Inicia-se criando uma variável que define o estado inicial do state:

```tsx
class Formulario extends React.Component {

    //Define o estado inicial do State
    state = {
        tarefa: '',
        tempo: '00:00:00'
    }

    //Função que altera o state no formulário
    adicionarTarefa(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        console.log('state: ', this.state);
    }

    render() {
        return (
                                               //No submit do formulário realiza a função específica
            <form className={style.novaTarefa} onSubmit={this.adicionarTarefa.bind(this)}>
                <div className={style.inputContainer}>
                    <label htmlFor="tarefa">
                        Adicione uma tarefa
                    </label>
                    <input 
                        type="text"
                        name="tarefa"
                        id="tarefa"
                        //Define o estado inicial do input tarefa
                        value={this.state.tarefa}
                        //Permite a mudança através do seletor de controle, setando um novo estado
                        onChange={evento => this.setState({ ...this.state, tarefa: evento.target.value })}
                        placeholder="O que você quer estudar?"
                        required
                    />
                </div>
                <div className={style.inputContainer}>
                    <label htmlFor="tempo">
                        Tempo
                    </label>
                    <input 
                        type="time" 
                        step="1"
                        name="tempo"
                        //Define o estado inicial do input tempo
                        value={this.state.tempo}
                        //Permite a mudança através do seletor de controle, setando um novo estado
                        onChange={evento => this.setState({...this.state, tempo: evento.target.value })}
                        id="tempo"
                        min="00:00:00"
                        max="01:30:00"
                        required
                    />
                </div>
                <Botao>
                    Adicionar
                </Botao>
            </form>
        )
    }
}
```
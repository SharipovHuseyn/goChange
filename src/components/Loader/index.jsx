import './index.css';

/**
 * Компонент для показа лоадера
 * 
 * @component
 * @param {string} style - стиль контейнера
 * @param {string} className - класс контейнера
 * @param {string} type - размер (normal/small)
 * @param {string} centered - отцентрован или нет
 * @screenshot Loader-001.png
 */

function Loader({
  style,
  className,
  type="normal", //small
  centered=true
}) {
    let cn = `lds-ring${type==='small'?'-small':''}${centered?' centered':''}${className?' '+className:''}`;
    return (
      <div style={style} className={cn}><div></div><div></div><div></div><div></div></div>
    )
}

export default Loader;
  
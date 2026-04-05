import Loader from '../Loader';

/**
 * Компонент-контейнер для показа лоадера, пока грузятся его дети.
 * 
 * Ориентируется на массив providers: 
 * если хотя бы один isFetching или isLoading, то показывает лоадер,
 * если хотя бы один isError, то показывает errorMessage,
 * иначе показывает дочерние элементы (children)
 * 
 * @component
 * @param {Object} children 
 * @param {Array<Provider>} providers
 * @param {string} errorMessage
 */
function WaitFor({
  children,
  providers,
  errorMessage = "ERROR: Cannot load data",
  type = "normal centred",
}) {
  let waiting = false;
  let error = false  
  providers.forEach( p => {
    if (!p || p.isLoading) {
        waiting = true
    }
    if (p && (p.isError || p.data?.error)) {
        error = true
    }
  })

  const isCentered = type.indexOf('centered') !== -1
  const isSmall = type.indexOf('small') !== -1

  return (
    error ?
      <div>{errorMessage || 'Cannot load data'}</div>
    :
    waiting ?
      <div style={isCentered ? {position:'relative', minHeight:100, height:'100%'} : {}}><Loader type={isSmall?"small":"normal"}/></div>
    :
      children
  )
}

export default WaitFor;


  
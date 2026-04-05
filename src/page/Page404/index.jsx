import './index.css';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

/**
 * Страница "Нет нет такой страницы"
 * 
 * @component pages
 */
function Page404() {
  const navigate = useNavigate();
  const handleClick = () => navigate('/');

  return (
    <>
    <Header/>
          <div className="no-match">
        <div className="big">404</div>
        Страница не найдена
        <br/>
        <br/>
        <Button type="primary" onClick={handleClick}>На главную</Button>
      </div>
    </>

  )
}

export default Page404;
  
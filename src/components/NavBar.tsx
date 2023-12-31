// @ts-nocheck
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: 'Penguin List',
    key: '/',
    //icon: <AppstoreOutlined />,
  },
  {
    label: 'Add Penguin',
    key: '/add-penguin',
    //icon: <MailOutlined />,
  },
];


const NavBar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(location.pathname);
  
    const onClick: MenuProps['onClick'] = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
      navigate(e.key);
    };
  
    return (
      <Menu 
        className="nav-menu" 
        onClick={onClick} 
        selectedKeys={[current]} 
        mode="horizontal" 
        items={items} 
        style={{ 
          position: 'fixed', 
          marginBottom: '2rem',
          zIndex: '1000',
          minWidth: '18rem', 
          width: '25rem', 
          maxWidth: '48rem',
        }}
      />
    );
    
      
  };

export default NavBar;
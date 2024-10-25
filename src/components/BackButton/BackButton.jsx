import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show the back button on the home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <Button
      className="back-button"
      icon={<ArrowLeftOutlined />}
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export default BackButton;

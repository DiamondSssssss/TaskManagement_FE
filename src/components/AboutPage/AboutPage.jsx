import React from 'react';
import { Typography, Row, Col, Card, Avatar } from 'antd';
import { TeamOutlined, BulbOutlined, RocketOutlined } from '@ant-design/icons';
import './AboutPage.css';

const { Title, Paragraph } = Typography;

const AboutPage = () => {
  return (
    <div className="about-page">
      <Title level={1}>About TaskMaster</Title>
      <Paragraph>
        TaskMaster is your ultimate productivity companion, designed to help you organize your life and achieve your goals with ease.
      </Paragraph>
      
      <Row gutter={[16, 16]} className="info-row">
        <Col xs={24} sm={8}>
          <Card>
            <Avatar size={64} icon={<TeamOutlined />} className="card-avatar" />
            <Title level={3}>Our Team</Title>
            <Paragraph>
              We're a passionate group of developers and designers committed to making task management simple and effective.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Avatar size={64} icon={<BulbOutlined />} className="card-avatar" />
            <Title level={3}>Our Mission</Title>
            <Paragraph>
              To empower individuals and teams to achieve more by providing intuitive and powerful task management tools.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Avatar size={64} icon={<RocketOutlined />} className="card-avatar" />
            <Title level={3}>Our Vision</Title>
            <Paragraph>
              To become the world's most loved productivity app, helping millions organize their lives and reach their full potential.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AboutPage;
